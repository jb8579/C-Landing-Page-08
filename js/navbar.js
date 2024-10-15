$(function(){
	var a_svg = true;
	var a1_svg = true;
	var a2_svg = true;
	var a3_svg = true;
	var a4_svg = true;
	var a5_svg = true;
	$('#games_nav').mouseenter(function(e) {
		if(a_svg === true) {
			a_svg = false;
			$('#slot_arm').velocity({
				transformOriginY:'90px',
			    rotateX:"40deg",
			}, 400, function(){
				$(this).velocity("reverse", 200);

			});
			$('#slot_j1').delay(300).velocity({
				scaleY: '0'
			}, 100, function() {
				$(this).css({
					'-webkit-transform-origin': 'center 20px',
					'-ms-transform-origin':'0 20px 0',
					'transform-origin': '0 20px 0',
				}).velocity({
					scaleY: '1'
				}, 300, function () {
					$(this).css({
						'-webkit-transform-origin': 'center 70px',
						'-ms-transform-origin':'top 70px',
						'transform-origin': '0 70px 0',
					});
				});
			});
			$('#slot_j2').delay(400).velocity({
				scaleY: '0'
			}, 100, function() {
				$(this).css({
					'-webkit-transform-origin': 'center 20px',
					'-ms-transform-origin':'0 20px 0',
					'transform-origin': '0 20px 0',
					
				}).velocity({
					scaleY: '1'
				}, 300, function () {
					$(this).css({
						'-webkit-transform-origin': 'center 70px',
						'-ms-transform-origin':'top 70px',
						'transform-origin': '0 70px 0',
						
					});
				});
			});
			$('#slot_j3').delay(600).velocity({
				scaleY: '0'
			}, 100, function() {
				$(this).css({
					'-webkit-transform-origin': 'center 20px',
					'-ms-transform-origin':'0 20px 0',
					'transform-origin': '0 20px 0',
				}).velocity({
					scaleY: '1'
				}, 300, function () {
					$(this).css({
						'-ms-transform-origin':'top 70px',
						'-webkit-transform-origin': 'center 70px',
						'transform-origin': '0 70px 0',
					});
					a_svg = true;
				});
			});
		}
	});
	$('#secured_nav').mouseenter(function(e){
		$group_lock = $('#group_lock');
		if(a1_svg === true){
			a1_svg = false;
			$group_lock.velocity({
				translateY:"-8px"
			}, 200, function(){
				$group_lock.delay(300).velocity({
					translateY:0
				}, 200, function(){
					a1_svg = true;
				});
			});
		}
	});
	$('#support_nav').mouseenter( function(e) {
		$mic = $('#support_mic');
		if(a2_svg === true){
			a2_svg = false;
			$mic.velocity({
				translateY: '-5px',
				translateX:'-1px',
				rotateZ: "15deg"
			},200, function(){
				$mic.delay(300).velocity({
					translateY: 0,
					translateX:0,
					rotateZ: 0
				}, 200, function(){
					a2_svg = true;
				});
			});
		}
	});
	$('#providers_nav').mouseenter(function(){
		$thingy = $('#crown_thingy');
		$thingy_line =  $('#crown_thingy_line');
		$crown =  $('#crown_major');
		if(a3_svg){
			a3_svg = false;
			$thingy.velocity({
				translateY: '-5px',
			},150);
			$thingy_line.velocity({
				translateY: '5px',
			},150);
			$crown.velocity({
				scale: 1.1,
				translateY: '-5px',
				translateX:'-5px',
			},150, function(){
				$thingy.delay(300).velocity({
					translateY: 0,
				},150);
				$thingy_line.delay(300).velocity({
					translateY: 0,
				},150);
				$crown.delay(300).velocity({
					scale: 1,
					translateY: 0,
					translateX: 0,
				}, 150, function(){
					a3_svg = true;
				});
			});
		}
	});
	$('#promotions_nav').mouseenter(function(){
		$group_package = $('#package_svg_group');
		$p_left = $('#package_left');
		$p_right = $('#package_right');
		if(a4_svg){
			a4_svg = false;
			$group_package.velocity({
				rotateZ: "5deg",
				translateY: '-2px',
				translateX:'2px',
			},150);
			$p_left.velocity({
				rotateZ: "20deg",
				translateY: '-15px',
				translateX:'7px',
			},150);
			$p_right.velocity({
				rotateZ: "-20deg",
				translateY: '20px',
				translateX:'-14px',
			},150, function(){
				$group_package.delay(300).velocity({
					rotateZ: 0,
					translateY: 0,
					translateX:0,
				}, 150);
				$p_right.delay(300).velocity({
					rotateZ: 0,
					translateY: 0,
					translateX:0,
				},150);
				$p_left.delay(300).velocity({
					rotateZ: 0,
					translateY: 0,
					translateX:0,
				},150, function(){
					a4_svg = true;
				});
			});
		}
	});
	$('#payments_nav').mouseenter(function(){
		$top_m = $('#money_top');
		$bottom_m_b = $('#money_bottom');
		if(a5_svg){
			a5_svg = false;
			$top_m.velocity({
				translateY: '3px',
				translateX:'3px',
			},150);
			$bottom_m_b.velocity({
				rotateX: "180deg"
			},200, function(){
				$top_m.delay(300).velocity({
					translateY: 0,
					translateX:0,
				}, 150);
				$bottom_m_b.delay(300).velocity({
					rotateX: 0
				}, 200, function(){
					a5_svg = true;
				});	
			});
		}
	});
});
