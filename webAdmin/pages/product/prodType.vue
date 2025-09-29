<template>
  <NuxtLayout name="default">
    <div class="page-container">
      <el-row>
        <el-col :span="24" :xs="24">
          <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
            <el-form-item label="类型名称">
              <el-input v-model="queryParams.name" placeholder="请输入类型名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleQuery">查询</el-button>
              <el-button @click="reset">重置</el-button>
              <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="lists" :border="true" row-key="id" default-expand-all
        :tree-props="{ children: 'children' }">
        <el-table-column label="Id" prop="id" width="80px" align="center" />
        <el-table-column label="Banner图" header-align="center" align="left">
          <template #default="scope">
            <img v-if="scope.row.imgPath" :src="genImgUrl(scope.row.imgPath, scope.row.imgName)"
              @click="handleImgPreview" alt="图片" style="width: 50px; height: 50px; cursor: pointer;">
          </template>
        </el-table-column>
        <el-table-column label="类型名称" prop="name" align="center" />
        <el-table-column label="排序" prop="sort" align="center" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
          <template #default="scope">
            <el-button type="success" size="small" @click="handleEdit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--新增&&修改-->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="60%" v-if="dialogVisible">
      <el-form :model="typeInfo" :rules="rules" label-width="auto">
        <el-form-item label="上级类型" prop="parentId">
          <el-tree-select v-model="typeInfo.parentId" :data="treeData" :render-after-expand="false"
            :check-strictly="true" :props="{ value: 'id', label: 'name' }" value-key="id" node-key="id" />
        </el-form-item>
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="typeInfo.name" placeholder="请输入类型名称" />
        </el-form-item>
        <el-form-item label="类型排序" prop="sort">
          <el-input v-model.number="typeInfo.sort" placeholder="请输入类型排序" />
        </el-form-item>
        <el-form-item label="类型描述" v-if="!typeInfo.parentId">
          <el-input type="textarea" v-model="typeInfo.remark" :max-length="500" :rows="3" />
        </el-form-item>
        <el-form-item label="Banner图片" v-if="!typeInfo.parentId">
            <ImageUnit :imgs="typeInfo.imgs ?? []" width="150px" height="150px" :single="true"
                  @img-update="imgChanged"></ImageUnit>
            </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center; margin-top: 30px;">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog v-model="previewVisible">
            <img :src="previewUrl" alt="Preview Image" style="width: 100%;" />
        </el-dialog>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

definePageMeta({
  title: '产品类型',
})

const queryParams = reactive({
  name: '',
})

const handleQuery = () => {
  getLists();
}

const reset = () => {
  queryParams.name = ''
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
    parentId: 0,
    name: '',
    imgs: []
  }
}

const handleEdit = (row: any) => {
  dialogVisible.value = true;
  operateType.value = 'edit';
  dialogTitle.value = '编辑菜单';
  typeInfo.value = JSON.parse(JSON.stringify(row));
  typeInfo.value.imgs = [{
    id: typeInfo.value.imgId,
    path: typeInfo.value.imgPath,
    name: typeInfo.value.imgName,
  }]
}

const imgChanged = async (arr: any) => {
    typeInfo.value.imgs = arr;
}

const submitForm = async () => {
  const newType: any = JSON.parse(JSON.stringify(typeInfo.value));
  newType.imgId = newType.imgs[0].id;
  delete newType.imgs;
  delete newType.children;
  console.log('save', newType)

  if (operateType.value === 'add') {
    const res: any = await prodTypeCreate(newType);
    if (res?.code === '0') {
      ElMessage.success('新增成功');
      dialogVisible.value = false;
      getLists();
    }
  } else if (operateType.value === 'edit') {
    const res: any = await prodTypeUpdate(newType);
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
    const res: any = await prodTypeDelete({ id: row.id });
    if (res?.code === '0') {
      ElMessage.success('删除成功');
      getLists();
    }
  }).catch(() => { });
}

const loading = ref(false);
const lists: Ref = ref([]);
const treeData: Ref = ref([]);
const getLists = async () => {
  loading.value = true
  const res: any = await queryAllProdTypes(queryParams);
  if (res?.code === '0') {
    lists.value = toTree(res.types, 'id', 'parentId');
    treeData.value = toTree(res.types, 'id', 'parentId');
    treeData.value.unshift({ id: 0, name: '无' })
  }
  loading.value = false;
}
if (import.meta.client) {
    getLists();
}

const previewUrl = ref('')
const previewVisible = ref(false)
const handleImgPreview = (event: any) => {
    previewUrl.value = event.target.src
    previewVisible.value = true
}
</script>

<style lang="less" scoped></style>