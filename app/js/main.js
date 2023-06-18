
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

		const parallaxImage = document.querySelectorAll('.parallax-image');
		parallaxImage.forEach(parallaxImage => {
			gsap.set(parallaxImage, {
				transform: 'translate3d(0,-200px,0)',
				height: 'calc(100% + 400px)',
				top: "-200px",
			})
	
			gsap.to(parallaxImage, {
				scrollTrigger: {
					scrub: true,
					trigger: parallaxImage.closest('.parallax-image-wrapper'),
					start: "top bottom",
					
					end: "bottom top",
					//markers: true,
					  //invalidateOnRefresh: true
				},
				transform: 'translate3d(0,200px,0)',
				ease: "none",
			})
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
		if(lines.length) {
			timeline.to(lines, {
				transform: 'translate3d(0,0,0)',
				duration: 1,
				delay: 0.2,
				stagger: 0.15,
				ease: "power3.out",
			})
		}
		

		const lines2 = animSection.querySelectorAll('.anim-text-2.split-text .line-body');
		if(lines2.length) {
			timeline.to(lines2, {
				transform: 'translate3d(0,0,0)',
				duration: 0.5,
				stagger: 0.1,
				ease: "power3.out",
			},"-=1.2")
		}

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
	

	const minMarquees = document.querySelectorAll('[data-append-marquee]');
	minMarquees.forEach(minMarquee => {
		const marquee = document.createElement('div');
		marquee.innerHTML = `<span>${minMarquee.dataset.appendMarquee}</span><span>${minMarquee.dataset.appendMarquee}</span>`;
		marquee.classList.add('min-marquee');
		marquee.classList.add('text');
		minMarquee.append(marquee);
	})

	const blogCursor = document.querySelector('.blog__cursor'),
	blogItem = document.querySelectorAll('.blog__item');

	const blogWrapper = document.querySelector('.blog__wrapper');

	let xTo = gsap.quickTo(blogCursor, "x", {duration: 0.3, ease: "power3"}),
    yTo = gsap.quickTo(blogCursor, "y", {duration: 0.3, ease: "power3"});

	blogWrapper.addEventListener('pointermove', function (event) {
		xTo(event.clientX);
		yTo(event.clientY);
	})

	blogWrapper.addEventListener('pointerenter', function (event) {
		gsap.set(blogCursor, {x: event.clientX, duration: 0, ease: "power3"});
		gsap.set(blogCursor, {y: event.clientY, duration: 0, ease: "power3"});
		blogCursor.classList.add('_hover');
	});

	blogWrapper.addEventListener('pointerleave', function (event) {
		blogCursor.classList.remove('_hover');
	})

	setTimeout(() => {
		
		
	},200)

	blogItem.forEach((blogItem, index) => {
		blogItem.addEventListener('pointerenter', function (event) {
			blogCursor.dataset.index = index;
			blogItem.classList.add('_hover');
		})
		blogItem.addEventListener('pointerleave', function (event) {
			//blogItem.classList.remove('_hover');
		})
	})

	setTimeout(() => {
		
		ScrollTrigger.refresh();
		
	},100)

	

})





// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

if(document.querySelector('.process__bg-slider') && document.querySelector('.process__slider')) {

	const processSlider = new Splide( '.process__slider', {
		type: 'fade',
		speed: 1000,
		pagination: false,
		rewind: true,
		arrows: true,
	});

	processSlider.on('mounted', function (event) {
		setTimeout(() => {
			//console.log(processSlider.root.querySelectorAll('.splide__slide.is-active .title.split-text .line-body'))
			gsap.to(processSlider.root.querySelectorAll('.splide__slide.is-active .title.split-text .line-body'), {
				scrollTrigger: {
					trigger: processSlider.root,
					start: "top bottom",
				},
				transform: 'translate3d(0,0,0.0001px)',
				duration: 0.7,
				stagger: 0.07,
			})
			gsap.to(processSlider.root.querySelectorAll('.splide__slide.is-active .text.split-text .line-body'), {
				scrollTrigger: {
					trigger: processSlider.root,
					start: "top bottom",
				},
				transform: 'translate3d(0,0,0.0001px)',
				duration: 0.7,
				delay: 0.5,
				stagger: 0.07,
			})
			gsap.to(processSlider.root.querySelector('.splide__slide.is-active .min-marquee'), {
				scrollTrigger: {
					trigger: processSlider.root,
					start: "top bottom",
				},
				opacity: 1,
				duration: 0.7,
				delay: 0.7,
			})
		},500)
	})

	//processSlider.sync(processBgSlider);
	processSlider.mount();

	const canvas = document.querySelector('.process__bg-slider--canvas');
	
	const ctx = canvas.getContext("2d");
	const images = document.querySelectorAll('.process__bg-slider--image'),
	imagesArray = [];
	images.forEach(image => {
		const img = new Image();
		imagesArray.push(img);
	})
	
	function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

		if (arguments.length === 2) {
			x = y = 0;
			w = ctx.canvas.width;
			h = ctx.canvas.height;
		}
	
		// default offset is center
		offsetX = typeof offsetX === "number" ? offsetX : 0.5;
		offsetY = typeof offsetY === "number" ? offsetY : 0.5;
	
		// keep bounds [0.0, 1.0]
		if (offsetX < 0) offsetX = 0;
		if (offsetY < 0) offsetY = 0;
		if (offsetX > 1) offsetX = 1;
		if (offsetY > 1) offsetY = 1;
	
		var iw = img.width,
			ih = img.height,
			r = Math.min(w / iw, h / ih),
			nw = iw * r,   // new prop. width
			nh = ih * r,   // new prop. height
			cx, cy, cw, ch, ar = 1;
	
		// decide which gap to fill    
		if (nw < w) ar = w / nw;                             
		if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
		nw *= ar;
		nh *= ar;
	
		// calc source rectangle
		cw = iw / (nw / w);
		ch = ih / (nh / h);
	
		cx = (iw - cw) * offsetX;
		cy = (ih - ch) * offsetY;
	
		// make sure source rectangle is valid
		if (cx < 0) cx = 0;
		if (cy < 0) cy = 0;
		if (cw > iw) cw = iw;
		if (ch > ih) ch = ih;
	
		// fill image in dest. rectangle
		ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
	}
	
	function checkDirection(newIndex, prevIndex, slidesLength) {
		if(newIndex > prevIndex && (prevIndex != slidesLength && newIndex != 0)) {
			if(prevIndex == 0 && newIndex == slidesLength) {
				return "prev";	
			} else {
				return "next";
			}
		} else if(prevIndex == slidesLength && newIndex == 0) {
			return "next";
		} else if(newIndex < prevIndex && newIndex != 0) {
			return "prev";
		} else {
			return "prev";
		}
	}

	
	let lastWidthScreen = window.innerWidth;
	window.addEventListener('resize', function (event) {
		if(lastWidthScreen != window.innerWidth) {
			lastWidthScreen = window.innerWidth;
			canvas.width = canvas.offsetWidth;
			canvas.heigh = canvas.offsetHeight;
		}
		
	})


	
	processSlider.on('moved', function (newIndex, prevIndex) {
		setTimeout(() => {

			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			
			/* if(newIndex > prevIndex) {
				console.log('next');
				//currentIndex = newIndex;
			} else if(currentIndex >= prevIndex) {
				console.log('next');
			} else {
				console.log('prev');
			}
			currentIndex = newIndex; */
			/*  else {
				if(newIndex == 0 && prevIndex != 0) {
					console.log('prev');
					currentIndex = newIndex;
				}
				
			} */
			//console.log(newIndex + ' ' + prevIndex)
			
			if(checkDirection(newIndex, prevIndex, processSlider.length-1) == 'next') {
				//nextSlide(imagesArray[prevIndex], imagesArray[newIndex]);
				let size = Math.max(canvas.width, canvas.height);
		
				function anim(arg) {
					ctx.clearRect(0,0,canvas.width, canvas.height)
					ctx.save();

					drawImageProp(ctx, imagesArray[prevIndex], arg.imagePos, 0, canvas.width, canvas.height);
					ctx.fillStyle = `rgba(0,0,0,${arg.imageOpacity})`;
					ctx.rect(0, 0, canvas.width, canvas.height);
					ctx.fill();
					//coverImg(imageCurrent, "cover");
					ctx.beginPath();
					
					ctx.arc(arg.clipPosX, canvas.height / 2, size, 0, Math.PI * 2);
					
					ctx.clip();
					
					
					//ctx.drawImage(imageNext, 0, -window.innerHeight/2, canvas.offsetWidth, canvas.offsetWidth);
					drawImageProp(ctx, imagesArray[newIndex], 0, 0, canvas.width, canvas.height);
					
					//coverImg(imageNext, "cover");
					ctx.restore();
					
				}
				
				let arg = {
					clipPosX: -(size),
					imagePos: 0,
					imageOpacity: 0,
					//width: canvas.offsetWidth/4,
				}
				
				anim(arg);

				gsap.to(arg, {
					imageOpacity: 0.5,
					duration: 1,
					
					delay: 0.3,
					ease: "power4.inOut",
				})

				if(windowSize > 550) {
					gsap.to(arg, {
						duration: 1.5,
						imagePos: canvas.width / 3,
						delay: 0.3,
						ease: "power4.inOut",
					})
				}

				/* if(windowSize > 550) {
					gsap.to(arg, {
						duration: 1.5,
						imagePos: -(canvas.width / 3),
						delay: 0.3,
						ease: "power4.inOut",
					})
				} */

				

				gsap.to(arg, {
					clipPosX: window.innerWidth/14,
					
					//imageOpacity: 0.5,
					
					duration: 2,
					ease: "power4.inOut",
					onUpdate: function (event) {
						anim(arg);
					}
				})
			} else {
				//prevSlide(imagesArray[prevIndex], imagesArray[newIndex]);
				let size = Math.max(canvas.width, canvas.height);
		
				function anim(arg) {
					
					ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight)
					ctx.save();

					drawImageProp(ctx, imagesArray[prevIndex], arg.imagePos, 0, canvas.width, canvas.height);
					ctx.fillStyle = `rgba(0,0,0,${arg.imageOpacity})`;
					ctx.rect(0, 0, canvas.width, canvas.height);
					ctx.fill();

					ctx.beginPath();
					
					ctx.arc(arg.clipPosX, canvas.height/2, size, 0, Math.PI * 2);
					
					ctx.clip();
					//ctx.drawImage(imageNext, 0, -window.innerHeight/2, canvas.offsetWidth, canvas.offsetWidth);
					drawImageProp(ctx, imagesArray[newIndex], 0, 0, canvas.width, canvas.height);
					
					//coverImg(imagePrev, "cover");
					ctx.restore();
					
				}
				
				let arg = {
					clipPosX: size + canvas.width,
					imagePos: 0,
					imageOpacity: 0,
				}
				
				//anim(arg);

				gsap.to(arg, {
					imageOpacity: 0.5,
					duration: 1,
					
					delay: 0.3,
					ease: "power4.inOut",
				})

				if(windowSize > 550) {
					gsap.to(arg, {
						duration: 1.5,
						imagePos: -(canvas.width / 3),
						delay: 0.3,
						ease: "power4.inOut",
					})
				}

				gsap.to(arg, {
					clipPosX: canvas.width - window.innerWidth/14,
					duration: 2,
					ease: "power4.inOut",
					onUpdate: function (event) {
						anim(arg);
					},
					/* onComplete: function (event) {
						alert('slide')
					} */
				})
			}

			setTimeout(() => {
				if(window.innerWidth > 550) {
					gsap.to(processSlider.root.querySelectorAll('.splide__slide.is-active .title.split-text .line-body'), {
						transform: 'translate3d(0,0,0.0001px)',
						duration: 0.7,
						stagger: 0.07,
					})
					gsap.to(processSlider.root.querySelectorAll('.splide__slide.is-active .text.split-text .line-body'), {
						transform: 'translate3d(0,0,0.0001px)',
						duration: 0.7,
						delay: 0.5,
						stagger: 0.07,
					})
					gsap.to(processSlider.root.querySelector('.splide__slide.is-active .min-marquee'), {
						opacity: 1,
						duration: 0.7,
						delay: 0.7,
					})
					gsap.set(processSlider.root.querySelectorAll('.splide__slide:not(.is-active) .title.split-text .line-body, .splide__slide:not(.is-active) .text.split-text .line-body'), {
						transform: 'translate3d(0,120%,0.0001px)',
					})
					
				} else {
					gsap.to(processSlider.root.querySelector('.splide__slide.is-active .min-marquee'), {
						opacity: 1,
						duration: 0.7,
						delay: 0.3,
					})
				}
				
				gsap.set(processSlider.root.querySelector('.splide__slide:not(.is-active) .min-marquee'), {
					opacity: 0,
				})
			},700)
			
			/* if(newIndex > prevIndex) {
				
			} else {
				prevSlide(imagesArray[index], (imagesArray[index+1]) ? imagesArray[index+1] : imagesArray[0]);
			} */
			
		},0)
	})

	

	/* setTimeout(() => {
		ctx.clearRect(0,0,canvas.width, canvas.height)
		ctx.save();
		drawImageProp(ctx, imagesArray[0], 0, 0, canvas.height, canvas.height);	
		//ctx.restore();
	},1000) */

	imagesArray[0].addEventListener('load', function (event) {
		setTimeout(() => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			ctx.clearRect(0,0,canvas.width, canvas.height)
			ctx.save();
			drawImageProp(ctx, imagesArray[0], 0, 0, canvas.width, canvas.height);
			ctx.restore();
			
			/* drawImageProp(ctx, imagesArray[0], 0, 0, canvas.width, canvas.height);
			drawImageProp(ctx, imagesArray[1], 0, 0, canvas.width, canvas.height); */
		},500)
	})

	images.forEach((image, index) => {
		imagesArray[index].src = image.dataset.url;
	})

}

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



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

  




