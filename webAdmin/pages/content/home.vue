<template>
    <NuxtLayout name="default">
        <div class="page-container">
            <el-tabs>
                <el-tab-pane label="Banner图片">
                    <el-row justify="end" style="margin-bottom: 5px;">
                        <el-button type="primary" plain :icon="Plus" @click="handleEditBanner(null)">新增图片</el-button>
                        <el-button type="success" plain :icon="Refresh" @click="queryBanner">刷新</el-button>
                    </el-row>
                    <div class="tab-content">
                        <el-table v-loading="loading" :data="bannerData" :border="true" row-key="imgId">
                            <el-table-column label="文件名" prop="name" />
                            <el-table-column label="标签" prop="tagId" width="100">
                                <template #default="scope">
                                    {{ getTagName(scope.row.tagId) }}
                                </template>
                            </el-table-column>
                            <el-table-column label="别名" prop="alias" width="100" />
                            <el-table-column label="文件夹" prop="path" width="100" />
                            <el-table-column label="图片" align="center" prop="icon" width="100">
                                <template #default="scope">
                                    <img :src="genImgUrl(scope.row.path, scope.row.name)" @click="handleImgPreview"
                                        alt="图片" style="width: 50px; height: 50px; cursor: pointer;">
                                </template>
                            </el-table-column>
                            <el-table-column label="链接地址" align="center" prop="link" width="300" />
                            <el-table-column label="操作" align="center" class-name="small-padding fixed-width"
                                width="140">
                                <template #default="scope">
                                    <el-button type="success" size="small" @click="handleEditBanner(scope.row)">修改</el-button>
                                    <el-button type="danger" size="small"
                                        @click="deleteBanner(scope.row.refId)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="产品数据">
                    <el-card>
                        <template #header><span>产品类型1</span></template>
                        <el-form :model="bannerInfo" label-width="auto">
                            <el-row :span="20">
                                <el-col :span="12" :xs="24">
                                    <el-form-item label="类型图标">
                                        <div class="el-upload el-upload--picture-card" style="width: 100px; height: 100px;">
                                            <i class="el-icon" v-if="true">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"></path></svg>
                                            </i>
                                            <img v-else :src="genImgUrl('1','2')"
                                                        style="width: 140px; height: 140px; cursor: pointer;">
                                        </div>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" :xs="24">
                                    <el-form-item label="代表图片">
                                        <div class="el-upload el-upload--picture-card" style="width: 100px; height: 100px;">
                                            <i class="el-icon" v-if="true">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"></path></svg>
                                            </i>
                                            <img v-else :src="genImgUrl('1','2')"
                                                        style="width: 140px; height: 140px; cursor: pointer;">
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="类型标题">
                                <el-input v-model="bannerInfo" />
                            </el-form-item>
                            <el-form-item label="类型描述">
                                <el-input type="textarea" v-model="bannerInfo" />
                            </el-form-item>
                        </el-form>
                    </el-card>
                    <el-card style="margin-top: 20px;">
                        <template #header><span>产品类型2</span></template>
                        <p class="text item">123</p>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="应用案例">
                    <div class="tab-content">
                        <p>角色和权限设置</p>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="关于我们">
                    <div class="tab-content">
                        <p>定时任务管理（已禁用）</p>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="服务">
                    <div class="tab-content">
                        <p>定时任务管理（已禁用）</p>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--选择图片-->
        <el-dialog v-model="imgSelector" title="图片选择器">
            <ImageBox ref="imgBoxRef" :single="imgSelectSingle" @img-cancel="imgSelector=false" @img-sure="imgSubmited"></ImageBox>
        </el-dialog>
        <!--添加Banner图片-->
        <el-dialog :title="bannerEditType==1?'添加Banner图片':'编辑链接地址'" v-model="addImgVisible" width="460px">
            <el-form ref="userForm" :model="bannerInfo" label-width="auto">
                <el-form-item label="图片预览">
                    <div class="el-upload el-upload--picture-card" @click="selectImage(1)">
                        <i data-v-cd0fc9b6="" class="el-icon" v-if="!bannerInfo.name && bannerEditType==1">
                            <svg data-v-cd0fc9b6="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"></path></svg>
                        </i>
                        <img v-else :src="genImgUrl(bannerInfo.path, bannerInfo.name)"
                                    style="width: 140px; height: 140px; cursor: pointer;">
                    </div>
                </el-form-item>
                <el-form-item label="链接地址">
                    <el-input v-model="bannerInfo.url" />
                </el-form-item>
            </el-form>
            <el-row style="margin-top: 30px; justify-content: flex-end;">
                <el-button @click="addImgVisible=false">取消</el-button>
                <el-button type="primary" @click="addBanner">确定</el-button>
            </el-row>
        </el-dialog>
        <!--图片预览-->
        <el-dialog v-model="previewVisible">
            <img :src="previewUrl" alt="Preview Image" style="width: 100%;" />
        </el-dialog>
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus';
import { Plus, Refresh } from '@element-plus/icons-vue';
//import { userStore } from '~/composables/store/user';

definePageMeta({
    title: '官网首页',
})
const loading = ref(false);
const userStore = useStore.userStore();
const imgTags = userStore.imgTags;
/***********************图片选择器 Start**************************** */
const imgSelectType = ref(1);
const imgSelector = ref(false);
const imgBoxRef = ref(null);

const imgSelectSingle = computed(()=>{
    if(imgSelectType.value==1) return true
    else return false
});
const selectImage = async(type: any) => {
    if(bannerEditType.value!=1) return;
    imgSelectType.value = type;
    imgSelector.value = true;
}
const imgSubmited = async(selection: any) => {
    imgSelector.value = false;
    console.log(1, selection)
    if(imgSelectType.value==1){
        bannerInfo.value.id=selection[0].id;
        bannerInfo.value.name=selection[0].name;
        bannerInfo.value.path=selection[0].path;
    }
}

/***********************图片选择器 End**************************** */

/***********************Banner图 Start**************************** */
const bannerEditType: any = ref(1)
const bannerInfo: any = ref(null)
const addImgVisible = ref(false)
const handleEditBanner = async(row: any) => {
    if(row){
        bannerEditType.value = 2;
        bannerInfo.value = {
            id: row.refId,
            name: row.name,
            path: row.path,
            url: row.link
        }
    }else{        
        bannerEditType.value = 1;
        bannerInfo.value = {
            id: 0,
            name: '',
            path: '',
            url: ''
        }
    }
    addImgVisible.value = true;
}
const addBanner = async ()=>{
    if(bannerEditType.value==1){
        if(!bannerInfo.value.name) return ElMessage.error("Banner图片不能为空");
        let newData = {
            imgId: bannerInfo.value.id,
            page: 1,
            link: bannerInfo.value.url
        }
        const res: any = await bannerCreate(newData);
        if (res?.code === '0') {
            ElMessage.success('添加成功');
            addImgVisible.value = false;
            queryBanner();
        }
    }else{
        let newData = {
            id: bannerInfo.value.id,
            link: bannerInfo.value.url
        }
        const res: any = await imgRefUpdate(newData);
        if (res?.code === '0') {
            ElMessage.success('修改成功');
            addImgVisible.value = false;
            queryBanner();
        }
    }
}
const bannerData: Ref = ref([]);
const queryBanner = async()=>{
    loading.value = true
    const res: any = await bannerList();
    if (res?.code === '0') {
        bannerData.value = res.banners;
    }
    loading.value = false;
}
const deleteBanner = async(id: any)=>{
    ElMessageBox.confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const res: any = await bannerDelete({ id: id });
        if (res?.code === '0') {
            ElMessage.success('删除成功');
            queryBanner();
        }
    }).catch(() => { });
}
watch(addImgVisible, (newVal, oldVal) => {
    if(!newVal && imgBoxRef.value) imgBoxRef.value.clear();
})
/***********************Banner图 End****************************** */


const previewVisible = ref(false);
const previewUrl = ref('');

const getTagName = (id:any)=>{
    return imgTags.find(x=>x.id==id)?.name;
}

if (import.meta.client) {
    queryBanner();
}

const genImgUrl = (path: String, name: String) => {
    return `${base_url}${upload_path}${path}/${name}`
}
const handleImgPreview = (event: any) => {
    previewUrl.value = event.target.src
    previewVisible.value = true
}

const formatterTime = (data: any) => {
    return formatDate(data.createTime, 'YYYY-MM-DD HH:mm:ss');
}
</script>

<style lang="less" scoped>
.section {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    flex: 1;
    min-width: 300px;
    margin-bottom: 20px;
}

.section-title {
    font-size: 18px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #409EFF;
    color: #409EFF;
    display: flex;
    align-items: center;
}
</style>