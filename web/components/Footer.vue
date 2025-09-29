<template>
    <footer>
        <div class="container">
            <div id="footerTop" class="d-flex flex-top">
                <div class="left-sec">
                    <img src="/images/logo_30.png" alt="img" />
                    <div style="white-space: pre-line;color: #d2d3d5; font-size: 14px;margin-top:45px;">
                        地址: {{ addrs[0]?.address }}<br /><br />

                        电话: {{ phone }}<br />
                        传真: {{ fax }}<br />
                        邮箱: <a style="color:#fff;" class="inlineblock" :href="'mailto: ' +email">
                            {{ email }}</a><br /><br />

                        如有建议或投诉, 请发送邮件至 <a style="color:#fff;" class="inlineblock"
                            :href="'mailto:'+email2">{{ email2 }}</a>
                    </div>
                </div>
                <div class="right-sec">
                    <ul class="text-white">
                        <li class="float-start clearfix" v-for="(item, index) in footerMenus" :key="index">
                            <h3 class="t400" @click="toggleSubMenu(index)">{{ item.title }}</h3>
                            <a v-for="(c, idx) in item.children" :key="idx" :href="c.link" :class="{ show: (!isMobile && item.children.length > 0) || (isMobile && item.isOpen)}" class="d-block">{{ c.title }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="text-center">
                    Copyright © {{startYear}}-{{ toYear }} {{ addrs[0]?.name }} 版权所有 <a class="text-nowrap clearfix"
                        href="http://beian.miit.gov.cn/state/outPortal/loginPortal.action"
                        target="_blank">粤ICP备13748556号-1</a>
                    <p>
                        <a href="/sitemap">网站地图</a> |
                        <a href="/private">隐私政策</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
footer{
    background-color: #151c25;
    padding-top: 80px;
}
.left-sec {
    max-width: 370px;
    margin-right: 110px;
}
.right-sec {
    flex: 1;
}
.right-sec ul li~li {
    margin-left: 70px;
}
.right-sec ul li>h3 {
    font-size: 18px;
}

.right-sec ul li a {
    color: #d9d9d9;
    margin-bottom: 5px;
    transition: .3s;
    font-size: 14px;
}
.right-sec ul li a:hover {
    color: #004e98;
}

@media (max-width: 767px) {
    .container>#footerTop {
        display: block !important;
    }

    .left-sec {
        max-width: 100%;
        margin-right: 0;
        text-align: center;
    }

    .right-sec {
        margin: 20px 0;
    }

    .right-sec ul li {
        width: 100%;
        padding-right: 5px;
        float: none !important;
    }

    .right-sec ul li~li {
        margin-left: 0;
        margin-top: 0;
    }

    .right-sec ul li h3 {
        font-size: 16px;
        margin-bottom: 0px;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }

    .right-sec ul li a {
        font-size: 14px;
        padding: 5px 0;
        display: none !important;
        margin-bottom: 0;
    }

    .footer-bottom {
        border-top: none !important;
    }

    .right-sec ul li a.show {
        display: block !important;
    }
}

.footer-bottom {
    border-top: 1px solid #fff;
    padding: 15px 0 45px;
    font-size: 12px;
    color: #bfbdbd;
    margin-top: 16px;
}

.footer-bottom a {
    color: #bfbdbd;
}
</style>

<script setup>
import { useDevice } from '#imports'
const { isMobile } = useDevice()

// 响应式菜单数据
const footerMenus = reactive([
    {
        title: '关于我们',
        isOpen: false,
        children: [
            { title: '公司简介', link: '/about' },
            { title: '企业资质', link: '/about-qual' },
            { title: '研发生产', link: '/about-dev' },
            { title: '人才招聘', link: '/about-hr' },
        ]
    },
    {
        title: '产品',
        isOpen: false,
        children: [
            { title: '灯串', link: '/prod/types?type=1&sub=4' },
            { title: '电视灯带', link: '/prod/types?type=1&sub=5' },
            { title: '落地灯', link: '/prod/types?type=1&sub=6' },
            { title: '露营灯', link: '/prod/types?type=2&sub=0' },
            { title: '大路灯', link: '/prod/types?type=2&sub=7' },
        ]
    },
    {
        title: '应用案例',
        isOpen: false,
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
        isOpen: false,
        children: [
            { title: '产品保修', link: '/support?type=0' },
            { title: '常见问答', link: '/support?type=1' },
        ]
    },
    {
        title: '联系我们',
        isOpen: false,
        children: [
            { title: '联系方式', link: '/contact#info-sec' },
            { title: '在线留言', link: '/contact#message' },
        ]
    },
])

// 切换子菜单
const toggleSubMenu = (index) => {
    if (isMobile) {
        footerMenus[index].isOpen = !footerMenus[index].isOpen
    }
}


const key = 'baseInfo_data'
const baseData = ref({})
if (import.meta.client) {
  let data = sessionStorage.getItem(key);
  if (data) {
    baseData.value = JSON.parse(data);
  }
}

const phone = computed(() => baseData.value.info?.phone);
const fax = computed(() => baseData.value.info?.fax);
const email = computed(() => baseData.value.info?.email);
const email2 = computed(() => baseData.value.info?.email2);
const startYear = computed(() => baseData.value.info?.siteStartYear);
const toYear = computed(()=> new Date().getFullYear());

const addrs = computed(() => baseData.value.addrs??[]);
</script>