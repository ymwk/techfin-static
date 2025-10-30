// 전체메뉴
document.addEventListener('DOMContentLoaded', function () {
  const navItem = document.querySelectorAll('.TMHeader-gnb .item');
  const navBtn = document.querySelectorAll('.TMHeader-gnb .btn');

  navBtn.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      navItem.forEach((item) => {
        item.classList.remove('on');
      });

      btn.parentElement.classList.add('on');
    });
  });

  const menuBtn = document.querySelector('.TMHeader-menuBtn');
  const gnb = document.querySelector('.TMHeader-nav');
  const closeBtn = document.querySelector('.TMHeader-closeBtn');
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
  const header = document.querySelector('.TMHeader-root');
  // top button
  // const topBtn = document.querySelector('.footer-topBtn');
  let beforeScrollY = window.scrollY || 0;

  window.addEventListener('scroll', function () {
    let currentScrollY = window.scrollY;
    header.classList.toggle('sticky', beforeScrollY < currentScrollY && 50 < currentScrollY);
    beforeScrollY = currentScrollY;

    // topBtn.classList.toggle('show', 20 < currentScrollY);
  });

  // topBtn.addEventListener('click', function () {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });
  // });

  // footer family site
  const familyList = document.querySelector('.TMFooter-dropbox');
  const familyBtn = document.querySelector('.TMFooter-dropbox-btn');

  familyBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    familyList.classList.toggle('on');
  });

  document.addEventListener('click', (e) => {
    e.target !== familyList ? familyList.classList.remove('on') : false;
  });

  //Breadcrumbs
  const breadcrumbs = document.querySelectorAll('.TMBreadcrumbs-item');

  breadcrumbs.forEach((item) => {
    const btn = item.querySelector('.TMBreadcrumbs-btn');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      item.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      e.target !== item ? item.classList.remove('show') : false;
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
});
