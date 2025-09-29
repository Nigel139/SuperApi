<template>
    <el-form :model="queryParams" :inline="true" label-position="left" @submit.prevent style="margin-bottom: 8px;">
        <el-form-item>
            <el-select lable="xxxx" v-model="queryParams.tagId" @keyup.enter.native="handleQuery" style="width: 200px;">
                <template #prefix>图片标签： </template>
                <el-option label="全部" :value="0" />
                <el-option v-for="t in allTags" :label="t.name" :value="t.id" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-input v-model="queryParams.alias" clearable @keyup.enter.native="handleQuery" style="width: 260px;">
                <template #prepend>图片别名：</template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="lists.rows" :border="true" row-key="id" @selection-change="selectChanged"
        ref="tableRef" @select="handleSelect" @select-all="handleSelectAll">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="标签" prop="tag.name" width="150" />
        <el-table-column label="别名" prop="alias" />
        <el-table-column label="文件夹" prop="path" width="100" />
        <el-table-column label="图片" align="center" prop="icon" width="100">
            <template #default="scope">
                <img :src="genImgUrl(scope.row.path, scope.row.name)" @click="handleImgPreview" alt="图片"
                    style="width: 50px; height: 50px; cursor: pointer;">
            </template>
        </el-table-column>
        <el-table-column label="上传时间" align="center" prop="createTime" width="160" :formatter="formatterTime" />
    </el-table>

    <el-pagination v-if="lists.total > 0" v-model:current-page="queryParams.page" v-model:page-size="queryParams.limit"
        :total="lists.total" :page-sizes="[5, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>

    <el-row style="margin-top: 30px; justify-content: flex-end;">
        <el-button @click="$emit('img-cancel')">取消</el-button>
        <el-button type="primary" @click="$emit('img-sure', tableRef.getSelectionRows())">确定</el-button>
    </el-row>

    <el-dialog v-model="previewVisible">
        <img :src="previewUrl" alt="Preview Image" style="width: 100%;" />
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

defineEmits(['img-sure', 'img-cancel']);
const props = defineProps({
    single: {
        type: Boolean,
        required: false,
        default: false,
    }
})

const allTags: Ref = ref([]);
const getAllTags = async () => {
    const res: any = await imgtagAll();
    if (res?.code === '0') {
        allTags.value = res.tags;
    }
}
getAllTags();

const queryParams = reactive({
    alias: '',
    tagId: 0,
    page: 1,
    limit: 5,
})

const handleQuery = () => {
    queryParams.page = 1;
    getLists();
}

const reset = () => {
    queryParams.alias = ''
    queryParams.tagId = 0
}
const selectChanged = () => { }

const loading = ref(false);
const lists: Ref = ref([]);
const getLists = async () => {
    loading.value = true
    const res: any = await imgList(queryParams);
    if (res?.code === '0') {
        lists.value = res.imgs;
    }
    loading.value = false;
}
getLists();

const genImgUrl = (path: String, name: String) => {
    return `${base_url}${upload_path}${path}/${name}`
}

const previewVisible = ref(false);
const previewUrl = ref('');
const handleImgPreview = (event: any) => {
    previewUrl.value = event.target.src
    previewVisible.value = true
}
const handleSizeChange = (val: number) => {
    getLists();
}
const handleCurrentChange = (val: number) => {
    getLists();
}

const tableRef = ref()
const handleSelect = (selection: any, row: any) => {
    if (!props.single) return;

    if (selection.includes(row)) {
        // 清除其他所有选择，只保留当前行
        tableRef.value.clearSelection()
        tableRef.value.toggleRowSelection(row)
    }
}

const handleSelectAll = (selection: any) => {
    if (!props.single) return;

    // 禁用全选功能，或只保留最后一项
    if (selection.length > 1) {
        tableRef.value.clearSelection()
        tableRef.value.toggleRowSelection(selection[0])
    }
}

const formatterTime = (data: any) => {
    return formatDate(data.createTime, 'YYYY-MM-DD HH:mm:ss');
}

// 清除内部状态的方法
const clear = () => {
    tableRef.value.clearSelection()
}

// 暴露方法给父组件
defineExpose({
    clear,
})
</script>

<style scoped></style>