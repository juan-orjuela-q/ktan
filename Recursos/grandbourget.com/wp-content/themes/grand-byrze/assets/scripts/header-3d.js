document.addEventListener('DOMContentLoaded', () => {
  const menuTl = gsap.timeline();
  const menu = document.querySelector(".js-menu");
  const openMenu = document.querySelector(".js-menu-open");
  const closeMenu = document.querySelector(".js-menu-close");
  const callOpenContainers = document.querySelectorAll(".js-open-call");
  // const popupOpenContainers = document.querySelectorAll(".js-popup-open");
  const popupCloseContainers = document.querySelectorAll(".js-close-popup");
  const mobilePopupTl = gsap.timeline();
  
  function animationCloseMenu() {
    menu.classList.remove("show");
  }
  
  function animationShowMenu() {
    menuTl.kill();
    
    setTimeout(() => {
      menu.classList.add("show");
      const ease = "power4.easeOut";
      const tl = gsap.timeline({ paused: true });
      gsap.set(menu, { transition: "none" });
      tl.fromTo(
        menu,
        { webkitClipPath: "circle(0% at 94% 7%)" },
        {
          webkitClipPath: "circle(150% at 100% 0%)",
          ease: "power4.easeInOut",
          duration: 1.2,
          clearProps: "all",
        }
      );
      tl.fromTo(
        ".menu__block",
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, stagger: 0.35, duration: 2, ease: "power4.out" },
        "<"
      );
      tl.timeScale(2.5);
      tl.play();
    }, 100);
  }
  
  if (openMenu) {
    openMenu.addEventListener("click", (e) => {
      e.preventDefault();
      animationShowMenu();
    });
  }
  
  if (closeMenu) {
    closeMenu.addEventListener("click", (e) => {
      e.preventDefault();
      animationCloseMenu();
    });
  }
  
  
  function hidePopup() {
    const overlay = document.querySelector(".overlay");
    if (overlay) {
      overlay.classList.remove("show");
    }
  }
  
  function showPopupByType(type) {
    if (!type) return;
    const popup = document.querySelector(`[data-popup-name=${type}]`);
    const overlay = document.querySelector(".overlay");
    if (popup) {
      popup.style = {
        visibility: 'visible',
        opacity: 1,
      };
    }
    
    if (overlay) {
      overlay.classList.add("show");
    }
  }
  
  showPopupByType();
  
  function showMobilePopup() {
    mobilePopupTl.clear();
    document.querySelector(".overlay").classList.add("show");
    mobilePopupTl
      .to(".popup-actions", {
        opacity: 0,
        display: "none",
        duration: 0.5,
      })
      .to(".popup-callback", {
        opacity: 1,
        display: "block",
        duration: 0.5,
      });
  }
  
  function hideMobilePopup() {
    const overlay = document.querySelector(".overlay");
    const isPopupOpen = document.querySelector(".open-popup");
    const actions = document.querySelector(".popup-actions");
    
    setTimeout(() => {
      if (overlay) {
        overlay.classList.remove("open-popup");
        overlay.classList.remove("show");
      }
      if (isPopupOpen) {
        isPopupOpen.style = {
          visibility: 'hidden',
          opacity: 0,
        };
      }
      if (actions) {
        actions.style = {
          visibility: 'visible',
          opacity: 1,
        };
      }
    }, 300);
  }
  
  if (callOpenContainers) {
    callOpenContainers.forEach(container => {
      container.addEventListener("click", () => {
        hidePopup();
        hideMobilePopup();
      });
    })
  }
  
  document.addEventListener('click', e => {
    const popupOpenContainers = e.target.closest('.js-popup-open');
    if (!popupOpenContainers) return;
    mobilePopupTl.clear();
    const typeName = popupOpenContainers.dataset.popupType;
    const width = document.documentElement.offsetWidth;
    (width <= 480) ? showMobilePopup() : showPopupByType(typeName);
    document.addEventListener('click', observeOverlayCloseHandler);
  })
  // if (popupOpenContainers) {
  //   popupOpenContainers.forEach(container => {
  //     container.addEventListener('click', e => {
  //       mobilePopupTl.clear();
  //       const typeName = e.currentTarget.dataset.popupType;
  //       const width = document.documentElement.offsetWidth;
  //       (width <= 480) ? showMobilePopup() : showPopupByType(typeName);
  //       document.addEventListener('click', observeOverlayCloseHandler);
  //     })
  //   })
  //
  // }
  
  function observeOverlayCloseHandler(e) {
    if (e.target.classList.contains('overlay')) {
      hidePopup();
      menuTl.clear();
      document.removeEventListener('click', observeOverlayCloseHandler);
      return;
    }
  
    if (document.documentElement.offsetWidth <= 480) {
      hideMobilePopup();
      document.removeEventListener('click', observeOverlayCloseHandler);
    }
  }
  
  if (popupCloseContainers) {
    popupCloseContainers.forEach(container => {
      container.addEventListener("click", e => {
        const width = document.documentElement.offsetWidth;
        (width <= 480) ? hideMobilePopup() : hidePopup();
        document.removeEventListener('click', observeOverlayCloseHandler);
      });
    })
  }
  
})
