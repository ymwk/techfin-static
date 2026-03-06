gsap.registerPlugin(ScrollTrigger);

// sec02
gsap.from(
  ".landing-container .sec-02 .content .contents-box-inner .flex-box.anmation-ps",
  {
    scrollTrigger: {
      trigger: ".landing-container .sec-02",
      start: "100% 100%", // .sec-02가 뷰포트 80% 지점에 오면 시작
      toggleActions: "play none none none", // 한 번만 재생
      pin: true,
    },

    y: 500, // 아래에서 50px
    duration: 2, // 애니메이션 시간
    ease: "power2.out", // 부드럽게
    opacity: 0,
  },
  {
    opacity: 1,
  }
);

document.addEventListener("DOMContentLoaded", () => {
  const flexBoxes = document.querySelectorAll(
    ".landing-container .sec-02 .content .contents-box-inner .flex-box"
  );

  flexBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      // 모든 .flex-box의 z-index와 position 초기화
      flexBoxes.forEach((b) => {
        gsap.to(b, {
          zIndex: 1,
          position: "absolute",
          top: "61px",
          duration: 0.3,
        });
      });

      // 클릭된 엘리먼트에 z-index: 10, position: absolute, top: 100px 적용
      gsap.to(box, {
        zIndex: 10,
        position: "absolute",
        top: "100px",
        duration: 0.3,
      });
    });
  });
});

// sec03
gsap.fromTo(
  ".cycle-arrow",
  {
    opacity: 0, // 초기 투명도
    rotation: 0, // 초기 회전 각도
  },
  {
    opacity: 1, // 화면에 나타남
    rotation: -360, // 반시계 방향으로 한 바퀴 회전
    transformOrigin: "center center", // 회전 중심
    duration: 5, // 애니메이션 지속 시간
    ease: "linear", // 부드러운 연속 회전
    scrollTrigger: {
      trigger: ".landing-container .sec-03", // 트리거 요소
      start: "30% 50%", // 중간 지점 도착 시
      toggleActions: "play none none none", // 한 번만 실행
    },
    onUpdate: function () {
      const progress = this.progress(); // 애니메이션 진행 상태 (0 ~ 1)
      const rotation = -360 * progress; // 현재 회전 각도 계산

      // 특정 각도에서 투명도 빠르게 감소
      if (rotation <= -360) {
        gsap.to(".cycle-arrow", {
          duration: 1, // 투명도 감소 속도
          overwrite: true, // 기존 애니메이션 덮어쓰기
        });
      }
    },
  }
);

// sec04
// .ps-txt01: 위로 올라가면서 투명도 0
const triggerKo = ".landing-container .sec-04.ko";

const tlKo = gsap.timeline({
  scrollTrigger: {
    trigger: ".landing-container .sec-04.ko", // 트리거 요소
    start: "center center", // 화면 중앙에 도달했을 때
    end: "center+=700 center", // 추가 스크롤을 감지
    toggleActions: "play none none none", // 한 번만 실행
    pin: true,
  },
});

tlKo.fromTo(
  ".landing-container .sec-04 .content .tit-box p.tit span em.ps-txt01",
  { opacity: 1, y: 0 },
  { opacity: 0, x: 0, y: -70, duration: 2, ease: "power2.out" }
);

tlKo.fromTo(
  ".landing-container .sec-04.ko .content .tit-box p.tit .ps-txt02",
  {
    opacity: 0, // 초기 투명도
    y: 0, // 초기 y 위치
    x: 400, // x축에서 400px 떨어진 위치에서 시작
  },
  {
    opacity: 1, // 투명도 1로 나타남
    y: -45, // y축으로 -45px 이동
    x: 400, // x축으로 0px 이동
    duration: 2, // 애니메이션 지속 시간
    ease: "power2.out", // 부드러운 애니메이션
  }
);

//sec04 영문 애니메이션
const trigger = ".landing-container .sec-04.en";

const tl = gsap.timeline({
  scrollTrigger: {
    trigger,
    start: "55% center",
    end: "center+=700 center",
    pin: true,
    toggleActions: "play none none none",
  },
});

tl.fromTo(
  ".landing-container .sec-04.en .content .tit-box p.tit span em.ps-txt01",
  { opacity: 1, y: 0 },
  { opacity: 0, x: -20, y: -70, duration: 1, ease: "power2.out" }
)

  .to(
    ".landing-container .sec-04.en .content .tit-box p.tit .default-txt",
    { x: -155, duration: 1, ease: "power2.out" },
    "<"
  )
  .to(
    ".landing-container .sec-04.en .content .tit-box p.tit span",
    { "--before-x": "-153px", duration: 1, ease: "power2.out" },
    "<"
  )
  .to(
    ".landing-container .sec-04.en .content .tit-box p.tit span",
    { "--after-x": "-8px", duration: 1, ease: "power2.out" },
    "<"
  )
  .to(".landing-container .sec-04.en .content .tit-box p.tit", {
    x: 105,
    duration: 1,
    ease: "power2.out",
  })
  .to(".landing-container .sec-04.en .content .tit-box p.tit em.ps-txt02", {
    y: -30,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
  });

//sec05
gsap.utils
  .toArray(
    ".landing-container .sec-05 .content .data-num-box .list-box li span.num i.number"
  )
  .forEach((el) => {
    const rawTarget = el.getAttribute("data-target")?.replace(/,/g, "") || "0";
    const targetValue = parseFloat(rawTarget);

    // 초기 값 설정 (확실히 0으로 보여주기 위해)
    el.innerText = "0";

    const obj = { val: 0 };

    gsap.to(obj, {
      val: targetValue,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".landing-container .sec-05",
        start: "start 30%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        // 특정 요소만 정수로 표시
        if (el.hasAttribute("data-integer")) {
          el.innerText = formatNumber(Math.floor(obj.val)); // 정수로 표시
        } else {
          el.innerText = formatNumber(obj.val.toFixed(1)); // 소수점 1자리까지 표시
        }
      },
    });
  });

// 숫자 포맷 함수 (필요에 따라 수정 가능)
function formatNumber(value) {
  return value.toString();
}

function formatNumber(num) {
  return num.toLocaleString(); // 쉼표 자동 포맷
}
