<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="src" class="modal-overlay">
                <div class="video-container start-50 top-50 translate-middle position-absolute"
                     :class="{halfh:(!isVideo)}">
                    <div class="video-header text-end">
                        <img @click="closeModal" src="/images/close.png" width="25" height="25">
                    </div>

                    <video v-if="isVideo" class="w-100 d-block h-100" :src="src" preload="auto" controls autoplay="false"></video>
                    <iframe v-else class="w-100 d-block h-100" :src="src"></iframe>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    src: {
        type: String,
        required: false,
    },
});

const emit = defineEmits(['close']);

// 关闭模态框
const closeModal = () => {
    emit('close');
};

const isVideo = computed(()=>{
    return props.src?.endsWith('.mp4') || false
})
</script>

<style scoped>
/* 遮罩层样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999999;
}

/* 模态框容器 */
.video-container {
    width: 900px;
}
.halfh{
    height: 55% !important;
}
.video-header {
    margin-bottom: 10px;
}

/* 响应式设计 */
@media (max-width: 767px) {
    .video-container {
        width: 100%;
        padding: 0 15px;
        height: auto;
    }
}
</style>