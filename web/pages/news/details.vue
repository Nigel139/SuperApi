<template>
    <NuxtLayout name="default">
        <TopTitle :menus="menus"></TopTitle>

        <section id="news">
            <div class="container">
                <div class="content bg-white">
                    <h1 class="title text-center">{{ news.title }}</h1>
                    <div class="date text-center">{{ news.showDay }}</div>
                    <div class="info" v-html="news.content"></div>
                    <div class="row">
                        <div class="col-12 col-sm-6 pe-5 text-start text-sm-end mb-1">
                            <a :href="`/news/details?id=${prev.id}&type=${prev.typeId}`" class="btn btn-primary cust-btn" v-if="prev">
                                <div class="bgcolor bt center white visible-xs">上一篇</div>
                            </a>
                        </div>
                        <div class="col-12 col-sm-6 ps-sm-5 text-start">
                            <a :href="`/news/details?id=${next.id}&type=${next.typeId}`" class="btn btn-primary me-3 cust-btn" v-if="next">
                                <div class="bgcolor bt center white">下一篇</div>
                            </a>
                            <a :href="`/news/details?id=${next.id}&type=${next.typeId}`" class="nextTitle" v-if="next">{{ next.title }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup>
const route = useRoute()
const menus = reactive([])

const queryParams = reactive({
    id: route.query.id??0,
    typeId: route.query.type??0,
})

const news = ref({})
const prev = ref(null)
const next = ref(null)
const getNews = async () => {
    const res = await getNewsDetails(queryParams);    
    if (res.code === '0') {
        news.value = res.news;
        prev.value = res.prev;
        next.value = res.next;
        menus.push({ name: news.value.typeName, link: `/news/list?type=${news.value.typeId}`})
        menus.push({ name: news.value.title })
    }
}
if(import.meta.client){
    getNews();
}

onMounted(() => {
    
});
</script>

<style scoped>
#news {
    background: #eff1f6;
    padding: 1px;
}

#news .content {
    margin: 20px 0;
    padding: 80px;
}
#news .content > h1 {
    color: #111;
    font-size: 24px;
    margin-bottom: 20px;
}
#news .content .date {
    color: #7d7d7d;
    margin-bottom: 10px;
}
#news .content .info {
    border-top: 1px solid #ebebeb;
    padding-top: 30px;
    margin-bottom: 40px;
}
#news .content .nextTitle {
    color: #999;
    font-size: 14px;
}
#news .cust-btn {
    background-color: #004e98 !important;
}
@media (max-width: 767px) {
    #news .content {
        padding: 30px 10px;
    }
    #news .content > h1 {
        font-size: 16px;
        margin-bottom: 10px;
    }
    #news .content .date {
        font-size: 12px;
    }
    #news .content .nextTitle {
        font-size: 12px;
    }
    #news .cust-btn {
        padding: 2px 5px;
        font-size: 12px;
        margin-left: 0;
        margin-right: 10px;
        width: 50px;
    }
}
</style>