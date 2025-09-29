<template>
  <div id="container" class="amap-container"></div>
</template>

<script setup>
const props = defineProps({
    mappos: {
        type: Array,
        required: true
    },
});

onMounted(() => {
  initMap()
})

const initMap = () => {
  // 加载高德地图 JS API
  const script = document.createElement('script')
  script.src = `https://webapi.amap.com/maps?v=2.0&key=99ff14e86649724d45d3ead5d010c9d8&callback=initAMap`
  script.async = true
  window.initAMap = () => {
    // 创建地图实例
    const map = new AMap.Map('container', {
      zoom: 16, // 缩放级别
      center: props.mappos
    })

    // 添加公司标记（替换为你公司的经纬度）[116.397428, 39.90923]
    const marker = new AMap.Marker({
      position: new AMap.LngLat(props.mappos[0], props.mappos[1] ), // 公司坐标
      title: '公司地址'
    })

    map.add(marker)
  }
  document.head.appendChild(script)
}
</script>

<style scoped>
.amap-container {
  width: 100%;
  height: 500px;
}
@media (max-width: 767px) {
  .amap-container {
    width: 100%;
    height: 280px;
    }
}
</style>