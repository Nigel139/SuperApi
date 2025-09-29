<template>
    <NuxtLayout name="default">
        <div class="page-container">
            <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
                <el-form-item label="产品名称">
                    <el-input v-model="queryParams.name" placeholder="请输入商品名称" clearable
                        @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQuery">查询</el-button>
                    <el-button @click="reset">重置</el-button>
                    <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>

            <el-table v-loading="loading" :data="lists.rows" :border="true">
                <el-table-column label="ID" align="center" prop="id" width="80" />
                <el-table-column label="产品名称" header-align="center" align="left" prop="prod">
                </el-table-column>
                <el-table-column label="保修时长" align="center" prop="val" width="100" />
                <el-table-column label="单位" align="center" prop="unit" width="100" />
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
            <el-form :model="qaInfo" label-width="auto">
                <el-form-item label="产品名称">
                    <el-input v-model="qaInfo.prod" :max-length="20" />
                </el-form-item>
                <el-form-item label="保修时长">
                    <el-input type="number" v-model="qaInfo.val" />
                </el-form-item>
                <el-form-item label="单位">
                    <el-select v-model="qaInfo.unit">
                        <el-option label="年" value="年" />
                        <el-option label="月" value="月" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center; margin-top: 30px;">
                <el-button type="primary" @click="submitForm">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';

definePageMeta({
    title: '保修产品',
})

const queryParams = reactive({
    name: '',
    page: 1,
    limit: 10,
})

const handleQuery = () => {
    queryParams.page = 1;
    getLists();
}

const reset = () => {
    queryParams.status = 0
}

const dialogVisible = ref(false);
const qaInfo: any = ref(null);
const operateType = ref(1);
const handleAdd = () => {
    dialogVisible.value = true;
    operateType.value = 1;
    qaInfo.value = {
        id: 0,
        prod: '',
        val: 3,
        unit: '年'
    }
}

const handleEdit = (row: any) => {
    dialogVisible.value = true;
    operateType.value = 2;
    qaInfo.value = JSON.parse(JSON.stringify(row));
}

const handleDelete = (row: any) => {
    ElMessageBox.confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const res: any = await qualityDelete({ id: row.id });
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
    const res: any = await qualityList(queryParams);
    if (res?.code === '0') {
        lists.value = res.qas;
    }
    loading.value = false;
}
if (import.meta.client) {
    getLists();
}

const submitForm = async () => {
    if (!qaInfo.value.prod) return ElMessage.error('产品名称不能为空');
    if (!qaInfo.value.val) return ElMessage.error('保修时长不能为空');

    if (operateType.value === 1) {
        const res: any = await qualityCreate(qaInfo.value);
        if (res?.code === '0') {
            ElMessage.success('新增成功');
            dialogVisible.value = false;
            getLists();
        }
    } else if (operateType.value === 2) {
        const res: any = await qualityUpdate(qaInfo.value);
        if (res?.code === '0') {
            ElMessage.success('更新成功');
            dialogVisible.value = false;
            getLists();
        }
    }
}

const formatterTime = (data: any) => {
    return formatDate(data.createTime, 'YYYY-MM-DD HH:mm:ss');
}
</script>