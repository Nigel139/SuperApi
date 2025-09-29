<template>
    <div v-if="!editable" style="text-align: right;">
        <el-button type="primary" @click="editable = true">编辑</el-button>
        <el-divider />
    </div>
    <el-form :model="info" label-position="left" @submit.prevent>
        <el-form-item label="联系电话">
            <el-input v-model="info.phone" maxlength="50" placeholder="请输入联系电话" :disabled="!editable" />
        </el-form-item>
        <el-form-item label="联系传真">
            <el-input v-model="info.fax" maxlength="50" placeholder="请输入联系传真" :disabled="!editable" />
        </el-form-item>
        <el-form-item label="联系邮箱">
            <el-input v-model="info.email" maxlength="50" placeholder="请输入联系联系" :disabled="!editable" />
        </el-form-item>
        <el-form-item label="投诉邮箱">
            <el-input v-model="info.email2" maxlength="50" placeholder="请输入投诉邮箱" :disabled="!editable" />
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

const cancelEdit = async () => {
    editable.value = false
    emit('edit-cancel')
}
const submitEdit = async () => {
    let data = {
        id: props.info.id,
        phone: props.info.phone,
        fax: props.info.fax,
        email: props.info.email,
        email2: props.info.email2,
    }
    const res: any = await saveContacterInfo(data);
    if (res?.code === '0') {
        editable.value = false
        ElMessage.success('更新成功');
        emit('edit-submit')
    }    
}
</script>