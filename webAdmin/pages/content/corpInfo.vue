<template>
    <NuxtLayout name="default">
        <div class="page-container">
            <el-tabs>
                <el-tab-pane label="公司地址">
                    <div class="tab-content">
                        <div style="text-align: right; margin-bottom: 5px;">
                            <el-button type="success" plain :icon="Refresh" @click="getLists">刷新</el-button>
                            <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
                        </div>
                        <el-table v-loading="loading" :data="addrs" :border="true" row-key="id">
                            <el-table-column label="公司名称" prop="name" width="200px" heard-align="center" align="left" />
                            <el-table-column label="详细地址" prop="address" heard-align="center" align="left" />
                            <el-table-column label="地址标签" prop="tag" width="100px" heard-align="center" align="left" />
                            <el-table-column label="地址经度" prop="longi" width="100px" align="center" />
                            <el-table-column label="地址维度" prop="lati" width="100px" align="center" />
                            <el-table-column label="展示顺序" prop="sort" width="100px" align="center" />
                            <el-table-column label="操作" align="center" class-name="small-padding fixed-width"
                                width="200">
                                <template #default="scope">
                                    <el-button type="success" size="small" @click="handleEdit(scope.row)">修改</el-button>
                                    <el-button type="danger" size="small"
                                        @click="handleDelete(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="联系方式">
                    <ContacterEditor :info="baseInfo"></ContacterEditor>
                </el-tab-pane>
                <el-tab-pane label="客服信息">
                    <ServiceImgEditor :info="baseInfo"></ServiceImgEditor>
                </el-tab-pane>
            </el-tabs>
        </div>


        <!--新增&&修改-->
        <el-dialog :title="operateType == 1 ? '新增地址' : '修改地址'" v-model="dialogVisible" width="60%">
            <el-form-item label="公司名称">
                <el-input v-model="addrInfo.name" placeholder="请输入公司名称" />
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="addrInfo.address" placeholder="请输入详细地址" />
            </el-form-item>
            <el-form-item label="地址标签">
                <el-input v-model="addrInfo.tag" placeholder="请输入地址标签" />
            </el-form-item>
            <el-form-item label="地址经度">
                <el-input v-model="addrInfo.longi" placeholder="请输入地址经度" />
            </el-form-item>
            <el-form-item label="地址维度">
                <el-input v-model="addrInfo.lati" placeholder="请输入地址维度" />
            </el-form-item>
            <el-form-item label="展示顺序">
                <el-input v-model="addrInfo.sort" placeholder="请输入展示顺序" />
            </el-form-item>
            <div slot="footer" class="dialog-footer" style="text-align: center; margin-top: 30px;">
                <el-button type="primary" @click="submitForm">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Plus, Refresh } from '@element-plus/icons-vue';
import ContacterEditor from '../../components/ContacterEditor.vue';
import ServiceImgEditor from '../../components/ServiceImgEditor.vue';

definePageMeta({
    title: '公司信息',
})

const dialogVisible = ref(false);
const addrInfo: any = ref(null);
const operateType = ref(0);
const handleAdd = () => {
    dialogVisible.value = true;
    operateType.value = 1;
    addrInfo.value = {}
}
const handleEdit = (row: any) => {
    dialogVisible.value = true;
    operateType.value = 2;
    addrInfo.value = JSON.parse(JSON.stringify(row));
}

const baseInfo: any = ref({});
const loading = ref(false);
const getInfo = async () => {
    loading.value = true;
    const res: any = await getBaseInfo();
    if (res?.code === '0') {
        if (res.info) {
            baseInfo.value = res.info;
            if (res.info.qq > 0) baseInfo.value.qqImgs = [{ id: res.info.qq, name: res.info.qqImgName, path: res.info.qqImgPath }];
            else baseInfo.value.qqImgs = [];

            if (res.info.wechat > 0) baseInfo.value.wechatImgs = [{ id: res.info.wechat, name: res.info.wxImgName, path: res.info.wxImgPath }];
            else baseInfo.value.wechatImgs = [];
        }
        else {
            baseInfo.value = { id: 0 };
            baseInfo.value.qqImgs = [];
            baseInfo.value.wechatImgs = [];
        }

        loading.value = false;
    }
}
const addrs: Ref = ref([]);
const getLists = async () => {
    loading.value = true
    const res: any = await getCorpAddrList();
    if (res?.code === '0') {
        addrs.value = res.addrs;
    }
    loading.value = false;
}

if (import.meta.client) {
    getInfo();
    getLists();
}


const submitForm = async () => {
    if (operateType.value === 1) {
        const res: any = await createCorpAddr(addrInfo.value);
        if (res?.code === '0') {
            ElMessage.success('新增成功');
            dialogVisible.value = false;
            getLists();
        }
    } else {
        const res: any = await updateCorpAddr(addrInfo.value);
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
        const res: any = await deleteCorpAddr({ id: row.id });
        if (res?.code === '0') {
            ElMessage.success('删除成功');
            getLists();
        }
    }).catch(() => { });
}
</script>