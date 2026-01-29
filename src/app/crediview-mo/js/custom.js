// Tooltip
const toolip = tippy(document.querySelectorAll('[data-trigger="tooltip"]'), {
  placement: 'bottom-start',
  arrow: false,
  allowHTML: true,
  interactive: true,
  trigger: 'click',
  theme: 'light-border',
  maxWidth: 500,
  content(reference) {
    let template = reference.nextElementSibling;
    return template;
  },
});

// popover
const popover = tippy(document.querySelectorAll('[data-trigger="popover"]'), {
  placement: 'bottom',
  arrow: false,
  allowHTML: true,
  interactive: true,
  trigger: 'click',
  theme: 'notify',
  maxWidth: 500,
  content(reference) {
    // const id = reference.getAttribute("data-template");
    // let template = document.getElementById(id);
    let template = reference.nextElementSibling;
    return template;
  },
});

// popmenu
const popmenu = tippy(document.querySelectorAll('[data-trigger="popmenu"]'), {
  placement: 'right',
  arrow: false,
  allowHTML: true,
  interactive: true,
  trigger: 'click',
  theme: 'popmenu',
  maxWidth: 150,
  content(reference) {
    let template = reference.nextElementSibling;
    return template;
  },
});

// tab
const tabRoot = document.querySelectorAll('.SOLTab-root');

tabRoot.forEach((item) => {
  const tabBtn = item.querySelectorAll('.SOLTab-btn');
  const tabCont = item.querySelectorAll('.SOLTab-content');

  tabBtn.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      tabCont.forEach((content) => {
        content.classList.remove('st--active');
      });

      tabBtn.forEach((content) => {
        content.classList.remove('st--active');
      });

      tabBtn[index].classList.add('st--active');
      tabCont[index].classList.add('st--active');
    });
  });
});

// filter
const filter = document.querySelectorAll('.SOLFilter-root');

filter.forEach((item) => {
  const tabBtn = item.querySelectorAll('.SOLFilter-btn');

  tabBtn.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      tabBtn.forEach((content) => {
        content.classList.remove('st--active');
      });

      tabBtn[index].classList.add('st--active');
    });
  });

  // const btnWrap = item.querySelector('.SOLFilter-wrap');
  // btnWrap.appendChild(btnWrap.querySelector("button:first-child"));
});

// file change
function fileChange(el) {
  el.parentNode.querySelector('.SOLFile-name').textContent = el.files[0].name;
}

// combobox
// function combobox(el) {
//   let isOpenCombo = false;
//   const option = el.nextElementSibling;

//   function toggleCombo() {
//     event.stopPropagation();
//     isOpenCombo ? closeCombo() : openCombo();
//   }

//   function openCombo() {
//     option.classList.add('st--visible');
//     isOpenCombo = true;
//   }

//   function closeCombo() {
//     option.classList.remove('st--visible');
//     isOpenCombo = false;
//   }

//   toggleCombo();

//   document.addEventListener('click', (e) => {
//     if (isOpenCombo && !option.contains(e.target)) closeCombo();
//   });
// }

function combobox(el) {
  const option = el.nextElementSibling.querySelectorAll('li');

  option.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      el.innerText = btn.innerText;
    });
  });
}

// SNB
const lnbItem = document.querySelectorAll('.SOLSidebar-lnb-item');

lnbItem.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    lnbItem.forEach((content) => {
      content.classList.remove('st--open');
    });

    lnbItem[index].classList.add('st--open');
  });
});

// Accordian
const terms = document.querySelectorAll('.js-accordian-root');

terms.forEach((item) => {
  const btn = item.querySelector('.js-accordian-btn');

  btn.addEventListener('click', (e) => {
    if (item.classList.contains('st--open')) {
      item.classList.remove('st--open');
    } else {
      item.classList.add('st--open');
    }
  });
});

// 전체메뉴
document.addEventListener('DOMContentLoaded', function () {
  const depth01Links = document.querySelectorAll('.gnb-menu .depth01 > a');

  depth01Links.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const subMenu = this.nextElementSibling;

      document
        .querySelectorAll('.gnb-menu .depth01 > a')
        .forEach((otherLink) => {
          if (otherLink !== this) {
            otherLink.classList.remove('on');
            const otherSubMenu = otherLink.nextElementSibling;
            if (otherSubMenu) {
              otherSubMenu.style.maxHeight = null;
            }
          }
          console.log(otherLink);
        });

      // 현재 메뉴 열기/닫기 및 on 클래스 토글
      if (subMenu.style.maxHeight) {
        subMenu.style.maxHeight = null;
        this.classList.remove('on');
      } else {
        subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
        this.classList.add('on');
      }
    });
  });

  // 모든 .gnb-menu .depth01 요소를 선택
  const depth01Items = document.querySelectorAll('.gnb-menu .depth01');

  depth01Items.forEach((item) => {
    const subMenu = item.querySelector('.sub-menu.depth02');
    const link = item.querySelector('a');

    if (!subMenu) {
      // .sub-menu.depth02가 없으면
      link.style.setProperty('--before-content', 'none');
      link.style.position = 'relative';
    }
  });

  const menuBtn = document.querySelector('.SOLHeader-menuBtn');
  const gnb = document.querySelector('.SOLHeader-nav');
  const closeBtn = document.querySelector('.SOLHeader-closeBtn');
  let currentY = window.scrollY || 0;

  menuBtn.addEventListener('click', function () {
    currentY = window.scrollY;
    gnb.classList.add('open');

    // 전체메뉴 오픈시 body class 추가
    document.body.classList.add('fixed');
    // body 위치 고정
    document.body.style.cssText = `top: -${currentY}px`;
  });

  closeBtn.addEventListener('click', function () {
    const scrollY = document.body.style.top;
    gnb.classList.remove('open');

    document.body.classList.remove('fixed');
    document.body.style.cssText = '';
    window.scrollTo({
      top: parseInt(scrollY || '0', 10) * -1,
    });
  });

  // scroll header
  const header = document.querySelector('.SOLHeader-root');
  let beforeScrollY = window.scrollY || 0;

  window.addEventListener('scroll', function () {
    let currentScrollY = window.scrollY;
    header.classList.toggle(
      'sticky',
      beforeScrollY < currentScrollY && 50 < currentScrollY
    );
    beforeScrollY = currentScrollY;
  });

  // top button
  const topBtn = document.querySelector('.footer-floating-btn.top');
  topBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});
