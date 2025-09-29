<template>
    <NuxtLayout name="default">
        <div class="page-container">
            <div v-if="!editable" style="text-align: right;">
                <el-button type="primary" @click="editable = true">编辑</el-button>
                <el-divider />
            </div>
            <el-form :model="siteInfo" label-position="left" @submit.prevent>
                <el-form-item label="网站名称">
                    <el-input v-model="siteInfo.siteName" maxlength="50" placeholder="请输入网站名称" :disabled="!editable" />
                </el-form-item>
                <el-form-item label="网站标题">
                    <el-input v-model="siteInfo.siteTitle" maxlength="50" placeholder="请输入网站标题" :disabled="!editable" />
                </el-form-item>
                <el-form-item label="网站描述">
                    <el-input type="textarea" v-model="siteInfo.siteDesc" maxlength="200" :rows="3"
                        placeholder="请输入网站描述" :disabled="!editable" />
                </el-form-item>
                <el-form-item label="网站关键字">
                    <el-input type="textarea" v-model="siteInfo.siteKeyword" maxlength="200" :rows="3"
                        placeholder="请输入网站关键字" :disabled="!editable" />
                </el-form-item>
                <el-form-item label="网站作者">
                    <el-input type="textarea" v-model="siteInfo.siteAuthor" maxlength="200" :rows="3"
                        placeholder="请输入网站作者" :disabled="!editable" />
                </el-form-item>
                <el-form-item label="开始年份">
                    <el-input type="number" v-model="siteInfo.siteStartYear" placeholder="请输入网站开始年份"
                        :disabled="!editable" />
                </el-form-item>
            </el-form>

            <div v-if="editable" style="text-align: center;">
                <el-button type="primary" @click="submitForm">确定</el-button>
                <el-button @click="editable = false">取消</el-button>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
    title: '网站信息',
})

const editable = ref(false)
const siteInfo: any = ref({});

const loading = ref(false);
const getInfo = async () => {
    loading.value = true;
    const res: any = await getBaseInfo();
    if (res?.code === '0') {
        if (res.info) siteInfo.value = res.info;
        else siteInfo.value = {
            id: 0,
            siteName: '',
            siteTitle: '',
            siteDesc: '',
            siteKeyword: '',
            siteAuthor: '',
            siteStartYear: 2010,
        }
        loading.value = false;
    }
}
if (import.meta.client) {
    getInfo();
}

const submitForm = async () => {
    let data = {
        id: siteInfo.value.id,
        siteName: siteInfo.value.siteName,
        siteTitle: siteInfo.value.siteTitle,
        siteDesc: siteInfo.value.siteDesc,
        siteKeyword: siteInfo.value.siteKeyword,
        siteAuthor: siteInfo.value.siteAuthor,
        siteStartYear: siteInfo.value.siteStartYear,
    }
    const res: any = await saveSiteInfo(data);
    if (res?.code === '0') {
        ElMessage.success('更新成功');
        editable.value=false;
    }
}
</script>