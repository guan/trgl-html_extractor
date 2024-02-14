
var mainSlide = new Swiper(".main_slide", {
	loop: true,
	loopAdditionalSlides: 1,
	speed: 1200,
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	autoplay: {
		delay: 6000,
		disableOnInteraction: false,
	},
});
(function($) {

	$(window).on("load",function(){
		var s_position = 120;
		var scr = $(window).scrollTop();
		$(".parallax:not(.p-show)").each(function(){
			if(($(this).offset().top)-($(window).height()-s_position) <= scr && !$(this).hasClass("p-show") ){
				var delay = 0;
				$(this).delay(delay).queue(function(){
					$(this).addClass("p-view").dequeue();
				})
			}
		});
		//PARALLAX
		const options = {
			root: null,
			rootMargin: "-10% 0px",
			threshold: 0,
		};
		const parallax_items = document.querySelectorAll(".parallax");
		const active_name = 'p-view';
		const observer = new IntersectionObserver(doWhenIntersect, options);
		parallax_items.forEach(parallax_item => {
			observer.observe(parallax_item);
		});
		function doWhenIntersect(entries) {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					activateIndex(entry.target);
				}
			});
		}
		function activateIndex(element) {
			const newElement = element;
			newElement.classList.add(active_name);
		}

	});

})(jQuery);





