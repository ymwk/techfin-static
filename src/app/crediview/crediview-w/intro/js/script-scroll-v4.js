gsap.registerPlugin(ScrollTrigger);

// section 마우스 스크롤 
const sections = document.querySelectorAll('section');
  let isScrolling = false; // 스크롤 상태 체크

  // ScrollTrigger를 사용하여 각 섹션으로 스크롤 이동하도록 설정
  if (sections) {
    sections.forEach((section, index) => {
      // 각 섹션에 대해 ScrollTrigger 생성
      ScrollTrigger.create({
        trigger: section,
        start: 'top center', // 섹션의 상단이 화면 중앙에 오도록 시작
        end: 'bottom center', // 더 적절한 스크롤 트리거 끝 설정
        scrub: true, // 스크롤 위치와 애니메이션을 동기화
        // pin: true,
        onEnter: () => {
          if (!isScrolling) {
            isScrolling = true; // 스크롤 이동 시작
            document.body.style.overflowY = 'hidden';
            gsap.to(window, {
              scrollTo: section,
              duration: 0.5,
              ease: 'power2.inOut',
              onComplete: () => {
                document.body.style.overflowY = 'auto';
                isScrolling = false; // 스크롤 이동 완료 후 상태 변경
              },
            });
          }
        },
        onLeaveBack: () => {
          if (!isScrolling) {
            document.body.style.overflowY = 'hidden';
            isScrolling = true; // 스크롤 이동 시작
            gsap.to(window, {
              scrollTo: sections[index - 1],
              duration: 0.5,
              ease: 'power2.inOut',
              onComplete: () => {
                document.body.style.overflowY = 'auto';
                isScrolling = false; // 스크롤 이동 완료 후 상태 변경
              },
            });
          }
        },
      });
    });
  }

  // Floating 함수 정의
function Floating(triggerHeight) {

  const goScrollToTop = () => {
    // 모든 ScrollTrigger 비활성화
    ScrollTrigger.getAll().forEach((trigger) => trigger.disable());
  
    const topBtn = document.querySelector('.landing-topBtn'); // 버튼 요소
  
    // 스크롤 완료를 감지하기 위한 플래그
    let isScrolling = false;
  
    // 휠 이벤트를 막기 위한 함수
    const preventWheel = (e) => {
      if (isScrolling) {
        e.preventDefault(); // 휠 이벤트 방지
      }
    };
  
    // 스크롤 완료 감지 로직
    const handleScroll = () => {
      if (Math.abs(window.scrollY) < 1 && isScrolling) {
        if (topBtn) {
          topBtn.style.display = 'none';
        }
  
        isScrolling = false;
  
        // ScrollTrigger 다시 활성화
        ScrollTrigger.getAll().forEach((trigger) => trigger.enable());
  
        // 휠 이벤트 다시 활성화
        window.removeEventListener('wheel', preventWheel);
  
        // 이벤트 제거
        window.removeEventListener('scroll', handleScroll);
      }
    };
  
    // 휠 이벤트 비활성화
    window.addEventListener('wheel', preventWheel, { passive: false });
  
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);
  
    // 스크롤 즉시 이동
    isScrolling = true;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  
  
  // 초기화 함수
  const initScrollAnimations = (triggerHeight) => {
    // 여기에 스크롤 애니메이션 초기화 로직을 추가하세요.
  };
  
  // DOMContentLoaded 이벤트를 사용하여 초기화 함수 호출
  document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations(triggerHeight);
  
    const topBtn = document.querySelector('.landing-topBtn');
  
    window.addEventListener('scroll', function() {
      if (window.scrollY > 200) { // 스크롤 위치가 200px 이상일 때 버튼 표시
        topBtn.style.display = 'block';
      } else {
        topBtn.style.display = 'none';
      }
    });
  
    topBtn.addEventListener('click', goScrollToTop);
  });
  }
  
  // Floating 함수 호출 예시
  Floating({ triggerHeight: 100 });


const aboutSection02 = gsap.timeline({
    scrollTrigger: {
        trigger: '.intro-about-section02',
        start: 'top top',
        end: '+=0', 
        scrub: true, 
        pin: true, 
    },
})


const aboutSection03 = gsap.timeline({
    scrollTrigger: {
        trigger: '.intro-about-section03',
        start: 'top top',
        width: '100%',
        height: '100vh',
        end: '+=0',
        scrub: true,
        pin: true,
    },
})

const aboutSection04 = gsap.timeline({
    scrollTrigger: {
        trigger: '.intro-about-section04',
        start: 'top top',
        width: '100%',
        height: '100vh',
        end: '+=0',
        scrub: true,
        pin: true,
    },
})

const aboutSection05 = gsap.timeline({
    scrollTrigger: {
        trigger: '.intro-about-section05',
        start: 'top top',
        width: '100%',
        height: '100vh',
        end: '+=0',
        scrub: true,
        pin: true,
    },
})

const aboutSection06 = gsap.timeline({
    scrollTrigger: {
        trigger: '.intro-about-section06',
        start: 'top top',
        width: '100%',
        height: '100vh',
        end: '+=0',
        scrub: true,
        pin: true,
    },
})

//서비스소개 - 신용평가등급조회

const creditGetSection02 = gsap.timeline({
    scrollTrigger: {
        trigger: '.credit-get-section02',
        start: 'top top',
        width: '100%',
        height: '100vh',
        end: '+=0',
        scrub: true,
        pin: true,
    },
})

const creditGetSection03 = gsap.timeline({
    scrollTrigger: {
        trigger: '.credit-get-section03',
        start: 'top top',
        width: '100%',
        height: '100vh',
        end: '+=0',
        scrub: true,
        pin: true,
    },
})



//AI경영진단보고서
const excutiveBorad = gsap.timeline({
    scrollTrigger: {
        trigger: '.excutive-borad-section01',
        start: 'top top',
        width: '100%',
        height: '100vh',
        end: '+=0',
        scrub: true,
        pin: true,
    },
})






























 

