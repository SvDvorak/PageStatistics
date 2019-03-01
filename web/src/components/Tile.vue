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

</style>