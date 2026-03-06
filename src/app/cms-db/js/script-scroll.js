gsap.registerPlugin(ScrollTrigger);

const introList = document.querySelectorAll('.main-db-banner > .main-section-inner > *');
gsap.from(introList, {
  scrollTrigger: {
    trigger: '.main-banner',
    start: 'top 50%',
  },
  stagger: 0.2,
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
      start: 'top 80%',
    },
    opacity: 0,
    yPercent: 30,
    ease: 'circ.out',
  });
});

const expertList = document.querySelectorAll('.main-db-expert .expert-list > li');
gsap.from(expertList, {
  scrollTrigger: {
    trigger: '.main-db-expert',
    start: 'top 50%',
  },
  stagger: 0.2,
  opacity: 0,
  yPercent: 30,
  ease: 'circ.out',
});

const insightList = document.querySelectorAll('.main-db-insight .insight-list > li');
gsap.from(insightList, {
  scrollTrigger: {
    trigger: '.main-db-insight',
    start: 'top 50%',
  },
  stagger: 0.2,
  opacity: 0,
  yPercent: 30,
  ease: 'circ.out',
});

const workflowList = document.querySelectorAll('.main-db-flow .flow-list > li');
workflowList.forEach((element) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
    },
    opacity: 0,
    yPercent: 30,
    ease: 'circ.out',
  });
});