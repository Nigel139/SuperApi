<template>
    <div class="root-Container">
        <div v-for="img in imgs" class="el-upload el-upload--picture-card img-container" :style="sizeStyles">
            <img :src="getImgUrl(img)" :style="sizeStyles" @click="imgPreview">
            <el-button class="delete-btn" type="danger" size="small" circle @click="handleDelete(img.id)" v-if="editable">
                <el-icon>
                    <Close />
                </el-icon>
            </el-button>
        </div>
        <div v-if="!single || imgs.length == 0" class="el-upload el-upload--picture-card img-container"
            @click="handleAdd" :style="sizeStyles">
            <i class="el-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                        d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z">
                    </path>
                </svg>
            </i>
        </div>
    </div>
    <!--选择图片-->
    <el-dialog v-model="imgSelVisible" title="图片选择器" v-if="imgSelVisible">
        <ImageBox ref="imgBoxRef" :single="single" @img-cancel="imgSelVisible = false" @img-sure="imgSubmited">
        </ImageBox>
    </el-dialog>
    <!--图片预览-->
    <el-dialog v-model="previewVisible">
        <img :src="previewUrl" alt="Preview Image" style="width: 100%;" />
    </el-dialog>
</template>

<script setup lang="ts">
import { Close } from '@element-plus/icons-vue';
import { onMounted } from 'vue';
const emit = defineEmits(['img-update'])
const props = defineProps({
    imgs: {
        type: Array<any>,
        required: true
    },
    single: {
        type: Boolean,
        required: false,
        default: false,
    },
    width: {
        type: String,
        required: false,
    },
    height: {
        type: String,
        required: false,
    },
    editable: {
        type: Boolean,
        required: false,
        default: true,
    }
})

const sizeStyles = computed(() => {
    const styles = {} as any
    if (props.width) styles.width = props.width
    if (props.height) styles.height = props.height
    return styles
})

const imgSelVisible = ref(false);
const previewVisible = ref(false);
const previewUrl = ref('');

const handleAdd = async() =>{
    if(props.editable){
        imgSelVisible.value = true
    }
}

const imgSubmited = async (selection: Array<any>) => {
    imgSelVisible.value = false;
    let newArr = [...props.imgs];
    selection.forEach((it, index) => {
        if (newArr.some(x => x.id == it.id)) ElMessage.error(`图片[${it.name}]已存在`);
        else newArr.push(it);
    });
    emit('img-update', newArr)
}
const handleDelete = async (id: any) => {
    let newArr = [...props.imgs]
    emit('img-update', newArr.filter(x => x.id != id))
}

const imgPreview = (event: any) => {
    previewUrl.value = event.target.src
    previewVisible.value = true
}
const getImgUrl = (img: any) => {
    if(img.url) return img.url;
    else return `${base_url}${upload_path}${img.path}/${img.name}`
}
onMounted(async ()=>{
    for(const img of props.imgs){
        if(img.id && !img.path && !img.name){
            const res: any = await imgGetUrl({ id: img.id });
            console.log('img_res', img.id, res)
            if (res?.code === '0') {
                img.url = `${base_url}${upload_path}${res.url}`;
            }
        }
    }
})

</script>

<style scoped>
.root-Container {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    margin-top: 10px;
    margin-bottom: 40px;
}

.img-container {
    position: relative;
    cursor: pointer;
}

.delete-btn {
    position: absolute;
    top: -8px;
    right: -8px;
    padding: 4px;
    font-size: 12px;
}
</style>