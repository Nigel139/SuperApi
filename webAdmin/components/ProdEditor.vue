<template>
    <el-tabs>
        <el-tab-pane label="基础信息">
            <el-form :model="prod" label-width="auto">
                <el-form-item label="产品类型">
                    <el-tree-select v-model="prod.type2" :data="typeTree" :render-after-expand="true"
                        :check-strictly="true" :props="{ value: 'id', label: 'name' }" value-key="id" node-key="id" />
                </el-form-item>
                <el-form-item label="产品名称" prop="userName">
                    <el-input v-model="prod.name" placeholder="请输入产品名称" />
                </el-form-item>
                <el-form-item label="产品状态">
                    <el-select v-model="prod.status">
                        <el-option label="正常" :value="1" />
                        <el-option label="下架" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="是否热销">
                    <el-radio-group v-model="prod.isHot">
                        <el-radio :value="true" size="large">是</el-radio>
                        <el-radio :value="false" size="large">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="产品首图">
                    <ImageUnit :imgs="prod.coverImgs ?? []" width="150px" height="150px" :single="true"
                        @img-update="imgChanged"></ImageUnit>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="产品描述">
            <el-form-item label="描述内容" prop="nickName">
                <ClientOnly>
                    <WangEditor v-model="prod.description" />
                </ClientOnly>
            </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="详情&图片">
            <el-form-item label="产品图片" prop="remark">
                <ImageUnit :imgs="prod.prodImgs ?? []" width="150px" height="150px" :single="false"
                    @img-update="prodImgChanged"></ImageUnit>
            </el-form-item>
            <el-form-item label="详情图片" prop="remark">
                <ImageUnit :imgs="prod.detailImgs ?? []" width="150px" height="150px" :single="false"
                    @img-update="detailImgChanged"></ImageUnit>
            </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="规格">
            <el-form-item label="尺寸单位" prop="sizeUnit">
                <el-input v-model="prod.sizeUnit" placeholder="请输入尺寸单位" />
            </el-form-item>
            <el-form-item label="产品参数" prop="params">
                <ClientOnly>
                    <WangEditor v-model="prod.params" />
                </ClientOnly>
            </el-form-item>
            <el-form-item label="规格图片" prop="remark">
                <ImageUnit :imgs="prod.sizeImgs ?? []" width="150px" height="150px" :single="false"
                    @img-update="sizeImgChanged"></ImageUnit>
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
    import('@/components/WangEditor.vue')
)

const props = defineProps({
    prod: {
        type: Object,
        required: true
    },
    typeTree: {
        type: Array,
        required: true
    }
})

const imgChanged = async (arr: any) => {
    props.prod.coverImgs = arr;
}
const prodImgChanged = async (arr: any) => {
    props.prod.prodImgs = arr;
}
const detailImgChanged = async (arr: any) => {
    props.prod.detailImgs = arr;
}
const sizeImgChanged = async (arr: any) => {
    props.prod.sizeImgs = arr;
}
const cancelEdit = async () => {
    emit('edit-cancel')
}
const submitEdit = async () => {
    if (!props.prod.type2) return ElMessage.error('请选择产品类型');
    if (!props.prod.name) return ElMessage.error('产品名称不能为空');
    if (!props.prod.coverImgs?.length) return ElMessage.error('请最少选择一张产品首图');
    if (!props.prod.description) return ElMessage.error('产品描述不能为空');
    if (!props.prod.prodImgs?.length) return ElMessage.error('请最少选择一张产品图片');
    if (!props.prod.detailImgs?.length) return ElMessage.error('请最少选择一张详情图片');

    emit('edit-submit')
}

</script>