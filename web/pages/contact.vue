<template>
  <NuxtLayout name="default">
    <section class="banner position-relative">
      <img src="/images/banner/61d543d5a2bd4.jpg" alt="img" class="w-100" />
      <div class="position-absolute top-50 start-50 translate-middle">
        <h1 class="text-center text-white mb-0">联系我们</h1>
      </div>
    </section>

    <section id="info-sec">
      <div class="container" style="background: #1d2733;">
        <div class="map-box row">
          <div class="col-12 col-sm-6 h-100 p-0">
            <div id="map-box" class="w-100 h-100">
                <ClientOnly>
                  <Amap :mappos="[ addrs[0]?.longi, addrs[0]?.lati]" />
                </ClientOnly>            
            </div>
          </div>
          <div class="col-12 col-sm-6 right">
            <ul class="text-white">
              <li>
                <img src="/images/phone.png" alt="img" class="me-2" />
                {{ phone }}
              </li>
              <li>
                <img src="/images/fax.png" alt="img" class="me-2" />
                {{ fax }}
              </li>
              <li>
                <img src="/images/email.png" alt="img" class="me-2" />
                {{ email }}
              </li>
            </ul>
            <div class="info">
              <div class="mb-4" style="cursor: pointer;" v-for="addr in addrs">
                <p >{{ addr.name }}</p>
                <div class="d-flex">
                  <i class="icon-map-marker"></i>
                  <div class="ps-2">{{ addr.tag }}：{{ addr.address }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section id="message" style="background:#eff1f6;">
      <div class="container" style="padding: 10px 0;">
        <form class="contact-form bg-white" method="post">
          <h2 class="text-center title">在线留言</h2>
          <div class="intro text-center mb-5">
            <p class="mb-1">如果您有任何建议、产品咨询、业务合作、或使用问题，请在本页留言。</p>
            <p>我们会尽快与您联系！</p>
          </div>
          <div class="row g-3">
            <div class="col-6 mt-3 ps-3 pe-3">
              <label for="cname" class="form-label">姓名：</label>
              <input type="text" class="form-control" id="cname" placeholder="您的称呼或姓名">
            </div>
            <div class="col-6 mt-3 ps-3 pe-3">
              <label for="cemail" class="form-label">邮箱：</label>
              <input type="text" class="form-control" id="cemail" placeholder="您的联系邮箱">
            </div>
            <div class="col-6 mt-3 ps-3 pe-3">
              <label for="ctitle" class="form-label">职位：</label>
              <input type="text" class="form-control" id="ctitle" placeholder="您的职位">
            </div>
            <div class="col-6 mt-3 ps-3 pe-3">
              <label for="ccorp" class="form-label">公司：</label>
              <input type="text" class="form-control" id="ccorp" placeholder="您的公司名称">
            </div>
            <div class="col-6 mt-3 ps-3 pe-3">
              <label for="cstate" class="form-label">国家：</label>
              <input type="text" class="form-control" id="cstate" placeholder="您所在的国家">
            </div>
            <div class="col-6 mt-3 ps-3 pe-3">
              <label for="ccity" class="form-label">城市：</label>
              <input type="text" class="form-control" id="ccity" placeholder="您所在的城市">
            </div>
            <div class="col-12 mt-3 ps-3 pe-3">
              <label for="cinfo" class="form-label">信息：</label>
              <textarea class="form-control" id="cinfo" placeholder="您想咨询的问题"></textarea>
            </div>            
            <div class="col-12 mt-3 ps-3 pe-3">
              <label for="cvercode" class="form-label">验证码：</label>
              <div class="d-flex">
              <input type="text" class="form-control" id="cvercode" placeholder="请输入验证码..." style="max-width: 200px;">
              <img src="/public/images/verify.png" style="height: 38px;" />
              </div>
            </div>
            <div class="col-12 mt-3 text-center">
              <button class="btn btn-primary" type="button">提交</button>
            </div>
          </div>
        </form>
      </div>
    </section> -->
  </NuxtLayout>
</template>

<script setup>
import Amap from '~/components/Amap.vue'

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

const addrs = computed(() => baseData.value.addrs);
</script>

<style scoped>
.banner h1 {
  font-size: 40px;
  font-weight: 400;
}

#info-sec {
  background: #151c25;
  padding: 55px 0;
}

.map-box {
  background-image: url("/images/contactbg.jpg");
  background-repeat: no-repeat;
  background-position: right bottom;
}
.map-box .right {
    padding: 70px 80px 70px 100px;
}
.map-box .right ul li {
    font-size: 16px;
}
.map-box .right ul li~li {
    margin-top: 10px;
}
.map-box .right .info {
    margin-top: 40px;
    color: #fff;
    margin-bottom: 60px;
}
.map-box .right .info p {
    font-size: 20px;
    margin-bottom: 8px;
    font-weight: 400;
}
#message .contact-form {
    margin: 60px 0;
    padding: 80px 50px;
}
#message .title {
    font-size: 30px;
    color: #242424;
    margin-bottom: 5px;
}
#message .intro {
    font-size: 18px;
    color: #111;
}
@media (max-width: 767px) {
  .banner>div>h1 {
    font-size: 20px;
  }
  #info-sec {
    padding: 40px 15px;
  }
  .map-box .right {
    padding: 10px 10px;
  }
  .map-box .right ul {
      margin-top: 20px;
  }
  .map-box .right .info p {
    font-size: 16px;
  }
  .map-box .right .info .ps-2 {
    font-size: 12px;
  }

  #message .container{
    padding: 30px 0 !important;
  }
  #message .contact-form{
    margin: 10px 0;
    padding: 30px 0;
  }
  #message .title {
    font-size: 18px;
  }
  #message .intro {
      font-size: 12px;
  }
  #message label {
      font-weight: 400;
  }
  #message .intro {
    margin-bottom: 30px !important;
}
}
</style>