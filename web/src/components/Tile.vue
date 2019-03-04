<template>
    <li class="tile">
        <p class="tile_header">{{ header }}</p>
        <p class="tile_body">{{ body }}</p>
    </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Tile extends Vue {
    @Prop() header!: string;
    @Prop() body!: string;
};
</script>

<style>
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