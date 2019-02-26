import * as express from "express";

export class Server {
    app : express.Express;
    constructor() {
        this.app = express();
        this.app.use(this.allowCrossDomain);
        this.setupEndpoints();
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

    start(): void {
        this.app.listen(80);
    }
}

var server = new Server();
server.start();