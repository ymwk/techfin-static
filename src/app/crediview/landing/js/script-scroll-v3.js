gsap.registerPlugin(ScrollTrigger);

// intro
const introTl = gsap.timeline().from('.landing-intro-title > *:first-child', {
    opacity: 0,
    y: 10,
    duration: .5,
    delay: 1,
})
.from('.landing-intro-title > *:nth-child(2)', {
    opacity: 0,
    y: 10,
    duration: .5,
}, '-=0.3')
.from('.landing-intro .text-active', {
    opacity: 0,
    duration: .5,
})
.from('.landing-intro .desc', {
    opacity: 0,
    duration: .5,
}, '-=0.3')
.from('.landing-intro-motion', {
    opacity: 0,
    duration: 1,
});

gsap.to('.landing-intro-motion', {
    scrollTrigger: {
        trigger: '.landing-intro',
        start: "25% center",
        end: "50% center",
        scrub: 1,
    },
    maxWidth: '100%',
    height: '100vh',
    borderRadius: 0,
    duration: .5,
})
gsap.to('.landing-intro-cont, .landing-intro-cont .text-active, .landing-intro-cont .desc', {
    scrollTrigger: {
        trigger: '.landing-intro',
        start: "25% center",
        scrub: 1,
    },
    marginTop: 0,
    // color: '#fff',
    duration: .5,
});

// header 테마 변경
gsap.to('.SOLHeader-root', {
    scrollTrigger: {
        trigger: '.landing-intro',
        start: "45% center",
        end: "bottom top",
        scrub: 1,
        toggleClass: {
            targets: '.SOLHeader-root',
            className: 'light'
        }
    }
});


// second
const secondTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.landing-second',
        start: "20% center",
        end: "+=1500",
        // scrub: 1,
    }
})
.from('.landing-second-title', {
    marginTop: '0',
    opacity: 1,
    duration: .5,
    delay: .3
})
.from('.landing-second-box', {
    opacity: 0,
    marginTop: 1000,
    duration: .5,
}, '-=0.2')

// const secondEmojiTl = gsap.timeline({
//     scrollTrigger: {
//         trigger: '.landing-second',
//         start: "35% center",
//         end: "+=1000",
//         // scrub: 1,
//     }
// })
.from('.landing-second-emoji li:first-of-type', {
    opacity: 0,
    duration: .15,
})
.to('.landing-second-emoji li:first-of-type', {
    bottom: 14,
    duration: .15,
    ease: "power1.out"
})
.from('.landing-second-emoji li:nth-of-type(2)', {
    opacity: 0,
    bottom: '100%',
    rotation: 0,
    duration: .15,
    ease: "power1.out"
})
.from('.landing-second-emoji li:nth-of-type(3)', {
    opacity: 0,
    bottom: '100%',
    rotation: -10,
    duration: .15,
    ease: "power1.out"
})
.from('.landing-second-emoji li:nth-of-type(4)', {
    opacity: 0,
    bottom: '100%',
    rotation: 10,
    duration: .15,
    ease: "power1.out"
})
.from('.landing-second-emoji li:nth-of-type(5)', {
    opacity: 0,
    bottom: '100%',
    rotation: 0,
    duration: .15,
    ease: "power1.out"
})
.from('.landing-second-emoji li:nth-of-type(6)', {
    opacity: 0,
    bottom: '100%',
    rotation: -10,
    duration: .15,
    ease: "power1.out"
})
.from('.landing-second-box .line1', {
    marginTop: '1.4em',
    duration: .3,
    delay: .5
})
.from('.landing-second-box .line2', {
    opacity: 0,
    duration: .3,
})

// gsap.from('.landing-second-box .line1', {
//     scrollTrigger: {
//         trigger: '.landing-second',
//         start: "65% center",
//         end: "65% center",
//         scrub: 1,
//     },
//     marginTop: '1.4em',
//     duration: 1,
// });

// gsap.from('.landing-second-box .line2', {
//     scrollTrigger: {
//         trigger: '.landing-second',
//         start: "65% center",
//         end: "65% center",
//         scrub: 1,
//     },
//     opacity: 0,
//     duration: 1,
// });


// third
const thirdTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.landing-third',
        // scrub: 1,
        pin: true,
        end: '+=1500'
    }
})
.from('.landing-third-card li:first-of-type', {
    opacity: 0,
    y: 50,
    duration: 0.4,
})
.from('.landing-third-card li:nth-of-type(2)', {
    opacity: 0,
    y: 50,
    duration: 0.4,
}, "-=0.2")
.from('.landing-third-card li:nth-of-type(3)', {
    opacity: 0,
    y: 50,
    duration: 0.4,
}, "-=0.2")
.from('.landing-third-card li:first-of-type  > *', {    
    opacity: 0,
    duration: 1,
}, "-=0.2")
.from('.landing-third-card li:nth-of-type(2)  > *', {    
    opacity: 0,
    duration: 1,
}, "-=0.8")
.from('.landing-third-card li:nth-of-type(3)  > *', {    
    opacity: 0,
    duration: 1,
}, "-=0.8")

.to('.landing-third-card li:first-of-type .picto', {
    y: '-30px',
    duration: 0.3,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut",
}, "-=0.2")
.to('.landing-third-card li:nth-of-type(2) .picto', {    
    y: '-30px',
    duration: 0.3,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut",
}, "-=0.2")
.to('.landing-third-card li:nth-of-type(3) .picto', {    
    y: '-30px',
    duration: 0.3,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut",
}, "-=0.2");


//fourth
const fourthTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.landing-fourth',
        pin: true,
        // scrub: 1,
        end: '+=1500'
    }
})
.from('.landing-fourth-title', {
    opacity: 0,
    duration: 0.5,
})
.from('.landing-fourth-revolve .i01', {
    opacity: 0,
    duration: 0.5,
})
.from('.landing-fourth-revolve .i02', {
    opacity: 0,
    duration: 0.5
}, "-=0.4")
.from('.landing-fourth-revolve .i03', {
    opacity: 0,
    duration: 0.5
}, "-=0.4")
.from('.landing-fourth-revolve .b01, .landing-fourth-revolve .b03, .landing-fourth-revolve .b04', {
    opacity: 0,
    duration: 0.2
}, "-=0.4")
.from('.landing-fourth-revolve .b02, .landing-fourth-revolve .c01, .landing-fourth-revolve .c02', {
    opacity: 0,
    duration: 0.2
}, "-=0.2")
.from('.landing-fourth-revolve .group01', {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    delay: .7,
})
.to('.landing-fourth-revolve .c01, .landing-fourth-revolve .c02', {
    opacity: 0,
    duration: 0.5,
}, "-=0.5")
.from('.landing-fourth-title .line1', {
    marginTop: 0,
    duration: .7,
    ease: 'expo.out',
}, "-=0.5")
.from('.landing-fourth-title .line2', {
    opacity: 0,
    duration: .5,
}, "-=0.1")
.from('.landing-fourth-certi', {
    opacity: 0,
    scale: 0.5,
    duration: .7,
    ease: 'expo.out',
}, "-=0.5")
.to('.landing-fourth-certi .deco', {
    opacity: 1,
    duration: 1,
})

//fifth
const fifthTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.landing-fifth',
        end: "+=1500",
        // scrub: 1,
        pin: true,
    }
})
.from('.landing-fifth-step', {
    opacity: 0,
    y: 30,
    duration: .5,
    onComplete: function(){
        fifthSwiper.autoplay.start();
    }
})
.from('.landing-fifth .swiper-wrapper', {
    opacity: 0,
    duration: .5,
}, '+=0.5')

//sixth
gsap.to('.landing-sixth', {
    scrollTrigger: {
        trigger: '.landing-sixth',
        pin: true,
        end: '+=1500'
    }
})

// seventh
const seventhV1 = gsap.timeline({
    scrollTrigger: {
        trigger: '.landing-seventh',
        // scrub: 1,
        pin: true,
    },
})
.fromTo('.landing-seventh-bg', {
    opacity: 0,
    // scale: 0.8
}, {
    opacity: 1,
    // scale: 1.35,
    duration: 1
})

.to('.landing-seventh-title', {
    opacity: 1,
    duration: .5,
}, '-=0.5')
.to('.landing-seventh-title', {
    alignItems: 'flex-start',
    left: 0,
    transform: 'translate(0,-50%)',
    duration: .4,
    delay: .5
})
.to('.landing-seventh .benefit', {
    opacity: 1,
    duration: .5,
})

// line2
.to('.landing-seventh .benefit ul', {
    yPercent: -20,
    duration: .3,
    delay: 1
})
.to('.landing-seventh .benefit li:first-of-type', {
    color: 'inherit',
    background: 'none',
    borderImage: 'none',
    opacity: '0.4',
    duration: .3,
    delay: .2
}, '-=0.5')
.to('.landing-seventh .benefit li:nth-of-type(2)', {
    color: 'transparent',
    backgroundImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    borderImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    opacity: 1,
    duration: .3,
    delay: .2
}, '-=0.5')
// line3
.to('.landing-seventh .benefit ul', {
    yPercent: -40,
    duration: .3,
    delay: 1
})
.to('.landing-seventh .benefit li:nth-of-type(2)', {
    color: 'inherit',
    background: 'none',
    borderImage: 'none',
    opacity: '0.4',
    duration: .3,
    delay: .2
}, '-=0.5')
.to('.landing-seventh .benefit li:nth-of-type(3)', {
    color: 'transparent',
    backgroundImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    borderImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    opacity: 1,
    duration: .3,
    delay: .2
}, '-=0.5')
// line4
.to('.landing-seventh .benefit ul', {
    yPercent: -60,
    duration: .3,
    delay: 1
})
.to('.landing-seventh .benefit li:nth-of-type(3)', {
    color: 'inherit',
    background: 'none',
    borderImage: 'none',
    opacity: '0.4',
    duration: .3,
    delay: .2
}, '-=0.5')
.to('.landing-seventh .benefit li:nth-of-type(4)', {
    color: 'transparent',
    backgroundImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    borderImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    opacity: 1,
    duration: .3,
    delay: .2
}, '-=0.5')
// line5
.to('.landing-seventh .benefit ul', {
    yPercent: -80,
    duration: .3,
    delay: 1
})
.to('.landing-seventh .benefit li:nth-of-type(4)', {
    color: 'inherit',
    background: 'none',
    borderImage: 'none',
    opacity: '0.4',
    duration: .3,
    delay: .2
}, '-=0.5')
.to('.landing-seventh .benefit li:nth-of-type(5)', {
    color: 'transparent',
    backgroundImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    borderImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    opacity: 1,
    duration: .3,
    delay: .2
}, '-=0.5')
.to('.landing-seventh-title, .landing-seventh .benefit', {
    opacity: 0,
    duration: .3,
    delay: 2
})
.from('.landing-seventh-fin', {
    scale: .9,
    opacity: 0,
    duration: .6,
})