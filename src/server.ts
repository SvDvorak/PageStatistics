import express = require("express");
import sql = require("sqlite");
import moment = require("moment");

export class Server {
    app : express.Express;
    database!: sql.Database;

    constructor() {
        this.app = express();
    }

    allowCrossDomain(req: express.Request, response: express.Response, next: any): void {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'POST');
        response.header('Access-Control-Allow-Headers', 'Content-Type');

        next();
    }

    async setupEndpoints(): Promise<void> {
        this.app.post("/visit", (req, res) => this.postVisit(req, res));
        this.app.get("/visits", (req, res) => this.getVisits(req, res));
    }

    async postVisit(request: express.Request, response: express.Response): Promise<void> {
        const testText = "Posted! " + request.ip + " at " + new Date().toISOString();
        console.log(testText);
        await this.database.run(
            `INSERT INTO Visit (userId, time) VALUES
            ("${request.ip}", datetime('now'))`);
        
        var row = await this.database.all(`SELECT * FROM Visit WHERE userId = "${request.ip}"`);
        response.status(200);
        response.send(row);
    }

    async getVisits(request: express.Request, response: express.Response): Promise<void> {
        let startDate = moment().startOf('day').toISOString();
        let endDate = moment().startOf('day').add(1, "day").toISOString();
        console.log(`Start: "${startDate}" End: "${endDate}"`);
        var visits = await this.database.all(`SELECT * FROM Visit WHERE time BETWEEN "${startDate}" AND "${endDate}"`);
        response.status(200);
        response.send(visits.length.toString());
    }

    async start(): Promise<void> {
        this.app.use(this.allowCrossDomain);
        this.setupEndpoints();

        this.database = await sql.open("./database/statistics.sqlite");
        await this.database.migrate({});

        var port = 80;
        this.app.listen(port);
        console.log("Started listening on port " + port);
    }
}

var server = new Server();
server.start();

for (let index = 0; index < 100; index++) {
    
}