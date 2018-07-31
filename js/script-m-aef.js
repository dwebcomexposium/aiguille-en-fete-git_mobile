;(function($, window, document, undefined) {
	var $win         = $(window);
	var $doc         = $(document);
	var $dropdowns   = $('.mn-menu-submenu');
	var wrappedElements  = '.article-wrapper h2, .article-wrapper h4, .focus1 a';


	function prepareSlider($slider) {
		var $sliderClone = $slider.clone();

		$slider.after($sliderClone);
		$slider.remove();

		$sliderClone
			.attr('style', '')
			.find('.slider-content')
				.attr('style', '');
	}

	function startSlider($slider, options) {
		var $slidesContainer = $slider.find('.slider-content').length ?  $slider.find('.slider-content') : $slider;

		$slidesContainer.carouFredSel(options);
	}

	// Hide all subnav items 
	$('.mn-menu-submenu').css({
		'display': 'none'
	});

	$('#cxpmClientAccountWidget').prependTo('.site-banner');

	// Wrap titles
	$(wrappedElements).wrapInner('<span></span>');

	// Nav button 
	$('.nav-btn').on('click', function(e){
		e.preventDefault();

		$(this)
			.add('.global-wrapper')
				.toggleClass('nav-visible');

		$dropdowns.slideUp();
	});

	// Sub nav
	$('.mn-item-lvl-1 > a').on('click', function(e){
		var $dropdown = $(this).next();

		if ($dropdown.length) {
			e.preventDefault();

			$dropdown.slideToggle();

			$dropdowns
				.not($dropdown)
					.slideUp();
		}
	});

	if ($('.article-title img').length) {
		$('.article-title').addClass('has-image');
	}

	// Homepage slider
	if ($('.list-articles.slider .la-slider').length) {
		prepareSlider($('.list-articles.slider .la-slider'));

		$('.list-articles.slider .la-slider').after('<div class="slider__paging"></div>');
		
		$('.list-articles.slider .la-item-img').each(function(){
			var $this  = $(this);
			var imgSrc = $this.attr('src');

			$this
				.closest('.la-item')
					.css({
						'backgroundImage': 'url(' + imgSrc + ')'
					});
		});

		$win.on('load', function(){
			startSlider($('.list-articles.slider .la-slider'), {
				width: '100%',
				items: 1,
				responsive: true,
				scroll: { 
					duration: 700
				},
				swipe: {
					onTouch: true,
					onMouse: false
				},
				auto: {
					play: true,
					timeoutDuration: 5000
				},
				pagination: {
					container: '.slider__paging'
				},
				infinite: true
			});
		});
	}

	// Exposant page slider
	if ($('.exposant .quicklinks').length) {
		$('.exposant .quicklinks:not(:last-child) .ql-list').after('<span class="slider__prev"></span><span class="slider__next"></span>');

		$('.exposant .quicklinks:not(:last-child) .ql-item').each(function(i){
			$(this).addClass('child-' + (i + 1));
		});
		
		$win.on('load', function(){
			startSlider($('.exposant .quicklinks:not(:last-child) .ql-list'), {
				width: '100%',
				items: 1,
				responsive: true,
				scroll: { 
					duration: 700
				},
				swipe: {
					onTouch: true,
					onMouse: false
				},
				auto: {
					play: true,
					timeoutDuration: 5000
				},
				prev: {
					button: '.slider__prev'
				},
				next: {
					button: '.slider__next'
				},
				infinite: true
			});
		});
	}

	// Newsletter 
	if ($('.newsletter-form').length) {
		var $form = $('.newsletter-form');

		$form
			.detach()
			.appendTo('body');
		$form
			.find('.nf-form-input input')
			.attr('placeholder', 'Votre email');
		$form
			.find('.nf-main-content')
			.append('<a href="#" class="form-close"/>');

		$('[href*="#newsletter"]').on('click', function(e){
			e.preventDefault();

			$form.addClass('form-shown');
		});

		$doc.on('click', function(e){
			var $target = $(e.target);

			if (($target.is('.form-close, .form-close *') || !$target.is('.nf-main-content, .nf-main-content *, [href*="#newsletter"], [href*="#newsletter"] *')) && $form.hasClass('form-shown')) {
				e.preventDefault();

				$form.removeClass('form-shown');
			}

			if (!$target.is('.lang-switcher, .lang-switcher * ')) {
				$('.lang-switcher').removeClass('is-visible');
			}
		});

		if (window.location.href.indexOf('#newsletter') >= 0) {
			$form.addClass('form-shown');
		}
	}
})(jQuery, window, document);
