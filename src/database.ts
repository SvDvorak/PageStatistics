import sql = require("sqlite");
import moment = require("moment");

export class PageVisit {
    page: string;
    count: number;

    constructor(page: string, count: string) {
        this.page = page;
        this.count = parseInt(count);
    }
}

export class Database {
    database!: sql.Database;

    async load(): Promise<void> {
        this.database = await sql.open("./database/statistics.sqlite");
        //await this.database.migrate({ force: 'last' });
        await this.database.migrate({ });
    }

    async addVisit(page: string, userId: string): Promise<void> {
        await this.database.run(
            `INSERT INTO Visit (page, userId, time) VALUES
            ((?), "${userId}", datetime('now'))`, page);
    }

    async fakeVisit(page: string, userId: string, time: moment.Moment): Promise<void> {
        await this.database.run(
            `INSERT INTO Visit (page, userId, time) VALUES
            ("${page}", "${userId}", datetime('now'))`);
    }

    async getLastHour(): Promise<PageVisit> {
        return this.getVisits(moment().subtract(1, "hour"), moment());
    }

    async getLastDay(): Promise<PageVisit> {
        return this.getVisits(moment().subtract(1, "day"), moment());
    }

    async getLastWeek(): Promise<PageVisit> {
        return this.getVisits(moment().subtract(1, "week"), moment());
    }

    private async getVisits(start: moment.Moment, end: moment.Moment): Promise<PageVisit> {
        var startString = start.toISOString();
        var endString = end.toISOString();
        return await this.database
            .get(`SELECT page, COUNT(*) AS count FROM Visit AND time BETWEEN "${startString}" AND "${endString}" GROUP BY page`)
            .then(x => new PageVisit(x.page, x.count));
    }
}