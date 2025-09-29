+ function(t) {
    "use strict";
    t(document).delegate(".ajax-get", "click", function() {
        var e, i = this;
        var ts='';if(t(this).attr('confirm')) ts=t(this).attr('confirm'); else ts='确认要执行该操作吗?';
        var debug=(t(this).attr('debug') || t(this).attr('debug')!==undefined) ? true :false;
        return t(this).hasClass("confirm") && !confirm(ts) ? !1 : (((e = t(this).attr("href")) || (e = t(this).attr("url"))) && (t(this).addClass("disabled").attr("autocomplete", "off").prop("disabled", !0), t.get(e).success(function(e) {
            if(debug) console.debug(e);
            if (1 == e.status) {
                if (e.url && !t(i).hasClass("no-refresh")) var o = e.info + " 页面即将自动跳转~";
                else var o = e.info;
                t.alertMessager(o, "success"), setTimeout(function() {
                    return t(i).removeClass("disabled").prop("disabled", !1), t(i).hasClass("no-refresh") ? !1 : void(e.url && !t(i).hasClass("no-forward") ? location.href = e.url : location.reload())
                }, 2e3)
            // } else 1 == e.login ? t("#login-modal").modal() : t.alertMessager(e.info, "danger"), setTimeout(function() { t(i).removeClass("disabled").prop("disabled", !1) }, 2e3)
            } else e.url ? location.href = e.url : t.alertMessager(e.info, "danger"), setTimeout(function() { t(i).removeClass("disabled").prop("disabled", !1) }, 2e3)
        })), !1)
    })
}(jQuery), + function(t) {
    "use strict";
    t(document).delegate(".ajax-post", "click",
    function() {
        var tip=t(this).attr('confirm') || '确认要执行该操作吗？';
        var debug=(t(this).attr('debug') || t(this).attr('debug')!==undefined) ? true :false;
        var e, i, o, n = t(this).attr("target-form"),
        s = this,
        a = !1;
        if ("submit" == t(this).attr("type") || (e = t(this).attr("href")) || (e = t(this).attr("url"))) {
            if (o = t("." + n), "true" === t(this).attr("hide-data")) o = t(".hide-data"),
            i = o.serialize();
            else {
                if (void 0 == o.get(0)) return ! 1;
                if ("FORM" == o.get(0).nodeName) {
                    if (t(this).hasClass("confirm") && !confirm(tip)) return ! 1;
                    e = void 0 !== t(this).attr("url") ? t(this).attr("url") : o.get(0).action,
                    i = o.serialize()
                } else if ("INPUT" == o.get(0).nodeName || "SELECT" == o.get(0).nodeName || "TEXTAREA" == o.get(0).nodeName) {
                    if (o.each(function(t, e) {
                        "checkbox" == e.type && 1 == e.checked && (a = !0)
                    }), a && t(this).hasClass("confirm") && !confirm(tip)) return ! 1;
                    i = o.serialize()
                } else {
                    if (t(this).hasClass("confirm") && !confirm(tip)) return ! 1;
                    i = o.find("input,select,textarea").serialize()
                }
            }
            if(debug) console.debug(i);
            t(s).addClass("disabled").attr("autocomplete", "off").prop("disabled", !0),
            t.post(e, i).success(function(e) {
                if(debug) console.debug(e);
                if (1 == e.status) {
                    /*zhl if (e.url && !t(s).hasClass("no-refresh")) var i = e.info + " 页面即自动跳转~";*/
                    if (e.url && !t(s).hasClass("no-refresh")) var i = e.info;
                    else var i = e.info;
                    t.alertMessager(i, "success"),
                    setTimeout(function() {
                        /*
                        return t(s).hasClass("no-refresh") ? !1 : void(e.url && !t(s).hasClass("no-forward") ?
                        (!confirm("是否立刻跳转页面?") ? (t(s).removeClass("disabled").prop("disabled", !1)) : location.href = e.url) : location.reload())
                        */
                       return t(s).hasClass("no-refresh") ? !1 : void(e.url && !t(s).hasClass("no-forward") ? location.href = e.url : location.reload())
                    },
                    2e3)
                } else t.alertMessager(e.info, "danger"),
                setTimeout(function() {
                    t(s).removeClass("disabled").prop("disabled", !1)
                },
                2e3),
                t(".reload-verify").length > 0 && t(".reload-verify").click()
            })
        }
        return ! 1
    })
} (jQuery),
+
function(t) {
    "use strict";
    var growl_settime;
    var lang=t.msgLang || [];
    function lang_fun(msg,lag) {
        if(!lag) lag='cn'
        //这里查找语音包里面的数据，返回相对于的语言
        for (var i = lang.length - 1; i >= 0; i--) { 
            if(lang[i]['cn']==msg){
                for(var j in lang[i]){
                    if(j==lag){
                        return lang[i][j];
                    }
                }
                return lang[i]['cn'];
            }
        }
        return msg;
    }
    var langmain=t.msgLangMain || 'cn';
    t.alertMessager = function(e, i, o) {
        e=lang_fun(e,langmain);
        i = i ? i: "info";
        var n = '<div class="growl"><style type="text/css"> .growl { position: fixed;top: 100px;width: 50%;left: 25%;right: 25%;z-index: 999999; } msg:nth-child(1),msg:nth-child(2),msg:nth-child(3) { display:block; } msg { display:none; padding: 5px 0; -webkit-animation: slide-from-top 1s cubic-bezier(.2, .7, .5, 1); animation: slide-from-top 1s cubic-bezier(.2, .7, .5, 1);  } msg ~ msg { border-top: 1px solid #fff; } .growl .alert { -webkit-animation: slide-from-top 1s cubic-bezier(.2, .7, .5, 1); animation: slide-from-top 1s cubic-bezier(.2, .7, .5, 1); margin-bottom: 10px } @-webkit-keyframes slide-from-top {  0% { -webkit-transform: translateY(-30%); transform: translateY(-30%); opacity: 0 }     70% { opacity: 1 }  100% { -webkit-transform: translateY(0); transform: translateY(0) } } @keyframes slide-from-top {   0% { -webkit-transform: translateY(-30%); transform: translateY(-30%); opacity: 0 }     70% { opacity: 1 }  100% { -webkit-transform: translateY(0); transform: translateY(0) } } .alert-success { background-color: #dff0d8; border-color: #d6e9c6; color: #3c763d } .alert-success .alert-link { color: #2b542c } .alert-info { background-color: #d9edf7; border-color: #bce8f1; color: #31708f } .alert-info .alert-link { color: #245269 } .alert-warning { background-color: #fcf8e3; border-color: #faebcc; color: #8a6d3b } .alert-warning .alert-link { color: #66512c } .alert-danger,alert-error { background-color: #f2dede; border-color: #ebccd1; color: #a94442 } .alert-danger .alert-link { color: #843534 } .alert-dark { background-color: rgba(0, 0, 0, .9); border-color: rgba(0, 0, 0, .8); color: #fff } .alert-dark .alert-link { color: #e6e6e6 } .alert-dark .close { text-shadow: 0 1px 0 #000 } .alert-dark .close:focus, .alert-dark .close:hover { color: #fff } </style><div class="alert alert-full alert-dismissable alert-' + i + '"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><div class="growl-message"><msg>' + e + '</msg></div></div></div>';
        !t(".growl").length ? t("body").prepend(n) : t(".growl .growl-message").prepend('<msg>'+e+'</msg>'),
        clearTimeout(growl_settime),
        growl_settime=setTimeout(function() {
            t(".growl").remove()
        },
        o ? o: 2e3)
    }

    /**
     * 获取URL值
     * @DateTime 2019-11-01
     * @author zhl <1120961740@qq.com>
     * @version  [version]
     * @param    {[type]}   name [description]
     * @return   {[type]}        [description]
     */
    t.getUrlParam = function(name) {
        var arr = window.location.search.substr(1);
        arr=t.parse_str(arr);
        if(name) return arr[name]; else return arr;
    }
    
    /**
     * URL替换
     * @DateTime 2019-07-10
     * @author zhl <1120961740@qq.com>
     * @version  3.2.5
     * @param    {url}   url 需要替换的URL
     * @param    {key}   key 替换关键词
     * @param    {val}   val 替换值
     * @return   {new_url}       替换后的URL
     */
    t.getNewUrl = function(url,key,val) {
        if(!val) val='';
        if(!url) url=window.location.href;
        if(!url || !key){
            return url;
        }
        var new_url;
        var urlarr=url.split('#');
        url=urlarr[0];
        if (url.indexOf('?') != -1) {
            var head=url.split('?'),
            url_head = head[0],
            seg = head[1].split('&'),  
            len = seg.length,
            path = [];
            var iskey=false;
            for (var i = 0;i<len;i++) {  
                if (!seg[i]) {
                    continue; 
                }  
                var s = seg[i].split('='); 
                if(s[0]==key){
                    iskey=true;
                    path.push(s[0]+'='+val);
                }else{
                    path.push(s[0]+'='+(s[1]?s[1]:''));
                }
            }  
            if(!iskey){
                path.push(key+'='+val);
            }
            new_url=url_head+'?'+path.join('&');
        } else {
            new_url = url+'?'+key+'=' + val;
        }
        urlarr[0]=new_url;
        if(urlarr[1]) new_url=urlarr.join('#');
        return new_url;
    }

    /**
     * 格式化字符串
     * @DateTime 2020-04-23
     * @author zhl <1120961740@qq.com>
     * @version  [version]
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    t.parse_str = function(str){
        var value = str.split("&"), vars = {}, param;
        for(var i=0;i<value.length;i++){
            param = value[i].split("=");
            vars[param[0]] = decodeURI(param[1]);
        }
        return vars;
    }
    /**
     * 剔除字符串的特殊字符
     * @DateTime 2020-04-23
     * @author zhl <1120961740@qq.com>
     * @version  [version]
     * @param  {[type]} tags [description]
     * @param  {[type]} val  [description]
     * @return {[type]}      [description]
     */
    t.tagsClear = function(tags,val){
        // var tags="2[~'!3@#$A,111[\[~'!@#$%^&*()\\\-+_=:\]]11DSG%4^3  &DGA\ DG*() -+65_  ASG,GADF,=,:]23 44^3 & 132\ADG~',!ADS,23a@#$,A DG, ,^GA3 &*( )-+65   34=:]23413";
        var pattern = new RegExp(/[\[~'!@#$%^&*()\\\-+_=:\]]/g); //剔除特殊字符
        if(!tags) tags=""
        var tag = ""; 
        for (var i = 0; i < tags.length; i++) { 
            tag = tag+tags.substr(i, 1).replace(pattern, ''); 
        }
        tag=tag.toLowerCase(); //转小写
        var arr=tag.split(',');
        var res=[];
        if(!val) val = []
        var value=val.join(',').split(',');
        for (var j = 0; j < arr.length; j++) { 
            var tmp=arr[j].replace(/\s{2,}/g, ' '); //多空格变一个空格
            tmp=$.trim(tmp); //去除两边空格
            // tmp=tmp.replace(/ /g, '-'); //空格变连接符
            if(tmp && tmp!="" && res.indexOf(tmp)===-1 && value.indexOf(tmp)===-1) res.push(tmp);
        }
        return res.join(',') || '';
    }
    /**
     * 鼠标控制滚动条滑动
     * @param  {[type]} dragWrap [description]
     * @return {[type]}          [description]
     */
    t.mouseMove=function(dragWrap) {
      var $dragWrapClass = "."+dragWrap;
      var $dragWrap = t($dragWrapClass);
      $dragWrap.css('overflow')!='auto' && $dragWrap.css('overflow','auto');
      //鼠标移动操作
      function Drag() {
        this.init.apply(this, arguments);
      };
      Drag.prototype = {
        constructor: Drag,
        _dom: {},
        _x: 0,
        _y: 0,
        _top: 0,
        _left: 0,
        move: false,
        down: false,
        init: function () {
          this.bindEvent();
        },
        bindEvent: function () {
          var self = this;
          t('body').on('mousedown', $dragWrapClass, function (e) {
            e && e.preventDefault();
            if (!self.move) {
              self.mouseDown(e);
            }
          });
          t('body').on('mouseup', $dragWrapClass, function (e) {
            self.mouseUp(e);
          });

          t('body').on('mousemove', $dragWrapClass, function (e) {
            if (self.down) {
              self.mouseMove(e);
            }
          });
          //解决bug，当鼠标移出当前元素时，回来还可以继续拖动
          t('body').on('mouseleave', $dragWrapClass, function (e) {
            self.mouseUp(e);
          });
        },
        mouseMove: function (e) {
          e && e.preventDefault();
          this.move = true;
          var x = this._x - e.clientX,
            y = this._y - e.clientY;
            $dragWrap.scrollLeft(this._left + x);
            $dragWrap.scrollTop(this._top + y);
        },
        mouseUp: function (e) {
          e && e.preventDefault();
          this.move = false;
          this.down = false;
          $dragWrap.css('cursor', '');
        },
        mouseDown: function (e) {
          this.move = false;
          this.down = true;
          this._x = e.clientX;
          this._y = e.clientY;
          this._top = $dragWrap.scrollTop();
          this._left = $dragWrap.scrollLeft();
          $dragWrap.css('cursor', 'move');
        }
      };
      var drag = new Drag();
    };    
    /**
     * 倒计时
     * @param  {int} sTime 开始时间，11位的时间戳
     * @param  {int} eTime 结束时间，11位的时间戳
     * @param  {Function} fun   回调
     * @return {[type]}       [description]
    */
    t.djsTime=function(sTime,eTime,fun) {   
      //倒计时
      function Djs() {
        this.init.apply(this, arguments);
      };
      Djs.prototype = {
        constructor: Djs,
        _return: {},
        iDay: 0,
        iHour: 0,
        iMinute: 0,
        iSecond: 0,
        __timeCountDown: null,
        sDay: "00",
        sHour: "00",
        sMinute: "00",
        sSecond: "00",
        sTime: 0,
        eTime: 0,
        time: 0,
        fun:function(){},
        init: function () {
          if(!sTime) sTime=0;
          var now=parseInt(new Date().getTime()/1000);
          this.sTime=sTime;
          if(sTime>now){
            if(!eTime) eTime=now;
            this.time=sTime-eTime;
          }else{
            this.time=sTime;
          }
          if(eTime) this.eTime=eTime;
          if(fun) this.fun=fun;
          if(this.time>=0){
            this.zhTime(this.time);
          }else{
            this.reTime();
          }
        },
        zhTime: function (iTime) {        
          this.iDay = parseInt(iTime / 3600*24);
          if (this.iDay > 0) {
              if (this.iDay < 10) {
                  this.sDay = "0" + this.iDay;
              } else {
                  this.sDay = this.iDay;
              }
          }else{
              this.iDay=0;
              this.sDay="00";
          }
          this.iHour = parseInt((iTime / 3600)%24);
          if (this.iHour > 0) {
              if (this.iHour < 10) {
                  this.sHour = "0" + this.iHour;
              } else {
                  this.sHour = this.iHour;
              }
          }else{
              this.iHour=0;
              this.sHour="00";
          }
          this.iMinute = parseInt((iTime / 60) % 60);
          if (this.iMinute > 0) {
              if (this.iMinute < 10) {
                  this.sMinute = "0" + this.iMinute;
              } else {
                  this.sMinute = this.iMinute;
              }
          }else{
              this.iMinute=0;
              this.sMinute="00";
          }
          this.iSecond = parseInt(iTime % 60);
          if (this.iSecond >= 0) {
              if (this.iSecond < 10) {
                  this.sSecond = "0" + this.iSecond;
              } else {
                  this.sSecond = this.iSecond;
              }
          }else{
              this.iSecond=0;
              this.sSecond="00";
          }
          this.reTime();
        },
        reTime: function () {
          var self=this;
          var obj = {
              sTime:self.sTime,
              eTime:self.eTime,
              iDay:self.iDay,
              iHour:self.iHour,
              iMinute:self.iMinute,
              iSecond:self.iSecond,
              sDay:self.sDay,
              sHour:self.sHour,
              sMinute:self.sMinute,
              sSecond:self.sSecond,
              callback:self.fun,
              time:self.time,
              list:[
                  self.time,
                  self.time + "S",
                  self.sMinute + "M:" + self.sSecond + "S",
                  self.sHour + "H:" + self.sMinute + "M:" + self.sSecond + "S",
                  self.sDay + "D:" + self.sHour + "H:" + self.sMinute + "M:" + self.sSecond + "S",
              ]
          };
          self.time = self.time - 1;
          if(self.time>=0){
              self.__timeCountDown=setTimeout(function(){
                self.zhTime(self.time);
              }, 1000);
          }else{
              clearTimeout(self.__timeCountDown);
          }
          this.fun(obj);
          return obj;
        }
      };
      var djs = new Djs();
    }
    /**
     * 关闭窗口
     * @return {[type]} [description]
     */
    t.closeWin=function() {      
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
          window.parent.location.href="about:blank";
          window.parent.close();
      } else {
          window.parent.opener = null;
          window.parent.open("", "_self");
          window.parent.close();
      }
    }
    /**
     * [笛卡尔乘积]
     * @param  {Array}   args     [原始数组] eg:[['a','b'],['c','d']]
     * @param  {Boolean} noRepeat [是否去重]
     * @return {[type]}           [description]
     */
    t.dkr=function(args,noRepeat){
        var rs   = [];

        // A. 校验并转换为JS数组
        for (var i = 0; i < args.length; i++) {
            if (!t.isArray(args[i])) {
                return false;  // 参数必须为数组
            }
        }

        // 两个笛卡尔积换算
        var bothDescartes = function (m, n){
            var r = []
            for (var i = 0; i < m.length; i++) {
                for (var ii = 0; ii < n.length; ii++) {
                    var tmp = [];
                    if (t.isArray(m[i])) {
                        tmp = m[i].slice(0);  //此处使用slice目的为了防止tmp变化，导致m也跟着变化，
                    } else {
                        tmp.push(m[i]);
                    }
                    tmp.push(n[ii]);
                    r.push(tmp);
                }
            }
            return r;
        }

        // 多个笛卡尔基数换算
        for (var i = 0; i < args.length; i++) {
            if (i == 0) {
                rs = args[i];
            } else {
                rs = bothDescartes(rs, args[i]);
            }
        }

        if(noRepeat){
            var dkr=rs.slice(0),str,arr=[];
            rs=[]
            for (var j = 0; j < dkr.length; j++) {
                str=dkr[j].slice(0)
                str=str.sort().toString()
                if(t.inArray(str,arr)==-1){
                    rs.push(dkr[j]);
                    arr.push(str)
                }
            }
        }

        return rs;
    }
    /**
     * 查询一维数组是否包含在二维数组内
     * @param  {Array}  a     [一维数组]
     * @param  {Array}  b     [二维数组]
     * @param  {String} field [二维数组属性值]
     * @return {[type]}       [description]
     */
    t.arrayIn=function(a,b,field){     
        var c=[] 
        for (var i = 0; i < b.length; i++) {
            var is=false
            for (var j = 0; j < a.length; j++) {
                if(field){
                    if(t.inArray(a[j],b[i][field])==-1){
                        is=true;
                        break;
                    }
                }else{
                    if(t.inArray(a[j],b[i])==-1){
                        is=true;
                        break;
                    }
                }
            }
            if(!is){
                c.push(b[i])
            }
        }
        return c;
    }
    /**
     * 格式化金额
     * @param  {int} money 需要格式化的金额
     * @param  {arr} huilv 格式化设置
     * @return {str}       格式化之后的金额
     */
    t.formatMoney=function(money,format){
      if(!money) money=0;
      if(!format) format={};
      var hv={
          huilv:format.huilv!=undefined ? format.huilv : 1,
          left:format.left!=undefined ? format.left : '￥',
          qianfen:format.qianfen!=undefined ? format.qianfen : ',',
          xiaoshu:format.xiaoshu!=undefined ? format.xiaoshu : '.',
          weishu:format.weishu!=undefined ? format.weishu : 2,
          right:format.right!=undefined ? format.right : ''        
      }
      var price=((money-0)*(hv.huilv-0)).toFixed(parseInt(hv.weishu))
      var arr=price.split('.')
      var zs=arr[0]+''
      var str=''
      for(var i =0; i<zs.length;i++){
          str=((i+1)%3===0 && i!=zs.length-1?hv.qianfen:'')+zs[zs.length-1-i]+str
      }
      str=hv.left+str+(arr[1]?hv.xiaoshu+arr[1]:'')+hv.right
      return str;
  }
  var staticchars = "?[H=hR~vmX9:j>|urQ'CwfpI@ns&#.YJPNM7^bgL;62a,l<4}EeGFO/qz0ZVck";
  /**
   * 前端加密
   * @DateTime 2020-07-22
   * @author zhl <1120961740@qq.com>
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   * @link https://www.cnblogs.com/niemx1030/p/12196462.html
   */
  t.encode = function(str) {
      if(!str) return '';
      var encodechars = "";
      var _str=encodeURIComponent(str);
      for(var i=0;i<_str.length;i++){
          var num0 = staticchars.indexOf(_str[i]);
          if(num0 == -1){
              var code = _str[i];
          }else{
              var code = staticchars[(num0+3)%62];
          }
          var num1 = parseInt(Math.random()*62);
          var num2 = parseInt(Math.random()*62);
          encodechars += staticchars[num1]+code+staticchars[num2];
      }
      return encodechars;
  }
  /**
   * 前端解密
   * @DateTime 2020-07-22
   * @author zhl <1120961740@qq.com>
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   * @link https://www.cnblogs.com/niemx1030/p/12196462.html
   */
  t.decode = function(_str) {
      if(!_str) return '';
      var decodechars = "";
      for(var i=1;i<_str.length;){
          var num0 = staticchars.indexOf(_str[i]);
          if(num0 == -1){
              var code = _str[i];
          }else{
              var code = staticchars[(num0+59)%62];
          }
          decodechars += code;
          i = i+3;
      }
      return decodeURIComponent(decodechars);
  }
  /**
   * 产品规格库存查询示例
   * @param  {Array}  a     [shop_spec商品规格列表]
   * eg:[{"id":"1","data_id":"14","title":"颜色","item":[{"name":"白色",choose:false},{"name":"黑色",choose:false},{"name":"红色",choose:false}]}]
   * @param  {Array}  b     [shop_item商品规格明细]
   * eg:[{"id":"1","data_id":"14","spec":["200","2020","木箱"],"stock":"0","price":"0.00","code":"ZHL202008038669"}]
   * @param  {String} c     [shop_item.item商品规格列表属性值]
   * eg:"item":[{"name":"白色",choose:false},{"name":"黑色",choose:false},{"name":"红色",choose:false}]
   * @param  {String} d     [shop_item.spec商品规格明细属性值]
   * eg:"spec":["200","2020","木箱"]
   * @return {[type]}       [description]
   * 用法： 
    var shop_spec='"[...]"'; //json str数据
    var shop_item='"[...]"'; //json str数据
    shop_spec=JSON.parse(shop_spec);
    shop_item=JSON.parse(shop_item);
    for(var i in shop_spec){
        shop_spec[i].item=[]
        for(var j in shop_spec[i].value){
            shop_spec[i].item[j]={}
            shop_spec[i].item[j].name=shop_spec[i].value[j]
            shop_spec[i].item[j].choose=false
        }
    }
    for(var i in shop_item){
        shop_item[i].spec=shop_item[i].key.join(',');
    }
    //console.debug(shop_spec,shop_item)
    shopSpecChoose(shop_spec,shop_item,'item','spec')
   */
  /**
   * [多规格产品选择]
   * @DateTime 2020-07-22
   * @author zhl <1120961740@qq.com>
   * @param  {object} a [shop_spec多规格属性]
   * @param  {object} b [shop_item多规格明细]
   * @param  {string} c [item多规格属性名称]
   * @param  {string} d [spec多规格明细名称]
   * @return {object}   [shop_spec新规格shop_item新明细choose选择项info选择详情]
   */
  t.shopSpecChoose=function(a,b,c,d){
    if(!a) a=[]; if(!b) b=[]; if(!c) c='item'; if(!d) d='spec';
    var info={},e=a.slice(0),g=b.slice(0),h={},k=[],l=[],f,i,n,s,r,j,o,m,p;
    for (f in g) {
      if(!g[f].stock) g[f].stock=0; else g[f].stock=Number(g[f].stock);
      h[g[f][d]]=g[f];
    }
    for(i in e){
      for(n in e[i][c]){
        e[i][c][n].isShow=true;
        if(e[i][c][n].choose) k[i]=e[i][c][n].name;
        s=0;
        for(r in g){
          if(g[r][d].indexOf(e[i][c][n].name)!=-1) s+=g[r].stock;
        }
        e[i][c][n].stock=s;
        if(!s) e[i][c][n].isShow=false;
      }
      l[i]=k[i]?k[i]:"";
    }
    for(j in e){
      o=l[j];
      for(m in e[j][c]){
        l[j]=e[j][c][m].name;
        if(e[j][c][m].isShow){
          e[j][c][m].isShow=function (q) {
            for(p in q){
              if(!q[p]) return true;
            }
            if(!h[q]) return false;
            if(!h[q].stock) return false;
            if(h[q].stock>0) return true;
            return false;
          }(l);
        }
      }
      l[j]=o;
    }
    if(h[k]) info=h[k];
    return {"shop_spec":e, "shop_item":g, "choose":k, "info":info};
  }
  /**
   * jQuery合并表格同类项
   * @DateTime 2020-08-24
   * @author zhl <1120961740@qq.com>
   * @param  {object} table [需要合并同类项的表格]
   * 用法：$.tableRowSpanColSpan($('.table'))
   */
  t.tableRowSpanColSpan=function(table){
    table.each(function() {      
      var leng=t(this).find('tr').eq(0).children().length;
      for (var i = 0; i < leng; i++) {        
        var checkTd,rowspan=1;
        t(this).find('tr').each(function(index, el) {
            if(index===0) checkTd=t(this).children().eq(i);
            else if(checkTd.html()==t(this).children().eq(i).html()){
                checkTd.attr('rowspan',++rowspan);
                t(this).children().eq(i).addClass('table-hidden-rowspan');
            }else {
                checkTd=t(this).children().eq(i);
                rowspan=1;
            }
        }); 
      }
      t(this).find('.table-hidden-rowspan').remove();
      t(this).find('tr').each(function(index, el) {
        if(!t(el).children().length){
          // t(this).remove();
          return;
        }
        var cTd,colspan=1;
        t(el).children().each(function(tdI, elTd) {   
            // console.debug(index,tdI,elTd)       
            if(tdI===0) cTd=this;
            else if(t(cTd).html()==t(this).html() && t(cTd).attr('rowspan')===t(this).attr('rowspan')){
                t(cTd).attr('colspan',++colspan);
                t(this).addClass('table-hidden-colpan');
            }else {
                cTd=this;
                colspan=1;
            }
        });
      }); 
      t(this).find('.table-hidden-colpan').remove();
    }); 
  }
} (jQuery);
