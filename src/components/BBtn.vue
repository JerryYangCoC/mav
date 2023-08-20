<template>
    <div>

    </div>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        text: String
    }
})
export default class BBtn extends Vue {
    text: string | null = '';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
