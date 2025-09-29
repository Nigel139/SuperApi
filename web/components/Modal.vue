<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="show" class="modal-overlay" @click.self="closeModal">
                <div class="modal-container">
                    <div class="modal-header">
                        <h2 class="modal-title">{{ title }}</h2>
                        <button class="close-button" @click="closeModal">×</button>
                    </div>

                    <div class="modal-body">
                        <slot name="content"></slot>
                    </div>

                    <div v-if="showFooter" class="modal-footer">
                        <slot name="footer">
                            <button class="btn secondary" @click="closeModal">取消</button>
                            <button class="btn primary" @click="confirmAction">确认</button>
                        </slot>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    showFooter: {
        type: Boolean,
        required: false,
        default: false
    },
    title: {
        type: String,
        default: '温馨提示'
    }
});

const emit = defineEmits(['close', 'confirm','on-open']);

// 关闭模态框
const closeModal = () => {
    emit('close');
};

// 确认操作
const confirmAction = () => {
    emit('confirm');
};

// 处理ESC按键关闭
const handleKeydown = (e) => {
    if (e.key === 'Escape' && props.show) {
        closeModal();
    }
};

// 添加/移除事件监听器
onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    emit('on-open');
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
/* 遮罩层样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(3px);
}

/* 模态框容器 */
.modal-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 99999;
}

/* 模态框头部 */
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #004e98;
    padding: 20px 15px;
}

.modal-title {
    margin: 0;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    flex:1;
}

.close-button {
    color: #fff;
    font-size: 21px;
    font-weight: bold;
    line-height: 1;
    background: transparent;
    border: none;
    cursor: pointer;
}

/* 模态框主体内容 */
.modal-body {
    padding: 25px;
    flex-grow: 1;
    overflow-y: auto;
    color: #333;
    line-height: 1.6;
}

/* 模态框底部 */
.modal-footer {
    padding: 15px 20px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
}

.btn {
    padding: 10px 20px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
}

.btn.primary {
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
}

.btn.secondary {
    background-color: #e9ecef;
    color: #495057;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn:active {
    transform: translateY(0);
}

/* 动画效果 */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    transform: translateY(-50px);
    opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .modal-container {
        width: 95%;
    }

    .modal-header {
        padding: 15px;
    }

    .modal-title {
        font-size: 1.3rem;
    }

    .modal-body {
        padding: 20px;
    }

    .modal-footer {
        padding: 10px 15px;
        flex-wrap: wrap;
    }

    .btn {
        padding: 8px 16px;
        font-size: 0.9rem;
    }
}
</style>