<template>
    <div v-if="!editable" style="text-align: right;">
        <el-button type="primary" @click="editable = true">编辑</el-button>
        <el-divider />
    </div>
    <el-form label-position="left" :inline="true" @submit.prevent>
        <el-form-item label="客服QQ">
            <ImageUnit :imgs="info.qqImgs ?? []" width="150px" height="150px" :single="true" :editable="editable"
                    @img-update="qqChanged"></ImageUnit>
        </el-form-item>
        <el-form-item label="客服微信">
            <ImageUnit :imgs="info.wechatImgs ?? []" width="150px" height="150px" :single="true" :editable="editable"
                    @img-update="wechatChanged"></ImageUnit>
        </el-form-item>
    </el-form>

    <div v-show="editable" style="text-align: center;">
        <el-button type="primary" @click="submitEdit">确定</el-button>
        <el-button @click="cancelEdit">取消</el-button>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['edit-cancel', 'edit-submit'])
const props = defineProps({
    info: {
        type: Object,
        required: true
    },
})

const editable = ref(false)

const qqChanged = async (arr: any) => {
    props.info.qqImgs = arr;
    console.log('qq', props.info.qqImgs)
}
const wechatChanged = async (arr: any) => {
    props.info.wechatImgs = arr;
}
const cancelEdit = async () => {
    editable.value = false
    emit('edit-cancel')
}
const submitEdit = async () => {    
    let data = {
        id: props.info.id,
        qq: props.info.qqImgs[0]?.id??0,
        wechat: props.info?.wechatImgs[0]?.id??0,
    }
    
    const res: any = await saveServiceInfo(data);
    if (res?.code === '0') {
        editable.value = false
        ElMessage.success('更新成功');
        emit('edit-submit')
    }    
}
</script>