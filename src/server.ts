import express = require("express");
import bodyParser = require("body-parser");
import { createHash } from "crypto";
import { Database } from "./database";
import moment = require("moment");
import { TestDataSetup } from "./testDataSetup";


class PageStats {
    page: string;
    lastHour: number;
    lastDay: number;
    lastWeek: number;

    constructor(page: string, lastHour: number, lastDay: number, lastWeek: number) {
        this.page = page;
        this.lastHour = lastHour;
        this.lastDay = lastDay;
        this.lastWeek = lastWeek;
    }
}

export class Server {
    app : express.Express;
    database: Database;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.database = new Database();
    }

    allowCrossDomain(req: express.Request, response: express.Response, next: any): void {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'POST');
        response.header('Access-Control-Allow-Headers', 'Content-Type');

        next();
    }

    setupEndpoints() {
        this.app.post("/visit", (req, res) => this.postVisit(req, res));
        this.app.get("/visits", (req, res) => this.getVisits(req, res));
    }

    async postVisit(request: express.Request, response: express.Response): Promise<void> {
        if(!request.body.page) {
            response.send(400);
        }

        //TEST
        const testText = "Posted! " + request.ip + " at " + new Date().toISOString();
        console.log(testText);

        var userId = this.hash(request.ip);
        await this.database.addVisit(request.body.page, userId);
        
        //TEST
        //var row = await this.database.all(`SELECT * FROM Visit WHERE userId = "${request.ip}"`);
        response.status(200);
        response.send();
    }
    async getVisits(request: express.Request, response: express.Response): Promise<void> {
        //TEST
        //console.log(`Start: "${startDate}" End: "${endDate}"`);
        var pageStats: PageStats[] = [];
        /*var pages = await this.database.getPages();
        for (const page of pages) {
            var lastHour = await this.database.getLastHour(page);
            var lastDay = await this.database.getLastDay(page);
            var lastWeek = await this.database.getLastWeek(page);
            pageVisits.push(new PageVisit(page, lastHour, lastDay, lastWeek))
            console.log(`"${page}" Last hour: "${lastHour}" Last day: "${lastDay}" Last week: "${lastWeek}"`);
        }*/
        console.log("FIN");
        response.status(200);
        response.send(pageStats);
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
var setup = new TestDataSetup(server);
var started = server.start();

started.then(async () => setup.loadAll()).then(() => console.log("Finished loading data"));