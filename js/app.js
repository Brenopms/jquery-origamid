//debounce for otimization
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Change tab
$('[data-group]').each(function(){
	var $allTarget = $(this).find('[data-target]'),
			$allClick = $(this).find('[data-click]'),
			activeClass = 'active';

	$allTarget.first().addClass(activeClass);
	$allClick.first().addClass(activeClass);

	$allClick.click(function(e){
		e.preventDefault();

		var id = $(this).data('click'),
				$target = $('[data-target="' + id + '"]');

		$allClick.removeClass(activeClass);
		$allTarget.removeClass(activeClass);

		$target.addClass(activeClass);
		$(this).addClass(activeClass);
	});
});

// //ES6 - Change tab
// const activeClass = 'active';
// const dataClickFirst = document.querySelectorAll('[data-click].first');
// const dataTargetFirst = document.querySelectorAll('[data-target].first');
// const dataClickAll= document.querySelectorAll('[data-click]');

// dataClickFirst.forEach(clk => {
// 	clk.classList.add(activeClass);
// });

// dataTargetFirst.forEach(tgt => {
// 	tgt.classList.add(activeClass);
// });

// dataClickAll.forEach(dataClick => {
// 	dataClick.addEventListener('click', function(e){
// 		e.preventDefault();

// 		//Remove class of all targets in the group
// 		let datasetGroup = this.dataset.group;
// 		const targetRemove = document.querySelectorAll(`[data-group=${datasetGroup}]`);
// 		targetRemove.forEach(tgt => {
// 			tgt.classList.remove(activeClass);
// 		});

// 		//Find and add class
// 		let datasetClick = this.dataset.click;
// 		const target = document.querySelector(`[data-target=${datasetClick}]`);
// 		target.classList.add(activeClass);
// 		dataClick.classList.add(activeClass);

// 	})
// });

////Smooth scroll to internal link
$('.menu-nav a[href^="#"]').click(function(e){
	e.preventDefault();
	var id = $(this).attr('href'),
			menuHeight = $('.menu').innerHeight(),
			targetOffset = $(id).offset().top;
	$('html, body').animate({
		scrollTop: targetOffset - menuHeight
	}, 500);
});

//Smooth scroll to the top
$('.logo').click(function(e){
	e.preventDefault();
	$('html, body').animate({
		scrollTop: 0
	}, 500)
});

//Changing active state according to the section
$('section').each(function(){
	var height = $(this).height(),
			offsetTop = $(this).offset().top,
			menuHeight = $('.menu').innerHeight(),
			id = $(this).attr('id'),
			$itemMenu = $('a[href="#' + id + '"]');

	$(window).scroll(debounce(function(){
		var scrollTop = $(window).scrollTop();
		if(offsetTop - menuHeight < scrollTop && offsetTop + height - menuHeight > scrollTop) {
			$itemMenu.addClass('active');
		} else {
			$itemMenu.removeClass('active');
		}
	}, 200));
});

//Mobile button
$('.mobile-btn').click(function(){
	$(this).toggleClass('active');
	$('.mobile-menu').toggleClass('active');
});

 //Slider 
(function(){
	function slider(sliderName, velocidade) {
		var sliderClass = '.' + sliderName,
				activeClass = 'active',
				rotate = setInterval(rotateSlide, velocidade);

		$(sliderClass + ' > :first').addClass(activeClass);

		$(sliderClass).hover(function(){
			clearInterval(rotate);
		}, function() {
			rotate = setInterval(rotateSlide, velocidade);
		});

		function rotateSlide() {
			var activeSlide = $(sliderClass + ' > .' + activeClass),
					nextSlide = activeSlide.next();

			if(nextSlide.length == 0) {
				nextSlide = $(sliderClass + ' > :first');
			}
			activeSlide.removeClass(activeClass);
			nextSlide.addClass(activeClass);
		}
}

slider('introducao', 2000);
})();

// //ES6  - Slider
// (function(){
// 	function slider(sliderName, speed){
// 		let sliderClass = `.${sliderName}`,
// 			activeClass = 'active',
// 			rotate = setInterval(rotateSlide, speed);

// 		let sliderFirst = document.querySelector(`${sliderClass} > div`);
// 		sliderFirst.classList.add(activeClass);

// 		let slider = document.querySelector(sliderClass);

// 		slider.addEventListener('mouseover', () => {
// 			clearInterval(rotate);	
// 		}, () => {
// 			rotate = setInterval(rotateSlide, speed);
// 		});

// 		slider.addEventListener('mouseout', () => {
// 			rotate = setInterval(rotateSlide, speed)
// 		});

// 		function rotateSlide() {
// 			let activeSlide = document.querySelector(`${sliderClass} > .${activeClass}`),
// 			nextSlide = activeSlide.nextElementSibling;
// 			if(nextSlide === null){
// 				nextSlide = document.querySelector(`${sliderClass} > div`);
// 			}

// 			activeSlide.classList.remove(activeClass);
// 			nextSlide.classList.add(activeClass);
// 		}
// 	}

// slider('introducao', 2000);
// })();

//Scroll animation

(function(){
	var $target = $('[data-anime="scroll"]'),
			animationClass = 'animate',
			offset = $(window).height() * 3/4;

	function animeScroll() {
		var documentTop = $(document).scrollTop();

		$target.each(function(){
			var itemTop = $(this).offset().top;
			if (documentTop > itemTop - offset) {
				$(this).addClass(animationClass);
			} else {
				$(this).removeClass(animationClass);
			}
		});
	}

	animeScroll();

	$(document).scroll(debounce(function(){
		animeScroll();
	}, 200));
})();

//ES6 Scroll animation

// const target = document.querySelectorAll('[data-anime]');
// const animationClass = 'animate';
//
// function animeScroll(){
//   const windowTop = window.pageYOffset + (window.innerHeight * 0.75);
//   target.forEach((element) => {
//     if(windowTop > element.offsetTop){
//       element.classList.add(animationClass);
//     } else {
//       element.classList.remove(animationClass);
//     }
//   });
// }
//
// animeScroll();
//
// if(target.length) {
//   window.addEventListener('scroll', debounce(()=> {
//     animeScroll();
//   }, 200));
// }



