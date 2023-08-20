<template>
    <div>

    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class CreateView extends Vue {

  /**
   * 初始化
   */
   created(): void {
    console.log('new create')
  }
}
</script>
<style scoped lang="scss">

</style>