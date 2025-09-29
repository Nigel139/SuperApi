<template>
  <NuxtLayout name="default">
    <div class="page-container">
      <el-row>
        <el-col :span="24" :xs="24">
          <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
            <el-form-item label="标签名称">
              <el-input v-model="queryParams.name" placeholder="请输入标签名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleQuery">查询</el-button>
              <el-button @click="reset">重置</el-button>
              <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-table v-loading="loading" :data="lists" :border="true" row-key="id">
        <el-table-column label="标签ID" prop="id" />
        <el-table-column label="标签名称" prop="name" />        
        <el-table-column label="图片数量" align="center" prop="count" width="100" />        
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
        @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
    </div>

    <!--新增&&修改-->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="460px">
      <el-form ref="tagForm" :model="tagInfo" :rules="rules" label-width="auto">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="tagInfo.name" placeholder="请输入标签名称" />
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
  title: '标签列表',
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
  queryParams.name = ''
}

const dialogVisible = ref(false);
const tagInfo: any = ref(null);
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
})
const dialogTitle = ref('');
const operateType = ref('');
const handleAdd = () => {
  dialogVisible.value = true;
  operateType.value = 'add';
  dialogTitle.value = '新增标签';
  tagInfo.value = {
    name: '',
  }
}

const handleEdit = (row: any) => {
  dialogVisible.value = true;
  operateType.value = 'edit';
  dialogTitle.value = '编辑标签';
  tagInfo.value = JSON.parse(JSON.stringify(row));
}

const submitForm = async () => {
  if (operateType.value === 'add') {
    const res: any = await imgtagCreate(tagInfo.value);
    if (res?.code === '0') {
      ElMessage.success('新增成功');
      dialogVisible.value = false;
      getLists();
    }
  } else if (operateType.value === 'edit') {
    const res: any = await imgtagUpdate(tagInfo.value);
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
    const res: any = await imgtagDelete({ id: row.id });
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
  const res: any = await imgtagList(queryParams);
  if (res?.code === '0') {
    lists.value = res.tags.rows;
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
</script>

<style lang="less" scoped>
</style>