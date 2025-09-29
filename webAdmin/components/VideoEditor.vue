<template>
    <el-tabs>
        <el-tab-pane label="基础信息">
            <el-form :model="video" label-width="auto">
                <el-form-item label="视频位置">
                    <el-radio-group v-model="video.isTop">
                        <el-radio :value="1" size="large">页面顶部</el-radio>
                        <el-radio :value="2" size="large">页面内容</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="视频类型" v-if="video.isTop != 1">
                    <el-select v-model="video.typeId">
                        <el-option label="请选择" :value="0" />
                        <el-option v-for="t in types" :label="t.name" :value="t.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="视频状态">
                    <el-select v-model="video.status">
                        <el-option label="正常" :value="1" />
                        <el-option label="下架" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="视频名称">
                    <el-input v-model="video.name" />
                </el-form-item>
                <el-form-item label="视频地址">
                    <el-input v-model="video.url" />
                </el-form-item>
                <el-form-item label="展示排序">
                    <el-input v-model="video.index" />
                </el-form-item>
                <el-form-item label="展示时间">
                    <el-date-picker v-model="video.showDay" type="date" :editable="false" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="图片 & 描述">
            <el-form-item label="内容描述">
                <el-input type="textarea" v-model="video.remark" :rows="5" />
            </el-form-item>
            <el-form-item label="封面图片">
                <ImageUnit :imgs="video.imgs ?? []" width="150px" height="150px" :single="true"
                    @img-update="imgChanged"></ImageUnit>
            </el-form-item>
        </el-tab-pane>
    </el-tabs>
    <div class="dialog-footer" style="text-align: center; margin-top: 30px;">
        <el-button @click="emit('edit-cancel')">取消</el-button>
        <el-button type="primary" @click="submitAdd">提交</el-button>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['edit-cancel', 'edit-submit'])
const props = defineProps({
    video: {
        type: Object,
        required: true
    },
    types: {
        type: Array,
        required: true
    }
})

const imgChanged = async (arr: any) => {
    props.video.imgs = arr;
}

const submitAdd = async () => {
    if (props.video.isTop!=1 && !props.video.typeId) return ElMessage.error('请选择视频类型');
    if (!props.video.name) return ElMessage.error('请填写视频名称');
    if (props.video.imgs.length == 0) return ElMessage.error('请选择封面图片');
    if (!props.video.url) return ElMessage.error('请填写视频地址');

    emit('edit-submit');
}
</script>