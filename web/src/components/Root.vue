<template>
    <div class="rootContainer">
        <!-- <img class="logo" src="../logo.svg" /> -->
        <div v-for="(tileGroup, groupIndex) in tileGroups" :key="groupIndex">
            <h1>{{ tileGroup.title }}</h1>
            <ul class="tiles">
                <li is="tile" v-for="(tile, tileIndex) in tileGroup.tiles" :key="tileIndex" :header="tile.header" :body="tile.body" />
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TileComponent from "./Tile.vue";
import { Stats, StatsDictionary } from "../../../common/stats";

class TileGroup {
    title: string;
    tiles: Tile[];

    constructor(title: string, tiles: Tile[]) {
        this.title = title;
        this.tiles = tiles;
    }
}
class Tile {
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

@Component({
    components: {
        "tile": TileComponent
    }
})
export default class Root extends Vue {
    tiles: Tile[];
    tileGroups: TileGroup[];
    
    constructor() {
        super();
        this.tiles = [new Tile("Hej", "Andreas"), new Tile("Coolt", "Va?")];
        this.tileGroups = [];
    }

    mounted() {
        var data: StatsDictionary = { 
            "CampExplorer": {
                "lastHour": 120,
                "lastDay": 2880,
                "lastWeek": 20160,
            },
            "LeitnerCalendar": {
                "lastHour": 19,
                "lastDay": 455,
                "lastWeek": 3183
            },
            "NumberSpy": {
                "lastHour": 1,
                "lastDay": 24,
                "lastWeek": 168
            }
        }

        this.tileGroups = this.transformToTileGroups(data);
    }

    private transformToTileGroups(data: any) : TileGroup[] {
        var tileGroups: TileGroup[] = [];

        for (const service in data) {
            if (data.hasOwnProperty(service)) {
                const serviceData = data[service];

                var tiles: Tile[] = [];
                for (const row in serviceData) {
                    if (serviceData.hasOwnProperty(row)) {
                        const value = serviceData[row];
                        tiles.push(new Tile(row, value));
                    }
                }

                tileGroups.push(new TileGroup(service, tiles));
            }
        }

        return tileGroups;
    }
};
</script>

<style>
body {
    background: #FAFAFA;
    display: flex;
    flex-direction: column;
    align-items: left;
}

.rootContainer {
    display: flex;
    flex-direction: column;
}

/* .logo {
    align-self: center;
    width: 24em;
} */


h1 {
    font-family: Montserrat, Verdana;
    font-size: 3em;
    color: #666;
    margin-top: 0.8em;
    margin-bottom: 0.8em;
}

p {
    font-family: Raleway, Verdana;
    text-align: center;
	color: antiquewhite;
    margin: 0.5em 0em;
}

ul {
	list-style-type: none;
	padding: 0;
}

.tiles {
	display: flex;
	flex-flow: row wrap;
}

	.tile {
		background: mediumseagreen;
		width: 180px;
		height: 180px;
		margin: 10px;
		padding: 20px;
	}

		.tile_header {
			font-size: 18px;
			margin-top: 0px;
			margin-bottom: 5px;
		}

		.tile_body {
			font-size: 30px;
		}
</style>