<template>
    <NuxtLayout name="default">
        <div class="page-container">
             <div v-if="!editable" style="text-align: right;">
        <el-button type="primary" @click="editable = true">编辑</el-button>
        <el-divider />
    </div>
    <el-form :model="info" label-position="left" @submit.prevent>
        <el-form-item label="当前密码" label-width="80px">
            <el-input type="password" v-model="info.pwd" maxlength="50" placeholder="请输入当前密码" :disabled="!editable" />
        </el-form-item>
        <el-form-item label="新  密  码" label-width="80px">
            <el-input type="password" v-model="info.newPwd" maxlength="50" placeholder="请输入新密码" :disabled="!editable" />
        </el-form-item>
        <el-form-item label="确认密码" label-width="80px">
            <el-input type="password" v-model="info.newPwd2" maxlength="50" placeholder="请重新输入新密码" :disabled="!editable" />
        </el-form-item>
    </el-form>

    <div v-show="editable" style="text-align: center;">
        <el-button type="primary" @click="submitEdit">确定</el-button>
        <el-button @click="cancelEdit">取消</el-button>
    </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    title: '修改密码',
})

const user = ref(useStore.userStore().user);
const info = ref({})
const editable = ref(false)

const cancelEdit = async () => {
    editable.value = false
    info.value.pwd = ''
    info.value.newPwd = ''
    info.value.newPwd2 = ''
}
const submitEdit = async () => {
    
    if(!info.value.pwd) return ElMessage.error('原始密码不能为空');
    if(!info.value.newPwd) return ElMessage.error('新密码不能为空');
    if(!info.value.newPwd2) return ElMessage.error('确认新密码不能为空');
    if(info.value.newPwd != info.value.newPwd2) return ElMessage.error('两次新密码输入不一致');

    let data = {
        id: user.value.id,
        pwd: info.value.pwd,
        newPwd: info.value.newPwd,
    }
    console.log('data:', data)
    const res: any = await userResetpwd(data);
    if (res?.code === '0') {
        editable.value = false
        ElMessage.success('修改成功');
    }    
}
</script>