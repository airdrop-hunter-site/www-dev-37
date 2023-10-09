  // Faq animate
  let faqButtons = document.querySelectorAll('.faq-content__question');
  let faqAnswers = document.querySelectorAll('.faq-content__answer');

  for (let i = 0; i < faqButtons.length; i++) {
    faqButtons[i].addEventListener('click', () => {
      faqButtons[i].classList.toggle('show');
    })
  }

  let hamburger = document.querySelector('.hamburger');
  let body = document.querySelector('body');
  let btnsCloseModal = this.document.querySelectorAll('.block-modal-close');

  function clearActive(name) {
    for (let i=0; i<name.length;i++) {
      name[i].classList.remove('active');
    }
  }

  function detach(node) {
    return node.parentElement.removeChild(node);
  }

  //language change
  function changeLinks(el) {
    
    let lgLinks = document.querySelectorAll(el);
    for (let i=0; i<lgLinks.length;i++) {
      lgLinks[i].addEventListener('click', function(e) {
        clearActive(lgLinks);
        let activeHTML = this.innerHTML;
        let btns = document.querySelectorAll('.languages__btn');
        for(let m=0;m<btns.length;m++) {
          btns[m].innerHTML = activeHTML;
        }
        this.classList.add('active');
        return false;
      });
    }

    let abcLinks = document.querySelectorAll('.lg-abc-item');
    let btnBack = document.querySelector('.btn-back');
    for (let i=0; i<abcLinks.length;i++) {
      abcLinks[i].addEventListener('click', function() {
        if(!this.classList.contains('lg-abc-all')) {
          btnBack.classList.add('active');
        }
      });
    }

    btnBack.addEventListener('click', function(e) {
      e.preventDefault();
      btnBack.classList.remove('active');
      let btnAll = document.querySelector('#pills-acb-all-tab');
      btnAll.click();
    });

    stopPropagationLg();
  }
  changeLinks('header .languages-link');

  //btn lg 
  let lgBtn = document.querySelector('#dropdownLanguages');
  if(lgBtn) {
    lgBtn.addEventListener('click', function(e) {
      if(body.classList.contains('lg-mobile')) {
        body.classList.remove('lg-mobile');
        detach(document.querySelector('.lg-overlay'));
      } else {
        body.classList.add('lg-mobile');
        let overlay = document.createElement("div");
        overlay.classList.add('lg-overlay');
        body.appendChild(overlay);
      }
    });
  }

  let closeBtn = document.querySelector('.languages .lg-close');
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let btn = document.querySelector('.languages__btn');
    btn.click();
  });

  function stopPropagationLg() {
    document.querySelector('.languages .dropdown-menu').addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
  

  //menu
  function mobileOpen() {
    body.classList.add('mobile');
    let overlay = document.createElement("div");
    overlay.classList.add('overlay');
    body.appendChild(overlay);
    let mobileMenuActive = document.createElement("div");
    mobileMenuActive.classList.add('mobile-menu');
    mobileMenuActive.classList.add('active');
    let block1 = body.querySelector('.menu-block').cloneNode(true);
    let block2 = body.querySelector('.top-header-btns').cloneNode(true);
    mobileMenuActive.appendChild(block1);
    mobileMenuActive.appendChild(block2);
    body.appendChild(mobileMenuActive);

    //detach(body.querySelector('.top-header-info'));
    changeLinks('.mobile-menu .languages-link');

    //close if click #  
      let smoothLinks = document.querySelectorAll('.mobile-menu .menu-block a[href^="#"]');
      for(let i=0;i<smoothLinks.length;i++) {
        smoothLinks[i].addEventListener('click', function (e) {
          closeMenu();    
        });
      }
  }

  function closeMenu() {
    hamburger.classList.remove('is-active');
    body.classList.remove('mobile');
    detach(document.querySelector('.overlay'));
    detach(document.querySelector('.mobile-menu'));

    changeLinks('header .languages-link');

    if(body.classList.contains('lg-mobile')) {
      body.classList.remove('lg-mobile');
      detach(document.querySelector('.lg-overlay'));
    } 
  }

  body.addEventListener('click', function(e) {
   if(e.target.className == 'overlay') {
    closeMenu();
   }
   if(e.target.className == 'lg-overlay') {
    body.classList.remove('lg-mobile');
    detach(document.querySelector('.lg-overlay'));
   }
  });

  //close modal
  if(btnsCloseModal) {
    for(let i=0;i<btnsCloseModal.length;i++) {
      btnsCloseModal[i].addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
      
    }
  }

  hamburger.addEventListener('click', function() {
    if(this.classList.contains('is-active')) {
      closeMenu();
    } else {
      this.classList.add('is-active');
      mobileOpen();
    }
  });

window.onload = function() {
  //video block
  let playBtns = document.querySelectorAll('.video-play-btn');

  for(let i=0;i<playBtns.length;i++) {
    playBtns[i].addEventListener('click', function(e) {
      e.preventDefault();
    
      let idVideo = playBtns[i].getAttribute('data-video').split('https://www.youtube.com/watch?v=')[1];
      
      if(idVideo) {
        let iframeBlock = document.createElement("div");
        iframeBlock.classList.add('video-container');
        let parent = playBtns[i].closest('.video-block');
        let parentHeight = parent.offsetHeight;

        let ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", "https://www.youtube.com/embed/"+ idVideo +"?autoplay=1&wmode=transparent");
        ifrm.setAttribute("allow", "autoplay");
        ifrm.style.width = "100%";
        ifrm.style.height = parentHeight + "px";
        iframeBlock.appendChild(ifrm);

        
        parent.innerHTML = '';
        parent.appendChild(iframeBlock);
      }


    });
  }

  // select + tab
  function changeStep(el) {
    let lgLinks = document.querySelectorAll(el);
    
    for (let i=0; i<lgLinks.length;i++) {
      lgLinks[i].addEventListener('click', function(e) {
        e.preventDefault();
        clearActive(lgLinks);
        this.classList.add('active');
        let activeHTML = this.innerHTML;

        let btn = document.querySelector('.steps-select-active');
        btn.innerHTML = activeHTML;

        let val = this.getAttribute('data-value');
        let tabs = document.querySelectorAll('.nav-link');
        for(let i=0;i<tabs.length;i++) {
          let tabId = tabs[i].getAttribute('id');
          if(tabId == val) {
            tabs[i].click();
          }
        }
        
        
      });
    }
  }
  changeStep('.steps .step-link');

  //send form
  let form = document.querySelector('#subscribe');
  if(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      let formData = new FormData(form);
      let request = new XMLHttpRequest();
      request.open('POST', '/mail.php', true);
      request.send(formData);
      request.addEventListener('readystatechange', function() {
        if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
        let data = JSON.parse(this.responseText);
          if(data.success == 1) {
            console.log('Form sended');
            document.querySelector('#subscribe .success').classList.add('active');
            let btn = document.querySelector('#subscribe .btn-color');
            btn.disabled = true;
            btn.querySelector('.submit-btn').classList.add('hide');
            btn.querySelector('.submitted').classList.add('active');
	    ga_dataLayer_push("subscribe","email1");
          } else {        
          document.querySelector('#subscribe input[name="email"]').classList.add(data.email);
          }
          
        }
      });
    });
  }

  let form2 = document.querySelector('#subscribe2');
  if(form2) {
    form2.addEventListener('submit', function(event) {
      event.preventDefault();
      let formData = new FormData(form2);
      let request = new XMLHttpRequest();
      request.open('POST', '/mail.php', true);
      request.send(formData);
      request.addEventListener('readystatechange', function() {
        if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
        let data = JSON.parse(this.responseText);
          if(data.success == 1) {
            console.log('Form sended');
            document.querySelector('#subscribe2 .success').classList.add('active');
            let btn = document.querySelector('#subscribe2 .btn-color');
            btn.disabled = true;
            btn.querySelector('.submit-btn').classList.add('hide');
            btn.querySelector('.submitted').classList.add('active');
	    ga_dataLayer_push("subscribe","email2");
          } else {        
          document.querySelector('#subscribe2 input[name="email"]').classList.add(data.email);
          }
          
        }
      });
    });
  }

  let swiperPluses = '';
  function startSwiperPlus() {
    swiperPluses = new Swiper(".pluses .swiper-container", {
      loop: false,
      mousewheel: false,
      freeMode: true,
      spaceBetween: 6,
      observer: true,
      observeParents: true,
      slidesPerView: 'auto',
      scrollbar: {
          el: '.pluses .swiper-scrollbar',
          draggable: true,
          snapOnRelease: false,
      }
    });
  }

  function destroySwiper() {
    if (typeof swiperPluses == 'object') swiperPluses.destroy();
    swiperPluses = '';
  }


  //watch width 
  let width = document.body.clientWidth;
  (width > 767) ? destroySwiper() : startSwiperPlus();

  let onresize = function() {
    width = document.body.clientWidth;
    (width > 767) ? destroySwiper() : startSwiperPlus();
  }
  window.addEventListener("resize", onresize);
 
}