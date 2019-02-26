import express = require("express");
import sql = require("sqlite");

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

    setupEndpoints(): void {
        this.app.post("/", (request: express.Request, response: express.Response) => {
            console.log("Posted! " + request.ip);
            
            response.status(200);
            response.send(request.ip);
        });
    }

    async start(): Promise<void> {
        this.app.use(this.allowCrossDomain);
        this.setupEndpoints();

        this.database = await sql.open("./database/scores.sqlite");
        await this.database.migrate({});

        var port = 80;
        this.app.listen(port);
        console.log("Started listening on port " + port);
    }
}

var server = new Server();
server.start();