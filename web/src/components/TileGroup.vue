<template>
    
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class TileGroup extends Vue {
    @Prop() title: string;
    @Prop() tiles: Tile[];
};
</script>
