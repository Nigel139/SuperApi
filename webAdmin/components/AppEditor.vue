<template>
    <el-tabs>
        <el-tab-pane label="基础信息">
            <el-form :model="app" label-width="auto">
                <el-form-item label="案例场景">
                    <el-select v-model="app.typeId">
                        <el-option label="请选择" :value="0" />
                        <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="案例排序">
                    <el-input type="number" v-model="app.sort" placeholder="请输入展示顺序" />
                </el-form-item>
                <el-form-item label="案例状态">
                    <el-select v-model="app.status">
                        <el-option label="正常" :value="1" />
                        <el-option label="下架" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="案例图片" prop="remark">
                    <ImageUnit :imgs="app.imgs ?? []" width="150px" height="150px" :single="true"
                        @img-update="imgChanged">
                    </ImageUnit>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="文字介绍">
            <el-form-item label="介绍标题">
                    <el-input v-model.trim="app.title" maxlength="20" placeholder="请输入介绍标题" />
                </el-form-item>
            <el-form-item label="介绍内容">
                <el-input type="textarea" v-model="app.remark" :rows="6" />
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

const props = defineProps({
    app: {
        type: Object,
        required: true
    },
    types: {
        type: Array,
        required: true
    }
})

const imgChanged = async (arr: any) => {
    props.app.imgs = arr;
}
const cancelEdit = async () => {
    emit('edit-cancel')
}
const submitEdit = async () => {
    if (!props.app.typeId) return ElMessage.error('请选择案例场景');
    if (!props.app.sort) return ElMessage.error('案例展示顺序不能为空');
    if (!props.app.remark) return ElMessage.error('案例介绍内容不能为空');
    if (!props.app.imgs?.length) return ElMessage.error('请选择案例图片');

    emit('edit-submit')
}

</script>