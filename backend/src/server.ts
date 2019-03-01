import express = require("express");
import bodyParser = require("body-parser");
import { createHash } from "crypto";
import { Database } from "./database";
import { TestDataSetup } from "./testDataSetup";
import { Stats, StatsDictionary } from "../../common/stats";


export class Server {
    app : express.Express;
    database: Database;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.database = new Database();
    }

    allowCrossDomain(_req: express.Request, response: express.Response, next: any): void {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'POST');
        response.header('Access-Control-Allow-Headers', 'Content-Type');

        next();
    }

    setupEndpoints() {
        this.app.post("/visit", (req, res) => this.postVisit(req, res));
        this.app.get("/visits", (_req, res) => this.getVisits(res));
    }

    async postVisit(request: express.Request, response: express.Response): Promise<void> {
        if(!request.body.page) {
            response.send(400);
        }

        var userId = this.hash(request.ip);
        await this.database.addVisit(request.body.page, userId);
        
        response.status(200);
        response.send();
    }

    async getVisits(response: express.Response): Promise<void> {
        var pageStats: StatsDictionary = { };
        var lastHour = await this.database.getLastHour();
        for (const visits of lastHour) {
            this.getOrCreate(pageStats, visits.page).lastHour = visits.count;
        }
        var lastDay = await this.database.getLastDay();
        for (const visits of lastDay) {
            this.getOrCreate(pageStats, visits.page).lastDay = visits.count;
        }
        var lastWeek = await this.database.getLastWeek();
        for (const visits of lastWeek) {
            this.getOrCreate(pageStats, visits.page).lastWeek = visits.count;
        }

        response.status(200);
        response.send(pageStats);
    }

    private getOrCreate(stats: StatsDictionary, index: string): Stats {
        if(!(index in stats))
            stats[index] = new Stats();
        return stats[index];
    }

    async start(): Promise<void> {
        this.app.use(this.allowCrossDomain);
        this.setupEndpoints();

        await this.database.load();

        var port = 80;
        this.app.listen(port);
        console.log("Started listening on port " + port);
    }

    hash(text: string): string {
        var hash = createHash('sha256');
        hash.update(text);
        return hash.digest('hex');
    }
}

var server = new Server();
var started = server.start();
var setup = new TestDataSetup(server);

// Fill up database with test data
// started
//     .then(async () => setup.loadAll())
//     .then(() => console.log("Finished loading data"));