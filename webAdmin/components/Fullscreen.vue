<template>
	<svg-icon :name="isFullscreen ? 'compress' : 'expend'" @click="toggle" />
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>
