<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
const props = defineProps({
  name: String,
  color: String,
})

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return 'svg-icon'
})
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  font-size: 1.2em;
  fill: currentColor;
  vertical-align: middle;
}
</style>