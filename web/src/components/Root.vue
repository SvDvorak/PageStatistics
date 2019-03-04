<template>
    <div class="rootContainer">
        <!-- <img class="logo" src="../logo.svg" /> -->
        <div is="tileGroup" v-for="(tileGroup, groupIndex) in tileGroups" :key="groupIndex" :title="tileGroup.title" :tiles="tileGroup.tiles" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TileGroupComponent from "./TileGroup.vue";
import { Stats, StatsDictionary } from "../stats";
import TileGroup from "./tileGroup";
import Tile from "./tile";

@Component({
    components: {
        "tileGroup": TileGroupComponent
    }
})
export default class Root extends Vue {
    tileGroups: TileGroup[] = [];

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
    font-size: 2.5em;
    color: #666;
    margin: 0.4em 0em 0em 0em;
}

p {
    font-family: Raleway, Verdana;
    text-align: center;
	color: antiquewhite;
    margin: 0.5em 0em;
}
</style>