
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');




// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageBody = document.querySelectorAll('.image-body, figure');
imageBody.forEach(imageBody => {
	const img = imageBody.querySelector('img'), style = getComputedStyle(imageBody);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageBody.style.paddingTop = Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%';
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.header__nav--list > li > a, .split-text').forEach(splitText => {
	splitText.style.opacity = 0;
})

let typeSplit;

function runSplit() {

	typeSplit = new SplitType(".header__nav--list > li > a, .split-text", {
		types: "lines"
	});

	Array.from(typeSplit.lines).forEach(line => {
		let addLine;
		addLine = line.cloneNode(true);
		addLine.classList.remove('line')
		addLine.classList.add('line-body');
		line.innerHTML = "";
		line.append(addLine)
	})

	document.querySelectorAll('.header__nav--list > li > a, .split-text').forEach(splitText => {
		splitText.style.opacity = 1;
	})

	

}

/* setTimeout(() => {

	

	

},0) */

class LoopingElement {
	constructor(element, currentTranslation, speed, go) {
		this.element = element;
		this.currentTranslation = currentTranslation;
		this.speed = speed;
		this.direction = true;
		this.scrollTop = 0;
		this.metric = 100;

		this.lerp = {
			current: this.currentTranslation,
			target: this.currentTranslation,
			factor: 0.2,
		};

		this.events();
		this.render();

		this.go = go
	}

	events() {
		window.addEventListener("scroll", (e) => {
			let direction =
				window.pageYOffset || document.documentElement.scrollTop;
			if (this.go) {
				this.direction = true;
				this.lerp.target += this.speed * 4;
			} else {
				this.direction = false;
				this.lerp.target -= this.speed * 4;
			}
			this.scrollTop = direction <= 0 ? 0 : direction;
		});
	}

	lerpFunc(current, target, factor) {
		this.lerp.current = current * (1 - factor) + target * factor;
	}

	goForward() {
		this.lerp.target += this.speed;
		if (this.lerp.target > this.metric) {
			this.lerp.current -= this.metric * 2;
			this.lerp.target -= this.metric * 2;
		}
	}

	goBackward() {
		this.lerp.target -= this.speed;
		if (this.lerp.target < -this.metric) {
			this.lerp.current -= -this.metric * 2;
			this.lerp.target -= -this.metric * 2;
		}
	}

	animate() {
		this.direction ? this.goForward() : this.goBackward();
		this.lerpFunc(this.lerp.current, this.lerp.target, this.lerp.factor);

		this.element.style.setProperty('--x', `${this.lerp.current}%`);
	}

	render() {
		this.animate();
		window.requestAnimationFrame(() => this.render());
	}
}

/* let imagesArray = document.querySelectorAll(".images-wrapper");

let newLol = new LoopingElement(imagesArray[0], 0, 0.1);
let highLol = new LoopingElement(imagesArray[1], -100, 0.1); */
let smoother;

window.addEventListener('load', function (event) {
	runSplit();
	const animMedia = gsap.matchMedia();

	//ScrollTrigger.disable();

	animMedia.add("(min-width: 1000px)", () => {
		smoother = ScrollSmoother.create({
			smooth: 1.5,
			effects: true,
		});

		gsap.set('.parallax-image', {
			transform: 'translate3d(0,-200px,0)',
			height: 'calc(100% + 400px)',
			top: "-200px",
		})

		gsap.to('.parallax-image', {
			scrollTrigger: {
				scrub: true,
				trigger: '.parallax-image-wrapper',
				start: "top bottom",
				
				end: "bottom top",
				//markers: true,
				  //invalidateOnRefresh: true
			},
			transform: 'translate3d(0,200px,0)',
			ease: "none",
		})

	});

	animMedia.add("(max-width: 1000px)", () => {
		/* ScrollTrigger.normalizeScroll(true);

		smoother = ScrollSmoother.create({
			smooth: 1,
			effects: false,
		}); */

		gsap.set('.parallax-image', {
			transform: 'translate3d(0,-100px,0)',
			height: 'calc(100% + 200px)',
			top: "-100px",
		})
		ScrollTrigger.config({
			ignoreMobileResize: true
		});
		gsap.to('.parallax-image', {
			scrollTrigger: {
				scrub: true,
				trigger: '.parallax-image-wrapper',
				start: "top bottom",
				
				end: "bottom top",
				//markers: true,
				//invalidateOnRefresh: true,
				ignoreMobileResize: true,
			},
			transform: 'translate3d(0,100px,0)',
			ease: "none",
		})

		/* gsap.set('.parallax-image-wrapper', {
			clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
		}) */

		
	});

	/* gsap.to('.parallax-image-wrapper picture', {
		scrollTrigger: {
			trigger: '.parallax-image-wrapper',
			start: "top bottom",
		},
		clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
		duration: 1,
		delay: 2,
		ease: "power4.out",
	}) */

	const animSections = document.querySelectorAll('.anim-section');
	animSections.forEach(animSection => {
		let timeline = gsap.timeline({
			scrollTrigger: {
				trigger: animSection,
				start: 'top center',
				//markers: true,
			},
		});

		/* const sectionNames = animSection.querySelectorAll('.section-name');
		sectionNames.forEach(sectionName => {
			timeline.to(sectionName, {
				opacity: 1,
				duration: 1,
				delay: 0.1,
				ease: "power3.out",
			})
		}) */
		
		const lines = animSection.querySelectorAll('.anim-text.split-text .line-body');
		timeline.to(lines, {
			/* scrollTrigger: {
				trigger: animSection,
				start: 'top bottom',
				markers: true,
			}, */
			transform: 'translate3d(0,0,0)',
			duration: 1,
			delay: 0.2,
			stagger: 0.15,
			ease: "power3.out",
		})

		const lines2 = animSection.querySelectorAll('.anim-text-2.split-text .line-body');
		timeline.to(lines2, {
			/* scrollTrigger: {
				trigger: animSection,
				start: 'top bottom',
				markers: true,
			}, */
			transform: 'translate3d(0,0,0)',
			duration: 0.5,
			stagger: 0.1,
			ease: "power3.out",
		},"-=1.2")

		const fadeIn = animSection.querySelectorAll('.fade-in');
		fadeIn.forEach(fadeIn => {
			timeline.to(fadeIn, {
				/* scrollTrigger: {
					trigger: fadeDown,
					start: 'top bottom'
				}, */
				duration: 1,
				opacity: 1,
			},"-=0.5")
		})

		const fadeDown = animSection.querySelectorAll('.fade-down');
		fadeDown.forEach(fadeDown => {
			timeline.to(fadeDown, {
				/* scrollTrigger: {
					trigger: fadeDown,
					start: 'top bottom'
				}, */
				duration: 1,
				opacity: 1,
				transform: 'translate3d(0,0,0)',
			},"-=0.5")
		})

		//console.log(timeline)

		//timeline.play()
		
	})

	/* const sections = document.querySelectorAll('section');
	sections.forEach(section => {
		
	}) */

	let marquee = document.querySelectorAll('.marquee__item');
	marquee.forEach(marquee => {
		let marqueeElements = marquee.querySelectorAll(".marquee__item--element"),
		speed = Number(marquee.dataset.marqueeSpeed),
		goNext = marquee.dataset.marqueeGoNext == "false" ? false : true;

		new LoopingElement(marqueeElements[0], 0, speed, goNext);
		new LoopingElement(marqueeElements[1], -100, speed, goNext);
	})
	

	//smoother.paused(true);

	setTimeout(() => {
		ScrollTrigger.refresh();
		//if(smoother) smoother.paused(false);
		//ScrollTrigger.enable();
	},100)

})





// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=







// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	const headerBurger = $('.header__burger');
	if (headerBurger) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})

		if(headerBurger.classList.contains('_mob-menu-active')) {
			setTimeout(() => {
				gsap.to('.header__nav--list > li > a .line-body', {
					transform: 'translate3d(0,0,0)',
					duration: 1,
					stagger: 0.1,
					ease: "power4.out",
				})
			},100)
		} else {
			setTimeout(() => {
				if(!headerBurger.classList.contains('_mob-menu-active')) {
					gsap.set('.header__nav--list > li > a .line-body', {
						transform: 'translate3d(0,110%,0)',
					})
				}
			},300)
		}
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-



	// =-=-=-=-=-=-=-=-=-=-=-=- <mission-accordion> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const missonAccordionTarget = $(".misson__accordion--target")
	if(missonAccordionTarget) {
	
		const block = missonAccordionTarget.closest('.misson__accordion--block'),
		content = block.querySelector('.misson__accordion--content');

		const lines = content.querySelectorAll('.split-text .line-body');

		if(!block.classList.contains('_active')) {
			block.classList.add('_active');
			if(smoother) smoother.paused(true);
			gsap.fromTo(content, {
				height: 0,
				marginTop: 0,
				ease: "circ.out",
			}, {
				height: "auto",
				marginTop: (windowSize >= 1000) ? '1.458333vw' : '14px',
				ease: "power4.out",
				onComplete: function (event) {
					if(windowSize >= 1000) ScrollTrigger.refresh();
					setTimeout(() => {
						if(smoother) smoother.paused(false);
					},200)
				}
			})
			
			gsap.to(lines, {
				transform: 'translate3d(0,0,0.0002px)',
				duration: 0.3,
				stagger: 0.05,
				ease: "power3.out",
			})
		} else {
			block.classList.remove('_active');
			if(smoother) smoother.paused(true);
			gsap.to(content, {
				height: 0,
				marginTop: 0,
				ease: "power4.out",
				onComplete: function (event) {
					if(windowSize >= 1000) {
						ScrollTrigger.refresh();
						setTimeout(() => {
							if(smoother) smoother.paused(false);
						},200)
					}
					if(!block.classList.contains('_active')) {
						gsap.set(lines, {
							transform: 'translate3d(0,120%,0.0002px)',
						})
					}
				}
			})
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </mission-accordion> -=-=-=-=-=-=-=-=-=-=-=-=
	
	

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize = 0;

function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	
	windowSize = window.innerWidth;
	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=




