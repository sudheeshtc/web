$(document).ready(function() {
	// SMOOTH SCROLL
	$(function() {
		$('.nav-item a, #home a').on('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 49
			}, 1000);
			event.preventDefault();
		});
	});
});
jQuery(document).ready(function() {
	jQuery(function() {
		jQuery(this).bind("contextmenu", function(event) {
			event.preventDefault();
		});
	});
});
$('.modal').on('shown.bs.modal', function(e) {
	jQuery("#gallery").unitegallery();
});

var senseSpeed = 5;
var previousScroll = 0;
$(window).scroll(function(event){
   var scroller = $(this).scrollTop();
   if (scroller-senseSpeed > previousScroll){
      $(".mouse").filter(':not(:animated)').slideUp();
   } else if (scroller+senseSpeed < previousScroll) {
      $(".mouse").filter(':not(:animated)').slideDown();
   }
   previousScroll = scroller;
});

jQuery(document).ready(function($) {
	var mainHeader = $('.cd-auto-hide-header'),
		secondaryNavigation = $('.cd-secondary-nav'),
		//this applies only if secondary nav is below intro section
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();
	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 250;
	mainHeader.on('click', '.nav-trigger', function(event) {
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
	});
	$(window).on('scroll', function() {
		if(!scrolling) {
			scrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(autoHideHeader, 250): requestAnimationFrame(autoHideHeader);
		}
	});
	$(window).on('resize', function() {
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();
		(belowNavHeroContent.length > 0) ? checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);
		previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
		if(previousTop - currentTop > scrollDelta) {
			//if scrolling up...
			mainHeader.removeClass('is-hidden');
		} else if(currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
			//if scrolling down...
			mainHeader.addClass('is-hidden');
		}
	}
});

var w = window.matchMedia("(max-width: 599px)");
var vid = document.getElementById("vid");
var source = document.createElement("source");
source.id = "hvid";
source.setAttribute("type", "video/mp4");
vid.appendChild(source);
if(w.matches) {
	source.removeAttribute("src");
	source.setAttribute("src", "images/ARC Construction Mobile_10sec.mp4");
} else {
	source.removeAttribute("src");
	source.setAttribute("src", "images/ARC Construction Desktop_10sec.mp4");
}
window.addEventListener("resize", function() {
	var w = window.matchMedia("(max-width: 599px)");
	var vid = document.getElementById("vid");
	var source = document.getElementById("hvid");
	if(w.matches) {
		source.removeAttribute("src");
		source.src = "images/ARC Construction Mobile_10sec.mp4";
	} else {
		source.removeAttribute("src");
		source.src = "images/ARC Construction Desktop_10sec.mp4";
	}
});

// scroll magic start
const intro = document.querySelector('#scrollVideo');
const video = intro.querySelector('video');
const text = intro.querySelector('h1');
var offSet = window.innerHeight / 2; //used to offset the trigger point to the centre of the page
// console.log("screen offset=" + offSet)
const section = document.querySelector('section');
const end = section.querySelector('h1');
const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
		duration: 10000, // length of video in ms
		triggerElement: scrollVideo, //name of the element to use as trigger
		offset: offSet, // this should be half the height of the video to work properly
		triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
	})
	//.addIndicators() //used for only debugging and showing trigger handles
	.setPin(intro) // used for locking the scene in position
	.addTo(controller);
// video animation
let accVal = 0.1; // acceleration value used for easing in video
let scrollpos = 0;
let delay = 0;
scene.on("update", e => {
	// this variable is used to start the video at the trigger point
	// position where the scroll bar hits start of trigger
	// converted to seconds to be subtracted from the scroll bar position
	var scrolloffset = scene.scrollOffset() / 1000;
	// used to offset the trigger point to the centre of the page
	// it is updated everytime update is called
	// used to update the screen trigger offset point if page size is changed without refreshing
	var offSet1 = window.innerHeight / 2;
	scene.offset(offSet1)
		// console.log("screen offset=" + offSet1)
		// console.log("sceen offset=" + scene.offset())
	scrollpos = e.scrollPos / 1000;
	scrollpos -= scrolloffset;
	// to prevent the scroll time from going in negative
	if(scrollpos < 0) scrollpos = 0
		// console.log("Soll=" + scrollpos);
});
setInterval(() => {
	delay += (scrollpos - delay) * accVal;
	// console.log(delay);
	video.currentTime = parseFloat(delay).toPrecision(2);
}, 33.3); //frame rate 30 fps time in ms
const sceneA = new ScrollMagic.Scene({
		duration: 2000, // length of video in ms
		triggerElement: user_interface, //name of the element to use as trigger
		offset: offSet, // this should be half the height of the video to work properly
		triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
	})
	//.addIndicators() //used for only debugging and showing trigger handles
	.setPin(user_interface) // used for locking the scene in position
	.addTo(controller);
//this scene is used to close all the accordion menus on exiting the main SceneA
//this triggers a bit before the first sceneA1 and bit after sceneA3
const sceneAClose = new ScrollMagic.Scene({
		duration: 1000, // length of video in ms
		triggerElement: user_interface, //name of the element to use as trigger
		offset: offSet + 100, // this should be half the height of the video to work properly
		triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
	})
	//.addIndicators() //used for only debugging and showing trigger handles
	.on("leave", function(event) {}).addTo(controller);
const sceneA1 = new ScrollMagic.Scene({
		duration: 320, // length of video in ms
		triggerElement: user_interface, //name of the element to use as trigger
		offset: offSet + 200, // this should be half the height of the video to work properly
		triggerHook: 0.5, // when to trigger 0 is top 0.5 mid and 1 is bottom
	})
	//.addIndicators() //used for only debugging and showing trigger handles
	.on("enter", function(event) {
		$('#collapseOne').collapse('show');
		$(".d1c").show();
		$(".d2c").hide();
		$(".d3c").hide();
	}).addTo(controller);
const sceneA2 = new ScrollMagic.Scene({
		duration: 350, // length of video in ms
		triggerElement: user_interface, //name of the element to use as trigger
		offset: offSet + 700, // this should be half the height of the video to work properly
		triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
	})
	//.addIndicators() //used for only debugging and showing trigger handles
	.on("enter", function(event) {
		$('#collapseTwo').collapse('show');
		$(".d1c").hide();
		$(".d2c").show();
		$(".d3c").hide();
	}).addTo(controller);
const sceneA3 = new ScrollMagic.Scene({
		duration: 300, // length of video in ms
		triggerElement: user_interface, //name of the element to use as trigger
		offset: offSet + 1200, // this should be half the height of the video to work properly
		triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
	})
	//.addIndicators() //used for only debugging and showing trigger handles
	.on("enter", function(event) {
		$('#collapseThree').collapse('show');
		$(".d12").hide();
		$(".d2c").hide();
		$(".d3c").show();
	}).addTo(controller);
const sceneB = new ScrollMagic.Scene({
		duration: 2000, // length of video in ms
		triggerElement: tabc_interface, //name of the element to use as trigger
		offset: offSet, // this should be half the height of the video to work properly
		triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
	})
	//.addIndicators() //used for only debugging and showing trigger handles
	.setPin(tabc_interface) // used for locking the scene in position
	.addTo(controller);
//this scene is used to close all the accordion menus on exiting the main SceneA
//this triggers a bit before the first sceneA1 and bit after sceneA3
const sceneBClose = new ScrollMagic.Scene({
		duration: 1000, // length of video in ms
		triggerElement: tabc_interface, //name of the element to use as trigger
		offset: offSet + 100, // this should be half the height of the video to work properly
		triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
	})
	//.addIndicators() //used for only debugging and showing trigger handles
	.on("leave", function(event) {}).addTo(controller);
const sceneB1 = new ScrollMagic.Scene({
		duration: 350, // length of video in ms
		triggerElement: tabc_interface, //name of the element to use as trigger
		offset: offSet + 200, // this should be half the height of the video to work properly
		triggerHook: 0.5, // when to trigger 0 is top 0.5 mid and 1 is bottom
	})
	//.addIndicators() //used for only debugging and showing trigger handles
	.on("enter", function(event) {
		$('#collapse-One').collapse('show');
		$('#collapse-Two').collapse('hide');
		$(".imc2").show();
		$(".imc1").hide();
	}).addTo(controller);
const sceneB2 = new ScrollMagic.Scene({
		duration: 350, // length of video in ms
		triggerElement: tabc_interface, //name of the element to use as trigger
		offset: offSet + 700, // this should be half the height of the video to work properly
		triggerHook: 0.5 // when to trigger 0 is top 0.5 mid and 1 is bottom
	})
	//.addIndicators() //used for only debugging and showing trigger handles
	.on("enter", function(event) {
		$('#collapse-Two').collapse('show');
		$('#collapse-One').collapse('hide');
		$(".imc1").show();
		$(".imc2").hide();
	}).addTo(controller);
// Banner scroll start				
function init() {
	//Section Home
	const tmlHome = new TimelineMax();
	tmlHome.to('#home .bg', 1, {
		y: '50%',
		ease: Linear.easeNone
	});
	const sceneHome = new ScrollMagic.Scene({
		triggerHook: 'onLeave',
		triggerElement: '#home',
		duration: '100%'
	});
	sceneHome.setTween(tmlHome);
	//sceneHome.addIndicators(); 
	//Controller 
	const controller = new ScrollMagic.Controller();
	controller.addScene(sceneHome);
}
$(window).ready(init);
//# sourceURL=pen.js