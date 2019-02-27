import { Server } from "./server";
import moment = require("moment");

export class TestDataSetup {
    server: Server;
    identifiers: string[];
    constructor(server: Server) {
        this.server = server;

        this.identifiers = [
            "2.99.133.149",
            "11.155.73.150",
            "38.62.116.128",
            "103.175.21.136",
            "244.229.238.109",
            "61.78.166.34",
            "44.65.197.195",
            "214.36.9.5",
            "5.78.209.224",
            "216.65.220.202",
            "7.70.227.29",
            "4.50.144.254",
            "250.41.63.163",
            "60.115.190.158",
            "201.36.173.85",
            "118.181.161.81",
            "212.196.88.123",
            "130.54.77.6",
            "11.77.12.31",
            "72.166.172.62",
            "56.73.233.40",
            "218.235.68.175",
            "135.184.152.57",
            "21.176.246.136",
            "147.52.134.119",
            "24.33.82.3",
            "87.239.65.181",
            "163.123.72.151",
            "236.250.216.87",
            "129.76.93.53",
            "145.135.188.31",
            "178.209.98.149",
            "84.33.251.183",
            "35.188.153.93",
            "115.141.57.241",
            "47.129.226.1",
            "111.140.140.20",
            "248.43.239.181",
            "214.236.254.164",
            "249.159.203.250",
        ];
    }


    async loadAll(): Promise<void> {
        await Promise.all([
            this.loadTestContent("CampExplorer", 20),
            this.loadTestContent("LeitnerCalendar", 3*60),
            this.loadTestContent("NumberSpy", 1*60*60)
        ])
    }

    async loadTestContent(page: string, offset: number): Promise<void> {
        var command: string[] = [];
        for (let index = 0; index < 1000000; index++) {
            var time = moment(moment.now() + index * 100000).subtract(2, "weeks").add(offset*index, "seconds").toISOString();
            var hash = this.identifiers[Math.floor(Math.random() * this.identifiers.length)]
            command.push(`("${page}", "${hash}", "${time}")`);
        }
        await this.server.database.database.run(`INSERT INTO Visit (page, userId, time) VALUES ` + command.join(","));
    }
}