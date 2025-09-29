<template>
    <NuxtLayout name="default">
        <el-form-item>
            <el-button type="success" :icon="Refresh" @click="getLists">刷新</el-button>
        </el-form-item>

        <el-table v-loading="loading" :data="lists" :border="true">
            <el-table-column label="ID" align="center" prop="id" width="80" />
            <el-table-column label="内容" header-align="center" align="left" prop="content"
                :show-overflow-tooltip="true" />
            <el-table-column label="更新时间" align="center" prop="updateTime" width="180" :formatter="formatterTime" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="160">
                <template #default="scope">
                    <el-button type="success" size="small" @click="handleEdit(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--修改-->
        <el-dialog title="编辑" v-model="dialogVisible" v-if="dialogVisible" width="60%" :z-index="1000">
            <el-form :model="qaInfo" label-width="auto">
                <el-form-item label="质保介绍">
                    <ClientOnly>
                        <WangEditor v-model="qaInfo.content" />
                    </ClientOnly>
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
import { Refresh } from '@element-plus/icons-vue';
import { now } from '@vueuse/core';
import { defineAsyncComponent, ref } from 'vue'
const WangEditor = defineAsyncComponent(() =>
    import('@/components/WangEditor.vue') // 路径根据你的项目调整
)

definePageMeta({
    title: '质保条款',
})

const dialogVisible = ref(false);
const qaInfo: any = ref(null);
const operateType = ref(1);

const handleEdit = (row: any) => {
    dialogVisible.value = true;
    operateType.value = 2;
    qaInfo.value = JSON.parse(JSON.stringify(row));
}

const loading = ref(false);
const lists: Ref = ref([]);
const getLists = async () => {
    loading.value = true;
    const res: any = await qualityContent();
    if (res?.code === '0') {
        if (res.qua) lists.value = [res.qua];
        else lists.value = [{ id: 0, content: '-', updateTime: now() }]
    }
    loading.value = false;
}
if (import.meta.client) {
    getLists();
}

const submitForm = async () => {
    if (!qaInfo.value.content) return ElMessage.error('质保条款不能为空');

    const res: any = await qualitySave(qaInfo.value);
    if (res?.code === '0') {
        ElMessage.success('更新成功');
        dialogVisible.value = false;
        getLists();
    }
}

const formatterTime = (data: any) => {
    return formatDate(data.createTime, 'YYYY-MM-DD HH:mm:ss');
}
</script>