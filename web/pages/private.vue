<template>
    <NuxtLayout name="default">
        <TopTitle :menus="menus"></TopTitle>
        <section id="private">
            <div class="container">
                <div class="content">
                    <h1 class="text-center">
                        隐私政策
                    </h1>
                    <div>
                        <p class="text-center mb-0"> <strong>引言<br />
                                <br />
                            </strong>
                        </p>
                        <p style="margin-bottom:30px;color:#555555;font-family: white-space:normal;">
                            感谢您访问Signcomplex网站，为了保护客户隐私并重视隐私权利，我们制定了隐私政策并且申明，客户在访问网站、购买和使用Signcomplex的LED产品和服务时，我们将如何收集、使用、储存、保护和分享这些信息，与您息息相关，希望您仔细阅读。
                        </p>
                        <p style="margin-bottom:30px;color:#555555;font-family: white-space: normal;"> <strong>1.
                                网站收集的信息</strong><br />
                            客户在网站留言、 使用网络通讯工具联系，我们将要求客户提供联系信息（包括个人或公司名称、电子邮件地址、 电话等）以及您提供请求的其它信息。
                        </p>
                        <p style="margin-bottom:30px;color:#555555;font-family: white-space:normal;"> <strong>2.
                                如何使用您的信息</strong><br />
                            我们仅使用客户联系信息进行售前、售后产品服务沟通和通知，您的个人信息也用于在我们的产品和服务发生变更、向您推荐其它相关产品等。
                        </p>
                        <p style="margin-bottom:30px;color:#555555;font-family: white-space:normal;"> <strong>3.
                                如何披露您的信息</strong><br />
                            我们绝不会以与本隐私政策中描述无关的方式
                            在线使用或分享您的个人身份信息，绝不会故意将您的或您的企业的任何个人身份信息出售，出租或透露给任何第三方。如果法律要求或任何政府机构要求，我们将披露信息。如果需要保护或捍卫Signcomplex及其它客户的权利、声誉和财产，我们可能将会透露您的信息。
                        </p>
                        <p style="margin-bottom:30px;color:#555555;font-family: white-space:normal;"> <strong>4.
                                网站Cookies</strong><br />
                            Cookie是网站获取在用户计算机上用于记录保存目的的文本文件，我们使用cookies来跟踪客户的偏好和设置，其他网站无法访问我们的Cookie，而我们无法访问其他网站发布的Cookie，这保证了没有人能够访问我们客户的信息。
                        </p>
                        <p style="margin-bottom:30px;color:#555555;font-family: white-space:normal;"> <strong>5.
                                第三方网站</strong><br />
                            网站包含指向其它网站的链接，请注意，在我们审查每个我们链接的网站时，我们的隐私声明不适用于这些链接的隐私政策网站。我们对这些链接网站中包含的内容不承担任何责任。我们鼓励您阅读每个网站的隐私声明，以了解更多关于他们个人的信息。
                        </p>
                        <p style="margin-bottom:30px;color:#555555;font-family: white-space:normal;">
                            如果您对本隐私声明或网站有任何疑问，请<a href="mailto:info@signcomplex.com">联系我们</a>。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup>
const menus = reactive([
    { name: '隐私政策'}
])
</script>

<style scoped>
#private{
    background: #eff1f6;
    padding-top: 20px;
}
#private .container .content{
    background: #fff;
    padding: 80px;
}
#private .container .content h1{
    color: #111;
    font-size: 24px;
    margin-bottom: 20px;
}
#private .container .content>div{
    border-top: 1px solid #ebebeb;
    padding-top: 30px;
    margin-bottom: 40px;
}
@media (max-width: 767px) {
    #private .container .content{
        padding: 30px 10px;
    }
    #private .container .content h1{
        font-size: 16px;
        margin-bottom: 10px;
    }
    #private .container .content>div{
        padding-top: 30px;
    }
}
</style>