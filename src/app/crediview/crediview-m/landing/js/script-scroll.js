window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);
  initAnimations();

  // 새로고침 후 ScrollTrigger가 적용될 시간을 주기 위해 약간의 지연 추가
  setTimeout(() => {
    ScrollTrigger.refresh();
    console.log("ScrollTrigger refreshed after load");
  }, 500);
});

function initAnimations() {
  function setViewportHeight() {
    // `visualViewport.height` 사용 (모바일 환경에서 더 정확한 값)
    const vh = (window.visualViewport?.height || window.innerHeight) * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    console.log(`📏 Updated --vh to ${vh}px`);
  }

  window.addEventListener("resize", setViewportHeight);
  setViewportHeight();

  // 기존 ScrollTrigger 삭제 후 다시 생성
  ScrollTrigger.getAll().forEach((t) => t.kill());

  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      // const firstTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".SOLHeader-root",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(
      //     ".landing-first-swiper .swiper-wrapper .swiper-slide div.bn-content",
      //     {
      //       opacity: 0,
      //       y: 10,
      //       duration: 0.3,
      //       delay: 0.3,
      //     }
      //   )

      //   .from(".landing-first-swiper div.btn-wrap button.credit-rating-btn", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-first-pagination", {
      //     opacity: 0,
      //     x: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      // const introTl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: ".landing-intro",
      //     start: "top center",
      //     end: "bottom center",
      //     toggleActions: "play none none none",
      //   },
      // });

      // introTl
      //   .from(".landing-intro-cont", {
      //     opacity: 0,
      //     y: 20,
      //     duration: 0.7,
      //     delay: 0.3,
      //   })
      //   .to(".landing-intro-cont", {
      //     top: "50%",
      //     left: "50%",
      //     xPercent: -50,
      //     yPercent: -50,
      //     ease: "power2.inOut",
      //     opacity: 1,
      //   })
      //   .to(".landing-intro-motion", {
      //     width: "100%",
      //     height: "100%",
      //     bottom: 0,
      //     top: "50%",
      //     transform: "translate(-50%, -50%)",
      //     borderRadius: "30px",
      //     duration: 1,
      //     ease: "power2.inOut",
      //   })
      //   .to(
      //     ".landing-intro-motion",
      //     {
      //       width: "100%",
      //       height: "100%",
      //       borderRadius: "0px",
      //       top: 0,
      //       left: 0,
      //       transform: "translate(0%, 0%)",
      //       duration: 0.5,
      //       ease: "power2.inOut",
      //     },
      //     "+=0.2"
      //   );

      // const thirdTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-third",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //       toggleActions: "restart none none none",
      //     },
      //   })
      //   .from(".landing-third-card li:first-of-type", {
      //     opacity: 0,
      //     y: 50,
      //     duration: 0.4,
      //   })
      //   .from(
      //     ".landing-third-card li:nth-of-type(2)",
      //     {
      //       opacity: 0,
      //       y: 50,
      //       duration: 0.4,
      //     },
      //     "-=0.2"
      //   )
      //   .from(
      //     ".landing-third-card li:nth-of-type(3)",
      //     {
      //       opacity: 0,
      //       y: 50,
      //       duration: 0.4,
      //     },
      //     "-=0.2"
      //   )
      //   .from(
      //     ".landing-third-card li:first-of-type  > *",
      //     {
      //       opacity: 0,
      //       duration: 0.5,
      //     },
      //     "-=0.2"
      //   )
      //   .from(
      //     ".landing-third-card li:nth-of-type(2)  > *",
      //     {
      //       opacity: 0,
      //       duration: 0.5,
      //     },
      //     "-=0.8"
      //   )
      //   .from(
      //     ".landing-third-card li:nth-of-type(3)  > *",
      //     {
      //       opacity: 0,
      //       duration: 0.5,
      //     },
      //     "-=0.8"
      //   )

      //   .to(
      //     ".landing-third-card li:first-of-type:after",
      //     {
      //       y: "-30px",
      //       duration: 0.3,
      //       yoyo: true,
      //       repeat: 1,
      //       ease: "power2.inOut",
      //     },
      //     "-=0.2"
      //   )
      //   .to(
      //     ".landing-third-card li:nth-of-type(2):after",
      //     {
      //       y: "-30px",
      //       duration: 0.3,
      //       yoyo: true,
      //       repeat: 1,
      //       ease: "power2.inOut",
      //     },
      //     "-=0.2"
      //   )
      //   .to(
      //     ".landing-third-card li:nth-of-type(3):after",
      //     {
      //       y: "-30px",
      //       duration: 0.3,
      //       yoyo: true,
      //       repeat: 1,
      //       ease: "power2.inOut",
      //     },
      //     "-=0.2"
      //   );

      //fourth
      const fourthTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".landing-fourth",
            start: "top 80%",
            //scrub: 1,
            pin: true,
            end: "+=0",
            toggleActions: "restart none none none",
          },
        })
        .from(".landing-fourth-title", {
          opacity: 1,
          duration: 0.5,
        })
        .from(".landing-fourth-revolve .i01", {
          opacity: 1,
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

      // const fifthTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-fifth",
      //       start: "top 80%",
      //       //scrub: 1,
      //       //pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(".landing-fifth .landing-fifth-title h2", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(
      //     ".landing-fifth .landing-fifth-wrapper .swiper-slide .fifth-con",
      //     {
      //       opacity: 0,
      //       y: 10,
      //       duration: 0.3,
      //       delay: 0.3,
      //     }
      //   )

      //   .from(".landing-fifth-pagination", {
      //     opacity: 0,
      //     x: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      // const sixthhTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-sixth",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(".sixth-small-title, .landing-sixth-title", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-sixth .list-desc", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-sixth-wrapper", {
      //     opacity: 0,
      //     x: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      // const seventhTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-seventh",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(".seventh-small-title, .landing-seventh-title", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-seventh .list-desc", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-seventh-wrapper", {
      //     opacity: 0,
      //     x: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      // const eighthTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-eighth",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(".landing-eighth-title", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-eighth-swiper", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-eighth-pagination", {
      //     opacity: 0,
      //     x: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      // const shortcutTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-shortcut",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(".landing-shortcut-cont li:first-child", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-shortcut-cont li:last-child", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      // const quesTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-ques",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(".ques-box", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      ScrollTrigger.refresh();
    },

    "(max-width: 767px)": function () {
      // const firstTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".SOLHeader-root",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(
      //     ".landing-first-swiper .swiper-wrapper .swiper-slide div.bn-content",
      //     {
      //       opacity: 0,
      //       y: 10,
      //       duration: 0.3,
      //       delay: 0.3,
      //     }
      //   )

      //   .from(".landing-first-swiper div.btn-wrap button.credit-rating-btn", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-first-pagination", {
      //     opacity: 0,
      //     x: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      // const introTl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: ".landing-intro",
      //     start: "top center",
      //     end: "bottom center",
      //     toggleActions: "play none none none",
      //   },
      // });

      // introTl
      //   .from(".landing-intro-cont", {
      //     opacity: 0,
      //     y: 20,
      //     duration: 0.7,
      //     delay: 0.3,
      //   })

      //   .to(".landing-intro-motion", {
      //     width: "100%",
      //     height: "100%",
      //     bottom: 0,
      //     top: "50%",
      //     transform: "translate(-50%, -50%)",
      //     borderRadius: "30px",
      //     duration: 1,
      //     ease: "power2.inOut",
      //   })
      //   .to(
      //     ".landing-intro-motion",
      //     {
      //       width: "100%",
      //       height: "100%",
      //       borderRadius: "0px",
      //       top: 0,
      //       left: 0,
      //       transform: "translate(0%, 0%)",
      //       duration: 0.5,
      //       ease: "power2.inOut",
      //     },
      //     "+=0.2"
      //   );

      // const thirdTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-third",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //       toggleActions: "restart none none none",
      //     },
      //   })
      //   .from(".landing-third-card li:first-of-type", {
      //     opacity: 0,
      //     y: 50,
      //     duration: 0.4,
      //   })
      //   .from(
      //     ".landing-third-card li:nth-of-type(2)",
      //     {
      //       opacity: 0,
      //       y: 50,
      //       duration: 0.4,
      //     },
      //     "-=0.2"
      //   )
      //   .from(
      //     ".landing-third-card li:nth-of-type(3)",
      //     {
      //       opacity: 0,
      //       y: 50,
      //       duration: 0.4,
      //     },
      //     "-=0.2"
      //   )
      //   .from(
      //     ".landing-third-card li:first-of-type  > *",
      //     {
      //       opacity: 0,
      //       duration: 0.5,
      //     },
      //     "-=0.2"
      //   )
      //   .from(
      //     ".landing-third-card li:nth-of-type(2)  > *",
      //     {
      //       opacity: 0,
      //       duration: 0.5,
      //     },
      //     "-=0.8"
      //   )
      //   .from(
      //     ".landing-third-card li:nth-of-type(3)  > *",
      //     {
      //       opacity: 0,
      //       duration: 0.5,
      //     },
      //     "-=0.8"
      //   )

      //   .to(
      //     ".landing-third-card li:first-of-type:after",
      //     {
      //       y: "-30px",
      //       duration: 0.3,
      //       yoyo: true,
      //       repeat: 1,
      //       ease: "power2.inOut",
      //     },
      //     "-=0.2"
      //   )
      //   .to(
      //     ".landing-third-card li:nth-of-type(2):after",
      //     {
      //       y: "-30px",
      //       duration: 0.3,
      //       yoyo: true,
      //       repeat: 1,
      //       ease: "power2.inOut",
      //     },
      //     "-=0.2"
      //   )
      //   .to(
      //     ".landing-third-card li:nth-of-type(3):after",
      //     {
      //       y: "-30px",
      //       duration: 0.3,
      //       yoyo: true,
      //       repeat: 1,
      //       ease: "power2.inOut",
      //     },
      //     "-=0.2"
      //   );

      const fourthTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".landing-fourth",
            start: "top 80%",
            //scrub: 1,
            pin: true,
            end: "+=0",
            toggleActions: "restart none none none",
          },
        })
        .from(".landing-fourth-title", {
          opacity: 1,
          duration: 0.5,
        })
        .from(".landing-fourth-revolve .i01", {
          opacity: 1,
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

      // const fifthTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-fifth",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(".landing-fifth .landing-fifth-title h2", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(
      //     ".landing-fifth .landing-fifth-wrapper .swiper-slide .fifth-con",
      //     {
      //       opacity: 0,
      //       y: 10,
      //       duration: 0.3,
      //       delay: 0.3,
      //     }
      //   )

      //   .from(".landing-fifth-pagination", {
      //     opacity: 0,
      //     x: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      // const sixthhTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-sixth",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(".sixth-small-title, .landing-sixth-title", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-sixth .list-desc", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-sixth-wrapper", {
      //     opacity: 0,
      //     x: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      // const seventhTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-seventh",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(".seventh-small-title, .landing-seventh-title", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-seventh .list-desc", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-seventh-wrapper", {
      //     opacity: 0,
      //     x: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      // const eighthTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-eighth",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(".landing-eighth-title", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".anding-eighth-swiper", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-eighth-pagination", {
      //     opacity: 0,
      //     x: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      // const shortcutTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-shortcut",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(".landing-shortcut-cont li:first-child", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   })

      //   .from(".landing-shortcut-cont li:last-child", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      // const quesTl = gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ".landing-ques",
      //       start: "top 80%",
      //       //scrub: 1,
      //       pin: true,
      //       end: "+=0",
      //     },
      //   })

      //   .from(".ques-box", {
      //     opacity: 0,
      //     y: 10,
      //     duration: 0.3,
      //     delay: 0.3,
      //   });

      ScrollTrigger.refresh();
    },
  });

  // 새로고침 후 강제로 ScrollTrigger 갱신
  setTimeout(() => {
    ScrollTrigger.refresh();
    console.log("ScrollTrigger refreshed after matchMedia");
  }, 500);
}
