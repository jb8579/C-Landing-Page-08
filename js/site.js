Array.prototype.shuffle = function(){
	var v = this;
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};
Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};
function month(theMonth) {
    $('.selected-month').removeClass('selected-month').hide();
    $('#'+theMonth+'-month').addClass('selected-month').show();
}
function openMore(ID) {
	$('.more-'+ID).slideToggle(200, function() {
  	});
	return false;
}
$(function(){
	/* OBJ Helpers: options */
	var options = {
		intWinners:null,
		intProWinners:null,
		intJackpots:null,
		header_height:45,
		promo_animating:false,
		support_animating:false,
		left_games_animating:false,
		play_now:true,
		jackpotsAll:0,
		red_plus_clicked:false,
		clicked_faq:false,
		resize: {
			0: {from : '#providers_title', to: '#providers_bottom-logos'},
			1: {from : '#payments_title', to: '#payments_bottom-logos' },
			2: {from : '#secured_title', to: '#secured_bottom-logos' },
			3: {from : null, to: '#games_holder' },
			4: {from : '#promotions_title', to: '#p_promotion_holder' },
			5: {from : null, to: '.promotions_content'}
		},
		games: {
			'jackpot_games' :'jackpot_games',
			'slots'         :'video_slots',
			'poker'			:'table_games',
			'undefined'		:'video_slots',
			'default'		:'video_slots',
			'card_games'	:'table_games',
			'video_poker'	:'table_games',
			'live_casino'	:'live_casino',
			'roulette_games':'table_games',
			'other_games'	:'video_slots'
		},
		winners: {
			'jackpot_games'	:'jackpot_winners',
			'slots'			:'slots_winners',
			'poker'			:'cards_winners',
			'undefined'		:'slots_winners',
			'default'		:'slots_winners',
			'card_games'	:'cards_winners',
			'video_poker'	:'cards_winners',
			'live_casino'	:'live_winners',
			'roulette_games':'roulette_winners',
			'other_games'	:'slots_winners'
		}
	};
    $('#sections').fullpage({
    	anchors:['home', 'games', 'support'],
    	lockAnchors: false,
    	verticalCentered: false,
    	paddingTop: options.header_height,
    	fitToSection:true,
    	scrollOverflow: false,
    	keyboardScrolling: true,
    	css3:true,
        recordHistory: true,
        controlArrows:false,
        sectionSelector: '.section',
        slideSelector: '.section-slide',
        normalScrollElements: '.modal',
        onLeave: function(index, nextIndex, direction){
        	if(nextIndex == 1){
        		$('#carousel').carousel('cycle');
        		$('#arrow-down').addClass('animating');
        	}else{
        		$('#carousel').carousel('pause');
        		$('#arrow-down').removeClass('animating');
        	}
        },
        afterLoad: function(anchorLink, index){
        	if(index == 1 && !$('.games-slide').hasClass('active')){
        		$('.fp-slidesContainer').css({'transform':'translate3d(0px, 0px, 0px)', 'transition': 'none'}).promise().done(function(){
        			$('.section-slide').removeClass('active');
        			$('.games-slide').addClass('active');
        		});
        	}
        	if(index == 1){
        		if($('#games_holder div:first-child').hasClass('hidden')){
        			$('.game_img').addClass('hidden');
	        		$('#games_holder div:first-child').removeClass('hidden');
	        		$('.current_title > h4 > span').text($('#w_menu li:first-child a').data('title'));
        		}
        		if($('a.jp_button').hasClass('jp_button_close')){
		    		$('a.jp_button').removeClass('jp_button_close').addClass('pulse_anim').children('i').removeClass('fa-minus').addClass('fa-plus');
			        $(".winners_list #w_menu").hide("fast", function(){
			        	options.red_plus_clicked = false;
			        });
		    	}
        	}
        	if(index == 2){
        		var active_el = $('.section-slide.active').data('anchor');
	        	$('.navbar-nav li.active').removeClass('active');
	        	$('#'+active_el+'_nav').parent().addClass('active');
        	}else{
        		var active_el = $('.section.active').data('anchor');
	        	$('.navbar-nav li.active').removeClass('active');
	        	$('#'+active_el+'_nav').parent().addClass('active');
        	}
        	if(index == 2  && $('.games-slide').hasClass('active')){
        		$('.jp_button').addClass('pulse_anim');
        		startWinners();
        		startJackpots();
        	}else{
        		stopWinners();
        		stopJackpots();
        		$('.jp_button').removeClass('pulse_anim');
        	}
        	if(index == 2 && $('.promotions').hasClass('active') && $('#p-winner').hasClass('active')){
        		startWinners("table.promo_winners_table", 10, 'intProWinners');
        	}else{
        		stopWinners('intProWinners');
        	}
        	if((index == 2  && !$('.games-slide').hasClass('active') && !$('.promotions-slide').hasClass('active')) || (index == 2  && $('.promotions-slide').hasClass('active') && options.play_now === true) || index == 3) {
				show_play();
			}else{
				hide_play();
			}
        },
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
        	if(slideIndex >= 1){
        		$('.navbar-nav li.active').removeClass('active');
        		$('#'+slideAnchor+'_nav').parent().addClass('active');
        	}else{
        		$('.navbar-nav li.active').removeClass('active');
        		$('#games_nav').parent().addClass('active');
        	}
        	if(slideIndex == 0){
        		$('.jp_button').addClass('pulse_anim');
        		startWinners();
        		startJackpots();
        	}else{
        		stopWinners();
        		stopJackpots();
        		$('.jp_button').removeClass('pulse_anim');
        	}
            if(slideIndex == 1 && $('#p-winner').hasClass('active')){
        		startWinners("table.promo_winners_table", 10, 'intProWinners');
        	}else{
        		stopWinners('intProWinners');
        	}
        	if((slideIndex === 1 && options.play_now === false) || slideIndex === 0) {
        		hide_play();
			}else{
				show_play();
			}

        },
        afterRender: function(){
        	setTimeout(function() {
        		pop_winners().done(function(){
					startWinners();
	    			resize().done(function(){
	            		resize_promotions().done(function(){
		            		imgResize().done(function(){
		            			resizeWinners().done(function(){
		            				jackPot();
									startJackpots();
		            				carousel_init('#carousel');
		            				if($('.terms_space_toggle').length > 0 && $('.terms_space').length > 0){
		            					$('.terms_space_toggle').click(function(){
		            						if($('.carousel-inner .item.active .terms_space').hasClass('hide')){
		            							$('.carousel-inner .item.active .terms_space').addClass('show bounceInLeft animated').removeClass('hide');
		            						}else{
		            							$('.carousel-inner .item.active .terms_space').addClass('hide').removeClass('show');
		            						}
		            					});
		            				}
		            			});
		            		});
		            	});
	            	});
	            });
        	}, 100);

        },
        afterResize: function(){
        	resize().done(function(){
        		resize_promotions().done(function(){
	            	resizeWinners().done(function(){
	            		imgResize().done(function(){

	            		});
	            	});
        		});
            });
        }
    });
	$("#arrow-down").on('click', function(){
		$.fn.fullpage.moveSectionDown();
	});
    /* Winners */
    $('a.jp_button').on('click', function (e) {
    	e.preventDefault();
    	if(options.red_plus_clicked === false){
    		var self = $(this);
    		options.red_plus_clicked = true;
    		if(self.hasClass('jp_button_close')){
	    		self.removeClass('jp_button_close').addClass('pulse_anim').children('i').removeClass('fa-minus').addClass('fa-plus');
		        $(".winners_list #w_menu").hide("slide", { direction: "left" }, 500, function(){
		        	startWinners();
		        	options.red_plus_clicked = false;
		        });
	    	}else{
	    		self.addClass('jp_button_close').removeClass('pulse_anim').children('i').removeClass('fa-plus').addClass('fa-minus');
		    	$(".winners_list #w_menu").show("slide", { direction: "left", duration:500 }, function(){
		    		options.red_plus_clicked = false;
		    		stopWinners();
		    	});
	    	}
    	}
    	return false;
	});
	$('#w_menu').on('click', 'a.w_link_a',function (e) {
		e.preventDefault();
		if(options.left_games_animating === false){
			options.left_games_animating = true;
			var self = $(this);
			var cat = self.data('cat');
			if($('#games_holder_'+cat).hasClass('hidden')){
				var title = self.data('title');
				$('.game_img').addClass('hidden');
				$('#games_holder_'+cat).removeClass('hidden');
				$('.current_title > h4 > span').fadeOut(300, function(){
					$(this).text(title).fadeIn();
				});
				if($('a.jp_button').hasClass('jp_button_close')){
					$('a.jp_button').removeClass('jp_button_close').addClass('pulse_anim').children('i').removeClass('fa-minus').addClass('fa-plus');
			        $(".winners_list #w_menu").hide("slide", { direction: "up" }, 500, function(){
			        	startWinners();
			        	options.left_games_animating = false;
			        });
				}
			}else{
				options.left_games_animating = false;
				return false;
			}
		}
		return false;
	});
	/* Promotions */
	$('.promo-holder_b').on('click', function(e){
			e.preventDefault();
			if(options.promo_animating === true){
				return false;
			}
			options.promo_animating = true;
			options.play_now = false;
			hide_play();
			var self   = $(this).children('a');
			var data_id = self.data('id');
			var id      = parseInt(self.attr('id').substr(-1));
			$('.promotion_holder_left').css({'display':'block'});
			animate($("#promo-holder-0"), 200).done(function() {
			    animate($("#promo-holder-1"), 200).done(function() {
					animate($("#promo-holder-2"), 200).done(function() {
						animate($("#promo-holder-3"), 200).done(function() {
							hide_up('#pr_title', 200);
							animate($("#promo-holder-4"), 200).done(function() {
								animate_content(data_id).done(function() {
									$("#p_promotion_holder").remove();
									left_promo($("#left-promo-holder-1"), 200).done(function(){
										left_promo($("#left-promo-holder-2"),200).done(function(){
											left_promo($("#left-promo-holder-3"), 200).done(function(){
												selected($("#left-promo-holder-"+id));
												left_promo($("#left-promo-holder-4"), 200).done(function(){
													options.promo_animating = false;
												});
											});
										});
									});
								});
								left_promo($("#left-promo-holder-0"), 300, 250);
							});
						});
					});
				}); 
			});

	});

	$('.promo-holder_b_de').on('click', function(e){
		e.preventDefault();
		if(options.promo_animating === true){
			return false;
		}
		options.promo_animating = true;
		options.play_now = false;
		hide_play();
		var self   = $(this).children('a');
		var data_id = self.data('id');
		var id      = parseInt(self.attr('id').substr(-1));
		$('.promotion_holder_left').css({'display':'block'});
		animate($("#promo-holder-0"), 200).done(function() {
		    animate($("#promo-holder-1"), 200).done(function() {
				animate($("#promo-holder-2"), 200).done(function() {
						hide_up('#pr_title', 200);
						animate($("#promo-holder-3"), 200).done(function() {
							animate_content(data_id).done(function() {
								$("#p_promotion_holder").remove();
								left_promo($("#left-promo-holder-1"), 200).done(function(){
									left_promo($("#left-promo-holder-2"),200).done(function(){
											selected($("#left-promo-holder-"+id));
											left_promo($("#left-promo-holder-3"), 200).done(function(){
												options.promo_animating = false;
											});
									});
								});
							});
							left_promo($("#left-promo-holder-0"), 300, 250);
						});
				});
			}); 
		});
	});

	// $('.promo-holder_b_de').on('click', function(e){
	// 		e.preventDefault();
	// 		if(options.promo_animating === true){
	// 			return false;
	// 		}
	// 		options.promo_animating = true;
	// 		options.play_now = false;
	// 		hide_play();
	// 		var self   = $(this).children('a');
	// 		var data_id = self.data('id');
	// 		var id      = parseInt(self.attr('id').substr(-1));
	// 		$('.promotion_holder_left').css({'display':'block'});
	// 		animate($("#promo-holder-0"), 200).done(function() {
	// 		    animate($("#promo-holder-1"), 200).done(function() {
	// 				animate($("#promo-holder-2"), 200).done(function() {
	// 					animate($("#promo-holder-3"), 200).done(function() {

	// 							animate_content(data_id).done(function() {
	// 								$("#p_promotion_holder").remove();
	// 								left_promo($("#left-promo-holder-1"), 200).done(function(){
	// 									left_promo($("#left-promo-holder-2"),200).done(function(){
	// 										left_promo($("#left-promo-holder-3"), 200).done(function(){
	// 											selected($("#left-promo-holder-"+id));

	// 										});
	// 									});
	// 								});
	// 							});
	// 							left_promo($("#left-promo-holder-0"), 300, 250);
	// 						});
	// 					});
	// 				});
	// 			}); 
	// 		});


	$('.promotion_holder_left').on('click', '.promo-holder',function(e){
			e.preventDefault();
			if(options.promo_animating === true){
				return false;
			}
			options.promo_animating = true;
			var self = $(this);
			var id = self.data('id');
			var promo = $('.promotions_content.active');
			if(promo.attr('id') === id){
				options.promo_animating = false;
				return false;
			}
			selected(self, 150);
			promo.hide("slide", { direction: "right" }, 300, function(){
				promo.removeClass('active');
				animate_content(id, 300, 0).done(function(){
					options.promo_animating = false;
				});
			});
			$('.promo_clone').velocity({
				scale:0
			}, {
				duration: 150,
				complete: function() {
			    	$(this).remove();
			  	}
			});

	});

	$('div.sp-icon').on('click', function(e){
		e.preventDefault();
		if(!options.support_animating){
			options.support_animating = true;
			var self = $(this);
			var id = self.data('content');
			if(self.hasClass('active')){
				options.support_animating = false;
				return false;
			}
			$('.sp-icon').removeClass('active');
			self.addClass('active');
			$('.support-content.active').hide("slide", { direction: "down" }, 300, function(){
				$(this).removeClass('active');
				$('#'+id).delay(100).show("slide", { direction: "up" }, 300, function(){
					$(this).addClass('active');
					options.support_animating = false;
				});
			});
		}
		return false;
	});
	$(".modal").on('show.bs.modal', function(e) {
        var modal = $(e.relatedTarget).data('target');
        if(modal == "#reg_modal2" || typeof modal == "undefined"){

        }else{
        	$(modal).find('.modal-body').slimscroll({ destroy: true }).slimscroll({
	       		height: '500px',
	       		alwaysVisible: true,
	       		color: '#083753',
	       	});
        }
    });
    $(".modal .faq_q_list li a").on('click', function(e){
    	e.preventDefault();
    	var self = $(this);
    	var id = self.attr('href');
    	var fromTop = $(id).position().top;
    	self.closest('.modal-body').slimScroll({ scrollTo: fromTop, animate: true });
    });
    $('a[href*="/help/coupon-help.html"]').on('click', function(e) {
        e.preventDefault();
        $('#coupon_help_modal').modal('show').find('.modal-body').slimscroll({ destroy: true }).slimscroll({
       		height: '500px',
       		alwaysVisible: true,
       		color: '#083753',
       	});
    });
    $('a[href*="/help/how-to-claim-a-bonus.html"]').on('click', function(e) {
        e.preventDefault();
        $('#claim_bonus_modal').modal('show').find('.modal-body').slimscroll({ destroy: true }).slimscroll({
       		height: '500px',
       		alwaysVisible: true,
       		color: '#083753',
       	});
    });
    $('a[href*="/self-assessment-test.html"]').on('click', function(e) {
        e.preventDefault();
        $('#assessment_modal').modal('show').find('.modal-body').slimscroll({ destroy: true }).slimscroll({
       		height: '500px',
       		alwaysVisible: true,
       		color: '#083753',
       	});
    });
    /*$('a[href*="/bonus-policy.html"]').on('click', function(e) {
        e.preventDefault();
        $('#bonus_policy_modal').modal('show').find('.modal-body').slimscroll({ destroy: true }).slimscroll({
       		height: '500px',
       		alwaysVisible: true,
       		color: '#083753',
       	});
    });*/
    $('#bonus_policy_modal').on('show.bs.modal', function(){
    	$('#welcome_package_modal').modal('hide');
    });
    $('a[href*="/help/support.html"]').on('click', function(e) {
    	e.preventDefault();
    	$('.modal').modal('hide');
    });
    $('a[href*="/responsible_gaming.html"]').on('click', function(e) {
        e.preventDefault();
        $('#responsible_modal').modal('show').find('.modal-body').slimscroll({ destroy: true }).slimscroll({
       		height: '500px',
       		alwaysVisible: true,
       		color: '#083753',
       	});
    });
    $('a[href*="/vip-lounge.html"]').on('click', function(e) {
    	e.preventDefault();
    	options.clicked_faq = true;
    	$(this).closest('.modal').modal('hide').on('hidden.bs.modal', function(e) {
    		if(options.clicked_faq){
    			$.fn.fullpage.moveTo(2,1);
    			options.clicked_faq = false;
    		}
       	});

    });
    $('a[href*="/promotions.html"]').on('click', function(e) {
        e.preventDefault();
        window.location.href = '/#games/promotions';
    });
	function carousel_init(c){
		var self = this;
		self.carouselAnimations = function (carousel, elems) {
			elems.each(function (index) {
				var el = $(this);
				var animEndEv = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
				var animation = el.data('animation')+' animated';
				var delay = el.data('delay');
				el.attr('style', '-webkit-animation-delay:'+delay+'s; -moz-animation-delay:'+delay+'s; -o-animation-delay:'+delay+'s; animation-delay:'+delay+'s')
				.promise().done(function(){
					el.addClass(animation).one(animEndEv, function () {
						el.removeClass(animation);
					});
				});
			});
		}
		var carousel = $(c);
		var firstElems = carousel.find('.item:first').find('[data-animation]');
		carousel.carousel({
			interval: 10000,
		  	pause: false,
		  	wrap: true
		});
		self.carouselAnimations(carousel, firstElems);
		carousel.on('slide.bs.carousel', function (e) {
			var elems = $(e.relatedTarget).find('[data-animation]');
		   	self.carouselAnimations(carousel, elems);
		   	if($("#main_video").length > 0){
		   		if($(e.relatedTarget).find("#main_video").length > 0) {
			       $("#main_video").get(0).play();
			    }else{
			       $("#main_video").get(0).pause();
			    }
		   	}

		});
	}
	/* Animation manipulation */
	function selected(el, speed){
		var selectedDeferred = new $.Deferred();
		speed = speed || 200;
		el.clone().removeClass('promo-holder').velocity({scale:0}, function(){
			$(this).css({
			'box-shadow': '0px 0px 10px 2px rgba(0, 0, 0, 0.50)',
			'padding-top': '10px',
			'position':'absolute',
			'height':'105%',
			'width':'105%',
			'borderWidth': 0,
			'z-index':'9999',
			'top':'-2.5%'}).promise().done(function(){
				$(this).appendTo(el).velocity({
					scale:1
				}, {
					duration: speed,
					complete: function() {
				    	selectedDeferred.resolve(true);
				    }
				}).addClass('promo_clone');
			});
		});
		return selectedDeferred.promise();
	}
	function animate(el, speed){
	    var animateDeferred = new $.Deferred();
		speed = speed || 300;
		el.velocity({
		    bottom: "-160%",
		}, {
		    duration: speed,
		    easing: "easeInOutBack",
		    complete: function() {
		    	animateDeferred.resolve(true);
		    }
		});
		return animateDeferred.promise(); 
	}

	function left_promo(el, speed, delay){
		var leftDeferred = new $.Deferred();
		speed = speed || 300;
		delay = delay || 0;
		el.velocity({
		    left: 0,
		}, {
		    duration: speed,
		    easing: "easeOutBack",
		    delay: delay,
		    complete: function() {
		    	leftDeferred.resolve(true);
		    }
		});
		return leftDeferred.promise();

	}
	function animate_content(id, speed, delay){
		var contentDeferred = new $.Deferred();
		speed = speed || 500;
		delay = delay || 150;
		var el = $('#'+id);
		el.delay(delay).show("slide", {direction: "right",  easing: 'linear'}, speed, function(){
			el.addClass('active');
			if(id == 'p-winner'){
				resizeWinners().done(function(){
					startWinners("table.promo_winners_table", 10, 'intProWinners');
					$('#carousel-promo').carousel('cycle');
				});
			}else{
				stopWinners('intProWinners');
				$('#carousel-promo').carousel('pause');
			}
			contentDeferred.resolve(true);
		});
		return contentDeferred.promise();
	}
	function hide_up(selector, speed){
		var el = $(selector);
		speed = speed || 400;
		el.hide("slide", { direction: "up" }, speed);

	}
	/*  ALL RESIZER */
	function resize(){
		var resizeDeferred = new $.Deferred();
		var section = $('.section').outerHeight(true);
		$.each(options.resize, function(index, el){
			var height = section-options.header_height;
	  		if(el.from != null){
		  		var from =  $(el.from).outerHeight(true);
		  		height = height-from;
		  	}
		  	$(el.to).height(height);
		});
		resizeDeferred.resolve(true);
		return resizeDeferred.promise();
	}
	function resize_promotions(){
		var promotionsDeferred = new $.Deferred();
		var section_h = $('.promotions-wrapper').outerHeight(true);
		var height = (section_h-6)/5;
		$('.promotion_holder_left .promo-holder').height(height);
		promotionsDeferred.resolve(true);
		return promotionsDeferred.promise();
	}
	function imgResize(){
		var imgResizeDeferred = new $.Deferred();
		var h = Math.round($('#games_holder').outerHeight(true));
		var w = Math.round($('#games_holder').outerWidth(true));
		var win = $( window ).width();
		if(win > 1400){
			var width = (w/6)-0.1;
			var height = h/5;
			var max_img = 30;
		}else{
			var width = (w/5)-0.1;
			var height = h/4;
			var max_img = 20;
		}
		$("#games_holder .game_img" ).each(function( index ) {
		  	$(this).find('img').each(function( jindex ) {
		  		if(jindex >= max_img){
		  			return false;
		  		}
			  	$(this).css({width:width+'px',height:height+'px'});
			});
		});
		imgResizeDeferred.resolve(true);
		return imgResizeDeferred.promise();
	}
	/* Winners */
	function resizeWinners(){
		var resizeWinners = new $.Deferred();
		var offset = options.header_height;
		var section = $('.section').outerHeight(true);
		var w = $('.section').outerWidth(true);
		var by = 70;
		if(w <= 1400){
			by = 53;
		}
		var from =  $('.jackpot').outerHeight(true);
		var from2 = $('#p-winner .title-wrapper').outerHeight(true);
		var height = (section-from)-offset;
		var height2 = (section-from2)-offset;
		height = (height-$('.games .current_title').outerHeight(true));
		var items = Math.floor(height/by);
		$('.winners_list').height(height);
		$('.winners_holder').height(items*by);
		$('.promo_winners_list').height(height2);
		$('#promo_table_winners').height(Math.floor((height2/by)-0.1)*by);
		resizeWinners.resolve(true);
		return resizeWinners.promise();
	}
	/* POP_MOP winners */
	function pop_winners(){
		var winnersDeferred = new $.Deferred();
		if(typeof winners != "undefined" && $.isArray(winners)){
			var table = $('#winners_table');
			var promo_table = $("#promo_winners_table");
			var tr;
			var promo_tr;
			$.each(winners.shuffle(), function(index, winner){
				var clean_app = winner.app.replace(/[^A-Z0-9]/ig, "");
				if (typeof available_games[clean_app] != "undefined"){
					var game = available_games[clean_app];
					var cat = catName(game.category, false);
					tr = $('<tr/>').appendTo(table);
					promo_tr = $('<tr/>').appendTo(promo_table);

					var td = $('<td/>', {'html': '<span class="w-icon '+cat+'"></span>'}).appendTo(tr);
					var promo_td = $('<td/>', {'html': '<span class="w-icon '+cat+'"></span>'}).appendTo(promo_tr);

					td = $('<td/>', {'align':'left','html': '<span class="title">'+winner.u+'</span>'}).appendTo(tr);
					td = $('<td/>', {'align':'right','html': '<div class="description"><span class="amount">'+winner.cid+' '+winner.amo+'</span><br><span class="game">'+winner.app+'</span></div>'}).appendTo(tr);

					promo_td = $('<td/>', {'align':'left','html': '<span class="title">'+winner.u+'</span>'}).appendTo(promo_tr);
					promo_td = $('<td/>', {'align':'right','html': '<div class="description"><span class="amount">'+winner.cid+' '+winner.amo+'</span><br><span class="game">'+winner.app+'</span></div>'}).appendTo(promo_tr);
				}
			});
			winnersDeferred.resolve(true);
		}else{
			winnersDeferred.resolve(true);
		}
		return winnersDeferred.promise();
	}
	/* Carousel Winners */
	function carousel_winners(table){
		var trLast = table.find("tr:last");
		var item;

		if(trLast.length > 1){
			item = $(trLast[0]);
		}else{
			item = trLast;
		}

		var trNew = item.clone().hide();

		trLast.remove();
		table.find("tr:first").after(trNew);
		trNew.fadeIn(400);
	}
	/**
	 * Games/Promotions Winners Start/Stop
	 * table = table to animate (id or class) default table.winners_table
	 * int min = min table row required to start animation default 5
	 * string interval = key from options obj default 'intWinners'
	 * time = default 4000 interval in miliseconds
	 */
	function startWinners(table, min, interval, time){
		table    = table || 'table.winners_table';
		interval = interval || 'intWinners';
		min      = min || 5;
	 	time     = time || 4000;
		var self = $(table);
		var tr = self.find("tr").length;
		if(tr >= min){
			if(options[interval]){
			    return false;
			}
			options[interval]= window.setInterval(function(){
				carousel_winners(self);
			}, time);
		}
		return false;
	}
	function stopWinners(interval){
		interval = interval || 'intWinners';
		if(options[interval]){
			window.clearInterval(options[interval]);
		    options[interval] = null;
		}
	    return false;
	}
	/* Play Ribbon button Start/Stop */
	function show_play(){
		var self = $('.play_now');
		if(!self.hasClass('active')){
			self.addClass('active');
			self.velocity({ left: "-0.2%" }, {duration:500});
		}
	}
	function hide_play(){
		var self = $('.play_now');
		if(self.hasClass('active')){
			self.removeClass('active');
			self.velocity({ left: "-100%" }, { duration:400 });
		}
	}
	/* HELPER FUNCTIONS */
	function jackPot(){
		if(typeof jackpots['all'] != "undefined"){
			var cookie = Cookies.get('games_loaderfncv2');
			if(typeof cookie != "undefined"){
		    	if(parseInt(jackpots['all']) > parseInt(cookie)){
		    		options.jackpotsAll = jackpots['all'];
		    	}else{
		    		options.jackpotsAll = cookie;
		    	}
		    }else{
		    	options.jackpotsAll = jackpots['all'];
		    }
	    	$('#jp_amount').html(parseFloat(options.jackpotsAll).formatMoney(2, ',', '.'));
		}
	}
	function animate_jackpots(){
		var numbers = [4420.41, 2210.76, 1562.28, 1163.28, 756.41, 452.34, 398.97, 198.67, 98.25, 46.84, 25.86];
		var chance = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.2, 0.35];
		var random_item = getRandomItem(numbers, chance);
		var plus = rand(0.99, random_item);
		options.jackpotsAll = parseFloat(options.jackpotsAll)+plus;
		$('#jp_amount').html(options.jackpotsAll.formatMoney(2, ',', '.')+'<sup>+ '+plus.formatMoney(2, ',', '.')+'</sup>');
		$('#jp_amount sup').delay(700).animate({top: '-100%', right:"-5%", opacity: 0}, 800, function(){
			Cookies.set('games_loaderfncv2', options.jackpotsAll.toFixed(2), { expires: 2 });
		});
	}
	function startJackpots(){
		if(options.intJackpots){
			return false;
		}
		options.intJackpots = window.setInterval(function(){
			animate_jackpots();
		}, 8000);
	}
	function stopJackpots(){
		if(options.intJackpots){
			window.clearInterval(options.intJackpots);
	   		options.intJackpots = null;
		}
		return false;
	}
	/* Get games/winners category name */
	function catName (cat, games){
		if(games == true){
			if (typeof options.games[cat] != "undefined"){
				return options.games[cat];
			}
			return 'video_slots';
		}else{
			if (typeof options.winners[cat] != "undefined"){
				return options.winners[cat];
			}
			return 'slots_winners';
		}
	}
	function rand(min, max) {
	    return Math.random() * (max - min) + min;
	}
	function  getRandomItem(numbers, chance) {
	    var total_chance = chance.reduce(function (prev, cur, i, arr) {
	        return prev + cur;
	    });
	    var random_num = rand(0, total_chance);
	    var chance_sum = 0;
	    for (var i = 0; i < numbers.length; i++) {
	        chance_sum += chance[i];
	        chance_sum = +chance_sum.toFixed(2);
	        if (random_num <= chance_sum) {
	            return numbers[i];
	        }
	    }
	}
});

/*KDT-988*/

$( document ).ready(function() {
	var categories = "categories=featured";
	$.get("https://games-api.netdnstrace1.com/?appName="+window.SON_CONFIG.skin+"&platform=desktop&startIndex=0&endIndex=30&country="+window.SON_CONFIG.country+"&" + categories).done(function(data) {
		console.log(data)
		document.getElementById("games_holder").innerHTML += "<div class='gamebox'>" + data.featured.games.map(function(game){
			var funMode = "<a href='Javascript:funMode.show(" + game.internal_game_id  + ");' class='btn btn-blue btn-position mt-2'>"+ pageConfig.translations['Try for free'] +"</a>";
			return "<div class='gameimg'>" + "<img alt='" + game.application_name + "' class='lazy' src='https://aws-origin.image-tech-storage.com/gameRes/rect/250/" + game.application_icon + ".jpg' width='239.9' height='176.2'/>" + "<div class='games_action'>" + "<div class='inner'>" + "<span class='title'></span>" + "<a href='Javascript:popupFull();void(0);' class='btn btn-red btn-position'>"+ pageConfig.translations['Play now'] +"</a>" + (game.fun_mode ? funMode : '') + "<div class='clear'></div>" + "</div>" + "</div>" + "</div>";
	   }).join('') + '</div>';
	}).fail(function() { 
		console.log('fail to fetch  games')  
	});
});

//Hot or Cold KDT 705
$("[open-loggedin-page]").on("click", function(event){
    var action = $(this).attr("open-loggedin-page");
    //var gameId = $(this).attr("game-id");
    var data;
    var actions = {
       
        "games/hot":{
          msgType:"openOjoMenu",
          menuItemName:"games/hot"
        },
        "games/cold":{
          msgType:"openOjoMenu",
          menuItemName:"games/cold"
        }
      };
      if(typeof(action) != "undefined" && action){
          if(actions[action].msgType == "openOjoMenu"){
              data = actions[action];
              console.log(data); 
          }else{
              return false;
          }
          window.parent.postMessage(data, "*")
      }
      event.preventDefault();
  });
  window.onload = function() {
    document.getElementById("support-email").href = "mailto:" + window.SON_CONFIG.support_email;
    document.getElementById("support-email").text = window.SON_CONFIG.support_email;
};