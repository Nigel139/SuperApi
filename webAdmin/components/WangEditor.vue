<!-- components/WangEditor.vue -->
<template>
    <div style="border: 1px solid #ccc;">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" mode="default"
            style="border-bottom: 1px solid #ccc" />
        <Editor :defaultConfig="editorConfig" mode="default" v-model="htmlVal"
             @onCreated="handleCreated"
            @onChange="handleChange" />
    </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const htmlVal = defineModel()

const props = defineProps({
    height: {
        type: String,
        required: false,
    }
})

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
const toolbarConfig = {
     excludeKeys: [
        'uploadImage',       // 隐藏图片上传按钮
        'uploadVideo',       // 隐藏视频上传按钮
        'uploadAttachment',   // 隐藏附件上传按钮
        'fullScreen'
    ]
};
const editorConfig = {
};

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;

    editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor: any) => {
    editorRef.value = editor; // 记录 editor 实例
};
const handleChange = (editor: any) => {
    //emit('text-changed', editor.getHtml())
};
</script>

<style scoped lang="css">
:deep(.w-e-text-container) {
  min-height: 300px !important; /* 固定高度 */
  max-height: 600px !important; /* 或者使用最大高度 */
  overflow-y: auto !important; /* 关键：必须设置，才能出滚动条 */
}
</style>