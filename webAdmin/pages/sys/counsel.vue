<template>
  <NuxtLayout name="default">
    <div class="page-container">
      <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent>
        <el-form-item label="日期范围">
          <el-date-picker v-model="dayRange" type="datetimerange" :editable="false" class="hide-date-header-input"
            start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="queryParams.tel" placeholder="请输入手机号码" clearable @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="lists.rows" :border="true">
        <el-table-column label="姓名" header-align="center" align="left" prop="name" width="100" />
        <el-table-column label="电话" header-align="center" align="left" prop="tel" width="130" />
        <el-table-column label="邮箱" header-align="center" align="left" prop="email" width="200" />
        <el-table-column label="公司名称" header-align="center" align="left" prop="corpName" width="200" />
        <el-table-column label="咨询内容" header-align="center" align="left" prop="content" :show-overflow-tooltip="true" />
        <el-table-column label="创建时间" header-align="center" align="left" prop="createTime" width="180"
          :formatter="formatterTime" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="140">
          <template #default="scope">
            <el-button type="info" size="small" @click="handleDetails(scope.row)">详情</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination v-show="lists.total > 0" v-model:current-page="queryParams.page"
        v-model:page-size="queryParams.limit" :total="lists.total ?? 0" :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper" @update:page-size="getLists"
        @update:current-page="getLists"></el-pagination>
    </div>

    <!--咨询内容-->
    <el-dialog title="咨询内容" v-model="dialogVisible" v-if="dialogVisible" width="60%" :z-index="1000">
      <el-input type="textarea" :rows="8" v-model="counselInfo.content">

      </el-input>
    </el-dialog>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  title: '客户咨询',
})

const dayRange = ref(null);
const queryParams = reactive({
  tel: '',
  startDay: '',
  endDay: '',
  page: 1,
  limit: 10,
})

const handleQuery = () => {
  console.log('range', dayRange.value)
  if (dayRange.value) {
    queryParams.startDay = dayRange.value[0];
    queryParams.endDay = dayRange.value[1];
  }
  queryParams.page = 1;
  getLists();
}

const reset = () => {
  queryParams.startDay = '';
  queryParams.endDay = '';
  queryParams.status = 1
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确认删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res: any = await delCounsels({ id: row.id });
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
  const res: any = await queryCounsels(queryParams);
  if (res?.code === '0') {
    lists.value = res.list;
  }
  loading.value = false;
}
if (import.meta.client) {
    getLists();
}

const dialogVisible = ref(false);
const counselInfo = ref('');
const handleDetails = (row: any) => {
  counselInfo.value = JSON.parse(JSON.stringify(row));
  dialogVisible.value = true;
}

const formatterTime = (data: any) => {
  return formatDate(data.createTime, 'YYYY-MM-DD HH:mm:ss');
}
</script>

<style scoped>
:deep(.hide-date-header-input input[type='text']) {
  display: none !important;
}
</style>