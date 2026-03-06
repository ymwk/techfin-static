gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll("section");
let isScrolling = false; // 스크롤 상태 체크

// ScrollTrigger를 사용하여 각 섹션으로 스크롤 이동하도록 설정
if (sections) {
  sections.forEach((section, index) => {
    // 각 섹션에 대해 ScrollTrigger 생성
    ScrollTrigger.create({
      trigger: section,
      start: "top center", // 섹션의 상단이 화면 중앙에 오도록 시작
      end: "bottom center", // 더 적절한 스크롤 트리거 끝 설정
      scrub: true, // 스크롤 위치와 애니메이션을 동기화
      // pin: true,
      onEnter: () => {
        if (!isScrolling) {
          isScrolling = true; // 스크롤 이동 시작
          document.body.style.overflowY = "hidden";
          gsap.to(window, {
            scrollTo: section,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              document.body.style.overflowY = "auto";
              isScrolling = false; // 스크롤 이동 완료 후 상태 변경
            },
          });
        }
      },
      onLeaveBack: () => {
        if (!isScrolling) {
          document.body.style.overflowY = "hidden";
          isScrolling = true; // 스크롤 이동 시작
          gsap.to(window, {
            scrollTo: sections[index - 1],
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              document.body.style.overflowY = "auto";
              isScrolling = false; // 스크롤 이동 완료 후 상태 변경
            },
          });
        }
      },
    });
  });
}

// 섹션 높이조절
let isThrottled = false; // 스로틀 상태 체크

window.addEventListener(
  "wheel",
  (event) => {
    if (isThrottled) return; // 스로틀 상태일 때는 이벤트 무시

    event.preventDefault();
    let sections = document.querySelectorAll("section, footer");
    let currentSection = Math.round(window.scrollY / window.innerHeight); // 현재 섹션의 위치를 정확히 계산하기 위해 Math.round 사용
    let nextSection =
      event.deltaY > 0 ? currentSection + 1 : currentSection - 1;
    nextSection = Math.max(0, Math.min(nextSection, sections.length - 1));
    window.scrollTo({
      top: nextSection * window.innerHeight,
      behavior: "smooth",
    });

    isThrottled = true; // 스로틀 상태로 설정
    setTimeout(() => {
      isThrottled = false; // 일정 시간 후 스로틀 상태 해제
    }, 1000); // 1초 동안 스로틀 상태 유지
  },
  { passive: false }
);

const firstTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".landing-first",
      //scrub: 1,
      pin: true,
      end: "+=0",
    },
  })

  .from(
    ".landing-first-wrapper .swiper-slide .bn-contents-wrap, .landing-first-wrapper .swiper-button-prev, .landing-first-wrapper .swiper-button-next, .landing-first-wrapper .swiper-count, .landing-first-wrapper .swiper-controls ",
    {
      opacity: 0,
      y: 10,
      duration: 0.3,
      delay: 0.3,
    }
  );

// .from(".landing-first-title", {
//   opacity: 0,
//   y: 10,
//   duration: 0.3,
//   delay: 0.3,
// })

// .from(".landing-first .credit-rating-btn", {
//   opacity: 0,
//   y: 10,
//   duration: 0.3,
//   delay: 0.3,
// })

// .from(".landing-first .right img", {
//   opacity: 0,
//   x: 10,
//   duration: 0.3,
//   delay: 0.3,
// })

// .from(
//   ".swiper-button-prev, .swiper-button-next, .swiper-controls, .swiper-count",
//   {
//     opacity: 0,
//     y: 10,
//     duration: 0.3,
//     delay: 0.3,
//   }
// );

// intro

const introTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".landing-intro",
      // scrub: 1,
      pin: true,
      end: "+=0",
    },
  })
  .from(".landing-intro-title, .text-active, .desc", {
    opacity: 0,
    y: 10,
    duration: 0.3,
    delay: 0.3,
  })
  .from(".mouse", {
    opacity: 0,
    y: 10,
    duration: 0.5,
    delay: 0.3,
  })
  .from(".landing-intro-motion", {
    opacity: 0,
    duration: 0.1,
    onComplete: function () {
      // 영상 확대 애니메이션
      gsap.to(".landing-intro-motion", {
        maxWidth: "100%",
        bottom: 0,
        top: 0,
        borderRadius: 0,
        duration: 0.5,
        ease: "power2.inOut",
        toggleActions: "restart none none none",
      });
    },
  });

// third
const thirdTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".landing-third",
      // scrub: 1,
      pin: true,
      end: "+=0",
      toggleActions: "restart none none none",
    },
  })
  .from(".landing-third-card li:first-of-type", {
    opacity: 0,
    y: 50,
    duration: 0.4,
  })
  .from(
    ".landing-third-card li:nth-of-type(2)",
    {
      opacity: 0,
      y: 50,
      duration: 0.4,
    },
    "-=0.2"
  )
  .from(
    ".landing-third-card li:nth-of-type(3)",
    {
      opacity: 0,
      y: 50,
      duration: 0.4,
    },
    "-=0.2"
  )
  .from(
    ".landing-third-card li:first-of-type  > *",
    {
      opacity: 0,
      duration: 0.5,
    },
    "-=0.2"
  )
  .from(
    ".landing-third-card li:nth-of-type(2)  > *",
    {
      opacity: 0,
      duration: 0.5,
    },
    "-=0.8"
  )
  .from(
    ".landing-third-card li:nth-of-type(3)  > *",
    {
      opacity: 0,
      duration: 0.5,
    },
    "-=0.8"
  )

  .to(
    ".landing-third-card li:first-of-type .picto",
    {
      y: "-30px",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    },
    "-=0.2"
  )
  .to(
    ".landing-third-card li:nth-of-type(2) .picto",
    {
      y: "-30px",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    },
    "-=0.2"
  )
  .to(
    ".landing-third-card li:nth-of-type(3) .picto",
    {
      y: "-30px",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    },
    "-=0.2"
  );

//fourth
const fourthTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".landing-fourth",
      pin: true,
      //scrub: 1,
      end: "+=0",
      toggleActions: "restart none none none",
    },
  })
  .from(".landing-fourth-title", {
    opacity: 0,
    duration: 0.5,
  })
  .from(".landing-fourth-revolve .i01", {
    opacity: 0,
    duration: 0.5,
  })
  .from(
    ".landing-fourth-revolve .i02",
    {
      opacity: 0,
      duration: 0.5,
    },
    "-=0.4"
  )
  .from(
    ".landing-fourth-revolve .i03",
    {
      opacity: 0,
      duration: 0.5,
    },
    "-=0.4"
  )
  .from(
    ".landing-fourth-revolve .b01, .landing-fourth-revolve .b03, .landing-fourth-revolve .b04",
    {
      opacity: 0,
      duration: 0.2,
    },
    "-=0.4"
  )
  .from(
    ".landing-fourth-revolve .b02, .landing-fourth-revolve .c01, .landing-fourth-revolve .c02",
    {
      opacity: 0,
      duration: 0.2,
    },
    "-=0.2"
  )
  .from(".landing-fourth-revolve .group01", {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    delay: 0.7,
  })
  .to(
    ".landing-fourth-revolve .c01, .landing-fourth-revolve .c02",
    {
      opacity: 0,
      duration: 0.5,
    },
    "-=0.5"
  )
  .from(
    ".landing-fourth-title .line1",
    {
      marginTop: 0,
      duration: 0.7,
      ease: "expo.out",
    },
    "-=0.5"
  )
  .from(
    ".landing-fourth-title .line2",
    {
      opacity: 0,
      duration: 0.5,
    },
    "-=0.1"
  )
  .from(
    ".landing-fourth-certi",
    {
      opacity: 0,
      scale: 0.5,
      duration: 0.7,
      ease: "expo.out",
    },
    "-=0.5"
  )
  .to(".landing-fourth-certi .deco", {
    opacity: 1,
    duration: 1,
  });

//fifth
const fifthTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".landing-fifth",
      end: "+=0",
      //scrub: 1,
      pin: true,
    },
  })

  .from(
    ".landing-fifth .swiper-wrapper",
    {
      opacity: 0.5,
      duration: 0.2,
    },
    "+=0.1"
  );

//sixth
const sixthTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".landing-sixth",
      pin: true,
      scrub: 1,
      end: "+=0",
    },
  })

  .from(".landing-sixth-cont", {
    opacity: 0.5,
    y: 50,
    duration: 0.5,
  })

  .from(
    ".landing-sixth-wrapper",
    {
      opacity: 0.5,
      y: 50,
      duration: 0.5,
    },
    "+=0.2"
  );

//seventh
const seventhTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".landing-seventh",
      pin: true,
      scrub: 1,
      end: "+=0",
    },
  })

  .from(
    ".landing-seventh-cont",
    {
      opacity: 0.5,
      y: -200,
      duration: 0.5,
    },
    "+=0.2"
  )

  .from(".landing-seventh-wrapper", {
    opacity: 0.5,
    y: 50,
    duration: 0.5,
  });

//eighth

const eighthTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".landing-eighth",
      //pin: true,
      //scrub: 1,
      end: "+=500",
    },
  })

  .from(
    ".landing-eighth-title, .landing-eighth-article, .landing-eighth-notice, .landing-eighth-event",
    {
      y: 30,
      duration: 0.2,
    }
  );
