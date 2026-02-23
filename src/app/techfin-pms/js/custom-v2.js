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

  // sidebar
  const sideBtn = document.querySelectorAll('.sidebar-menu .sidebar-btn');
  const foldBtn = document.querySelector('.sidebar-menu .sidebar-foldBtn');
  const tabConts = document.querySelectorAll('.sidebar-tab-cont');

  sideBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      sideBtn.forEach((item) => {
        if (item.classList.contains('ac--active')) item.classList.remove('ac--active');
      });
      btn.classList.add('ac--active');

      const targetId = btn.dataset.targetId;

      tabConts.forEach((tab) => {
        if (tab.id === targetId) {
          tab.style.display = 'flex'; // target만 flex
        } else {
          tab.style.display = 'none'; // 나머지 none
        }
      });

      // 클릭시 sidebar가 접혀있으면 펼침
      if (!foldBtn.classList.contains('open')) {
        foldBtn.classList.add('open');
        document.body.classList.add('open');
      }
    });
  });

  foldBtn.addEventListener('click', (e) => {
    if (foldBtn.classList.contains('open')) {
      foldBtn.classList.remove('open');
      document.body.classList.remove('open');
    } else {
      foldBtn.classList.add('open');
      document.body.classList.add('open');

      // 펼침버튼 눌렀을때 active된 sideBtn이 하나도 없으면 첫번째 sideBtn에 active클래스를 추가
      let hasActive = false;
      sideBtn.forEach((btn) => {
        if (btn.classList.contains('ac--active')) {
          hasActive = true;
        }
      });

      if (!hasActive && sideBtn.length > 0) {
        sideBtn[0].classList.add('ac--active');
      }

      const targetId = sideBtn[0].dataset.targetId;

      tabConts.forEach((tab) => {
        if (tab.id === targetId) {
          tab.style.display = 'flex'; // target만 flex
        } else {
          tab.style.display = 'none'; // 나머지 none
        }
      });
    }
  });

  // 기업 즐겨찾기 토글
  const favBtn = document.querySelectorAll('.btn-fav');

  favBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      btn.classList.toggle('ac--active');
    });
  });

  //메모 검색 버튼
  const searchBtn = document.querySelectorAll('.btn-memo-search');
  searchBtn.forEach((btn) => {
    const search = btn.closest('.sidebar-tab-cont').querySelector('.sidebar-memo-searchbox');
    if (!search) {
      return;
    }
    btn.addEventListener('click', (e) => {
      if (search.classList.contains('ac--active')) {
        search.classList.remove('ac--active');
      } else {
        search.classList.add('ac--active');
        search.querySelector('.textfield-form').focus();
      }
    });
  });

  //메모 삭제 버튼
  const delBtn = document.querySelectorAll('.btn-memo-del');
  delBtn.forEach((btn) => {
    const parente = btn.closest('.sidebar-tab-cont').querySelector('.sidebar-content');

    btn.addEventListener('click', (e) => {
      parente.classList.toggle('ac--del');
    });
  });

  // header
  const userBtn = document.querySelector('.global-btn-user');
  if (userBtn) {
    userBtn.querySelector('.btn-user').addEventListener('click', (e) => {
      e.stopPropagation();
      userBtn.classList.toggle('ac--active');
    });

    // 바깥 영역 닫기
    document.addEventListener('click', (e) => {
      if (!userBtn.contains(e.target)) {
        userBtn.classList.remove('ac--active');
      }
    });
  }
  
  const notifyBtn = document.querySelector('.global-btn-notify');
  if (notifyBtn) {
    notifyBtn.querySelector('.btn-notify').addEventListener('click', (e) => {
      e.stopPropagation();
      notifyBtn.classList.toggle('ac--active');
    });

    // 바깥 영역 닫기
    document.addEventListener('click', (e) => {
      if (!notifyBtn.contains(e.target)) {
        notifyBtn.classList.remove('ac--active');
      }
    });
  }

  // tab
  const tabs = document.querySelectorAll('.tabmenu-btn');

  if (tabs.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        const parent = tab.parentElement;
        const siblingTabs = parent.querySelectorAll('.tabmenu-btn');

        // tab button toggle
        siblingTabs.forEach((siblings) => {
          siblings.classList.remove('ac--active');
        });
        tab.classList.add('ac--active');

        if (tab.dataset.targetTab) {
          const targetId = tab.dataset.targetTab;
          const targetCont = document.getElementById(targetId);

          // tab contents
          if (targetCont) {
            targetCont.style.display = 'block';

            const siblingContents = targetCont.parentElement.querySelectorAll('.tabmenu-content');

            siblingContents.forEach((content) => {
              if (content !== targetCont) {
                content.style.display = 'none';
              }
            });
          }
        }
      });
    });
  }

  // tooltip
  function updateTooltipPosition() {
    const tooltips = document.querySelectorAll('.tooltip-root');
    const threshold = window.innerWidth - 300;

    tooltips.forEach((tip) => {
      const rect = tip.getBoundingClientRect();
      if (rect.left > threshold) {
        tip.classList.add('xp');
      } else {
        tip.classList.remove('xp');
      }
    });
  }

  updateTooltipPosition();
  window.addEventListener('resize', updateTooltipPosition);
});
