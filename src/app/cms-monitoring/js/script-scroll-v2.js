gsap.registerPlugin(ScrollTrigger);

const introList = document.querySelectorAll('.main-banner-cont > *');
gsap.from(introList, {
  scrollTrigger: {
    trigger: '.main-banner',
    start: 'top 50%',
  },
  stagger: 0.3,
  opacity: 0,
  yPercent: 20,
  delay: 0.5,
  ease: 'circ.out',
});

const titleList = document.querySelectorAll('.main-section-title');
titleList.forEach((element) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 40%',
    },
    opacity: 0,
    yPercent: 30,
    ease: 'circ.out',
  });
});

const pointList = document.querySelectorAll('.main-point-list > li');
gsap.from(pointList, {
  scrollTrigger: {
    trigger: '.main-point',
    start: 'top 20%',
  },
  stagger: 0.2,
  opacity: 0,
  yPercent: 30,
  ease: 'circ.out',
});

const stepList = document.querySelector('.main-step-cont');
gsap.from(stepList, {
  scrollTrigger: {
    trigger: '.main-step',
    start: 'top 20%',
  },
  opacity: 0,
  yPercent: 30,
  ease: 'circ.out',
});

const serviceList = document.querySelector('.main-service-swiper');
gsap.from(serviceList, {
  scrollTrigger: {
    trigger: '.main-service',
    start: 'top 20%',
  },
  opacity: 0,
  yPercent: 30,
  ease: 'circ.out',
});

const turnList = document.querySelectorAll('.main-turn-list > li');
gsap.from(turnList, {
  scrollTrigger: {
    trigger: '.main-turn',
    start: 'top 20%',
  },
  stagger: 0.2,
  opacity: 0,
  yPercent: 30,
  ease: 'circ.out',
});

const designList = document.querySelectorAll('.main-design-list > li');
gsap.from(designList, {
  scrollTrigger: {
    trigger: '.main-design',
    start: 'top 20%',
  },
  stagger: 0.2,
  opacity: 0,
  yPercent: 30,
  ease: 'circ.out',
});

const exactImg = document.querySelector('.main-exact-img');
gsap.from(exactImg, {
  scrollTrigger: {
    trigger: '.main-exact',
    start: 'top 40%',
  },
  opacity: 0,
  yPercent: 30,
  ease: 'circ.out',
});

const exactList = document.querySelectorAll('.main-exact-list > li');
gsap.from(exactList, {
  scrollTrigger: {
    trigger: '.main-exact-list',
    start: 'top 40%',
  },
  stagger: 0.2,
  opacity: 0,
  yPercent: 30,
  ease: 'circ.out',
});

const faqListItem = document.querySelectorAll('.main-faq-list > li');
gsap.from(faqListItem, {
  scrollTrigger: {
    trigger: '.main-faq-list',
    start: 'top 40%',
  },
  stagger: 0.2,
  opacity: 0,
  yPercent: 30,
  ease: 'circ.out',
});

