<template>
    <NuxtLayout name="default">
        <section class="banner position-relative">
            <img src="/images/banner/61d561d524f5e.jpg" alt="img" class="w-100" />
            <div class="position-absolute top-50 start-50 translate-middle">
                <h1 class="text-center text-white mb-0">{{ curNewsType }}</h1>
            </div>
        </section>

        <section id="news-menu" :class="{ 'fixed': (fixedMenu) }">
            <div class="container">
                <nav class="w-100">
                    <ul class="d-flex item-aligns-center flex-wrap">
                        <li v-for="(t, index) in allTypes" :key="index">
                            <a href="#" :class="{ active: (queryParams.typeId == t.id) }" @click.prevent="changeType(t.id)">
                                {{ t.name }}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>

        <section id="news-list">
            <div class="container">
                <div style="margin: 50px 0">
                    <a :href="`/news/details?id=${n.id}&type=${queryParams.typeId}`" class="new-box bg-white d-flex align-items-center fadeInUp animated"
                        v-for="(n,index) in newsData" :key="index">
                        <div class="img">
                            <img :src="genImgUrl(n.imgPath,n.imgName)" />
                        </div>
                        <div class="text flex-fill">
                            <h2 class="title text-truncate">{{ n.title }}</h2>
                            <div class="date">{{ n.showDay }}</div>
                            <div class="summary">{{ n.remark }}</div>
                            <span class="d-inline-block more">查看详情 >></span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup>
const route = useRoute()

const queryParams = reactive({
    typeId: route.query.type??0,
    page: 1,
    limit: 5,
})

import { useDevice } from '#imports'
const { isMobile } = useDevice()

const fixedMenu = ref(false)

const handleScroll = () => {    
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const topHeight = isMobile ? 145: 448;
    fixedMenu.value = scrollPosition > topHeight;

    const footerHeight = isMobile ? 1400: 1080;
    const pageHeight = document.documentElement.scrollHeight;
    if(scrollPosition>=pageHeight-footerHeight){
        if(total.value>queryParams.page*queryParams.limit){
            appendList();
        }        
    }
}

const curNewsType = computed(() => {
    return allTypes.value.find(x=>x.id==queryParams.typeId)?.name;
})

const allTypes = ref([])
const getNewsTypes = async () => {
    const res = await allNewsTypes();
    if (res.code === '0') {
        allTypes.value = res.types;
        if(!queryParams.typeId) queryParams.typeId = res.types[0]?.id
        getList();
    }
}
getNewsTypes();

const total = ref(0)
const newsData = ref([])
const getList = async () => {
    const res = await getNewsList(queryParams);
    if (res.code === '0') {
        total.value = res.news.total;
        newsData.value = res.news.rows;
    }
}
const appendList = async () => {
    queryParams.page +=1;
    const res = await getNewsList(queryParams);
    if (res.code === '0') {
        newsData.value.push(...res.news.rows);
    }
}

const changeType = async(id)=>{
    queryParams.page = 1;
    queryParams.typeId = id;
    getList();
}
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
})
</script>

<style scoped>
.banner img {
    width: auto;
    height: 448px;
}

.banner h1 {
    font-size: 40px;
    font-weight: 400;
}

#news-menu {
    background-color: #fff !important;
    border-bottom: 1px solid #eff1f6;
}

#news-menu.fixed {
    position: sticky;
    top: 100px;
    left: 0;
    width: 100%;
    z-index: 99;
}

#news-menu nav>ul {
    margin-bottom: 0;
}

#news-menu nav li a {
    display: block;
    color: #999999;
    font-size: 16px;
    height: auto;
    line-height: 1.5;
    padding: 20px 15px 12px;
    margin: 0 !important;
}

#news-menu nav li .active {
    color: #004e98;
    border-bottom: 5px solid #004e98;
}
#news-list{
    min-height: 500px;
    padding: 1px;
    background:#eff1f6;
}
#news-list .new-box {
    border: solid 1px #dcdcdc;
    padding: 10px;
    margin-bottom: 35px;
    transition: .3s;
}
#news-list .new-box .img {
    max-width: 450px;
    min-width: 450px;
}
#news-list .new-box .text {
    margin-left: 40px;
}
#news-list .new-box .text .title {
    font-size: 18px;
    margin-bottom: 15px;
    max-height: 27px;
}
#news-list .new-box .text .date {
    color: #999;
    margin-bottom: 15px;
}
#news-list .new-box .text .summary {
    color: #555;
    margin-bottom: 15px;
    max-height: 63px;
}
#news-list .new-box .text .more {
    min-width: 136px;
    height: 30px;
    border: solid 1px #004e98;
    line-height: 28px;
    padding: 0 15px;
    border-radius: 15px;
    color: #004e98;
}
@media (max-width: 767px) {
    .banner>div>h1 {
        font-size: 20px;
    }

    .banner img {
        height: 145px;
    }

    #news-menu nav li a {
        padding: 12px 8px 6px;
        font-size: 14px;
        margin: 0 !important;
    }
    #news-list .container > div {
        margin: 20px 0 !important;
    }
    #news-list .new-box {
        display: block !important;
        margin-bottom: 0;
    }
    #news-list .new-box .img {
        min-width: 300px;
    }
    #news-list .new-box .text {
        margin: 10px 0;
    }
    #news-list .new-box .text .title {
        font-size: 16px;
        max-height: 24px;
        margin-bottom: 10px;
    }
    #news-list .new-box .text .date {
        font-size: 12px;
    }
    #news-list .new-box .text .summary {
        font-size: 12px;
        margin-bottom: 20px;
    }
    #news-list .new-box .text .more {
        font-size: 12px;
        height: 26px;
        line-height: 24px;
        min-width: 1px;
    }
}
</style>