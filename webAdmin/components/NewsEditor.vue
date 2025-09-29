<template>
    <el-tabs>
        <el-tab-pane label="基础信息">
            <el-form :model="news" label-width="auto">
                <el-form-item label="新闻类型">
                    <el-select v-model="news.typeId">
                        <el-option label="请选择" :value="0" />
                        <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="新闻标题" prop="userName">
                    <el-input v-model="news.title" placeholder="请输入新闻标题" />
                </el-form-item>
                <el-form-item label="新闻状态">
                    <el-select v-model="news.status">
                        <el-option label="正常" :value="1" />
                        <el-option label="下架" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="展示时间">
                    <el-date-picker v-model="news.showDay" type="date" :editable="false" placeholder="选择日期"
                        format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="摘要 & 图片">
            <el-form-item label="新闻摘要">
                <el-input type="textarea" v-model="news.remark" :rows="5" />
            </el-form-item>
            <el-form-item label="新闻图片" prop="remark">
                <ImageUnit :imgs="news.imgs ?? []" width="150px" height="150px" :single="true" @img-update="imgChanged">
                </ImageUnit>
            </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="详情">
            <el-form-item label="新闻详情" prop="content">
                <ClientOnly>
                    <WangEditor v-model="news.content" />
                </ClientOnly>
            </el-form-item>
        </el-tab-pane>
    </el-tabs>
    <hr />
    <div class="dialog-footer" style="text-align: center; margin-top: 30px;">
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="submitEdit">确定</el-button>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['edit-cancel', 'edit-submit'])
import { defineAsyncComponent, ref } from 'vue'
const WangEditor = defineAsyncComponent(() =>
    import('@/components/WangEditor.vue') // 路径根据你的项目调整
)

const props = defineProps({
    news: {
        type: Object,
        required: true
    },
    types: {
        type: Array,
        required: true
    }
})

const imgChanged = async (arr: any) => {
    props.news.imgs = arr;
}
const cancelEdit = async () => {
    emit('edit-cancel')
}
const submitEdit = async () => {
    if (!props.news.typeId) return ElMessage.error('请选择新闻类型');
    if (!props.news.title) return ElMessage.error('新闻标题不能为空');
    if (!props.news.content) return ElMessage.error('新闻内容不能为空');
    if (!props.news.showDay) return ElMessage.error('展示日期不能为空');
    if (!props.news.remark) return ElMessage.error('新闻摘要不能为空');
    if (!props.news.imgs?.length) return ElMessage.error('请最少选择一张新闻图片');

    emit('edit-submit')
}

</script>