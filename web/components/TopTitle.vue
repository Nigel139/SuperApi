<template>
    <section id="top-title">
        <div class="container">
            <ul class="d-flex">
                <li><a href="/" class="text-nowrap">首页</a></li>
                <template v-for="(m, index) in menus" :key="index">
                    >
                    <li v-if="index<menus.length-1" class="text-nowrap">
                        <a :href="m.link">{{ m.name }}</a>
                    </li>
                    <li v-else class="d-inline-block text-truncate">
                        <span>{{ m.name }}</span>
                    </li>
                </template>
            </ul>
        </div>
    </section>
</template>

<script setup>
const props = defineProps(['menus']);
</script>

<style scoped>
#top-title {
    background-color: #fff;
}

#top-title ul {
    margin: 20px 0 20px !important;
}

#top-title ul li~li {
    margin-left: 5px;
}

#top-title ul li a {
    margin-right: 5px;
    color: #444343 !important;
}

#top-title ul li span {
    color: #004e98 !important;
}

@media (max-width: 767px) {
    #top-title {
        font-size: 12px;
    }
}
</style>
