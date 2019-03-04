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
        // WHEN YOU WANT TO RERUN LAST MIGRATION STEP
        //await this.database.migrate({ force: 'last' });
        await this.database.migrate({ });
    }

    async addVisit(page: string, userId: string): Promise<void> {
        await this.database.run(
            `INSERT INTO Visit (page, userId, time) VALUES
            ((?), "${userId}", datetime('now'))`, page);
    }

    async getLastHour(): Promise<PageVisit[]> {
        return this.getVisits(moment().subtract(1, "hour"), moment());
    }

    async getLastDay(): Promise<PageVisit[]> {
        return this.getVisits(moment().subtract(1, "day"), moment());
    }

    async getLastWeek(): Promise<PageVisit[]> {
        return this.getVisits(moment().subtract(1, "week"), moment());
    }

    private async getVisits(start: moment.Moment, end: moment.Moment): Promise<PageVisit[]> {
        var startString = start.toISOString().replace("T", " ");
        var endString = end.toISOString().replace("T", " ");
        return await this.database
            .all(`SELECT page, COUNT(*) AS count FROM Visit WHERE time BETWEEN "${startString}" AND "${endString}" GROUP BY page`)
            .then(results => results as PageVisit[]);
    }
}