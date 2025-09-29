<template>
  <NuxtLayout name="about-layout">
    <section id="about-hr">
      <div class="container">
        <div class="intro text-center">
          欢迎加入思坎普让梦想成真！<br />
          在这里，你可以和LED照明行业非常棒的合作伙伴一起共事，包括善于思考的决策者和非常受欢迎的行动小组。<br />
          我们为新员工提供了各种各样的机会，让他们不断成长和发展。欢迎您加入我们，这里是我们生活和事业的新起点!
        </div>

        <div class="job-cond bg-white">
          <div class="job-cond-info d-flex align-items-center">
            <span class="fw-bold">
              地点:&nbsp;&nbsp;
            </span>
            <div class="right" style="flex: 1;">
              <div class="info-box d-inline-block" :class="{'active': (areaIndex==index)}" v-for="(area,index) in jobArea" :key="index" @click="areaIndex=index">
                <span>{{ area }}</span>
              </div>
            </div>
          </div>
          <div class="job-cond-info d-flex align-items-center mt-3">
            <span class="fw-bold">
              职位类型:&nbsp;&nbsp;
            </span>
            <div class="right" style="flex: 1;">
              <div class="info-box d-inline-block" :class="{'active': (typeIndex==index)}" v-for="(type,index) in jobType" :key="index" @click="typeIndex=index">
                <span>{{ type }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="job-info bg-white" v-for="(job,index) in jobInfo" :key="index">
          <div class="info-box">
            <div class="summary position-relative" :class="{'open': (job.opened)}" @click="job.opened=!job.opened">
              <div class="row">
                <div class="col-6 col-sm-5">{{ job.opened ? '岗位': job.title }}</div>
                <div class="col-6 col-sm-3">{{ job.opened ? '类型': job.type }}</div>
                <div class="col-6 col-sm-2 mt-2">{{ job.opened ? '地点': job.area }}</div>
                <div class="col-6 col-sm-2 mt-2">{{ job.opened ? '发布日期': job.day }}</div>
              </div>
              <i :class="[job.opened? 'icon-angle-up':'icon-angle-down'] "></i>
            </div>
            <div class="details" :class="{'d-none': (!job.opened)}">
              <div class="row">
                <div class="col-6 col-sm-5 fw-bold">{{job.title}}</div>
                <div class="col-6 col-sm-3">{{job.type}}</div>
                <div class="col-6 col-sm-2 mt-2">{{job.area}}</div>
                <div class="col-6 col-sm-2 mt-2">{{job.day}}</div>
              </div>
              <div class="mt-4 mb-4" style="white-space: pre-line;">
                {{ job.require }}
              </div>
              <div class="join-bottom">
                <a class="d-inline-block" href="#" @click.prevent="showModal = true">立即申请</a>
                <p>请发送简历至招聘邮箱：hrsz@signcomplex.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Modal :show="showModal" @close="showModal = false" >
      <template #content>
        <div class="model-content">
        请将简历发至：http://www.signcomplex.com.cn/hrsz@signcomplex.com,
        并注明应聘职位，我们的HR会与您联系，谢谢您的配合
        </div>
      </template>
    </Modal>
  </NuxtLayout>
</template>

<script setup>
const areaIndex = ref(0)
const jobArea = reactive(['全部', '深圳'])
const typeIndex = ref(0)
const jobType = reactive(['全部', '销售', '研发', '市场', '管理', '采购', '人事', '财务', '生产'])
const jobIndex = ref(0)
const jobInfo = reactive([
  {
    title: '海外业务员', type: '销售', area: '深圳', day: '2022-03-04', opened: false, require: `你的王者日常：<br/>
1 积极开拓客户、销售产品，开拓LED照明产品的国外市场，完成销售任务；<br/>
2 处理客户询盘，熟悉基本外贸流程，合作过程谈判，合同签订，完成月度/年度销售目标 ；<br/>
3 处理日常业务工作，下单，跟进订单，发货，装柜，客诉处理等；<br/>
4 熟悉公司产品，并根据市场信息，为公司研发和技术部门提供前沿新品资讯；<br/>
5 定期对重点客户进行拜访，接待客户来访，参加国内外专业展会；<br/>
6 催收客户货款，完成及时收款；<br/>
7 配合完成业务部门安排的其他事情。<br/>
你的必备freestyle：<br/>
1大专以上，英语口语无障碍，是否有外贸经验，我们不在乎，因为我们有套非常完善的培训体系，让你短时间开单，快速掌握外贸技能，想赚钱的可以来试试；<br/>
2有种持之以恒的沟通能力，有效进行跨部门沟通和推动相关事项快速解决；<br/>
3有一颗热爱外贸销售事业，敢于挑战自我，能吃苦耐劳，勤奋务实的心；<br/>
4有一种客户虐我千万遍，我待客户如初恋的坚定信念；<br/>
5有一种执着的销冠梦，并且把梦想变为现实的执行力。<br/>
俸禄结构：<br/>
1底薪+提成+月度奖励+季度奖励+年度奖励+年终奖，月入万元不是梦，年入百万也不是梦！<br/>
2 购买五险一金（社保+住房公积金）；<br/>
3有食宿补贴，有茶水间，微波炉等解决生活问题，交通便利，公司附近有地铁站（4号地铁线观澜方向-茜坑站）；<br/>
4顶尖销售高手收入上不封顶，月度和季度卓越奖，突出奖，拔尖奖等奖励，年底有丰厚的年终奖金；<br/>
5 公司新推员工期权合伙人制度，期待你成为新的合伙人！<br/>
公司平台资源流：<br/>
我们有阿里巴巴平台/官网SEO/SNS多个平台，我们一年高达5场国内外展会，人人都有机会参加，全方位多面拓展客户渠道！！<br/>
团队优势：<br/>
1深圳市思坎普科技有限公司，是一家在深圳年销售5亿以上、专注做“LED灯具”15年、工贸一体的公司，每天上班都是帅哥美女相伴，无比开心！<br/>
2我们有自建工厂一期5万多平米，二期待建中。研发团队近百人，每月持续推出新产品十多款！<br/>
3王牌销售精英带团队，经验可复制学习，只要有梦想够努力，有执行力，随时加入百万俱乐部！<br/>
4国外参加展会，拜访客户，市场调研，对于出差提供多项补助；<br/>
5健全的职业发展规划、加薪与晋升机会：优秀人才可享受内部晋升为优秀部门管理者；<br/>
6公司提供良好的工作氛围，人性化管理，业务部实行团队老带新制度，入职即有专人带领；入职即享受定期的产品专业知识培训和不定期的销售技巧培训，每年至少进行一次素质拓展活动，团队凝聚力强；<br/>
7办公环境高端大气上档次，同事相处和睦，团队氛围好，年终奖，年假，不定期下午茶；<br/>
8我们是个认真的公司，认真做产品，认真选拔人才，真诚邀请你们加入思坎普大家庭！`
  },
  {
    title: '产品经理（室内）', type: '研发', area: '深圳', day: '2022-03-04', opened: false, require: `任职要求：<br/>
1、熟悉欧美澳各类筒灯产品及安规要求，熟知市场属性和用户习惯；<br/>
2、对筒灯的产品外观、功能、产品定位有独特的见解和视角，对筒灯的设计及供应链的发展有深入了解；<br/>
3、出色的市场洞察及规划能力、善于项目管理，较好的沟通协调能力、归纳整理分析能力；<br/>
4、有良好的英文读写能力，英语4级以上，能用英语与客户沟通者更佳；<br/>
5、从事筒灯类产品经理或研发管理经验5年以上，或同等职位工作经验2年以上，条件优秀者可放宽。<br/>
岗位职责：<br/>
1、根据公司的发展目标和具体情况，制定产品中长期竞争策略，负责市场调研与分析（客户需求收集、竞争对手分析、产品开发资源匹配分析等），制定详细的产品开发计划；<br/>
2、根据市场定位，全面负责产品的生命周期管理，维持产品良好状态，保障产品的有序更新换代，进行产品改善建议评估跟进、产品开发项目管理和跟、产品上市、退市管理；<br/>
3、维持产品良好市场盈利状况，对成本、销量、利润等指标进行监控；<br/>
4、支持营销部门达成销售目标，开展产品培训、制定客户项目跟进等。`
  }
])

const showModal = ref(false)
</script>

<style scoped>
#about-hr {
  background-color: #eff1f6;
  padding-top: 45px;
  padding-bottom: 20px;
}
#about-hr .intro {
  color: #111;
  margin-bottom: 40px;
}
#about-hr .job-cond {
  cursor: pointer;
  padding: 30px 90px;
  margin-bottom: 20px;
}
#about-hr .job-cond-info {
  margin-bottom: 15px;
}
#about-hr .job-cond-info > span {
  color: #111;
  line-height: 30px;
  margin-right: 10px;
}
#about-hr .job-cond-info .info-box {
  color: #555;
  margin-right: 30px;
  padding: 8px 12px;
}
#about-hr .job-cond-info .info-box.active {
  color: #fff;
  background: #004e98;
}
#about-hr .job-info {
  margin-top: 20px;
}
#about-hr .job-info .summary {
    font-size: 18px;
    color: #333;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 2px;
    position: relative;
    padding: 40px 90px 40px 90px;
    border-bottom: 1px solid #eee;
}
#about-hr .job-info .summary.open {
    color: #111;
    margin-bottom: 0;
}

#about-hr .job-info .summary > i{
    position: absolute;
    left: auto;
    right: 90px;
    line-height: 1.5;
    top: 49px;
    width: 16px;
    text-align: center;
    font-size: 16px;
}
#about-hr .job-info .details {
    padding: 20px 90px 50px 90px;
    margin-bottom: 15px;
}
#about-hr .job-info .join-bottom > a {
    background: #004e98;
    padding: 10px 40px;
    font-size: 18px;
    color: #fff;
}
#about-hr .job-info .join-bottom > p {
    color: #7d7d7d;
    margin-top: 10px;
}
.model-content{
  padding: 40px;
}
@media (max-width: 767px) {
  #about-hr .job-cond {
    padding: 20px 10px;
    margin-bottom: 10px;
  }
  
  #about-hr .job-cond-info {
    align-items: flex-start !important;
  }
  #about-hr .job-cond-info > span {
    line-height: 20px;
    margin-right: 0;
    align-self: normal;
    padding: 5px 8px;
  }
  #about-hr .job-cond-info .info-box {
    margin-right: 10px;
    padding: 5px 8px;
  }
  #about-hr .job-info .summary {
    font-size: 14px;
    color: #111;
    padding: 10px 20px;
  }
  #about-hr .job-info .summary > i{
    right: 40px;
    top: 20px;
  }
  #about-hr .job-info .details {
    padding: 20px 20px;
  }
}
</style>