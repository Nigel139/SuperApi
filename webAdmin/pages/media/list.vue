<template>
    <NuxtLayout name="default">
        <div class="page-container">
            <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
                <el-form-item label="视频类型">
                    <el-select v-model="queryParams.type" style="width: 140px;">
                        <el-option label="全部" :value="0" />
                        <el-option v-for="item in allTypeData" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="视频状态">
                    <el-select v-model="queryParams.status" style="width: 140px;">
                        <el-option label="请选择" :value="0" />
                        <el-option label="正常" :value="1" />
                        <el-option label="下架" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="视频名称">
                    <el-input v-model="queryParams.name" placeholder="请输入视频名称" clearable
                        @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQuery">查询</el-button>
                    <el-button @click="reset">重置</el-button>
                    <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>

            <el-table v-loading="loading" :data="lists.rows" :border="true" row-key="id">
                <el-table-column label="名称" header-align="center" align="left" prop="name" width="200" />
                <el-table-column label="类型" width="100">
                    <template #default="scope">
                        {{ genTypeName(scope.row.typeName) }}
                    </template>
                </el-table-column>
                <el-table-column label="图片地址" header-align="center" align="left" prop="url" />
                <el-table-column label="状态" align="center" prop="status" width="100">
                    <template #default="scope">
                        <el-text v-if="scope.row.status == 1" type="success">正常</el-text>
                        <el-text v-else type="danger">下架</el-text>
                    </template>
                </el-table-column>
                <el-table-column label="排序" align="center" prop="index" width="80" />
                <el-table-column label="封面图" align="center" prop="icon" width="100">
                    <template #default="scope">
                        <img :src="genImgUrl(scope.row.imgPath, scope.row.imgName)" @click="handleImgPreview" alt="图片"
                            style="width: 50px; height: 50px; cursor: pointer;">
                    </template>
                </el-table-column>
                <el-table-column label="上传时间" align="center" prop="createTime" width="160" :formatter="formatterTime" />
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="140">
                    <template #default="scope">
                        <el-button type="success" size="small" @click="handleEdit(scope.row)">修改</el-button>
                        <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-show="lists.total > 0" v-model:current-page="queryParams.page"
                v-model:page-size="queryParams.limit" :total="lists.total ?? 0" :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper" @update:page-size="getLists"
                @update:current-page="getLists"></el-pagination>
        </div>

        <!-- 编辑视频 -->
        <el-dialog :title="operateType == 1 ? '新增视频' : '编辑视频'" v-model="editDialogVisible" v-if="editDialogVisible"
            width="60%" :z-index="1000">
            <VideoEditor :video="videoInfo" :types="allTypeData" @edit-cancel="editDialogVisible = false"
                @edit-submit="videoSaved">
            </VideoEditor>
        </el-dialog>
        <el-dialog v-model="previewVisible">
            <img :src="previewUrl" alt="Preview Image" style="width: 100%;" />
        </el-dialog>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';

definePageMeta({
    title: '视频列表',
})

const allTypeData = ref([]);
const getAllTypesData = async () => {
    const res: any = await allVideoTypes();
    if (res?.code === '0') {
        allTypeData.value = res.types;
    }
}
getAllTypesData();

const queryParams = reactive({
    name: '',
    type: 0,
    status: 0,
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

const editDialogVisible = ref(false);
const videoInfo: any = ref(null);
const operateType = ref(1);
const handleAdd = () => {
    editDialogVisible.value = true;
    operateType.value = 1;
    videoInfo.value = {
        id: 0,
        typeId: 0,
        name: '',
        status: 1,
        url: '',
        index: 0,
        coverImg: 0,
        isTop: 2,
        showDay: '',
        remark: ''
    }
}

const handleEdit = (row: any) => {
    editDialogVisible.value = true;
    operateType.value = 2;
    let newArr = JSON.parse(JSON.stringify(row));
    newArr.imgs = [{ id: newArr.coverImg }];
    delete newArr.coverImg
    videoInfo.value = newArr
}

const handleDelete = (row: any) => {
    ElMessageBox.confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const res: any = await videoDelete({ id: row.id });
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
    const res: any = await allVideos(queryParams);
    if (res?.code === '0') {
        lists.value = res.medias;
    }
    loading.value = false;
}

if (import.meta.client) {
    getLists();
}

const genImgUrl = (path: String, name: String) => {
    return `${base_url}${upload_path}${path}/${name}`
}

const previewUrl = ref('')
const previewVisible = ref(false)
const handleImgPreview = (event: any) => {
    previewUrl.value = event.target.src
    previewVisible.value = true
}


const videoSaved = async () => {
    const newVideo: any = JSON.parse(JSON.stringify(videoInfo.value));
    newVideo.coverImg = newVideo.imgs[0].id;
    delete newVideo.imgs;

    //console.log('video', newVideo)
    let res: any = null;
    if (operateType.value == 1) res = await videoCreate(newVideo);
    else res = await videoUpdate(newVideo);
    if (res?.code === '0') {
        ElMessage.success(operateType.value == 1 ? '添加成功' : '修改成功');
        editDialogVisible.value = false;
        getLists();
    }
}

const formatterTime = (data: any) => {
    return formatDate(data.createTime, 'YYYY-MM-DD HH:mm:ss');
}
const genTypeName = (tn: string) => {
    if (tn) return tn;
    return '顶部展示';
}
</script>

<style lang="less" scoped></style>