gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // .credit-get-sec02에 스크롤 접근 시 .tab-box에 클래스 on 추가
  ScrollTrigger.create({
    trigger: ".credit-get-sec02", // 트리거 요소
    start: "top", // 트리거 시작 위치
    onEnter: () => {
      document.querySelector(".tab-box").classList.add("on");
    },
  });

  // .credit-get-sec01 중앙 끝 지점에서 .tab-box에 클래스 on 삭제
  ScrollTrigger.create({
    trigger: ".credit-get-sec01", // 트리거 요소
    start: "center bottom", // .credit-get-sec01의 중앙 끝 지점
    end: "bottom center", // 트리거가 끝나는 지점
    onEnterBack: () => {
      document.querySelector(".tab-box").classList.remove("on");
    },
  });
});
