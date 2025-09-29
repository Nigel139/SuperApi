<template>
    <NuxtLayout name="default">
        <section id="prod-menu">
            <div class="container">
                <nav class="w-100">
                    <ul class="d-flex item-aligns-center">
                        <li v-for="(t, idx1) in prodData.types?.filter(x => x.parentId == 0)" :key="idx1"
                            @click="typeId = t.id; subId = 0;">
                            <a :class="{ active: (typeId == t.id) }">{{ t.name }}</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>

        <section id="prod-list">
            <div class="container">
                <div class="row">
                    <div class="left col-12 col-sm-2 ps-0 pe-0">
                        <ul>
                            <li :class="{ active: (subId == 0) }" @click="subId = 0">全部</li>
                            <li v-for="(sub, idx2) in prodData.types?.filter(x => x.parentId == typeId)" :key="idx2"
                                :class="{ active: (subId == sub.id) }" @click="subId = sub.id">
                                <span>{{ sub.name }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="right col-12 col-sm-10 pe-0">
                        <div class="prod-box row">
                            <div class="col-12 col-sm-4 mb-2 text-center" v-for="(p, index) in viewProds" :key="index">
                                <div class="pimg">
                                    <img :src="genImgUrl(p.imgPath,p.imgName)" :alt="p.name" />
                                    <a :href="`/prod/details?id=${p.id}`">
                                        <div class="info">
                                            <div class="position-absolute start-50 top-50 translate-middle text-white">
                                                <i class="icon-line-search"></i>
                                                <div class="">查看详情</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <a class="title d-block" :href="`/prod/details?id=${p.id}`">{{ p.name }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </NuxtLayout>

</template>

<script setup>
const route = useRoute()
const typeId = ref(route.query.type??1)
const subId = ref(route.query.sub??0)

const viewProds = computed(() => {
    if (subId.value == 0) return prodData.value.prods?.filter(x => x.type1 == typeId.value || x.type2 == typeId.value);
    else return prodData.value.prods?.filter(x => x.type2 == subId.value);
})

const key = 'prod_data'
const prodData = ref({})
const getProdData = async () => {
    const res = await allProds();
    if (res.code === '0') {
        prodData.value.types = res.types;
        prodData.value.prods = res.prods;
        let json = JSON.stringify(prodData.value);
        sessionStorage.setItem(key, json);
    }
}
if (import.meta.client) {
    let data = sessionStorage.getItem(key);
    if (data) {
        prodData.value = JSON.parse(data);
    } else {
        getProdData();
    }
}

</script>

<style scoped>
#prod-menu {
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    z-index: 99;
    background-color: #fff !important;
}

#prod-menu nav>ul {
    margin-bottom: 0;
}

#prod-menu nav li a {
    display: block;
    color: #999999;
    font-size: 16px;
    height: auto;
    line-height: 1.5;
    padding: 20px 15px 12px;
    margin: 0 !important;
}

#prod-menu nav li .active {
    color: #004e98;
    ;
    border-bottom: 5px solid #004e98;
    ;
}

#prod-list {
    padding-top: 50px;
    background-color: #eff1f6;
}

#prod-list>.container {
    margin-top: 50px;
}

#prod-list .left {
    background-color: #fff;
    height: fit-content;
}

#prod-list .left ul {
    margin-top: 40px;
    padding: 0 15px 50px 60px;
}

#prod-list .left ul li {
    cursor: pointer;
    margin-bottom: 20px;
}

#prod-list .left ul li.active {
    color: #004e98;
}

#prod-list .right {
    padding-left: 36px;
    margin-bottom: 40px;
}

#prod-list .right .info {
    position: absolute;
    top: 0;
    left: 0;
    background: rgb(29 39 51 / 0%);
    transition: .5s;
    height: 100%;
    width: 100%;
}

#prod-list .right .info:hover {
    background: rgb(29 39 51 / 60%);
}

#prod-list .right .info>div>i {
    font-size: 20px;
    line-height: 1;
}

#prod-list .right .info>div>span {
    margin-top: 30px;
    font-size: 16px;
    opacity: 0;
}

#prod-list .right .info:hover div {
    opacity: 1;
}

#prod-list .right .info>div {
    cursor: pointer;
    max-width: 80%;
    margin-bottom: 10px;
    transition: .3s;
    margin: 0 auto;
    text-align: center !important;
    opacity: 0;
}

#prod-list .right .prod-box .title {
    color: #222;
    cursor: pointer;
    margin: 20px 0 40px;
    transition: .3s;
}

#prod-list .right .prod-box .title:hover {
    color: #004e98;
}
.pimg {
    position: relative;
    overflow: hidden !important;
}
.pimg>img{
    width: 100%;
    height: 220px; 
    object-fit: cover;  /* 关键：裁剪图片以填满区域 */
    display: block;
}
@media (max-width: 767px) {
    #prod-menu nav li a {
        padding: 12px 8px 6px;
        font-size: 14px;
        margin: 0 !important;
    }

    #prod-list>.container {
        margin-top: 20px;
    }

    #prod-list .left ul {
        margin-top: 0;
        padding: 20px;
        display: flex;
        align-items: center;
    }

    #prod-list .left ul li {
        margin-bottom: 0;
    }

    #prod-list .left ul li~li {
        margin-left: 20px;
    }

    #prod-list .right {
        padding-top: 20px;
        padding-left: 0;
    }

    #prod-list .right .prod-box {
        margin: 0 auto;
    }
}
</style>