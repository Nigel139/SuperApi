<template>
    <NuxtLayout name="default">
  <div class="page-container">
    <el-row>
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
          <el-form-item label="用户名">
            <el-input v-model="queryParams.userName" placeholder="请输入用户名" clearable @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="用户姓名">
            <el-input v-model="queryParams.nickName" placeholder="请输入用户姓名" clearable @keyup.enter.native="handleQuery" />
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

    <el-table v-loading="loading" :data="lists" :border="true">
      <el-table-column label="ID" align="center" prop="id" width="140" />
      <el-table-column label="用户名" align="center" prop="userName" />
      <el-table-column label="用户姓名" align="center" prop="nickName" />
      <el-table-column label="手机号码" align="center" prop="phone" width="200" />
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

    <el-pagination v-show="lists.total > 0" v-model:current-page="queryParams.page" v-model:page-size="queryParams.limit"
      :total="lists.total??0" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
      @update:page-size="handleSizeChange" @update:current-page="handleCurrentChange"></el-pagination>
  </div>

  <!--新增修改-->
  <el-dialog :title="dialogTitle" v-model="dialogVisible" width="660px">
    <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="auto">
      <el-row :span="20">
        <el-col :span="12" :xs="24">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="userInfo.userName" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label="密码" prop="password">
            <el-input v-if="operateType == 'add'" v-model="userInfo.password" placeholder="请输入用户密码" type="password" />
            <el-input v-else v-model="userInfo.password" placeholder="为空表示不修改密码" type="password" />
          </el-form-item> 
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label="姓名" prop="nickName">
            <el-input v-model="userInfo.nickName" placeholder="请输入用户姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="userInfo.sex">
              <el-radio :value="1">男</el-radio>
              <el-radio :value="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input v-model="userInfo.phone" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label="角色" prop="roles">
            <el-select v-model="userInfo.roles" placeholder="请选择角色" multiple collapse-tags collapse-tags-tooltip>
              <el-option v-for="item in roleData" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="userInfo.status">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" :xs="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="userInfo.remark" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
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
  title: '用户管理',
})

const queryParams = reactive({
  userName: '',
  nickName: '',
  status: 0,
  page: 1,
  limit: 10,
})

const handleQuery = () => {
  queryParams.page = 1;
  getLists();
}

const reset = () => {
  queryParams.userName= ''
  queryParams.nickName= ''
  queryParams.status= 1
}

const dialogVisible = ref(false);
const userInfo: any = ref(null);
const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
  nickName: [{ required: true, message: '请输入管理员姓名', trigger: 'blur' }],
})
const dialogTitle = ref('');
const operateType = ref('');
const handleAdd = () => {
  dialogVisible.value = true;
  operateType.value = 'add';
  dialogTitle.value = '新增';
  userInfo.value = {
    userName: '',
    nickName: '',
    phone: '',
    status: 1,
    password: '',
    sex: 1,
    remark: '',
    roles: [],
  }
}

const handleEdit = (row: any) => {
  dialogVisible.value = true;
  operateType.value = 'edit';
  dialogTitle.value = '修改';
  userInfo.value = JSON.parse(JSON.stringify(row));  
  userInfo.value.password = '';
  //userInfo.value.remark='';
}

const submitForm = async () => {
  if (operateType.value === 'add') {
    const res: any = await userCreate(userInfo.value);
    if (res?.code === '0') {
      ElMessage.success('新增成功');
      dialogVisible.value = false;
      getLists();
    }
  } else if (operateType.value === 'edit') {
    const res: any = await userUpdate(userInfo.value);
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
    const res: any = await userDelete({ id: row.id });
    if (res?.code === '0') {
      ElMessage.success('删除成功');
      getLists();
    }
  }).catch(() => {});
}

const loading = ref(false);
const lists: Ref = ref([]);
const getLists = async () => {
  loading.value = true;
  const res:any = await queryUsers(queryParams);
  if (res?.code === '0') {
    lists.value = res.admins.rows.map((item: any) => {
      return {
        ...item,
        roles: item.roles.map((role: any) => role.roleId),
      }
    });
  }
  loading.value = false;
}
if (import.meta.client) {
    getLists();
}

const roleData: Ref = ref([]);
const getRoleData = async () => {
  const res: any = await queryAllRoles();
  if (res?.code === '0') {
    roleData.value = res.roles;
  }
}
getRoleData();

const handleSizeChange = (val: number) => {
  queryParams.page = 1
    queryParams.limit = val
  getLists();
}
const handleCurrentChange = (val: number) => {
  queryParams.page = val;
  getLists();
}

const formatterTime = (data : any) => {
  return formatDate(data.createTime, 'YYYY-MM-DD HH:mm:ss');
}
</script>