document.addEventListener('DOMContentLoaded', function () {
  const sideTabBtns = document.querySelectorAll('.sidebar-tab-btn');
  const sideTabConts = document.querySelectorAll('.sidebar-content');

  sideTabBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = document.querySelector(`.${btn.getAttribute(['data-target'])}`);
      sideTabBtns.forEach((item) => item.classList.remove('ac--active'));
      btn.classList.add('ac--active');

      sideTabConts.forEach((item) => (item.style.cssText = 'display:none'));
      target.style.cssText = 'display:flex';
    });
  });

  // sidebar fold
  const foldRoot = document.querySelector('.console-container');
  const foldBtn = document.querySelector('.sidebar-foldBtn');

  foldBtn.addEventListener('click', (e) => {
    foldRoot.classList.toggle('ac--fold');
  });

  // sidebar menu
  const navItem = document.querySelectorAll('.sidebar-menu .menu-item');

  navItem.forEach((item) => {
    const btn = item.querySelector('.btn');
    btn.addEventListener('click', (e) => {
      item.classList.toggle('ac--active');
    });
  });

  // sitemap
  const menuBtn = document.querySelector('.btn-sitemap');
  const menuRoot = document.querySelector('.console-header');
  const menuBg = document.querySelector('.console-header-inner');
  const menuSub = document.querySelectorAll('.console-nav-sub');
  const childHeight = document.querySelector('.console-nav-sub li').clientHeight;
  console.log(childHeight);
  let lng = 0;
  let maxHeight = 0;

  menuSub.forEach((element) => {
    const count = element.children.length;
    if (count > lng) lng = count;
  });

  maxHeight = childHeight * lng + 100;
  console.log(maxHeight);

  function showHeader() {
    menuRoot.classList.add('show');
    menuBg.style.height = maxHeight + 'px';
  }

  function hideHeader() {
    menuRoot.classList.remove('show');
    menuBg.style.height = '50px';
  }

  menuRoot.addEventListener('mouseenter', () => {
    showHeader();
  });

  menuRoot.addEventListener('mouseleave', () => {
    hideHeader();
  });

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuRoot.classList.contains('show') ? hideHeader() : showHeader();
  });
});
