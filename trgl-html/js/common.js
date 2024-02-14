(function($){
	$(window).on("load",function(){
		$("body").addClass("loaded");
	});
	
	$(function() {

		if (window.TouchEvent) {
			touch_flag = true;
		}else {
			touch_flag = false;
		}

		if ((navigator.userAgent.indexOf('iPhone') > 0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
			// $("head").append('<meta name="viewport" content="width=device-width,initial-scale=1.0">');
		}else if ((navigator.userAgent.indexOf('iPad') > 0)) {
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
		
		$(window).on('load',function(){
			$('#sp_nav a').click(function(){
				$('#sp_nav').removeClass('js-active');
			});
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

		var my_scroll = new SmoothScroll({
			'target': 'area',
			'pc_offset': 130,
			'sp_offset': 50,
		});
		my_scroll.watch();

		// �y�[�W�g�b�v
		$('#pagetop,.ptop').click(function(){
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
		
		
		function setipSpNav(){
			$('body').append('<div id="sp_nav"></div>');
			
			$('#lang_nav').clone().attr('id','').addClass('lang_nav').appendTo('#sp_nav');
			$('#sp_nav').append('<div id="sp_nav_inner"><span class="cls">閉じる</span></div>');
			$('#header ul#nav').clone().attr('id','').addClass('main_nav').prependTo('#sp_nav_inner');
			$('body').append('<div id="sp_nav2"></div>');
			$('#sp_nav2').append('<div id="sp_nav_inner2"><span class="cls">閉じる</span></div>');
			$('#information .flex').clone().attr('id','').prependTo('#sp_nav_inner2');
			$('.menu-toggle').click(function (){
				$('#sp_nav').toggleClass('js-active');
				$(this).toggleClass('active');
				$('#wrap').toggleClass('nv-open');
				$('#wrap').removeClass('inv-open');
				$('#sp_nav2').removeClass('js-active');
			});
			$('#sp_nav .cls').click(function (){
				$('#sp_nav').toggleClass('js-active');
				$('.menu-toggle').toggleClass('active');
				$('#wrap').toggleClass('nv-open');
			});
			$('.inf span').click(function (){
				$('#sp_nav2').toggleClass('js-active');
				$('#wrap').toggleClass('inv-open');
				$('#sp_nav').removeClass('js-active');
				$('.menu-toggle').removeClass('active');
				$('#wrap').removeClass('nv-open');
			});
			$('#sp_nav2 .cls').click(function (){
				$('#sp_nav2').toggleClass('js-active');
				$('#wrap').toggleClass('inv-open');
			});
		}
		setipSpNav();


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
	
	$(function() {
		var $fixElement = $('#header');
		var baseFixPoint = $fixElement.offset().top;
		var fixClass = 'is-fixed';

		
		function fixFunction() {
			var windowScrolltop = $(window).scrollTop();
			if(windowScrolltop >= baseFixPoint) {
				$fixElement.addClass(fixClass);
			}else {
				$fixElement.removeClass(fixClass);
			}
		}

		$(window).on('load scroll', function() {
			fixFunction();
		});
		
		var is_mobile =false;
		var is_smp =false;
		var is_retina =false;
		var is_ie =false;

		var ua = navigator.userAgent.toLowerCase();

		if ( ua.indexOf('iphone') > 0 || ua.indexOf('ipad') > 0 || ua.indexOf('ipod') > 0 || ua.indexOf('android') > 0) { 
			is_mobile =true;
			$("body").addClass("mobile");
		}
		if ( ua.indexOf('iphone') > 0 || ua.indexOf('android') > 0) { 
			is_smp =true;
			$("body").addClass("smp");
		}
		if ( window.devicePixelRatio >= 2) { 
			is_retina =true;
			$("body").addClass("retina");
		}
		if ( ua.indexOf('trident') > 0) { 
			is_ie =true;
			$("body").addClass("ie");
		}
		//画像2x
		if (is_mobile || is_retina) { 
			$("img.2x").each(function() {
				$(this).attr("srcset",$(this).attr("src").replace(new RegExp('(@2x)?(\.gif|\.jpg|\.png)$'), "@2x$2") +" 2x");
			});
		}
		
		$("a").each(function(){
			var urlLink = location.href;
			if(urlLink.substr( urlLink.length-1) ==="/" ){
				urlLink = urlLink+"index.html";
			}
			var tgLink = $(this).prop("href");
			if ( tgLink === urlLink ) {
				$(this).addClass("cr");
			} else if (0 <= urlLink.search(tgLink)) {
				$(this).addClass("cr");
			}
		});
	});

})(jQuery);

//info
$('.infos').click(function (){
	$('#information .infin').toggleClass('act');
 });


$(function(){
	var
		select = '.fade-in',
		selectLeft = '.fade-in-left',
		selectRight = '.fade-in-right',
		selectT = [],
		winT = 0,
		mgT = 0,
		timer = null
	;
	scrollFnc();
	$(window).on('scroll', function(){
		if(timer !== false) clearTimeout(timer);
		timer = setTimeout(function(){
				scrollFnc();
		}, 10);
	});
	function scrollFnc(){
		winT = $(window).scrollTop();
		mgT = ($(window).height() * (3 / 4));

		$(select).each(function(index){
			selectT[index] = $(this).offset().top;

			if($(this).offset().top < winT + mgT){
				$(this).css({
					'opacity':'1',
					'transform': 'translateY(0px)'
				});
			}
		});

		$(selectLeft).each(function(index){
			selectT[index] = $(this).offset().top;
			if($(this).offset().top < winT + mgT){
				$(this).css({
					'opacity':'1',
					'transform':'translateX(0px)'
				});
			}
		});

		$(selectRight).each(function(index){
			selectT[index] = $(this).offset().top;
			if($(this).offset().top < winT + mgT){
				$(this).css({
					'opacity':'1',
					'transform': 'translateX(0px)'
				});
			}
		});
	}

});

