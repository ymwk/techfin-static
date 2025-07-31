const seventhV1 = gsap.timeline({
    scrollTrigger: {
        trigger: '.welcome-mv',
        // scrub: 1,
        // pin: true,
    },
})
.fromTo('.welcome-mv-bg', {
    opacity: 0,
    scale: 0.8
}, {
    opacity: 1,
    scale: 1.35,
    duration: 1
})

.to('.welcome-mv-title', {
    opacity: 1,
    duration: .5,
}, '-=0.5')
.to('.welcome-mv-title', {
    alignItems: 'flex-start',
    left: 0,
    transform: 'translate(-50%,-50%)',
    fontSize: '24px',
    duration: .4,
    delay: .5
})
.to('.welcome-mv .benefit', {
    opacity: 1,
    duration: .5,
})

// line2
.to('.welcome-mv .benefit ul', {
    yPercent: -20,
    duration: .3,
    delay: 1
})
.to('.welcome-mv .benefit li:first-of-type', {
    color: 'inherit',
    background: 'none',
    borderImage: 'none',
    opacity: '0.2',
    duration: .3,
    delay: .2
}, '-=0.5')
.to('.welcome-mv .benefit li:nth-of-type(2)', {
    color: 'transparent',
    backgroundImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    borderImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    opacity: 1,
    duration: .3,
    delay: .2
}, '-=0.5')
// line3
.to('.welcome-mv .benefit ul', {
    yPercent: -40,
    duration: .3,
    delay: 1
})
.to('.welcome-mv .benefit li:nth-of-type(2)', {
    color: 'inherit',
    background: 'none',
    borderImage: 'none',
    opacity: '0.2',
    duration: .3,
    delay: .2
}, '-=0.5')
.to('.welcome-mv .benefit li:nth-of-type(3)', {
    color: 'transparent',
    backgroundImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    borderImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    opacity: 1,
    duration: .3,
    delay: .2
}, '-=0.5')
// line4
.to('.welcome-mv .benefit ul', {
    yPercent: -60,
    duration: .3,
    delay: 1
})
.to('.welcome-mv .benefit li:nth-of-type(3)', {
    color: 'inherit',
    background: 'none',
    borderImage: 'none',
    opacity: '0.2',
    duration: .3,
    delay: .2
}, '-=0.5')
.to('.welcome-mv .benefit li:nth-of-type(4)', {
    color: 'transparent',
    backgroundImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    borderImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    opacity: 1,
    duration: .3,
    delay: .2
}, '-=0.5')
// line5
.to('.welcome-mv .benefit ul', {
    yPercent: -80,
    duration: .3,
    delay: 1
})
.to('.welcome-mv .benefit li:nth-of-type(4)', {
    color: 'inherit',
    background: 'none',
    borderImage: 'none',
    opacity: '0.2',
    duration: .3,
    delay: .2
}, '-=0.5')
.to('.welcome-mv .benefit li:nth-of-type(5)', {
    color: 'transparent',
    backgroundImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    borderImage: 'linear-gradient(97deg, #0046ff, #8e48ff 60%)',
    opacity: 1,
    duration: .3,
    delay: .2
}, '-=0.5')
.to('.welcome-mv-title, .welcome-mv .benefit', {
    opacity: 0,
    duration: .3,
    delay: 2
})
.to('.welcome-mv-fin', {
    scale: 1,
    opacity: 1,
    duration: .6,
})