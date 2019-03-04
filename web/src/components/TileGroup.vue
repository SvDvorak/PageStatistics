<template>
    <div>
        <h1>{{ title }}</h1>
        <ul class="tiles">
            <li is="tile" v-for="(tile, tileIndex) in tiles" :key="tileIndex" :header="tile.header" :body="tile.body" />
        </ul>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TileComponent from "./Tile.vue";
import Tile from "./tile";

@Component({
    components: {
        "tile": TileComponent
    }
})
export default class TileGroup extends Vue {
    @Prop() title!: string;
    @Prop() tiles!: Tile[];
};
</script>

<style>
ul {
	list-style-type: none;
	padding: 0;
    margin: 0.1em;
}

.tiles {
	display: flex;
	flex-flow: row wrap;
}
</style>