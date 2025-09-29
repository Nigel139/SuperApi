<template>
    <header id="header1" class="d-flex align-items-center fixed-top">
        <div class="container-fluid container-xl position-relative d-flex align-items-center">
            <div class="menu-trigger" @click="toggleTrigger">
                <i :class="[trigger ? 'icon-reorder' : 'icon-line-cross']"></i>
            </div>
            <div id="logo" style="flex:1;">
                <a href="/" style="display: block;"><img src="/images/logo_10.png" alt="Logo" /></a>
            </div>
            <div id="menu-container" class="d-flex justify-content-end" :class="{ 'position-relative': (!search) }">
                <nav id="menu" :class="[isMobile && trigger? '':'d-flex']">
                    <ul id="mul" class="d-flex align-items-center">
                        <li v-for="(item, index) in topMenus" :key="index" @mouseover="toggleMenu(index, true)"
                            @mouseout="toggleMenu(index, false)">
                            <a :href="isMobile?'#':item.link">{{ item.title }}</a>
                            <ul v-if="item.type == 1" class="sub-menu"
                                :class="[item.isOpen ? 'd-block' : 'd-none', isMobile ? 'sub-menu2' : '']">
                                <li v-for="(c, idx) in item.children" :key="idx">
                                    <a :href="c.link">
                                        <div>{{ c.title }}</div>
                                    </a>
                                </li>
                            </ul>
                            <div v-else class="menu-content"
                                :class="[item.isOpen ? 'd-block' : 'd-none', isMobile ? 'sub-menu3' : '']">
                                <ul class="d-flex justify-content-center" style="background-color:transparent;">
                                    <li class="col-sm-2 col-xs-4 text-center" style="padding-left: 15px;padding-right: 15px;"
                                        v-for="(c, idx) in item.children" :key="idx">
                                        <a :href="c.link">
                                            <div class="prod-img">
                                                <img :src="c.img" alt="img" class="transition_3" />
                                            </div>
                                            <div class="prod-text">{{ c.title }}</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
                <!-- <div class="tail-menu ms-4" @click="toggleSearch">
                    <div><i :class="[search ? 'icon-line-search' : 'icon-line-cross']"></i></div>
                    <div class="search-box d-flex align-items-center" :class="{ 'd-none': (search) }" @click.stop="">
                        <input type="text" name="keyword" class="form-control" style="flex:1;" value=""
                            placeholder="输入产品关键字">
                        <button type="button" class="btn-search"><i class="icon-line-search"></i> 搜索</button>
                    </div>
                </div>
                <div id="lang" class="tail-menu ms-3">
                    <a href="#" class="text-white" style="font-weight: 100;">EN</a>
                </div> -->
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    background: #151c25;
    height: 100px;
}
.fixed-top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
}
#header-wrap1 {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
}
.menu-trigger {
    opacity: 0;
    pointer-events: none;
    cursor: pointer;
    font-size: 14px;
    position: absolute;
    top: 50%;
    margin-top: -25px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    -webkit-transition: opacity .3s ease;
    -o-transition: opacity .3s ease;
    transition: opacity .3s ease;
}
#menu ul li:hover>a,
#menu ul li.current>a {
    color: #004e98;
}
#menu ul li>a {
    display: block;
    line-height: 22px;
    padding: 39px 13px;
    color: #fff;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0px;
    font-family: 'corbel', sans-serif;
    -webkit-transition: margin .4s ease, padding .4s ease;
    -o-transition: margin .4s ease, padding .4s ease;
    transition: margin .4s ease, padding .4s ease;
}
@media (max-width: 767px) {
    .menu-trigger {
        font-size: 24px;
        color: #fff;
        opacity: 1;
        pointer-events: auto;
        top: 25px;
        margin-top: 0;
        left: 0;
        z-index: 1;
    }
    #logo {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    #menu {
        display: none;
    }
    #menu>#mul {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: -2px;
        background: #151c25;
        padding: 0 15px !important;
        border-top: 1px solid rgb(238 238 238 / 10%) !important;
        padding-bottom: 10px !important;
        flex-direction: column;
        align-items: flex-start !important;
    }
    #menu>#mul>li {
        width: 100%;
        border-top: 1px solid rgb(238 238 238 / 6%);
    }
    #menu>#mul>li>a {
        padding: 9px 5px !important;
        border: none !important;
        margin: 0 !important;
    }
    #menu .menu-content{
        position: relative;
        border: 0;
        border-top: 1px solid #EEE;
        padding: 20px 0;
    }
    #menu-container {
        position: initial !important;
    }
    #menu-container .search-box {
        height: 50px !important;
        padding: 0 10px;
    }
    #menu-container .btn-search {
        margin-left: 10px !important;
        padding: 8px 20px !important;
    }
    #menu ul li>a {
        padding: 13px;
    }
}

.sub-menu {
    /* display: none; */
    position: absolute;
    width: 220px;
    background-color: rgb(20 28 37 / 89%);
    box-shadow: 0px 13px 42px 11px rgba(0, 0, 0, 0.05);
    /* border: 1px solid #EEE; */
    /* border-top: 2px solid #004e98; */
    height: auto;
    z-index: 199;
    /* top: 100%; */
    margin: 0;
    -webkit-transition: top .4s ease;
    -o-transition: top .4s ease;
    transition: top .4s ease;
}

.sub-menu li>a {
    font-size: 14px !important;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
    border: 0;
}

.sub-menu li:hover>a {
    background-color: #F9F9F9;
    padding-left: 30px !important;
    color: #004e98;
}

.sub-menu2 {
    width: 100%;
    position: relative;
}

.sub-menu2 li {
    border-bottom: 1px solid #EEE;
}

.sub-menu3 {
    top: 0 !important;
    padding: 15px 0;
}

.sub-menu3 ul li {
    padding: 0 5px !important;
}

.menu-content {
    position: absolute;
    background-color: rgb(20 28 37 / 89%);
    box-shadow: 0px 13px 42px 11px rgba(0, 0, 0, 0.05);
    height: auto;
    z-index: 199;
    /* top: 100%; */
    margin: 0;
    width: 100%;
    -webkit-transition: top .4s ease;
    -o-transition: top .4s ease;
    transition: top .4s ease;

    padding: 50px 40px 60px;
    left: 50%;
    -o-transform: translateX(-50%);
    /* -webkit-transform: translateX(-50%); */
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
}

.prod-img {
    min-height: 80px;
    min-width: 80px;
    border: 1px solid #fff;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden !important;
}
.prod-img>img{
    object-fit: cover;  /* 关键：裁剪图片以填满区域 */
    display: block;
}
.prod-img>img:hover{
    transform: scale(1.3);
}

.prod-text {
    color: #fff;
    font-size: 14px;
    transition: .3s;
}

.tail-menu {
    display: block;
    min-width: 14px;
    height: 14px;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    color: #fff;
    -webkit-transition: color .3s ease-in-out;
    -o-transition: color .3s ease-in-out;
    transition: color .3s ease-in-out;
    margin: 40px 0 40px 15px;
}

#menu-container .search-box {
    /* opacity: 0; */
    z-index: 10;
    position: absolute;
    width: 100% !important;
    height: 100%;
    padding: 0 15px;
    margin: 0;
    top: 100%;
    left: 0;

    background-color: #fff;
    padding-left: 20px;
    box-shadow: 0px 13px 42px 11px rgb(0 0 0 / 5%);

    -webkit-transition: opacity .3s ease-in-out;
    -o-transition: opacity .3s ease-in-out;
    transition: opacity .3s ease-in-out;
}

#menu-container .search-box input {
    box-shadow: none !important;
    border-radius: 0;
    border: 0;
    outline: 0 !important;
    font-size: 16px;
    padding: 10px 80px 10px 0;
    height: 100%;
    background-color: transparent;
    color: #fff;
    font-weight: 400;
    height: 40px;
    color: #222;
    margin-top: 0 !important;
    letter-spacing: 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

#menu-container .btn-search {
    color: #fff;
    background-color: #004e98;
    border-radius: 20px;
    padding: 8px 35px;
    margin-left: 20px;
    border: none !important;
}
@media (max-width: 767px) {
    .prod-img {
        min-height: 60px;
        min-width: 60px;
    }
}
</style>

<script setup>
import { useDevice } from '#imports'
const { isMobile } = useDevice()

const trigger = ref(true);
const search = ref(true);
// 响应式菜单数据
const topMenus = reactive([
    {
        title: '关于我们',
        link: '/about',
        isOpen: false,
        type: 1,
        children: [
            { title: '公司简介', link: '/about' },
            { title: '企业资质', link: '/about-qual' },
            { title: '研发生产', link: '/about-dev' },
            { title: '人才招聘', link: '/about-hr' },
        ]
    },
    {
        title: '产品',
        link: '/prod',
        isOpen: false,
        type: 2,
        children: [
            { title: '热销推荐', link: '/prod/hot', img: '/images/hot.png' },
            { title: '氛围灯具', link: '/prod/types?type=1', img: '/images/light1.png' },
            { title: '露营灯具', link: '/prod/types?type=3', img: '/images/light2.png' },
            { title: '护眼灯具', link: '/prod/types?type=2', img: '/images/light3.png' },
        ]
    },
    {
        title: '应用案例',
        link: '/application/',
        isOpen: false,
        type: 1,
        children: [
            { title: '办公场所', link: '/application?id=1' },
            { title: '工业', link: '/application?id=2' },
            { title: '零售业', link: '/application?id=3' },
            { title: '酒店业', link: '/application?id=4' },
            { title: '文化艺术', link: '/application?id=5' },
            { title: '医疗保健', link: '/application?id=6' },
            { title: '家居', link: '/application?id=7' },
            { title: '建筑', link: '/application?id=8' },
            { title: '超市', link: '/application?id=9' },
            { title: '景观', link: '/application?id=10' },
        ]
    },
    {
        title: '支持',
        link: '/support/',
        isOpen: false,
        type: 1,
        children: [
            { title: '产品保修', link: '/support?type=0' },
            { title: '常见问答', link: '/support?type=1' },
        ]
    },
    {
        title: '媒体中心',
        link: '/news/list',
        isOpen: false,
        type: 1,
        children: [
            { title: '新闻', link: '/news/list' },
            { title: '视频', link: '/video/' },
        ]
    },
    {
        title: '联系我们',
        link: '/contact',
        isOpen: false,
        type: 1,
    },
])

const toggleTrigger = () => {
    trigger.value = !trigger.value;
}
const toggleSearch = () => {
    search.value = !search.value;
}
const toggleMenu = (index, val) => {
    topMenus[index].isOpen = val
}

</script>