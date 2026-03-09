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
  const sideBtns = document.querySelectorAll('.sidebar-menu-cont .sidebar-btn');
  const foldBtn = document.querySelector('.sidebar-menu .sidebar-foldBtn');

  const sideTopBtns = document.querySelectorAll('.sidebar-menu-top .sidebar-btn');
  const tabConts = document.querySelectorAll('.sidebar-menu-cont');

  if (sideBtns) {
    sideBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        sideBtns.forEach((item) => {
          if (item.classList.contains('ac--active')) item.classList.remove('ac--active');
        });
        btn.classList.add('ac--active');

        // 클릭시 sidebar가 접혀있으면 펼침
        if (!foldBtn.classList.contains('open')) {
          foldBtn.classList.add('open');
          document.body.classList.add('open');
        }
      });
    });
  }

  if (sideTopBtns) {
    sideTopBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        sideTopBtns.forEach((item) => {
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
      });
    });
  }

  if (foldBtn) {
    foldBtn.addEventListener('click', (e) => {
      if (foldBtn.classList.contains('open')) {
        foldBtn.classList.remove('open');
        document.body.classList.remove('open');

        // 접히면 메뉴버튼 활성화
        document.querySelector('.sidebar-btn.menu').click();
      } else {
        foldBtn.classList.add('open');
        document.body.classList.add('open');
      }
    });
  }

  // 즐겨찾기 토글
  const favBtn = document.querySelectorAll('.btn-fav');

  favBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      btn.classList.toggle('ac--active');
    });
  });

  // header start
  const globalBtns = document.querySelectorAll('.global-btn-user, .global-btn-notify, .global-btn-apps');

  globalBtns.forEach((wrapper) => {
    const btn = wrapper.querySelector('.btn-popper');

    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = wrapper.classList.contains('ac--active');

      globalBtns.forEach((w) => w.classList.remove('ac--active'));

      if (!isActive) {
        wrapper.classList.add('ac--active');
      }
    });
  });

  // 바깥 클릭 닫기
  document.addEventListener('click', (e) => {
    globalBtns.forEach((wrapper) => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('ac--active');
      }
    });
  });
  // header end

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

  // 아코디언
  const summary = document.querySelectorAll('.btn-summary');
  summary.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = document.querySelector(`#${btn.getAttribute(['data-target-id'])}`);
      btn.classList.toggle('ac--open');
      target.classList.toggle('ac--open');
    });
  });

  // common popper
  const popperRoot = document.querySelectorAll('.popper-comm-root');

  popperRoot.forEach((wrapper) => {
    const openBtn = wrapper.querySelector('.btn-popper');
    if (openBtn) {
      openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.classList.toggle('ac--active');
      });
    }

    const closeBtn = wrapper.querySelector('.btn-popper-close');
    if (closeBtn) {
      closeBtn.onclick = () => wrapper.classList.remove('ac--active');
    }
  });

  // 검색창 관련
  const updateFieldState = (field, eventType) => {
    if (field.readOnly || field.disabled) return;
    
    const hasValue = field.value.trim() !== '';

    // 검색 popper
    const searchRoot = field.closest('.popper-search-root');
    if (searchRoot) {
      if (eventType === 'blur' || eventType === 'init') {
        searchRoot.classList.remove('ac--active');
      } else {
        searchRoot.classList.toggle('ac--active', hasValue);
      }
    }

    // textfield
    const textfieldRoot = field.closest('.textfield-root');
    if (textfieldRoot) textfieldRoot.classList.toggle('form--focus', hasValue);
  };

  document.querySelectorAll('.textfield-form').forEach((field) => {
    ['input', 'focus', 'blur'].forEach((event) => {
      field.addEventListener(event, () => updateFieldState(field, event));
    });

    // Clear button
    const root = field.closest('.textfield-root');
    if (root) {
      const clearBtn = root.querySelector('.btn-clear');
      if (clearBtn) {
        clearBtn.style.display = 'none';
        clearBtn.addEventListener('click', () => {
          field.value = '';
          field.focus();
          updateFieldState(field, 'input');
        });
      }
    }

    // 초기 실행
    updateFieldState(field, 'init');
  });
  
  // header 검색창
  const headerSearchField = document.querySelector('.console-header-search .textfield-form');
  if (headerSearchField) {
    const headerSearchRoot = headerSearchField.closest('.console-header-search.popper-search-root');

    headerSearchField.addEventListener('focus', () => {
      headerSearchRoot.classList.add('ac--active');
    });

    headerSearchField.addEventListener('input', () => {
      headerSearchRoot.classList.add('ac--active');
    });
  }

  // 바깥 영역 클릭
  document.addEventListener('click', (e) => {
    popperRoot.forEach((wrapper) => {
      if (!wrapper.contains(e.target) && wrapper.classList.contains('ac--active')) {
        wrapper.classList.remove('ac--active');
      }
    });
  });
});

// file change
function fileChange(el) {
  if (el.files && el.files[0]) {
    el.parentNode.querySelector('.filefield-name').textContent = el.files[0].name;
  } else {
    el.parentNode.querySelector('.filefield-name').textContent = '파일을 첨부해 주세요.';
  }
}
