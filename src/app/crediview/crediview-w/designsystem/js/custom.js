// Tooltip
const toolip = tippy(document.querySelectorAll('[data-trigger="tooltip"]'), {
  placement: "bottom-start",
  arrow: false,
  allowHTML: true,
  interactive: true,
  trigger: "click",
  theme: "light-border",
  maxWidth: 500,
  content(reference) {
    let template = reference.nextElementSibling;
    return template;
  },
});

// popover
const popover = tippy(document.querySelectorAll('[data-trigger="popover"]'), {
  placement: "bottom",
  arrow: false,
  allowHTML: true,
  interactive: true,
  trigger: "click",
  theme: "notify",
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
  placement: "right",
  arrow: false,
  allowHTML: true,
  interactive: true,
  trigger: "click",
  theme: "popmenu",
  maxWidth: 150,
  content(reference) {
    let template = reference.nextElementSibling;
    return template;
  },
});

// tab
const tabRoot = document.querySelectorAll(".SOLTab-root");

tabRoot.forEach((item) => {
  const tabBtn = item.querySelectorAll(".SOLTab-btn");
  const tabCont = item.querySelectorAll(".SOLTab-content");

  tabBtn.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      tabCont.forEach((content) => {
        content.classList.remove("st--active");
      });

      tabBtn.forEach((content) => {
        content.classList.remove("st--active");
      });

      tabBtn[index].classList.add("st--active");
      tabCont[index].classList.add("st--active");
    });
  });
});

// filter
const filter = document.querySelectorAll(".SOLFilter-root");

filter.forEach((item) => {
  const tabBtn = item.querySelectorAll(".SOLFilter-btn");

  tabBtn.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      tabBtn.forEach((content) => {
        content.classList.remove("st--active");
      });

      tabBtn[index].classList.add("st--active");
    });
  });

  // const btnWrap = item.querySelector('.SOLFilter-wrap');
  // btnWrap.appendChild(btnWrap.querySelector("button:first-child"));
});

// file change
function fileChange(el) {
  el.parentNode.querySelector(".SOLFile-name").textContent = el.files[0].name;
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
  const option = el.nextElementSibling.querySelectorAll("li");

  option.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      el.innerText = btn.innerText;
    });
  });
}

// SNB
const lnbItem = document.querySelectorAll(".SOLSidebar-lnb-item");

lnbItem.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    lnbItem.forEach((content) => {
      content.classList.remove("st--open");
    });

    lnbItem[index].classList.add("st--open");
  });
});

// Accordian
const terms = document.querySelectorAll(".js-accordian-root");

terms.forEach((item) => {
  const btn = item.querySelector(".js-accordian-btn");

  btn.addEventListener("click", (e) => {
    if (item.classList.contains("st--open")) {
      item.classList.remove("st--open");
    } else {
      item.classList.add("st--open");
    }
  });
});
