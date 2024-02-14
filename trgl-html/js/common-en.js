
(function($){

  $(function() {

    if (window.TouchEvent) {
      touch_flag = true;
    } else {
      touch_flag = false;
    }

    if ((navigator.userAgent.indexOf('iPhone') > 0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
      // $("head").append('<meta name="viewport" content="width=device-width,initial-scale=1.0">');
    } else if ((navigator.userAgent.indexOf('iPad') > 0)) {
      $("meta[name=viewport]").attr('content', 'width=1200');
      $("body").addClass("tablet");
    }

    // �A�R�[�f�B�I��
    $('.openable dt').click(function(){
      $(this).parent().toggleClass('js-active');
    });
    $('.openable dd.openable-close').click(function(){
      $(this).parent().removeClass('js-active');
    });



    // �Ǐ]�i�r
    var fn_stickynavi = new Stickynavi({
      'sticky_body_class': "sticky_pc",
      'target': "#header",
      'start_position': 0,
    });
    fn_stickynavi.run();


    // �X���[�Y�X�N���[��
    var my_scroll = new SmoothScroll({
      'target': 'a',
      'pc_offset': 130,
      'sp_offset': 50,
    });
    my_scroll.watch();

    // �y�[�W�g�b�v
    $('#pagetop').click(function(){
      $('html, body').animate({scrollTop: 0 },{duration: 600, easing: "swing"});
      return false;
    });

    // �Ǐ]�i�r
    var fn_sticky_pagetop = new Stickynavi({
      'sticky_body_class': "sticky_pagetop",
      'target': "#pagetop",
      'start_position': 0,
      'finish_position': $('#footer').offset().top,
    });
    fn_sticky_pagetop.run();
    window.addEventListener("resize", function(){
      fn_sticky_pagetop.setStateFinishPosition($('#footer').offset().top);
    }, false);


    // �X�}�z�i�r�̃Z�b�g�A�b�v
    function setipSpNav(){
      $('body').append('<div id="sp_nav"></div>');
      $('#lang_nav').clone().attr('id','').addClass('lang_nav').appendTo('#sp_nav');
      $('#sp_nav').append('<div id="sp_nav_inner"></div>');
      $('#header ul').clone().attr('id','').addClass('main_nav').appendTo('#sp_nav_inner');
      $('#header p').clone().attr('id','').addClass('lang_nav').appendTo('#sp_nav_inner');
	  $('<p class="txt"><img src="img-en/nav_title_en.png"></p>').prependTo('#sp_nav_inner');
      $('.menu-toggle').click(function (){
        $('#sp_nav').toggleClass('js-active');
		$(this).toggleClass('active');
      });
    }
    setipSpNav();


    // ���C���摜�̃��X�|���V�u�؂�ւ�
    if($('#mv_category').length > 0){
      var responimg_main = new ResponsiveImage({
        'target': '#mv_category'
      });
      responimg_main.watch();
    }

    if($('.venobox').length > 0){
      $('.venobox').venobox();
    }

  });
  
//
$(function() {
    var $fixElement = $('#header'); // �Ǐ]����v�f
    var baseFixPoint = $fixElement.offset().top; // �Ǐ]����v�f�̏����ʒu
    var fixClass = 'is-fixed'; // �Ǐ]���ɕt�^����class
 
    // �v�f���Ǐ]���鏈��
    function fixFunction() {
        var windowScrolltop = $(window).scrollTop();
        // �X�N���[���������ʒu��ʉ߂��Ă���Ƃ�
        if(windowScrolltop >= baseFixPoint) {
            $fixElement.addClass(fixClass);
        } else {
            $fixElement.removeClass(fixClass);
        }
    }
 
    $(window).on('load scroll', function() {
        fixFunction();
    });
});

//Tab
$(function() {
	$.fn.tabs({
		targetID: '#tab',
		defaultOpenTab: 1
	});
});

(function($) {
	$.fn.tabs = function(options) {
		var o = $.extend({
			targetID: '#tab',
			tabElement: '.tab li',
			boxElement: '.tabin',
			defaultOpenTab: 1,
			parmName: 'tab',
			tabName01: 'kyoto',
			tabName02: 'kumamoto',
		}, options);
	
		$(o.tabElement, o.targetID).each(function() {
			
			var selectedTab = $.cookie(o.targetID + 'selectedTab');
			if (selectedTab) {
				$(o.boxElement, o.targetID).not(':eq(' +selectedTab+')').hide();
				$(o.tabElement, o.targetID).eq(selectedTab).addClass('active');
				
				//1.2x系はこちら
				//$(o.tabElement, o.targetID).filter(':eq(' +selectedTab+')').addClass('selected');
				
			} else {
				$(o.boxElement, o.targetID).hide().eq(o.defaultOpenTab).show();
				$(o.tabElement, o.targetID).eq(o.defaultOpenTab).addClass('active');
			}
			
			
			$(this).click(function(){
				var tabIndex = $(o.tabElement, o.targetID).index(this);
				$.cookie(o.targetID + 'selectedTab', tabIndex);
				$(o.tabElement, o.targetID).removeClass('active');
				$(this).addClass('active');
				$(o.boxElement, o.targetID).hide().eq(tabIndex).addClass('active').fadeIn();
			});
			
		});
		
		var parm = getUrlVars();
		if(o.parmName in parm) {
			key = decodeURI(parm[o.parmName]);
			
			switch (key){
				case o.tabName01:
					$(o.tabElement, o.targetID).removeClass('active');
					$(o.tabElement, o.targetID).eq(0).addClass('active');	
					$(o.boxElement, o.targetID).hide();
					$(o.boxElement, o.targetID).eq(0).fadeIn();
					break;
				case o.tabName02:
					$(o.tabElement, o.targetID).removeClass('active');
					$(o.tabElement, o.targetID).eq(1).addClass('active');
					$(o.boxElement, o.targetID).hide();
					$(o.boxElement, o.targetID).eq(1).fadeIn();
					break;
			}
		}
		
		function getUrlVars() {
			var vars = [];
			var hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('#');
			for(var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = decodeURI(hash[1]);
			}
			return vars;
		}
		return this;
	};
})(jQuery);

//hide-show
    $(function(){
      /*---TOGGLE---*/
      $('.show_more2').click(function(){
        var show_text = $(this).parent('.text_wrapper').find('.dl1');
		var dlhg = $('.text_wrapper dl').height();
        var small_height = dlhg; //This is initial height.
		//console.log(small_height);
        var original_height = show_text.css({height : 'auto'}).height();
        
        if(show_text.hasClass('open')){
          /*CLOSE*/
          show_text.height(original_height).animate({height:small_height},300);
          show_text.removeClass('open');
          $(this).html('').removeClass('active');
        }else{
          /*OPEN*/
          show_text.height(small_height).animate({height:original_height},300, function(){
            show_text.height('auto');
          });
          show_text.addClass('open');
          $(this).html('').addClass('active');
        }
      });
    })

})(jQuery);
