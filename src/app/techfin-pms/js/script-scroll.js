gsap.registerPlugin(ScrollTrigger);

gsap.to('.main-banner-cont', {
  scrollTrigger: {
    trigger: '.main-banner',
    start: 'top',
    end: '+=1000',
    scrub: true,
  },
  marginTop: -200,
});

const bannerTimeline = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.main-banner',
      start: 'top 10%',
    },
  })
  .from('.main-banner-cont .logo', {
    opacity: 0,
    yPercent: 20,
  })
  .from(
    '.main-banner-cont .tit',
    {
      opacity: 0,
      yPercent: 20,
    },
    '-=0.4'
  )
  .from('.main-banner-cont .desc', {
    opacity: 0,
    yPercent: 5,
    delay: 0.1,
  })
  .from(
    '.main-banner-cont .list',
    {
      opacity: 0,
      yPercent: 5,
    },
    '-=0.3'
  )
  .from(
    '.main-banner-cont .link',
    {
      opacity: 0,
      yPercent: 5,
    },
    '-=0.3'
  );

const pointTimeline = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.main-point',
      start: 'top 70%',
      end: '+=2500',
    },
  })
  .from('.main-point .main-section-title .tit', {
    opacity: 0,
    yPercent: 10,
  })
  .from(
    '.main-point .main-section-title p',
    {
      opacity: 0,
      yPercent: 10,
    },
    '-=0.4'
  )
  .from('.main-point-list .point-01', {
    opacity: 0,
    yPercent: 5,
  })
  .from(
    '.main-point-list .point-02',
    {
      opacity: 0,
      yPercent: 5,
    },
    '-=0.4'
  )
  .from(
    '.main-point-list .point-03',
    {
      opacity: 0,
      yPercent: 5,
    },
    '-=0.4'
  )
  .from(
    '.main-point-list .point-04',
    {
      opacity: 0,
      yPercent: 5,
    },
    '-=0.4'
  )
  .from(
    '.main-point-list .point-05',
    {
      opacity: 0,
      yPercent: 5,
    },
    '-=0.4'
  )
  .from(
    '.main-point-list .point-06',
    {
      opacity: 0,
      yPercent: 5,
    },
    '-=0.4'
  );

const processTimeline = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.main-process',
      start: 'top 70%',
      end: '+=2500',
    },
  })
  .from('.main-process .main-section-title .tit', {
    opacity: 0,
    yPercent: 10,
  })
  .from(
    '.main-process .main-section-title p',
    {
      opacity: 0,
      yPercent: 10,
    },
    '-=0.4'
  )
  .from('.main-process-list .process-01', {
    opacity: 0,
    yPercent: 5,
  })
  .from(
    '.main-process-list .process-02',
    {
      opacity: 0,
      yPercent: 5,
    },
    '-=0.4'
  )
  .from(
    '.main-process-list .process-03',
    {
      opacity: 0,
      yPercent: 5,
    },
    '-=0.4'
  )
  .from(
    '.main-process-list .process-04',
    {
      opacity: 0,
      yPercent: 5,
    },
    '-=0.4'
  );

const serviceTimeline = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.main-service',
      start: 'top 60%',
      end: '+=2500',
    },
  })
  .from('.main-service .main-section-title .tit', {
    opacity: 0,
    yPercent: 10,
  })
  .from(
    '.main-service .main-section-title p',
    {
      opacity: 0,
      yPercent: 10,
    },
    '-=0.4'
  )
  .from('.main-service-btns > *:first-child', {
    opacity: 0,
    yPercent: 10,
  })
  .from(
    '.main-service-btns > *:nth-child(2)',
    {
      opacity: 0,
      yPercent: 10,
    },
    '-=0.4'
  )
  .from(
    '.main-service-btns > *:nth-child(3)',
    {
      opacity: 0,
      yPercent: 10,
    },
    '-=0.4'
  )
  .from(
    '.main-service-swiper',
    {
      opacity: 0,
      yPercent: 5,
    },
    '-=0.4'
);
  
const detailTimeline = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.main-detail',
      start: 'top 90%',
      end: '+=2500',
    },
  })
  .from('.main-detail .main-section-title .tit', {
    opacity: 0,
    yPercent: 10,
  })
  .from('.main-detail .main-section-title .desc', {
    opacity: 0,
    yPercent: 10,
  })
  .from('.main-detail-cont .main-detail-box:first-child', {
    opacity: 0,
    yPercent: 20,
  })
  .from(
    '.main-detail-cont .main-detail-box:nth-child(2)',
    {
      opacity: 0,
      yPercent: 20,
    },
    '-=0.3'
  )
  .from(
    '.main-detail-cont .main-detail-box:nth-child(3)',
    {
      opacity: 0,
      yPercent: 20,
    },
    '-=0.3'
  )
  .from(
    '.main-detail-cont .main-detail-box:nth-child(4)',
    {
      opacity: 0,
      yPercent: 20,
    },
    '-=0.3'
  );

const turnTimeline = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.main-turn',
      start: 'top 60%',
      end: '+=2500',
    },
  })
  .from('.main-turn .main-section-title .tit', {
    opacity: 0,
    yPercent: 10,
  })
  .from(
    '.main-turn .main-section-title p',
    {
      opacity: 0,
      yPercent: 10,
    },
    '-=0.4'
  )
  .from('.main-turn-list .turn-01', {
    opacity: 0,
    yPercent: 7,
  })
  .from(
    '.main-turn-list .turn-02',
    {
      opacity: 0,
      yPercent: 7,
    },
    '-=0.4'
  )
  .from(
    '.main-turn-list .turn-03',
    {
      opacity: 0,
      yPercent: 7,
    },
    '-=0.4'
  );

const faqTimeline = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.main-faq',
      start: 'top 90%',
      end: '+=2500',
    },
  })
  .from('.main-faq .main-section-title .tit', {
    opacity: 0,
    yPercent: 10,
  })
  .from('.main-faq .main-section-title .desc', {
    opacity: 0,
    yPercent: 10,
  })
  .from('.main-faq-list .item:first-child', {
    opacity: 0,
    yPercent: 20,
  })
  .from(
    '.main-faq-list .item:nth-child(2)',
    {
      opacity: 0,
      yPercent: 20,
    },
    '-=0.3'
  )
  .from(
    '.main-faq-list .item:nth-child(3)',
    {
      opacity: 0,
      yPercent: 20,
    },
    '-=0.3'
  )
  .from(
    '.main-faq-list .item:nth-child(4)',
    {
      opacity: 0,
      yPercent: 20,
    },
    '-=0.3'
  );

const finalTimeline = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.main-final',
      start: 'top 70%',
      end: '+=2500',
    },
  })
  .from('.main-final .tit', {
    opacity: 0,
    // scale: 2,
    yPercent: -20,
    duration: 1,
    // ease: 'expo.out',
  })
  .from('.main-final .desc', {
    opacity: 0,
    yPercent: 10,
  })
  .from(
    '.main-final .btn',
    {
      opacity: 0,
      yPercent: 10,
    },
    '-=0.2'
  );
