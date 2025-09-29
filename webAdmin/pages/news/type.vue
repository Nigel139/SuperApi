<template>
    <NuxtLayout name="default">
        <div class="page-container">
            <el-form-item>
                <el-button type="success" plain :icon="Refresh" @click="handleQuery">刷新</el-button>
                <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
            </el-form-item>
            <el-table v-loading="loading" :data="lists" :border="true" row-key="id">
                <el-table-column label="Id" prop="id" width="80px" align="center" />
                <el-table-column label="类型名称" prop="name" align="center" />
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
                    <template #default="scope">
                        <el-button type="success" size="small" @click="handleEdit(scope.row)">修改</el-button>
                        <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--新增&&修改-->
        <el-dialog :title="dialogTitle" v-model="dialogVisible" width="460px">
            <el-form :model="typeInfo" :rules="rules" label-width="auto">
                <el-form-item label="类型名称" prop="name">
                    <el-input v-model="typeInfo.name" placeholder="请输入类型名称" />
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
import type { FormRules } from 'element-plus';
import { Plus, Refresh } from '@element-plus/icons-vue';

definePageMeta({
    title: '新闻类型',
})

const handleQuery = () => {
    getLists();
}

const dialogVisible = ref(false);
const typeInfo: any = ref(null);
const rules = reactive<FormRules>({
    name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }],
})
const dialogTitle = ref('');
const operateType = ref('');
const handleAdd = () => {
    dialogVisible.value = true;
    operateType.value = 'add';
    dialogTitle.value = '新增';
    typeInfo.value = {
        name: '',
    }
}

const handleEdit = (row: any) => {
    dialogVisible.value = true;
    operateType.value = 'edit';
    dialogTitle.value = '编辑类型';
    typeInfo.value = JSON.parse(JSON.stringify(row));
}

const submitForm = async () => {
    if (operateType.value === 'add') {
        const res: any = await newsTypeCreate(typeInfo.value);
        if (res?.code === '0') {
            ElMessage.success('新增成功');
            dialogVisible.value = false;
            getLists();
        }
    } else if (operateType.value === 'edit') {
        const res: any = await newsTypeUpdate(typeInfo.value);
        if (res?.code === '0') {
            ElMessage.success('更新成功');
            dialogVisible.value = false;
            getLists();
        }
    }
}

const handleDelete = (row: any) => {
    ElMessageBox.confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const res: any = await newsTypeDelete({ id: row.id });
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
    const res: any = await allNewsTypes();
    if (res?.code === '0') {
        lists.value = res.types;
    }
    loading.value = false;
}
if (import.meta.client) {
    getLists();
}

</script>

<style lang="less" scoped></style>