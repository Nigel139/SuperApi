$(document).ready(function() {
    if($(window).width() < 768){
        $('footer .footer-center ul li .top').click(function(){
            $(this).parent('li').children('a').toggleClass('a-current');
        });
    }
    
    $('body').find('.tabs-title-box').each(function() {
        $(this).find('.tabs-title').on('click', function() {
            $(this).addClass('active').siblings('.tabs-title').removeClass('active');
            var _index = $(this).index();
            $(this).parents('.tabs-box').find('.tabs-content-box').children('.tabs-content').eq(_index).addClass('active').removeClass('hide').siblings('.tabs-content').removeClass('active').addClass('hide');
        });
    });
    $('body').find('.hover-title-box').each(function() {
        $(this).find('.hover-title').hover(function() {
            $(this).addClass('active').siblings('.hover-title').removeClass('active');
            var _index = $(this).index();
            $(this).parents('.hover-box').find('.hover-content-box').children('.hover-content').eq(_index).addClass('active').removeClass('hide').siblings('.hover-content').removeClass('active').addClass('hide');
        });
        $(this).find('.hover-title').mouseout(function() {
            if ($(this).parents('section').hasClass('index-pr')) {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            }
        })
    });
    $('body').find('.hover-content').mousemove(function() { //鼠标移入
        if ($(this).parents('section').hasClass('index-pr')) {
            var _index = $(this).index();
            var _in = $(this).parent('.right').prev('.left').find('.hover-title').eq(_index);
            if (!_in.hasClass('active')) {
                _in.addClass('active');
            }
        }
    });
    $('body').find('.hover-content').mouseout(function() { //鼠标移出
        if ($(this).parents('section').hasClass('index-pr')) {
            var _index = $(this).index();
            var _in = $(this).parent('.right').prev('.left').find('.hover-title').eq(_index);
            if (_in.hasClass('active')) {
                _in.removeClass('active');
            }
        }
    });
    $('body').find('img').each(function(){
        var _src = $(this).attr('src');
        var _src11 = _src.substr(_src.length - 11);
        if(_src11=='default.gif'){
            $(this).addClass('hide');
        }
        
    });
    var _intro1 = $('body').find('.nbanner').find('.intro');
    if(_intro1.text()==''){
        _intro1.addClass('hide');
    }
    var _nbanner = $('body').find('.nbanner');
    var _imgsrc11 = _nbanner.children('img').attr('src');
    _nbanner.css('background-image',"url("+_imgsrc11+")");
    if(_nbanner.height() < _nbanner.children('div').height()){
        _nbanner.addClass("nhei");
    }
    setTimeout(function() {
        var i = 0;
        var _sLeft = 0;
        var _nav1 = $('.pr-page-menu #page-menu nav');
        if(_nav1){
            $(_nav1).children('ul').children(' li').each(function(){
                i +=+ $(this).width();
                if($(this).children('a').hasClass('active')){
                    _sLeft = $(this).offset().left; //获取当前元素与页面左边距离
                };
            });
            $(_nav1).children('ul').css('min-width',i);
            $(_nav1).scrollLeft(_sLeft-_nav1.offset()?.left);     //减去页面主体与页面左边的距离并赋值，页面打开偏移指定值
        }
    },1000);
    
    
});