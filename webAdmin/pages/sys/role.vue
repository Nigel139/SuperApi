<template>
    <NuxtLayout name="default">
        <div class="page-container">
            <el-row>
                <el-col :span="24" :xs="24">
                    <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
                        <el-form-item label="权限字符">
                            <el-input v-model="queryParams.key" placeholder="请输入权限字符" clearable
                                @keyup.enter.native="handleQuery" />
                        </el-form-item>
                        <el-form-item label="角色名称">
                            <el-input v-model="queryParams.name" placeholder="请输入角色名称" clearable
                                @keyup.enter.native="handleQuery" />
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="queryParams.status" placeholder="请选择" @keyup.enter.native="handleQuery"
                                style="width: 140px;">
                                <el-option label="请选择" :value="0" />
                                <el-option label="启用" :value="1" />
                                <el-option label="禁用" :value="2" />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleQuery">查询</el-button>
                            <el-button @click="reset">重置</el-button>
                            <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-table v-loading="loading" :data="lists" :border="true">
                <el-table-column label="角色Id" align="center" prop="id" width="140" />
                <el-table-column label="权限字符" align="center" prop="key" width="140" />
                <el-table-column label="角色名称" align="center" prop="name" />
                <el-table-column label="角色描述" align="center" prop="remark" />
                <el-table-column label="状态" align="center" prop="status" width="100">
                    <template #default="scope">
                        <el-text v-if="scope.row.status == 1" type="success">启用</el-text>
                        <el-text v-else type="danger">禁用</el-text>
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
                v-model:page-size="queryParams.limit" :total="lists.total??0" @update:page-size="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                @update:current-page="handleCurrentChange"></el-pagination>
        </div>

        <!--新增修改-->
        <el-dialog :title="dialogTitle" v-model="dialogVisible" width="460px">
            <el-form ref="userForm" :model="roleInfo" :rules="rules" label-width="auto">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="roleInfo.name" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="权限字符" prop="key">
                    <el-input v-model="roleInfo.key" placeholder="请输入权限字符" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="roleInfo.status">
                        <el-radio :value="1">启用</el-radio>
                        <el-radio :value="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="roleInfo.sort" :min="0" />
                </el-form-item>
                <el-form-item label="菜单权限" prop="menus">
                    <div class="menu-role">
                        <div class="btn">
                            <el-checkbox v-model="checkExpand" @change="handleExpandChange">展开/折叠</el-checkbox>
                            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选/全不选</el-checkbox>
                        </div>
                        <div class="tree">
                            <el-tree style="width: 100%;" ref="treeRef" :key="treeKey" :data="menuTreeData"
                                show-checkbox check-strictly node-key="id" :default-checked-keys="roleInfo.menus"
                                :props="{ children: 'children', label: 'name', }" />
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input type="textarea" v-model="roleInfo.remark" placeholder="请输入角色描述" />
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
import { Plus } from '@element-plus/icons-vue';

definePageMeta({
    title: '角色管理',
})

const queryParams = reactive({
    key: '',
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
    queryParams.key = ''
    queryParams.name = ''
    queryParams.status = 0
}

const dialogVisible = ref(false);
const checkExpand = ref(false);

const treeRef = ref(null);
const treeKey = ref(Date.now());
const handleExpandChange = (val: any) => {
    const store = (treeRef as any).value.store;
    if (val) {
        const nodes = store._getAllNodes();
        nodes.forEach((item: any) => {
            item.expanded = true;
        });
    } else {
        const nodes = store._getAllNodes();
        nodes.forEach((item: any) => {
            item.expanded = false;
        });
    }
}

const handleCheckAllChange = (val: any) => {
    const instance = (treeRef as any).value;
    if (val) {
        instance.setCheckedKeys(menuIdArr.value);
    } else {
        instance.setCheckedKeys([]);
    }
}

const menuTreeData = ref([]);
const menuIdArr = ref([]);
const getMenuData = async () => {
    const res: any = await queryAllMenus();
    if (res?.code === '0') {
        menuIdArr.value = res.menus.map((x:any) => x.id);
        menuTreeData.value = toTree(res.menus, 'id', 'parentId');
    }
}
getMenuData();


const roleInfo: any = ref(null);
const rules = reactive<FormRules>({
    name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
    key: [{ required: true, message: '请输入权限字符', trigger: 'blur' }],
    status: [{ required: true, message: '请选择', trigger: 'change' }],
})
const dialogTitle = ref('');
const operateType = ref('');
const handleAdd = () => {
    dialogVisible.value = true;
    operateType.value = 'add';
    dialogTitle.value = '新增';
    treeKey.value = Date.now();
    roleInfo.value = {
        key: '',
        name: '',
        remark: '',
        status: 1,
        sort: 0,
        menus: [],
    }
}

const handleEdit = (row: any) => {
    dialogVisible.value = true;
    operateType.value = 'edit';
    dialogTitle.value = '修改';
    roleInfo.value = JSON.parse(JSON.stringify(row));
    treeKey.value = Date.now();
}

const submitForm = async () => {
    const instance = (treeRef as any).value;
    roleInfo.value.menus = instance.getCheckedKeys();
    if (operateType.value === 'add') {
        const res: any = await roleCreate(roleInfo.value);
        if (res?.code === '0') {
            ElMessage.success('新增成功');
            dialogVisible.value = false;
            getLists();
        }
    } else if (operateType.value === 'edit') {
        const res: any = await roleUpdate(roleInfo.value);
        if (res?.code === '0') {
            ElMessage.success('更新成功');
            dialogVisible.value = false;
            getLists();
        }
    }
    dialogVisible.value = false;
}

const handleDelete = (row: any) => {
    ElMessageBox.confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const res: any = await roleDelete({ id: row.id });
        if (res?.code === '0') {
            ElMessage.success('删除成功');
            getLists();
        }
    }).catch(() => {});
}

const loading = ref(false);
const lists: Ref = ref([]);
const getLists = async () => {
    loading.value = true
    const res: any = await queryRoles(queryParams);
    if (res?.code === '0') {
        lists.value = res.roles.rows.map((item: any) => {
            return {
                ...item,
                menus: item.menus?.map(x => x.menuId),
            }
        });
    }
    loading.value = false;
}
if (import.meta.client) {
    getLists();
}

const handleSizeChange = (val: number) => {
    queryParams.page = 1
    queryParams.limit = val
    getLists();
}
const handleCurrentChange = (val: number) => {
    queryParams.page = val;
    getLists();
}

const formatterTime = (data: any) => {
    return formatDate(data.createTime, 'YYYY-MM-DD HH:mm:ss');
}

const checkAll = computed(() =>{
    const instance = (treeRef as any).value;
    if(!instance) return false;
    return instance.getCheckedKeys().length==menuIdArr.value.length;
})
</script>

<style lang="less">
.menu-role {
    width: calc(100% - 20px);

    .tree {
        margin-top: 4px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        width: 100%;
    }
}
</style>