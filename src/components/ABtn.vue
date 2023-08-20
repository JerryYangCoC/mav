<template>
    <div>
      <div class="purple-tag" :style="'--i:url(\'/img/' + img + '.png\')'" ></div>
      <div>
        <span class="p-14">
          {{ text }}
        </span>
      </div>
    </div>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        text: String,
        img: String
    }
})
export default class ABtn extends Vue {
    text!: string;
    img: string | null = 'setting';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.purple-tag {
  background-color: #ccbfd7;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 48px;
  color: white;
  border-radius: 10px;
  padding: 13px 0px 3px 0px;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  cursor: pointer;
  padding: 5px 0px;
  position: relative;
  background-image: var(--i);
}

.p-14 {
    font-size: 14px;
}
</style>
