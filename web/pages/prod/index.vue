<template>
    <NuxtLayout name="default">
        <section id="prod-sec">
            <div class="container">
                <div class="bg-white" style="padding-bottom: 1px;">
                    <div class="prod-type" v-for="(t, idx1) in prodData.types?.filter(x=>x.parentId==0)" :key="idx1">
                        <div class="position-relative">
                            <div class="type-desc position-absolute">
                                <h2 class="fadeInUp animated">{{ t.name }}</h2>
                                <div class="text-white fadeInUp animated">{{ t.remark }}</div>
                                <a :href="`/prod/types?type=${t.id}`" class="d-inline-block fadeInUp animated">了解更多 >></a>
                            </div>
                            <img :src="genImgUrl(t.imgPath, t.imgName)" alt="img" class="w-100" />
                        </div>
                        <ul class="d-flex">
                            <li class="col-6 col-sm-4" v-for="(p, idx2) in prodData.prods.filter(x=>x.type1==t.id || x.type2==t.id).slice(0,3)" :key="idx2">
                                <a :href="`/prod/types?type=${t.id}&sub=${p.type2}`" class="d-block text-center fadeInUp animated pimg">
                                    <img :src="genImgUrl(p.imgPath, p.imgName)" alt="img" class="transition_3" />
                                    <h3 class="position-absolute start-50 translate-middle-x t400 mb-0">{{ p.name }}</h3>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="prod-broad">
                <div class="container text-center broad-content">
                    <h2 class="fadeInUp animated">目录和宣传册</h2>
                    <div class="intro fadeInUp animated">
                        在线查看和下载我们的产品目录、公司宣传画册
                    </div>
                    <a href="/support" class="fadeInUp animated d-inline-block">下载目录</a>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup>
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
if(import.meta.client){
    let data = sessionStorage.getItem(key);
    if(data){
        prodData.value = JSON.parse(data);
    }else{
        getProdData();
    }
}

</script>

<style scoped>
#prod-sec {
    background-color: #eff1f6;
    padding-top: 20px;
}

.prod-type .type-desc {
    width: 500px;
    left: 7%;
    top: 19.5%;
}

.prod-type .type-desc>h2 {
    color: #004e98;
    font-size: 30px;
    font-family: 'arialbd';
    margin-bottom: 15px;
}

.prod-type .type-desc>div {
    margin-bottom: 40px;
}

.prod-type .type-desc>a {
    padding: 4px 20px;
    border-radius: 10px;
    border: solid 1px #eef1f6;
    font-size: 14px;
    color: #fff;
    transition: .3s;
}

.prod-type ul {
    margin: 70px 70px 80px;
}

.prod-type ul li {
    padding: 0 20px;
}

.prod-type ul li>a>h3 {
    color: #fff;
    font-size: 14px;
    bottom: 20px;
    font-weight: 400;
}

.prod-broad {
    margin-top: 80px;
    padding: 80px 0;
    background-image: url(http://signcomplex.com.cn/Theme/skp/Public/images/prbg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.prod-broad .broad-content {
    background-color: rgba(255, 255, 255, 0.7);
    padding: 100px 20px;
}

.prod-broad .broad-content>h2 {
    font-size: 30px;
    color: #1d2733;
}

.prod-broad .broad-content .intro {
    font-size: 16px;
    color: #6e6f6f;
}
.prod-broad .broad-content>a {
    color: #fff;
    background-color: #1d2733;
    border-radius: 22px;
    font-size: 14px;
    padding: 5px 33px;
    margin-top: 30px;
    transition: .3s;
    font-weight: 600px;
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
.pimg>img:hover { transform: scale(1.3); }
@media (max-width: 767px) {
    .prod-type .type-desc {
        position: relative !important;
        top: auto;
        left: auto;
        width: auto;
        padding: 20px 10px;
    }

    .prod-type .type-desc>h2 {
        font-size: 20px;
    }

    .prod-type .type-desc>div {
        color: #111 !important;
        margin-bottom: 20px;
    }

    .prod-type .type-desc>a {
        color: #666;
        padding: 5px 15px;
        font-size: 12px;
    }

    .prod-type ul {
        margin: 40px 0;
        flex-wrap: wrap;
    }

    .prod-type ul li {
        padding: 10px 10px;
        width: 100%;
    }

    .prod-type ul li>a>h3 {
        font-size: 12px;
    }

    .prod-broad {
        margin-top: 40px;
        padding: 40px 0;
    }

    .prod-broad .broad-content {
        padding: 30px 15px;
    }

    .prod-broad .broad-content>a {
        font-size: 16px;
        padding: 5px 30px;
    }
}
</style>