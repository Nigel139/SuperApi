<template>
    <NuxtLayout name="default">
        <div class="page-container">
            <el-row>
                <el-col :span="24" :xs="24">
                    <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
                        <el-form-item label="图片标签">
                            <el-select v-model="queryParams.tagId" placeholder="请选择" @keyup.enter.native="handleQuery"
                                style="width: 140px;">
                                <el-option label="全部" :value="0" />
                                <el-option v-for="t in allTags" :label="t.name" :value="t.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="图片别名">
                            <el-input v-model="queryParams.alias" placeholder="请输入图片别名" clearable
                                @keyup.enter.native="handleQuery" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleQuery">查询</el-button>
                            <el-button @click="reset">重置</el-button>
                            <el-button type="primary" plain :icon="UploadFilled" @click="handleUpload">上传</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

            <el-table v-loading="loading" :data="lists.rows" :border="true" row-key="id">
                <el-table-column label="图片" align="center" prop="icon" width="100">
                    <template #default="scope">
                        <img :src="genImgUrl(scope.row.path, scope.row.name)" @click="handleImgPreview" alt="图片"
                            style="width: 50px; height: 50px; cursor: pointer;">
                    </template>
                </el-table-column>
                <!-- <el-table-column label="文件名" prop="name" /> -->
                <el-table-column label="标签" prop="tag.name" width="100" />
                <el-table-column label="别名" prop="alias" width="100" />
                <el-table-column label="文件夹" prop="path" width="100" />
                <el-table-column label="图片URL" header-align="center" align="left">
                    <template #default="scope">
                        {{ genImgUrl(scope.row.path, scope.row.name) }}
                    </template>
                </el-table-column>
                <!-- <el-table-column label="使用次数" align="center" prop="used" width="100" /> -->
                <el-table-column label="上传时间" align="center" prop="createTime" width="160" :formatter="formatterTime" />
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="140">
                    <template #default="scope">
                        <el-button type="success" size="small" @click="handleEdit(scope.row)">修改</el-button>
                        <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-show="lists.total > 0" v-model:current-page="queryParams.page"
                v-model:page-size="queryParams.limit" :total="lists.total??0" :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper" @update:page-size="handleSizeChange"
                @update:current-page="handleCurrentChange"></el-pagination>
        </div>

        <!-- 新增图片 -->
        <el-dialog v-model="upDialogVisible" title="上传图片" width="50%">
            <el-form :model="upInfo" label-width="80px">
                <el-form-item label="图片别名">
                    <el-input v-model="upInfo.alias" />
                </el-form-item>
                <el-form-item label="图片标签">
                    <el-select v-model="upInfo.tagId" placeholder="请选择">
                        <el-option label="无" :value="0" />
                        <el-option v-for="t in allTags" :label="t.name" :value="t.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="上传图片">
                    <el-upload :action="uploadUrl" ref="uploadRef" list-type="picture-card" :file-list="upfileList"
                        :auto-upload="false" :multiple="true" name="file" :data="uploadPath"
                        :on-preview="handlePicPreview" :on-success="handleUpSuccess" :on-change="handleFileChanged"
                        :on-remove="handleFileRemoved" :on-error="handleUpError">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="upDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitUpload">上传</el-button>
            </template>
        </el-dialog>
        <el-dialog v-model="previewVisible">
            <img :src="previewUrl" alt="Preview Image" style="width: 100%;" />
        </el-dialog>

        <!--编辑-->
        <el-dialog title="编辑" v-model="dialogVisible" width="460px">
            <el-form ref="userForm" :model="imgInfo" label-width="auto">
                <el-form-item label="文件名" prop="name">
                    <el-input v-model="imgInfo.name" disabled />
                </el-form-item>
                <el-form-item label="图片别名">
                    <el-input v-model="imgInfo.alias" />
                </el-form-item>
                <el-form-item label="图片标签">
                    <el-select v-model="imgInfo.tagId2" placeholder="请选择">
                        <el-option label="无" :value="0" />
                        <el-option v-for="t in allTags" :label="t.name" :value="t.id" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center; margin-top: 30px;">
                <el-button type="primary" @click="submitEdit">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </NuxtLayout>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { Plus } from '@element-plus/icons-vue';
import { UploadFilled } from '@element-plus/icons-vue';
import type { UploadProps, UploadInstance } from 'element-plus'

const uploadUrl = base_url + 'FixedApi/Upload';

interface UploadSucItem {
    fn1: string;
    fn2: string;
}
definePageMeta({
    title: '图片列表',
})

const allTags: Ref = ref([]);
const getAllTags = async () => {
    const res: any = await imgtagAll();
    if (res?.code === '0') {
        allTags.value = res.tags;
    }
}
getAllTags();

const queryParams = reactive({
    alias: '',
    tagId: 0,
    page: 1,
    limit: 10,
})

const handleQuery = () => {
    queryParams.page = 1;
    getLists();
}

const reset = () => {
    queryParams.alias = ''
    queryParams.tagId = 0
}

const upDialogVisible = ref(false);
const uploadPath = computed(() => { return { path: dayjs().format('YYYYMMDD') } });
const upInfo: any = ref({})
const upfileList = ref([]);
const upSucList = ref<UploadSucItem[]>([]);
const upCompletedCnt = ref(0);
const uploadRef = ref<UploadInstance>();

const handleUpload = () => {
    upDialogVisible.value = true;
    upInfo.value = {
        tagId: 0,
    }
    upfileList.value = [];
    upSucList.value=[];
}
const handleFileChanged = (file: any, fileList: any) => {
    upfileList.value = fileList;
}
const handleFileRemoved = (file: any, fileList: any) => {
    upfileList.value = fileList;
}
const submitUpload = () => {
    if (upfileList.value.length == 0) ElMessage.error('请先选择需要上传的文件');
    else uploadRef.value!.submit()
}
const handleUpSuccess = (response: any, file: any, fileList: any) => {
    upCompletedCnt.value += 1;
    if (response.status === 0) {
        upSucList.value.push({
            fn1: response.data.resp.fnOrigin,
            fn2: response.data.resp.fnNew,
        });
    } else {
        ElMessage.error(response.message);
    }
    if (upCompletedCnt.value == upfileList.value.length) upCompleted();
}
const handleUpError = (err: any, file: any, fileList: any) => {
    upCompletedCnt.value += 1;
    if (upCompletedCnt.value == upfileList.value.length) upCompleted();
    console.log('文件上传失败:', err);
}
const userStore = useStore.userStore();
const upCompleted = () => {
    let imgArr = [];
    const path = uploadPath.value.path;
    const uid = userStore.user.id
    for (const f of upSucList.value) {
        imgArr.push({
            id: 0,
            name: f.fn2,
            alias: upInfo.value.alias,
            tagId: upInfo.value.tagId,
            path: path,
            used: 0,
            createBy: uid,
        })
    }
    imgCreate({ tagId: upInfo.value.tagId, imgs: imgArr });
    let sucCnt = upSucList.value.length;
    ElMessage.success(`成功上传${sucCnt}个文件`);
    upDialogVisible.value = false;
    getLists();
    upCompletedCnt.value=0;
}

const previewVisible = ref(false);
const previewUrl = ref('');
const handlePicPreview: UploadProps['onPreview'] = (uploadFile: any) => {
    previewUrl.value = uploadFile.url!
    previewVisible.value = true
}

const dialogVisible = ref(false);
const imgInfo: any = ref(null);
const handleEdit = (row: any) => {
    dialogVisible.value = true;
    //imgInfo.value = JSON.parse(JSON.stringify(row));
    imgInfo.value = {
        id: row.id,
        name: row.name,
        alias: row.alias,
        tagId1: row.tagId,
        tagId2: row.tagId,
    }
}

const submitEdit = async () => {
    let upData = imgInfo.value;
    delete upData.name;
    const res: any = await imgUpdate(upData);
    if (res?.code === '0') {
        ElMessage.success('更新成功');
        dialogVisible.value = false;
        getLists();
    }
}

const handleDelete = (row: any) => {
    ElMessageBox.confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const res: any = await imgDelete({ id: row.id });
        if (res?.code === '0') {
            ElMessage.success('删除成功');
            getLists();
        }
    }).catch(() => { });
}

const loading = ref(false);
const lists: Ref = ref([]);
const getLists = async () => {
    loading.value = true
    const res: any = await imgList(queryParams);
    if (res?.code === '0') {
        lists.value = res.imgs;
    }
    loading.value = false;
}

if (import.meta.client) {
    getLists();
}

const genImgUrl = (path: String, name: String) => {
    return `${base_url}${upload_path}${path}/${name}`
}
const handleImgPreview = (event: any) => {
    previewUrl.value = event.target.src
    previewVisible.value = true
}
const handleSizeChange = () => {
    getLists();
}
const handleCurrentChange = () => {
    getLists();
}

const formatterTime = (data: any) => {
    return formatDate(data.createTime, 'YYYY-MM-DD HH:mm:ss');
}
</script>

<style lang="less" scoped>
.icons-box {
    .lists {
        margin-top: 20px;
        height: 200px;
        overflow-y: auto;
        padding-right: 10px;
    }
}
</style>