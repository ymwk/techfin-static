gsap.registerPlugin(ScrollTrigger);


const introList = document.querySelectorAll('.intro-landing .title span');
gsap.from(introList, {
  scrollTrigger: {
    trigger: '.intro-landing',
    start: 'top 50%',
  },
  stagger: 0.3,
  opacity: 0,
  yPercent: 20,
  delay: 0.5
});

gsap.from('.intro-card .card-01', {
  scrollTrigger: {
    trigger: '.intro-card .intro-section-inner',
    start: 'top top',
    end: '+=1000',
    pin: true,
  },
  opacity: 0,
  yPercent: 50,
  duration: 1,
  ease: 'circ.out',
});

gsap.to('.intro-rotation .circle-techfin .arrow', {
  scrollTrigger: {
    trigger: '.intro-rotation .intro-section-inner',
    start: 'top top',
  },
  opacity: 1,
  rotate: -360,
  repeat: 2,
  repeatDelay: 1,
  duration: 2,
  ease: 'circ.out',
});

const msgTimeline = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.intro-msg .intro-section-inner',
      start: 'top center',
    },
    // repeat: -1,
  })
  .to('.intro-msg .target', {
    yPercent: -50,
    duration: 0.7,
    delay: 1
  })
  // .to('.intro-msg .target', {
  //   yPercent: -50,
  //   duration: 1,
  //   delay: 1
  // });
 
const numList = document.querySelectorAll('.intro-data .count');

gsap.from(numList, {
  scrollTrigger: {
    trigger: '.intro-data',
    start: 'top 50%',
  },
  textContent: 0,
  duration: 3,
  snap: { textContent: 1 },
  stagger: 0.3,
});