<template>
    <NuxtLayout name="default">
        <section id="content">
                <div class="container">
                    <h3 class="text-center">搜索结果</h3>
                    <div class="summary">共搜索到 1 条符合关键词 196 的结果</div>
                    <table class="table">
                        <thead>
                            <tr style="background-color: #f5f5f5;">
                                <th class="search-name">名称</th>
                                <th class="search-img">图片</th>
                                <th class="search-dec">日期</th>
                                <th class="search-action text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in searchData" :key="index">
                                <td>
                                    <a :href="`/prod/details?id=${item.id}`">{{ item.name }}</a>
                                </td>
                                <td class="img">
                                    <a href="#" title="196lm/w高光效Class B-C光条" @click.prevent="showImg(item.img)">
                                        <img :src="item.img" alt="img">
                                    </a>
                                </td>
                                <td>
                                    {{ item.day }}
                                </td>
                                <td>
                                    <a :href="`/prod/details?id=${item.id}`">
                                        <span>详情</span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <VueEasyLightbox :visible="isShowImg" :imgs="imgSrc" @hide="handleHide"></VueEasyLightbox>
        </section>
    </NuxtLayout>
</template>

<script setup>
const searchData = reactive([
    {
        id: 1,
        name: '196lm/w高光效Class B-C光条',
        day: '2025-07-04',
        img: 'http://signcomplex.com.cn/Uploads/2023-03-13/640e9cf874fe4.jpg'
    }
])

const isShowImg = ref(false)
const imgSrc = ref('#')
function showImg(url) {
  isShowImg.value = true;
  imgSrc.value = url
}
const handleHide = () => {
  isShowImg.value = false;
}
</script>

<style scoped>
#content {
    background-color: #fff;
    margin-bottom: 0px;
}

#content h3 {
    font-size: 24px;
    padding: 0 30px;
    margin-top: 50px;
}

#content .summary {
    color: #555;
    margin-bottom: 30px;
}
#content .table > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 2px solid #dddddd;
}
#content .table tr td {
    vertical-align: middle;
    padding: 10px 8px;
    border-top: 1px solid #dddddd;
}
#content .table tr td.img > a {
    display: inline-block;
    border: 1px solid #eee;
}
#content .table tr td>a>img {
    width: 70px;
    height: 70px;
}

@media (max-width: 767px) {
    #content .summary {
        margin-bottom: 10px;
    }
    #content .table tbody tr td {
        font-size: 12px;
        padding: 10px 4px;
    }
    #content .table tr td>a>img {
        width: 60px;
        height: 60px;
    }
}
</style>