
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');




// =-=-=-=-=-=-=-=-=-=- <Get-device-type> -=-=-=-=-=-=-=-=-=-=-

const getDeviceType = () => {

	const ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		return "tablet";
	}

	if (
		/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
		ua
		)
	) {
		return "mobile";
	}
	return "desktop";

};

// =-=-=-=-=-=-=-=-=-=- </Get-device-type> -=-=-=-=-=-=-=-=-=-=-



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



document.querySelectorAll('.split-text').forEach(splitText => {
	splitText.style.opacity = 0;
})



function runSplit() {

	

	const splitText = document.querySelectorAll(".split-text");
	splitText.forEach(splitText => {
		let typeSplit;
		
		typeSplit = new SplitType(splitText, {
			types: "lines"
		});

		//console.log(splitText)
	
		Array.from(typeSplit.lines).forEach(line => {
			let addLine;
			addLine = line.cloneNode(true);
			addLine.classList.remove('line')
			addLine.classList.add('line-body');
			if(splitText.classList.contains('_animated')) addLine.style.transform = 'translate3d(0,0,0)';
			line.innerHTML = "";
			line.append(addLine)
		})

		splitText.style.opacity = 1;
	})

	

	/* document.querySelectorAll('.split-text').forEach(splitText => {
		
	}) */

}


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

let smoother;

const preloader = document.querySelector('.preloader'),
preloaderBlock = preloader.querySelector('.preloader__block'),
preloaderProgress = preloader.querySelector('.preloader__progress--value'),
progressLoaded = preloader.querySelector('.preloader__loaded');

let preloadLoadingValue = {
	valueNumber: 0,
};

let preloadTimeline = gsap.timeline(), preloadTimelineValue = gsap.timeline();

document.addEventListener("DOMContentLoaded", function () {

	gsap.set(preloaderProgress, {
		transform: "scaleX(0)",
	})

	gsap.to(preloaderBlock, {
		opacity: 1,
	})

	preloadTimeline.to(preloaderProgress, {
		transform: "scaleX(0.99)",
		duration: 3,
		delay:0.2,
	})
	
	preloadTimelineValue.to(preloadLoadingValue, {
		valueNumber: 99,
		duration: 3,
		delay: 0.2,
		onUpdate: function () {
			progressLoaded.textContent = Math.round(preloadLoadingValue['valueNumber']);
		}
	})
})

const processSliderImages = document.querySelectorAll('.process__bg-slider--image'),
processSliderImagesArray = [];
processSliderImages.forEach(image => {
	const img = new Image();
	processSliderImagesArray.push(img);
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

gsap.set('.process__bg-slider', {
	opacity:0,
})

const canvas = document.querySelector('.process__bg-slider--canvas');
const ctx = canvas.getContext("2d");



window.addEventListener('load', function (event) {
	runSplit();
	const animMedia = gsap.matchMedia();
	animMedia.add("(min-width: 1000px)", () => {
		smoother = ScrollSmoother.create({
			smooth: 1.2,
			effects: true,
		});
	})

	setTimeout(() => {
		preloadTimeline.to(preloaderProgress, {
			transform: "scaleX(1)",
			duration: 0.2,
			onComplete: function () {
				preloaderBlock.classList.add('_hidden');
				setTimeout(() => {
					gsap.to(preloader, {
						opacity: 0,
						duration: 0.4,
						onComplete: function () {
							preloader.remove();
						}
					})
				},400)
				setTimeout(() => {
	
					animMedia.add("(min-width: 1000px)", () => {

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
								},
								transform: 'translate3d(0,200px,0)',
								ease: "none",
							})
						})
			
					});
			
					animMedia.add("(max-width: 1000px)", () => {

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
								ignoreMobileResize: true,
							},
							transform: 'translate3d(0,100px,0)',
							ease: "none",
						})
						
					});

					let prevWidthScreen = 0;
			
					function resizeAnim() {

						if(prevWidthScreen != window.innerWidth) {

							prevWidthScreen = window.innerWidth;

							runSplit();
							const animSections = document.querySelectorAll('.anim-section');
							animSections.forEach(animSection => {
								let timeline = gsap.timeline({
									scrollTrigger: {
										trigger: animSection,
										start: 'top 75%',
									},
								});
								
								const lines = animSection.querySelectorAll('.anim-text.split-text:not(._animated) .line-body');
								if(lines[0]) {
									timeline.to(lines, {
										transform: 'translate3d(0,0,0)',
										duration: 1,
										delay: 0.2,
										stagger: 0.15,
										ease: "power3.out",
										onComplete: function () {
											if(lines[0].closest('.split-text')) lines[0].closest('.split-text').classList.add('_animated');
										}
									},"-=0.3")
								}
					
								const lines2 = animSection.querySelectorAll('.anim-text-2.split-text:not(._animated) .line-body');
								if(lines2[0]) {
									timeline.to(lines2, {
										transform: 'translate3d(0,0,0)',
										duration: 0.5,
										stagger: 0.1,
										ease: "power3.out",
										onComplete: function () {
											if(lines2[0].closest('.split-text')) lines2[0].closest('.split-text').classList.add('_animated');
										}
									},"-=1.2")
								}
					
								const fadeIn = animSection.querySelectorAll('.fade-in');
								fadeIn.forEach(fadeIn => {
									timeline.to(fadeIn, {
										duration: 1,
										opacity: 1,
										onComplete: function () {
											fadeIn.classList.add('_animated');
										}
									},"-=0.5")
								})
					
								const fadeDown = animSection.querySelectorAll('.fade-down');
								fadeDown.forEach(fadeDown => {
									timeline.to(fadeDown, {
										duration: 1,
										opacity: 1,
										transform: 'translate3d(0,0,0)',
									},"-=0.5")
								})
					
							})
	
							setTimeout(() => {
								ScrollTrigger.refresh(true)
							},100)
						}

					}

					resizeAnim();
					window.addEventListener("resize", resizeAnim);
			
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
			
					const blogWrapper = document.querySelector('.blog__wrapper'), blogList = document.querySelector('.blog__list');
			
					let xTo = gsap.quickTo(blogCursor, "x", {duration: 0.3, ease: "power3"}),
					yTo = gsap.quickTo(blogCursor, "y", {duration: 0.3, ease: "power3"});
			
					blogWrapper.addEventListener('pointermove', function (event) {
						if(getDeviceType() == "desktop") {
							xTo(event.clientX);
							yTo(event.clientY);
						}
					})
			
					blogWrapper.addEventListener('pointerenter', function (event) {
						if(getDeviceType() == "desktop") {
							gsap.set(blogCursor, {x: event.clientX, duration: 0, ease: "power3"});
							gsap.set(blogCursor, {y: event.clientY, duration: 0, ease: "power3"});
							blogCursor.classList.add('_hover');
						}
					});
			
					blogWrapper.addEventListener('pointerleave', function (event) {
						blogCursor.classList.remove('_hover');
					})
			
					blogItem.forEach((blogItem, index) => {
						blogItem.addEventListener('pointerenter', function (event) {
							if(getDeviceType() == "desktop") {
								blogCursor.dataset.index = index;
								blogItem.classList.add('_hover');
							}
						})
					})

					// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

					if(document.querySelector('.process__bg-slider') && document.querySelector('.process__slider')) {

						const processSlider = new Splide( '.process__slider', {
							type: 'fade',
							speed: 600,
							waitForTransition: true,
							pagination: false,
							rewind: true,
							arrows: false,
							drag: false,
						});

						let prevWidthScreen = 0;

						processSlider.on('mounted', function (event) {
							setTimeout(() => {

								function processSliderResize() {

									if(prevWidthScreen != window.innerWidth) {

										prevWidthScreen = window.innerWidth;

										const splitText = processSlider.root.querySelectorAll(".splide__slide.is-active .split-text");
										splitText.forEach(splitText => {
											let typeSplit;
											
											typeSplit = new SplitType(splitText, {
												types: "lines"
											});
										
											Array.from(typeSplit.lines).forEach(line => {
												let addLine;
												addLine = line.cloneNode(true);
												addLine.classList.remove('line')
												addLine.classList.add('line-body');
												if(splitText.classList.contains('_animated')) addLine.style.transform = 'translate3d(0,0,0)';
												line.innerHTML = "";
												line.append(addLine)
											})
									
											splitText.style.opacity = 1;
										})

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

									}
								}

								processSliderResize();

								window.addEventListener('resize', processSliderResize)

							},500)

							/* canvas.width = canvas.offsetWidth;
							canvas.heigh = canvas.offsetHeight;
							ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight)
							drawImageProp(ctx, processSliderImagesArray[processSlider.index], 0, 0, canvas.width, canvas.height); */

							
						})

						processSlider.mount();
						
						let lastWidthScreen = window.innerWidth;
						window.addEventListener('resize', function (event) {
							if(lastWidthScreen != window.innerWidth) {
								lastWidthScreen = window.innerWidth;
								canvas.width = canvas.offsetWidth;
								canvas.heigh = canvas.offsetHeight;
								ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight)
								drawImageProp(ctx, processSliderImagesArray[processSlider.index], 0, 0, canvas.width, canvas.height);
							}
							
						})

						let argSlide = {
							imagePos: 0,
							imageOpacity: 0,
						};

						let newIndexSlide = 1, prevIndexSlide = processSlider.length-1;

						processSlider.on('move', function (newIndex, prevIndex) {
							processSlider.root.classList.add('_moving');
							processSlider.options['drag'] = false;
						})
						
						let tl = gsap.timeline();

						let prevArrowEnterTimer, nextArrowEnterTimer;

						const prevArrow = processSlider.root.querySelector('.process__slider--arrow._prev'),
						nextArrow = processSlider.root.querySelector('.process__slider--arrow._next');
						
						processSlider.on('moved', function (newIndex, prevIndex) {

							if(prevArrowEnterTimer) clearTimeout(prevArrowEnterTimer);
							if(nextArrowEnterTimer) clearTimeout(nextArrowEnterTimer);

							newIndexSlide = (newIndex+1 > processSlider.length-1) ? 0 : newIndex+1;
							prevIndexSlide = (processSlider.index-1 == -1) ? processSlider.length-1 : processSlider.index-1;

							setTimeout(() => {

								tl.pause();
								tl = gsap.timeline();

								canvas.width = canvas.offsetWidth;
								canvas.height = canvas.offsetHeight;

								if(checkDirection(newIndex, prevIndex, processSlider.length-1) == 'next') {
									
									let size = Math.max(canvas.width, canvas.height);

									function anim(arg) {
										
										ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight)
										ctx.save();

										drawImageProp(ctx, processSliderImagesArray[prevIndex], arg.imagePos, 0, canvas.width, canvas.height);
										ctx.fillStyle = `rgba(0,0,0,${arg.imageOpacity})`;
										ctx.rect(0, 0, canvas.width, canvas.height);
										ctx.fill();

										ctx.beginPath();
										ctx.arc(arg.clipPosX, canvas.height/2, size, 0, Math.PI * 2);
										ctx.clip();
										
										drawImageProp(ctx, processSliderImagesArray[newIndex], 0, 0, canvas.width, canvas.height);

										ctx.restore();
										
									}
									
									if(!nextArrow.classList.contains('_hover')) argSlide['clipPosX'] = size + canvas.width;
									processSlider.root.classList.remove('_arrow-anim');
									
									argSlide['imagePos'] = 0;
									argSlide['imageOpacity'] = 0;
									
									if(windowSize > 650) {
										tl.to(argSlide, {
											clipPosX: size - window.innerWidth/14,
											duration: 0.8,
											ease: "power4.inOut",
											onUpdate: function (event) {
												anim(argSlide);
											},
										})
									} else {
										tl.to(argSlide, {
											clipPosX: size - canvas.width/2,
											duration: 1,
											ease: "power4.inOut",
											onUpdate: function (event) {
												anim(argSlide);
											},
										})
									}

									tl.to(argSlide, {
										imageOpacity: 0.5,
										duration: 0.6,
										onComplete: function () {
											argSlide['imageOpacity'] = 0;
										},
										ease: "power4.inOut",
									},'-=0.7')

									if(windowSize > 650) {
										tl.to(argSlide, {
											duration: 1,
											imagePos: -(canvas.width / 3),
											ease: "power4.inOut",
											onComplete: function () {
												argSlide['imagePos'] = 0;
											},
										},'-=0.7')
									}

								} else {
									
									let size = Math.max(canvas.width, canvas.height);
							
									function anim(arg) {
										ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight)
										ctx.save();

										drawImageProp(ctx, processSliderImagesArray[prevIndex], arg.imagePos, 0, canvas.width, canvas.height);
										ctx.fillStyle = `rgba(0,0,0,${arg.imageOpacity})`;
										ctx.rect(0, 0, canvas.width, canvas.height);
										ctx.fill();

										ctx.beginPath();
										ctx.arc(arg.clipPosX, canvas.height/2, size, 0, Math.PI * 2);
										ctx.clip();
										
										drawImageProp(ctx, processSliderImagesArray[newIndex], 0, 0, canvas.width, canvas.height);
										
										ctx.restore();
										
									}
									
									if(!prevArrow.classList.contains('_hover')) argSlide['clipPosX'] = -size;
									processSlider.root.classList.remove('_arrow-anim');
									
									argSlide['imagePos'] = 0;
									argSlide['imageOpacity'] = 0;

									if(windowSize > 650) {
										tl.to(argSlide, {
											clipPosX: size - window.innerWidth/14,
											duration: 0.8,
											ease: "power4.inOut",
											onUpdate: function (event) {
												anim(argSlide);
											},
											onComplete: function () {
												argSlide['clipPosX'] = size;
											}
										})
									} else {
										tl.to(argSlide, {
											clipPosX: -size + canvas.width + canvas.width/2,
											duration: 1,
											ease: "power4.inOut",
											onUpdate: function (event) {
												anim(argSlide);
											},
											onComplete: function () {
												argSlide['clipPosX'] = size;
											}
										})
									}

									tl.to(argSlide, {
										imageOpacity: 0.5,
										duration: 0.6,
										ease: "power4.inOut",
										onComplete: function () {
											argSlide['imageOpacity'] = 0;
										}
									},'-=0.7')

									if(windowSize > 650) {
										tl.to(argSlide, {
											duration: 1,
											imagePos: canvas.width / 3,
											ease: "power4.inOut",
											
										},'-=0.5')
									}

								}

								prevArrow.classList.remove('_hover');
								nextArrow.classList.remove('_hover');

								const activeSlide = processSlider.root.querySelector('.splide__slide.is-active'),
								textItems = processSlider.root.querySelectorAll('.splide__slide:not(.is-active) .title.split-text .line-body, .splide__slide:not(.is-active) .text.split-text .line-body'),
								marquee = processSlider.root.querySelectorAll('.splide__slide:not(.is-active) .min-marquee');

								setTimeout(() => {
									
									if(window.innerWidth > 650 && activeSlide == processSlider.root.querySelector('.splide__slide.is-active')) {
										gsap.set(textItems, {
											transform: 'translate3d(0,120%,0.0001px)',
										})

										gsap.to(activeSlide.querySelectorAll('.title.split-text .line-body'), {
											transform: 'translate3d(0,0,0.0001px)',
											duration: 0.7,
											stagger: 0.07,
											onComplete: function () {
												gsap.set(textItems, {
													transform: 'translate3d(0,120%,0.0001px)',
												})
											}
										})

										gsap.to(activeSlide.querySelectorAll('.text.split-text .line-body'), {
											transform: 'translate3d(0,0,0.0001px)',
											duration: 0.7,
											delay: 0.5,
											stagger: 0.07,
											onComplete: function () {
												gsap.set(textItems, {
													transform: 'translate3d(0,120%,0.0001px)',
												})
											}
										})

										

										gsap.set(textItems, {
											transform: 'translate3d(0,120%,0.0001px)',
										})
										
									}

									gsap.to(activeSlide.querySelector('.min-marquee'), {
										opacity: 1,
										duration: 0.7,
									})

									gsap.set(marquee, {
										opacity: 0,
									})

									gsap.set(processSlider.root.querySelector('.splide__slide:not(.is-active) .min-marquee'), {
										opacity: 0,
									})
																		
								},700)

								setTimeout(() => {
									processSlider.root.classList.remove('_moving');
								},(windowSize > 650) ? 1500 : 500)
								
							},0)
						})

						prevArrow.addEventListener('click', function () {
							if(!processSlider.root.classList.contains('_moving')) {
								processSlider.go('<');
							}
						})

						nextArrow.addEventListener('click', function () {
							if(!processSlider.root.classList.contains('_moving')) {
								processSlider.go('>');
							}
						})

						let mouse, prevPointMouse = document.querySelector('body');

						let testTimeout;
						window.addEventListener('mousemove', (event) => {
							mouse = event.target;
							if(testTimeout) clearTimeout(testTimeout);
							testTimeout = setTimeout(() => {
								prevPointMouse = event.target;
							},200)
						});

						let prevArrowLeave, nextArrowLeave;

						prevArrow.addEventListener('pointerenter', function (event) {
							
							if(getDeviceType() == "desktop") {

								if(prevArrowEnterTimer) clearTimeout(prevArrowEnterTimer);
								if(nextArrowEnterTimer) clearTimeout(nextArrowEnterTimer);

								prevArrowEnterTimer = setTimeout(() => {
									if(!prevArrow.classList.contains('_hover') && !processSlider.root.classList.contains('_moving') && mouse.closest('.process__slider--arrow._prev')) {
										nextArrowLeave = false;

										prevArrow.classList.add('_hover');
										processSlider.root.classList.add('_arrow-anim');

										canvas.width = canvas.offsetWidth;
										canvas.height = canvas.offsetHeight;

										let size = Math.max(canvas.width, canvas.height);
									
										function anim(arg) {
											ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight)
											ctx.save();

											drawImageProp(ctx, processSliderImagesArray[processSlider.index], 0, 0, canvas.width, canvas.height);
											ctx.fillStyle = `rgba(0,0,0,${arg.imageOpacity})`;
											ctx.rect(0, 0, canvas.width, canvas.height);
											ctx.fill();

											ctx.beginPath();
											ctx.arc(arg.clipPosX, canvas.height/2, size, 0, Math.PI * 2);
											ctx.clip();
											
											drawImageProp(ctx, processSliderImagesArray[prevIndexSlide], 0, 0, canvas.width, canvas.height);
											
											ctx.restore();
										}

										if(!processSlider.root.classList.contains('_moving')) {

											argSlide['clipPosX'] = -size;
											anim(argSlide);

											setTimeout(() => {
												if(!processSlider.root.classList.contains('_moving')) {
													argSlide['clipPosX'] = -size;
													anim(argSlide);	
													gsap.to(argSlide, {
														clipPosX: -size + window.innerWidth/14,
														duration: 0.4,
														ease: "power4.inOut",
														onUpdate: function (event) {
															anim(argSlide);
														},
														onComplete: function () {
															processSlider.root.classList.add('_arrow-anim-end')
														}
													})
												}
											},100)

										}
									}
								},(nextArrowLeave) ? 400 : 100)

							}
							
						})

						prevArrow.addEventListener('pointerleave', function (event) {
							
							if(prevArrow.classList.contains('_hover') && getDeviceType() == "desktop" && !processSlider.root.classList.contains('_moving')) {

								prevArrowLeave = true;
								prevArrow.classList.remove('_hover');

								canvas.width = canvas.offsetWidth;
								canvas.height = canvas.offsetHeight;

								let size = Math.max(canvas.width, canvas.height);
							
								function anim(arg) {
									
									ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight)
									ctx.save();

									drawImageProp(ctx, processSliderImagesArray[processSlider.index], 0, 0, canvas.width, canvas.height);

									ctx.beginPath();
									
									ctx.arc(arg.clipPosX, canvas.height/2, size, 0, Math.PI * 2);
									
									ctx.clip();
									
									drawImageProp(ctx, processSliderImagesArray[prevIndexSlide], 0, 0, canvas.width, canvas.height);

									ctx.restore();
								}
								
								//argSlide['clipPosX'] = -size + window.innerWidth/14;
								anim(argSlide)

								gsap.to(argSlide, {
									clipPosX: -size,
									duration: 0.4,
									ease: "power4.inOut",
									onUpdate: function (event) {
										anim(argSlide);
									},
								})
								
							}

						})

						nextArrow.addEventListener('pointerenter', function (event) {

							if(getDeviceType() == "desktop") {

								if(prevArrowEnterTimer) clearTimeout(prevArrowEnterTimer);
								if(nextArrowEnterTimer) clearTimeout(nextArrowEnterTimer);

								nextArrowEnterTimer = setTimeout(() => {
									if(!nextArrow.classList.contains('_hover') && !processSlider.root.classList.contains('_moving') && mouse.closest('.process__slider--arrow._next')) {
										nextArrow.classList.add('_hover');
										prevArrowLeave = false;

										canvas.width = canvas.offsetWidth;
										canvas.height = canvas.offsetHeight;
							
										let size = Math.max(canvas.width, canvas.height);
									
										function anim(arg) {
											
											ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight)
											ctx.save();
							
											drawImageProp(ctx, processSliderImagesArray[processSlider.index], 0, 0, canvas.width, canvas.height);
							
											ctx.beginPath();
											
											ctx.arc(arg.clipPosX, canvas.height/2, size, 0, Math.PI * 2);
											
											ctx.clip();
											//ctx.drawImage(imageNext, 0, -window.innerHeight/2, canvas.offsetWidth, canvas.offsetWidth);
											drawImageProp(ctx, processSliderImagesArray[newIndexSlide], 0, 0, canvas.width, canvas.height);
											
											//coverImg(imagePrev, "cover");
											ctx.restore();
											
										}
							
										if(!processSlider.root.classList.contains('_moving')) {

											argSlide['clipPosX'] = size + canvas.width;
											anim(argSlide)
											
											if(!processSlider.root.classList.contains('_moving')) {
												setTimeout(() => {
													//argSlide['clipPosX'] = size + canvas.width;
													anim(argSlide)
													gsap.to(argSlide, {
														clipPosX: size * 2 - window.innerWidth / 14,
														duration: 0.4,
														ease: "power4.inOut",
														onUpdate: function (event) {
															anim(argSlide);
														},
														onComplete: function () {
															processSlider.root.classList.add('_arrow-anim-end')
														}
													})
												},100)
											}
										}
									}
								},(prevArrowLeave) ? 400 : 100)

							}

						})

						nextArrow.addEventListener('pointerleave', function (event) {
							
							if(nextArrow.classList.contains('_hover') && getDeviceType() == "desktop" && !processSlider.root.classList.contains('_moving')) {

								nextArrow.classList.remove('_hover');
								nextArrowLeave = true;

								canvas.width = canvas.offsetWidth;
								canvas.height = canvas.offsetHeight;

								let size = Math.max(canvas.width, canvas.height);
							
								function anim(arg) {
									
									ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight)
									ctx.save();

									drawImageProp(ctx, processSliderImagesArray[processSlider.index], 0, 0, canvas.width, canvas.height);

									ctx.beginPath();
									
									ctx.arc(arg.clipPosX, canvas.height/2, size, 0, Math.PI * 2);
									
									ctx.clip();
									//ctx.drawImage(imageNext, 0, -window.innerHeight/2, canvas.offsetWidth, canvas.offsetWidth);
									drawImageProp(ctx, processSliderImagesArray[newIndexSlide], 0, 0, canvas.width, canvas.height);
									
									//coverImg(imagePrev, "cover");
									ctx.restore();
									
								}
								
								//argSlide['clipPosX'] = canvas.width * 2 - window.innerWidth / 14;
								anim(argSlide);
								
								
								gsap.to(argSlide, {
									clipPosX: size + canvas.width,
									duration: 0.4,
									ease: "power4.inOut",
									onUpdate: function (event) {
										anim(argSlide);
									},
								})
								
							}

						})

						processSliderImagesArray[0].addEventListener('load', function (event) {
							setTimeout(() => {
								canvas.width = canvas.offsetWidth;
								canvas.height = canvas.offsetHeight;
								ctx.clearRect(0,0,canvas.width, canvas.height)
								ctx.save();
								drawImageProp(ctx, processSliderImagesArray[0], 0, 0, canvas.width, canvas.height);
								ctx.restore();
							},0)
						})
						
						processSliderImages.forEach((image, index) => {
							processSliderImagesArray[index].src = image.dataset.url;
						})

					}

					// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=
			
					setTimeout(() => {
						
						ScrollTrigger.refresh(true);
						if(smoother) smoother.paused(false);

						gsap.to('.process__bg-slider', {
							opacity:1,
							duration: 0.5,
						})
						
					},100)
			
				},500)
			}
		})

		preloadTimelineValue.to(preloadLoadingValue, {
			valueNumber: 100,
			duration: 0.2,
			onUpdate: function () {
				progressLoaded.textContent = Math.round(preloadLoadingValue['valueNumber']);
			}
		})

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

	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-


	// =-=-=-=-=-=-=-=-=-=-=-=- <close-header-nav-menu> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerNavClose = $(".header__nav--close")
	if(headerNavClose) {
	
		menu.forEach(element => {
			element.classList.remove('_mob-menu-active')
		})
	
	}

	if(!$('.header__nav') && !$('.header__burger')) {
		menu.forEach(element => {
			element.classList.remove('_mob-menu-active')
		})
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </close-header-nav-menu> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <click> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerNavListLink = $(".header__nav--list a")
	if(headerNavListLink) {
	
		event.preventDefault();
		menu.forEach(element => {
			element.classList.remove('_mob-menu-active')
		})

		setTimeout(() => {
			if(smoother) {
				smoother.scrollTo(headerNavListLink.getAttribute('href'), true, "top 50px");
			} else {
				let section;
			
				section = document.querySelector(headerNavListLink.getAttribute('href'))
			
				if(section) {
					section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
				} else {
					body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
				}
			}

		},200)
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </click> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <mission-accordion> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const missonAccordionTarget = $(".misson__accordion--target")
	if(missonAccordionTarget) {
	
		const block = missonAccordionTarget.closest('.misson__accordion--block'),
		content = block.querySelector('.misson__accordion--content');

		const lines = content.querySelectorAll('.split-text .line-body');

		if(!block.classList.contains('_active')) {
			block.classList.add('_active');
			//if(smoother) smoother.paused(true);
			gsap.fromTo(content, {
				height: 0,
				marginTop: 0,
				ease: "circ.out",
			}, {
				height: "auto",
				marginTop: (windowSize >= 1000) ? '1.458333vw' : '14px',
				ease: "power4.out",
				onComplete: function (event) {
					if(windowSize >= 1000) ScrollTrigger.refresh(true);
					/* setTimeout(() => {
						if(smoother) smoother.paused(false);
					},200) */
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
			//if(smoother) smoother.paused(true);
			gsap.to(content, {
				height: 0,
				marginTop: 0,
				ease: "power4.out",
				onComplete: function (event) {
					if(windowSize >= 1000) {
						ScrollTrigger.refresh(true);

						setTimeout(() => {
							//if(smoother) smoother.paused(false);
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

