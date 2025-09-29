<template>
    <NuxtLayout name="default">
        <div class="page-container">
            <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
                <el-form-item label="新闻类型">
                    <el-select v-model="queryParams.type" style="width: 140px;">
                        <el-option label="全部" :value="0" />
                        <el-option v-for="item in allTypeData" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="新闻状态">
                    <el-select v-model="queryParams.status" placeholder="请选择" style="width: 140px;">
                        <el-option label="全部" :value="0" />
                        <el-option label="正常" :value="1" />
                        <el-option label="下架" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="新闻标题">
                    <el-input v-model="queryParams.title" placeholder="请输入新闻标题" clearable
                        @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQuery">查询</el-button>
                    <el-button @click="reset">重置</el-button>
                    <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>

            <el-table v-loading="loading" :data="lists.rows" :border="true">
                <el-table-column label="ID" align="center" prop="id" width="140" />
                <el-table-column label="新闻类别" align="center" width="200">
                    <template #default="scope">{{ getTypeName(scope.row.typeId) }}</template>
                </el-table-column>
                <el-table-column label="标题" header-align="center" align="left" prop="title" />
                <el-table-column label="状态" align="center" prop="status" width="100">
                    <template #default="scope">
                        <el-text v-if="scope.row.status == 1" type="success">正常</el-text>
                        <el-text v-else type="danger">下架</el-text>
                    </template>
                </el-table-column>
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
            height="100%" :z-index="1000">
            <NewsEditor :news="newsInfo" :types="allTypeData" @edit-cancel="dialogVisible = false"
                @edit-submit="newsSaved">
            </NewsEditor>
        </el-dialog>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';

definePageMeta({
    title: '新闻列表',
})

const queryParams = reactive({
    type: 0,
    title: '',
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
    queryParams.title = ''
    queryParams.status = 0
}

const dialogVisible = ref(false);
const newsInfo: any = ref(null);
const operateType = ref(1);
const handleAdd = () => {
    newsInfo.value = {
        id: 0,
        typeId: 0,
        title: '',
        status: 1,
        content: '',
        imgs: []
    }
    dialogVisible.value = true;
    operateType.value = 1;
}

const handleEdit = (row: any) => {
    dialogVisible.value = true;
    operateType.value = 2;
    let newArr = JSON.parse(JSON.stringify(row));
    newArr.imgs = [{
        id: newArr.imgId,
        name: newArr.imgName,
        path: newArr.imgPath,
    }];
    newsInfo.value = newArr
}

const handleDelete = (row: any) => {
    ElMessageBox.confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const res: any = await newsDelete({ id: row.id });
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
    const res: any = await allNews(queryParams);
    if (res?.code === '0') {
        lists.value = res.news;
    }
    loading.value = false;
}

const allTypeData = ref([]);
const getAllTypesData = async () => {
    const res: any = await allNewsTypes();
    if (res?.code === '0') {
        allTypeData.value = res.types;
    }
}

if (import.meta.client) {
    getAllTypesData();
    getLists();
}

const newsSaved = async () => {
    console.log('news', newsInfo.value)
    const newNews: any = JSON.parse(JSON.stringify(newsInfo.value));
    newNews.imgId = newNews.imgs[0].id;

    let res: any = null;
    if (operateType.value == 1) res = await newsCreate(newNews);
    else res = await newsUpdate(newNews);
    if (res?.code === '0') {
        ElMessage.success(operateType.value == 1 ? '添加成功' : '修改成功');
        dialogVisible.value = false;
        getLists();
    }
}

const formatterTime = (data: any) => {
    return formatDate(data.createTime, 'YYYY-MM-DD HH:mm:ss');
}
const getTypeName = (id: number) => {
    if (id <= 0) return '-';
    return allTypeData.value.find((x: any) => x.id == id)?.name ?? '';
}
</script>