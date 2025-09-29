<template>
  <NuxtLayout name="about-layout">
    <section id="about-index">      
      <div class="container">
        <div class="about-content">
          <h2 class="text-center text-white">公司简介</h2>
          <div class="float-start img">
            <div>
              <img src="/images/about/61d807b06b863.jpg" alt="img" />
            </div>
            <div style="margin-top: 40px;">
              <img src="/images/about/61ef943673304.jpg" alt="img" />
            </div>
          </div>
          <div class="text-white clearfix">
            <p>
              <span style="line-height:2;">思坎普科技有限公司成立于2006年，
                致力于智能照明和普通照明灯具的研发及生产。是具有ISO9001质量管理体系、ISO14001环境管理体系、SRG体系认证的国家级高新技术企业。产品覆盖光条、线条灯等线形照明，筒灯、面板灯等商业照明，工矿灯、三防灯、投光灯等工业照明以及智能家居照明。已为来自欧美，澳大利亚及亚洲的50多个国家的客户提供定制或非定制服务。</span><br />
              <br />
              <span style="line-height:2;">
                目前拥有员工1000多名，自建生产基地13万平方米（中国大陆10万平方米，泰国3万平方米），70多条生产线维持高效能运转，具备年产2000万套灯具和2500万米灯带的能力。</span><br />
              <br />
              <span style="line-height:2;">
                思坎普始终以“客户价值”为导向，从产品研发、供应链管理、质量控制等各维度出发，为客户输出有竞争力的产品。公司年销售额5%的研发经费投入确保了产品的持续改进和创新，100多人的研发及工程团队在外形设计、电子结构、光学设计、灯光控制系统、工艺改善等方面均具有丰富的经验。公司大部分产品均为自主设计开发，已获得300多项发明和实用新型专利。完善的供应链管理体系使产品在成本及品质管控、物流管理等各环节具有明显优势。配套齐全的实验室、专业的测试设备及严格的检测程序确保产品符合CE,RoHS,UL,CUL,CB,SAA,DLC、能源之星等国际权威认证。</span><br />
              <br />
              <span style="line-height:2;"> 公司70多名精英业务员和专业的物流关务以及其他部门为客户提供优质周到的服务，使公司与客户之间的合作无缝衔接。</span>
            </p>
            <div style="text-align:justify;">
              <br />
            </div>
          </div>
        </div>
        <div class="about-culture">
          <h2 class="text-center">企业文化</h2>
          <div class="row">
            <div class="col-6 col-sm-3 text-center">
              <div class="margin0auto cont clearfix">
                <img src="/images/about/61e145a373b4c.png" alt="img" />
                <h3 class="tit">使命</h3>
                <div class="p clearfix">
                  让灯光照亮我们多彩的世界 </div>
              </div>
            </div>
            <div class="col-6 col-sm-3 text-center">
              <div class="margin0auto cont clearfix">
                <img src="/images/about/61e145a6b64a3.png" alt="img" />
                <h3 class="tit">愿景</h3>
                <div class="p clearfix">
                  成为全球照明领域的知名公司 </div>
              </div>
            </div>
            <div class="col-6 col-sm-3 text-center">
              <div class="margin0auto cont clearfix">
                <img src="/images/about/61e145a9aa90a.png" alt="img" />
                <h3 class="tit">价值观</h3>
                <div class="p clearfix">
                  真诚的态度，优良的品质，完善的服务 </div>
              </div>
            </div>
            <div class="col-6 col-sm-3 text-center">
              <div class="margin0auto cont clearfix">
                <img src="/images/about/61e145ad0d795.png" alt="img" />
                <h3 class="tit">经营理念</h3>
                <div class="p clearfix">
                  以独特的经营理念发扬企业宗旨 </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section>
  </NuxtLayout>
</template>

<script setup>

</script>

<style scoped>
#about-index{
    background-color: #eff1f6;
    padding-top: 30px;
}
.about-content{
    background-color: #1d2733;
    padding: 80px 150px 80px;
}
.about-content h2{
    font-size: 36px;
}
.about-content .img {
    max-width: 500px;
    margin-right: 60px;
    width: 40%;
}
.about-culture{
    padding: 100px 0;
}
.about-culture h2{
    font-size: 36px;
    color: #111;
    margin-bottom: 100px;
}

@media (max-width: 767px) {  
  .about-content{
      padding: 30px 10px;
  }
  .about-content h2{
      font-size: 20px;
      margin-bottom: 15px;
  }
  .about-content .img {
      float: none !important;
      width: 100% !important;
      max-width: 100% !important;
      margin-right: 0;
      margin-bottom: 20px;
  }
  .about-content .img>div:last-child {
        margin-top: 10px !important;
  }
  .about-culture{
    padding: 40px 0;
  }
  .about-culture h2{
      font-size: 24px;
      margin-bottom: 25px;
  }
}
</style>