export default class Tile {
    header: string;
    body: string;

    constructor(header: string, body: string) {
        this.header = this.getFancyText(header);
        this.body = body;
    }

    getFancyText(text: string): string {
        switch(text) {
            case "lastHour":
                return "Last Hour";
            case "lastDay":
                return "Last Day";
            case "lastWeek":
                return "Last Week";
        }
        
        return "MISSING_TRANSLATION";
    }
}