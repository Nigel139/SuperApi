<template>
    <NuxtLayout name="default">
        <div class="page-container">
            <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
                <el-form-item label="产品类型">
                    <el-tree-select v-model="queryParams.type" :data="typeTreeData" :render-after-expand="false"
                        :check-strictly="true" :props="{ value: 'id', label: 'name' }" value-key="id" node-key="id"
                        style="width: 140px;" />
                </el-form-item>
                <el-form-item label="产品状态">
                    <el-select v-model="queryParams.status" placeholder="请选择" style="width: 140px;">
                        <el-option label="请选择" :value="0" />
                        <el-option label="正常" :value="1" />
                        <el-option label="下架" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="产品名称">
                    <el-input v-model="queryParams.name" placeholder="请输入产品名称" clearable
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
                <el-table-column label="产品名称" align="center" prop="name" />
                <el-table-column label="所属大类" align="center" width="200">
                    <template #default="scope">{{ getTypeName(scope.row.type1) }}</template>
                </el-table-column>
                <el-table-column label="所属小类" align="center" width="200">
                    <template #default="scope">{{ getTypeName(scope.row.type2) }}</template>
                </el-table-column>
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
            :z-index="1000">
            <ProdEditor :prod="prodInfo" :typeTree="typeTreeData2" @edit-cancel="dialogVisible = false"
                @edit-submit="prodSaved">
            </ProdEditor>
        </el-dialog>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';

definePageMeta({
    title: '产品列表',
})

const queryParams = reactive({
    type: 0,
    name: '',
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
const prodInfo: any = ref(null);
const operateType = ref(1);
const handleAdd = () => {
    dialogVisible.value = true;
    operateType.value = 1;
    prodInfo.value = {
        id: 0,
        type1: 0,
        type2: 0,
        status: 1,
        params: '',
        sizeUnit: ''
    }
}

const handleEdit = (row: any) => {
    dialogVisible.value = true;
    operateType.value = 2;
    let newProd = JSON.parse(JSON.stringify(row));
    newProd.coverImgs = [{ id: newProd.coverImg }]
    newProd.prodImgs = newProd.imgs.filter(x => x.type == 1).map(x => ({ id: x.imgId, type: 1 }));
    newProd.detailImgs = newProd.imgs.filter(x => x.type == 2).map(x => ({ id: x.imgId, type: 2 }));
    newProd.sizeImgs = newProd.imgs.filter(x => x.type == 3).map(x => ({ id: x.imgId, type: 3 }));
    delete newProd.imgs
    prodInfo.value = newProd
}

const handleDelete = (row: any) => {
    ElMessageBox.confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const res: any = await prodDelete({ id: row.id });
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
    const res: any = await prodList(queryParams);
    if (res?.code === '0') {
        lists.value = res.prods;
    }
    loading.value = false;
}

const typeTreeData = ref([]);
const typeTreeData2 = ref([]);
const typeData = ref([]);
const getProdTypeData = async () => {
    const res: any = await queryAllProdTypes({ name: '' });
    if (res?.code === '0') {
        typeData.value = res.types;
        typeTreeData.value = toTree(res.types, 'id', 'parentId');
        typeTreeData2.value = [...typeTreeData.value]
        typeTreeData.value.unshift({ id: 0, name: '全部' })
        typeTreeData2.value.unshift({ id: 0, name: '无' })
    }
}
if (import.meta.client) {
    getProdTypeData();
    getLists();
}

const prodSaved = async () => {
    const newProd: any = JSON.parse(JSON.stringify(prodInfo.value));
    newProd.coverImg = newProd.coverImgs[0].id;
    newProd.imgs = [];
    newProd.prodImgs.forEach((it) => {
        newProd.imgs.push({ imgId: it.id, type: 1 })
    })
    newProd.detailImgs.forEach((it1) => {
        newProd.imgs.push({ imgId: it1.id, type: 2 })
    })
    newProd.sizeImgs?.forEach((it2) => {
        newProd.imgs.push({ imgId: it2.id, type: 3 })
    })
    delete newProd.prodImgs;
    delete newProd.detailImgs;
    delete newProd.sizeImgs;

    let tyobj = typeData.value.find(x => x.id == prodInfo.value.type2);
    let ptyobj = typeData.value.find(x => x.id == tyobj?.parentId);
    newProd.type1 = ptyobj?.id ?? 0;

    console.log('newProd', newProd)
    let res: any = null;
    if (operateType.value == 1) res = await prodCreate(newProd);
    else res = await prodUpdate(newProd);
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
    return typeData.value.find((x: any) => x.id == id)?.name ?? '';
}
</script>