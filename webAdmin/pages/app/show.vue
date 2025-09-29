<template>
    <NuxtLayout name="default">
        <div class="page-container">
            <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
                <el-form-item label="应用场景">
                    <el-select v-model="queryParams.typeId" style="width: 140px;">
                        <el-option label="全部" :value="0" />
                        <el-option v-for="item in allTypeData" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="案例状态">
                    <el-select v-model="queryParams.status" placeholder="请选择" style="width: 140px;">
                        <el-option label="请选择" :value="0" />
                        <el-option label="正常" :value="1" />
                        <el-option label="下架" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQuery">查询</el-button>
                    <el-button @click="reset">重置</el-button>
                    <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>

            <el-table v-loading="loading" :data="lists.rows" :border="true">
                <el-table-column label="ID" align="center" prop="id" width="80" />
                <el-table-column label="所属场景" align="center" prop="typeName" width="100" />
                <el-table-column label="案例图片" align="center" width="100">
                    <template #default="scope">
                        <img :src="genImgUrl(scope.row.imgPath, scope.row.imgName)" @click="handleImgPreview" alt="图片"
                            style="width: 50px; height: 50px; cursor: pointer;">
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" prop="status" width="100">
                    <template #default="scope">
                        <el-text v-if="scope.row.status == 1" type="success">正常</el-text>
                        <el-text v-else type="danger">下架</el-text>
                    </template>
                </el-table-column>
                <el-table-column label="排序" align="center" width="80" prop="sort" />
                <el-table-column label="文字介绍" header-align="center" align="left" prop="remark" :show-overflow-tooltip="true" />
                <el-table-column label="创建时间" align="center" prop="createTime" width="180" :formatter="formatterTime" />
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="160">
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

        <!--新增修改-->
        <el-dialog :title="operateType == 1 ? '新增' : '编辑'" v-model="dialogVisible" v-if="dialogVisible" width="60%"
            :z-index="1000">
                <AppEditor :app="appInfo" :types="allTypeData" @edit-cancel="dialogVisible = false"
                @edit-submit="appSaved">
                </AppEditor>
        </el-dialog>
        <el-dialog v-model="previewVisible">
            <img :src="previewUrl" alt="Preview Image" style="width: 100%;" />
        </el-dialog>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';

definePageMeta({
    title: '应用案例',
})

const queryParams = reactive({
    typeId: 0,
    status: 0,
    page: 1,
    limit: 10,
})

const handleQuery = () => {
    queryParams.page = 1;
    getLists();
}

const reset = () => {
    queryParams.type = 0
    queryParams.name = ''
    queryParams.status = 0
}

const dialogVisible = ref(false);
const appInfo: any = ref(null);
const operateType = ref(1);
const handleAdd = () => {
    dialogVisible.value = true;
    operateType.value = 1;
    appInfo.value = {
        id: 0,
        typeId: 0,
        status: 1,
        sort: '1',
        remark: ''
    }
}

const handleEdit = (row: any) => {
    dialogVisible.value = true;
    operateType.value = 2;
    let newApp = JSON.parse(JSON.stringify(row));
    newApp.imgs = [{ id: newApp.imgId }]
    appInfo.value = newApp
}

const handleDelete = (row: any) => {
    ElMessageBox.confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const res: any = await appShowDelete({ id: row.id });
        if (res?.code === '0') {
            ElMessage.success('删除成功');
            getLists();
        }
    }).catch(() => { });
}

const loading = ref(false);
const lists: Ref = ref([]);
const getLists = async () => {
    loading.value = true;
    console.log('queryParams', queryParams)
    const res: any = await allAppShows(queryParams);
    if (res?.code === '0') {
        lists.value = res.shows;
    }
    loading.value = false;
}

const allTypeData = ref([]);
const getAllTypesData = async () => {
    const res: any = await allAppTypes({ name: '' });
    if (res?.code === '0') {
        allTypeData.value = res.types;
    }
}
if(import.meta.client){
    getAllTypesData();
    getLists();
}

const appSaved = async () => {
    const newApp: any = JSON.parse(JSON.stringify(appInfo.value));
    newApp.imgId = newApp.imgs[0].id;   
    delete newApp.imgs;

    let res: any = null;
    if (operateType.value == 1) res = await appShowCreate(newApp);
    else res = await appShowUpdate(newApp);
    if (res?.code === '0') {
        ElMessage.success(operateType.value == 1 ? '添加成功' : '修改成功');
        dialogVisible.value = false;
        getLists();
    }
}

const formatterTime = (data: any) => {
    return formatDate(data.createTime, 'YYYY-MM-DD HH:mm:ss');
}

const previewUrl = ref('')
const previewVisible = ref(false)
const handleImgPreview = (event: any) => {
    previewUrl.value = event.target.src
    previewVisible.value = true
}
</script>