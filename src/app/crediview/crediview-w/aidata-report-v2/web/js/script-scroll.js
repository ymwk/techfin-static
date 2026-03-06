gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".diagnosisH-web-root",
    start: "top 80%",
  },
});

// 최신진단내역 sec01
tl.from(".aireport-infor-box .top-title-box", {
  y: 0,
  duration: 1,
  opacity: 0,
  ease: "power2.out",
});
tl.from(
  ".aireport-infor-box .top-title-box .h4-tit span, .aireport-infor-box .top-title-box .infor-list",
  {
    y: -100,
    duration: 1,
    opacity: 0,
    ease: "power2.out",
  }
).from(
  ".company-infor-contents .company-infor-box, .bullit-root.anmation, .box-layout-root.anmation",
  {
    y: 0,
    duration: 1,
    opacity: 0,
    ease: "power2.out",
  },
  "<"
);

tl.fromTo(
  ".insight-level-grapth-wrap .insight-level-grapth",
  {
    opacity: 0,
    visibility: "hidden",
  },
  {
    opacity: 1,
    visibility: "visible",
    duration: 1,
    ease: "power2.out",
  }
);
// 실시간진단등급 등급텍스트 페이드인
tl.fromTo(
  ".insight-level-grapth-wrap .insight-level-grapth .insight-level-txt",
  {
    opacity: 0,
    visibility: "hidden",
  },
  {
    opacity: 1,
    visibility: "visible",
    duration: 0.7,
    ease: "power2.out",
  }
);
