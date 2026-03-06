gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: ".recruit-container .job-description", // 트리거 요소
  start: "8%", // 트리거 시작 위치
  end: "bottom", // 트리거 종료 위치
  toggleClass: {
    targets: ".recruit-container .job-description .job-scroll-menu", // active 클래스가 추가될 대상
    className: "active", // 추가할 클래스 이름
  },
  markers: false, // 디버깅용 마커
});
