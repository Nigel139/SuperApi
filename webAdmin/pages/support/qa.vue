<template>
    <NuxtLayout name="default">
        <div class="page-container">
            <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
                <el-form-item label="状态">
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
                <el-table-column label="状态" align="center" prop="status" width="100">
                    <template #default="scope">
                        <el-text v-if="scope.row.status == 1" type="success">正常</el-text>
                        <el-text v-else type="danger">下架</el-text>
                    </template>
                </el-table-column>
                <el-table-column label="问题" header-align="center" align="left" prop="question"
                    :show-overflow-tooltip="true" />
                <el-table-column label="解答" header-align="center" align="left" prop="answer"
                    :show-overflow-tooltip="true" />
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
                <el-form-item label="上级类型" prop="parentId">
                    <el-select v-model="qaInfo.status">
                        <el-option label="正常" :value="1" />
                        <el-option label="下架" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="问题">
                    <el-input type="textarea" v-model="qaInfo.question" :max-length="100" :rows="3" />
                </el-form-item>
                <el-form-item label="解答">
                    <el-input type="textarea" v-model="qaInfo.answer" :max-length="300" :rows="5" />
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
    title: '常见问答',
})

const queryParams = reactive({
    status: 0,
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
        status: 1,
        question: '',
        answer: ''
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
        const res: any = await qaDelete({ id: row.id });
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
    const res: any = await qaList(queryParams);
    if (res?.code === '0') {
        lists.value = res.qas;
    }
    loading.value = false;
}
if (import.meta.client) {
    getLists();
}

const submitForm = async () => {
    if (!qaInfo.value.question) return ElMessage.error('问题内容不能为空');
    if (!qaInfo.value.answer) return ElMessage.error('解答内容不能为空');

    if (operateType.value === 1) {
        const res: any = await qaCreate(qaInfo.value);
        if (res?.code === '0') {
            ElMessage.success('新增成功');
            dialogVisible.value = false;
            getLists();
        }
    } else if (operateType.value === 2) {
        const res: any = await qaUpdate(qaInfo.value);
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