<template>
  <NuxtLayout name="default">
    <div class="page-container">
      <el-row>
        <el-col :span="24" :xs="24">
          <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
            <el-form-item label="菜单名称">
              <el-input v-model="queryParams.name" placeholder="请输入菜单名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="queryParams.status" placeholder="请选择" @keyup.enter.native="handleQuery" style="width: 140px;">
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
      <el-table v-loading="loading" :data="lists" :border="true" row-key="id" :tree-props="{ children: 'children' }">
        <el-table-column label="菜单名称" prop="name" />
        <el-table-column label="菜单地址" prop="url" />
        <el-table-column label="菜单图标" align="center" prop="icon" width="120">
          <template #default="scope">
            <svg-icon :name="scope.row.icon"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column label="层级" align="center" prop="level" width="100" />
        <el-table-column label="排序" align="center" prop="orderNum" width="100" />
        <el-table-column label="显示状态" align="center" prop="status" width="100">
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
    </div>

    <!--新增&&修改-->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="460px">
      <el-form ref="userForm" :model="menuInfo" :rules="rules" label-width="auto">
        <el-form-item label="上级菜单" prop="parentId">
          <el-tree-select v-model="menuInfo.parentId" :data="treeData" :render-after-expand="false"
            :check-strictly="true" :props="{ value: 'id', label: 'name' }" value-key="id" node-key="id" />
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menuInfo.name" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单地址" prop="url">
          <el-input v-model="menuInfo.url" placeholder="请输入菜单地址" />
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
          <el-popover placement="bottom-start" :width="400" trigger="click" ref="popoverRef">
            <template #reference>
              <el-input v-model="menuInfo.icon" placeholder="请选择菜单图标" clearable>
                <template #prefix>
                  <svg-icon :name="menuInfo.icon"></svg-icon>
                </template>
              </el-input>
            </template>
            <div class="icons-box">
              <div class="search">
                <el-input v-model="svgSearch" placeholder="请输入图标名称" clearable />
              </div>
              <div class="lists">
                <el-row :gutter="15">
                  <el-col :span="8" :xs="24" v-for="item in svgListComputed" :key="item" @click="selectIcon(item)">
                    <svg-icon :name="item"></svg-icon>
                    <span class="name">{{ item }}</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-popover>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number v-model="menuInfo.orderNum" :min="0" />
        </el-form-item>
        <el-form-item label="是否外链" prop="target">
          <el-radio-group v-model="menuInfo.outLink">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="menuInfo.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input type="textarea" v-model="menuInfo.remark" placeholder="请输入菜单描述" />
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
  title: '菜单管理',
})

const svgFiles = import.meta.glob("~/assets/icons/svg/*.svg", {
  eager: true,
});
const svgList = Object.keys(svgFiles).map((path) => {
  const filename: any = path.split('/').pop();
  return filename.split('.').slice(0, -1).join('.');
})
const svgSearch = ref('');
const popoverRef = ref();
const selectIcon = (icon: string) => {
  menuInfo.value = {
    ...menuInfo.value,
    icon,
  }
  popoverRef.value.hide();
}
const svgListComputed = computed(() => {
  return svgList.filter((item) => {
    return item.indexOf(svgSearch.value) !== -1;
  })
})

const queryParams = reactive({
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
  queryParams.name = ''
  queryParams.status = 0
}

const dialogVisible = ref(false);
const menuInfo: any = ref(null);
const rules = reactive<FormRules>({
  parentId: [{ required: true, message: '请选择上级菜单', trigger: 'blur' }],
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  url: [{ required: true, message: '请输入菜单地址', trigger: 'blur' }],
})
const dialogTitle = ref('');
const operateType = ref('');
const handleAdd = () => {
  dialogVisible.value = true;
  operateType.value = 'add';
  dialogTitle.value = '新增';
  menuInfo.value = {
    parentId: 0,
    status: 1,
    outLink: false,
    name: '',
    orderNum: 0,
    icon: '',
    url: '',
    remark: '',
  }
}

const handleEdit = (row: any) => {
  dialogVisible.value = true;
  operateType.value = 'edit';
  dialogTitle.value = '编辑菜单';
  menuInfo.value = JSON.parse(JSON.stringify(row));
}

const userStore = useStore.userStore();
const submitForm = async () => {
  if (operateType.value === 'add') {
    const res: any = await menuCreate(menuInfo.value);
    if (res?.code === '0') {
      ElMessage.success('新增成功');
      dialogVisible.value = false;
      getLists();
    }
  } else if (operateType.value === 'edit') {
    menuInfo.value.updateBy = userStore.user.id
    const res: any = await menuUpdate(menuInfo.value);
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
    const res: any = await menuDelete({ id: row.id });
    if (res?.code === '0') {
      ElMessage.success('删除成功');
      getLists();
      getTreeData();
    }
  }).catch(() => {});
}

const loading = ref(false);
const lists: Ref = ref([]);
const getLists = async () => {
  loading.value = true
  const res: any = await queryMenus(queryParams);
  if (res?.code === '0') {
    lists.value = toTree(res.menus, 'id', 'parentId');
  } 
  loading.value = false;
}
if (import.meta.client) {
    getLists();
}

const treeData: Ref = ref([]);
const getTreeData = async () => {
  const res: any = await queryAllMenus();  
  if (res?.code === '0') {
    treeData.value = toTree(res.menus, 'id', 'parentId');
    treeData.value.unshift({id:0, name: '无'})
  }
}
getTreeData();

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

    ::v-deep(.el-col) {
      display: inline-flex;
      margin-bottom: 10px;
      align-items: center;
      cursor: pointer;

      .svg-icon {
        margin-right: 4px;
      }
    }
  }
}
</style>