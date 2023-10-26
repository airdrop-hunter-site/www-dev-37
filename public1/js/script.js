window.onload = function() {


  // setTimeout(function () {
  //  let loader = document.querySelector('.loader');
  //  loader.remove();
  // }, 800);


  function clearActive(name) {
    for (let i=0; i<name.length;i++) {
      name[i].classList.remove('active');
    }
  }

  //networks change
  let netParentLinks = document.querySelectorAll('.networks-link');
  let netLinks = document.querySelectorAll('.networks-link .networks__link');
  for (let i=0; i<netLinks.length;i++) {
    netLinks[i].onclick = function() {
      let active = document.querySelector('.networks__active');
      active.classList.remove('notavailable');
      clearActive(netParentLinks);
      let activeHTML = this.innerHTML;
      let btn = document.querySelector('.networks__btn');
      btn.innerHTML = activeHTML;
      let parentEl = this.closest('.networks-link');
      parentEl.classList.add('active');
      return false;
    };
  }

  //language change
  let lgParentLinks = document.querySelectorAll('.languages-link');
  let lgLinks = document.querySelectorAll('.languages-link .languages__link');
  for (let i=0; i<lgLinks.length;i++) {
    lgLinks[i].onclick = function() {
      let active = document.querySelector('.languages__active');
      active.classList.remove('notavailable');
      clearActive(lgParentLinks);
      let activeHTML = this.innerHTML;
      let btn = document.querySelector('.languages__btn');
      btn.innerHTML = activeHTML;
      let parentEl = this.closest('.languages-link');
      parentEl.classList.add('active');
      return false;
    };
  }

  //sort change
  let sortLinks = document.querySelectorAll('.sort__link');
  for (let i=0; i<sortLinks.length;i++) {
    sortLinks[i].onclick = function() {
      clearActive(sortLinks);
      this.classList.add('active');
      let activeHTML = this.innerHTML;
      let btn = document.querySelector('.sort__btn');
      btn.classList.add('active');
      btn.innerHTML = activeHTML;
     
      return false;
    };
  }

  
  //views
  let viewsLinks = document.querySelectorAll('.views__link');
  for (let i=0; i<viewsLinks.length;i++) {
    viewsLinks[i].onclick = function() {
      clearActive(viewsLinks);
      viewsLinks[i].classList.add('active');
    };
    
  }

  //top tabs
  let topTabs = document.querySelectorAll('.top-tabs__tab');
  for (let i=0; i<topTabs.length;i++) {
    topTabs[i].onclick = function() {
      clearActive(topTabs);
      topTabs[i].classList.add('active');
    };
    
  }

  //wallet id cut
  let walletId = 0;
  let walletSpan = document.querySelectorAll('.wallet-id');
  
  for (let i=0; i<walletSpan.length;i++) {
    walletId = walletSpan[i].innerHTML.trim();
    let shortAddress = walletId.slice(0, 5);
    shortAddress += '...';
    shortAddress += walletId.slice(-4);
    walletSpan[i].innerHTML = shortAddress;
  }

  //copy address
  let btnCopy = document.querySelector('.popup__copy');
  if(btnCopy) {
    btnCopy.onclick = function() {
      var walletSpan = document.getElementById('wallet-id-full');
      var walletSpanText = walletSpan.textContent;
      navigator.clipboard.writeText(walletSpanText);
      btnCopy.classList.add('copied');
      setTimeout(function() {
        btnCopy.classList.remove('copied');
      }, 2000);
      return false;
    }
  }
  

  //addresses show
  let btnAddressShow = document.querySelector('.addresses__show');
  if(btnAddressShow) {
    btnAddressShow.onclick = function() {
    
      let addressBlock = document.querySelector('.addresses-group');
      if(this.classList.contains('active')) {
        this.classList.remove('active');
        addressBlock.classList.remove('active');
      } else {
        this.classList.add('active');
        addressBlock.classList.add('active');
      }
      return false;
    }
  }
  

  //add address, cancel address
  let btnConfirm = document.querySelector('.btn-confirm');

  if(btnConfirm) {
    btnConfirm.onclick = function() {
      let textConfirm = document.querySelector('#input-add').value;
  
      let shortAddress = textConfirm.trim().slice(0, 10);
      shortAddress += '...';
      shortAddress += textConfirm.slice(-8);
  
      let text = '<li class="list-group-item"><button type="button" class="btn btn-delete-address" data-bs-toggle="modal" data-bs-target="#deleteAddress" data-address="' +
      textConfirm + '"><span>' + shortAddress +
      '</span></button><a href="#" class="address-copy"><img src="images/copy.svg" alt=""></a><img src="images/copied.svg" alt="" class="copied"></li>';
      let containerAddress = document.querySelector('.addresses-group .list-group');
      containerAddress.insertAdjacentHTML('beforeend', text);
      document.querySelector('#input-add').value = '';
  
      let elemClose = this.closest('.modal-footer').querySelector('.btn-cancel');
      elemClose.click();
      
    }
  }
  
/*
  let myModalEl = document.getElementById('addAddress');
  myModalEl.addEventListener('hidden.bs.modal', function (event) {
    openAccount();    
  });

  let myModalEl3 = document.getElementById('deleteAddress');
  myModalEl3.addEventListener('hidden.bs.modal', function (event) {
    openAccount();    
  });
*/
  function openAccount() {
    let elemModal2 = document.querySelector('#accountModal');
    let modal2 = new bootstrap.Modal(elemModal2);
    modal2.show();
  }

  //address block
  let fullAddresses = document.querySelectorAll('.addresses-group .list-group-item');
  for (let i=0; i<fullAddresses.length;i++) {
    let fullAddress = fullAddresses[i].querySelector('button span').innerHTML.trim();
    let shortAddress = fullAddress.slice(0, 10);
    shortAddress += '...';
    shortAddress += fullAddress.slice(-8);
    fullAddresses[i].querySelector('button span').innerHTML = shortAddress;
    fullAddresses[i].querySelector('button').setAttribute('data-address', fullAddress);
  }

/* 
  let myModalEl2 = document.getElementById('deleteAddress');
  let button;
  myModalEl2.addEventListener('show.bs.modal', function (event) {
    button = event.relatedTarget;
    let buttonAddress = button.getAttribute('data-address');
    this.querySelector('.modal-text').innerHTML = buttonAddress;
  });

  let btnDel = document.querySelector('.btn-del');

  btnDel.onclick = function() {
    //console.log(button);
    if(button) {
      button = button.parentElement;
      button.parentElement.removeChild(button);
    }    

    let elemClose = this.closest('.modal-footer').querySelector('.btn-cancel');
    elemClose.click();
  
  }
*/

  //address copy
  document.body.addEventListener('click', function (event) {
    let target = event.target.closest('.address-copy');
    if (!target) return;
    let textAddress = target.parentElement.querySelector('button').getAttribute('data-address');
    //console.log(textAddress);
    navigator.clipboard.writeText(textAddress);
    target.parentElement.classList.add('copied');
    setTimeout(function() {
      target.parentElement.classList.remove('copied');
    }, 2000);
    return false;
  });


  //cards
  let buttons = document.querySelectorAll('.line-item__top');
  for (let i=0; i<buttons.length;i++) {
    buttons[i].onclick = function(e) {
      let parentEl = this.closest('.line-item');
      let answer = parentEl.querySelector('.line-item__bottom');


      if(parentEl.classList.contains('active')) {
        answer.style.height = 0 + "px";
        parentEl.classList.remove('active');
      } else {
        parentEl.classList.add('active');  
        let height1 = answer.scrollHeight + 20;
        answer.style.height = height1 + "px";
      }
    }
  }

  let details = document.querySelectorAll('.grid-item__details');
  for (let i=0; i<details.length;i++) {
    details[i].onclick = function(e) {
      let parentEl = this.closest('.grid-item');
      let answer = parentEl.querySelector('.grid-item__bottom');


      if(parentEl.classList.contains('active')) {
        answer.style.height = 0 + "px";
        parentEl.classList.remove('active');
      } else {
        parentEl.classList.add('active');  
        let height1 = answer.scrollHeight + 20;
        answer.style.height = height1 + "px";
      }
    }
  }

  //only mine
  //let checkOnly = document.querySelector('.personal__checkbox input');
  //console.log(checkOnly);


  //change content
  let textModal = document.getElementById('textModal');
  textModal.addEventListener('show.bs.modal', function (event) {
    let button = event.relatedTarget;
    let text = button.nextSibling.nextSibling.innerHTML;
    textModal.querySelector('.popup__wrap').innerHTML = text;
   
  });

  textModal.addEventListener('hidden.bs.modal', function (event) {
    textModal.querySelector('.popup__wrap').innerHTML = ' ';
  });


  //tabs
  let tabs = document.querySelectorAll('.nav-pills .nav-link');
  let tabText = document.querySelectorAll('.tabs .tab');

  for (let i=0; i<tabs.length;i++) {
   tabs[i].addEventListener("click", function(e) {
    e.preventDefault();
    tabs[i].classList.add('active');
    tabText[i].classList.add('active');
    for (let m=0; m<tabs.length;m++) {
         if(i != m) {
             tabs[m].classList.remove('active');
         }
    }
    for (let m=0; m<tabText.length;m++) {
         if(i != m) {
             tabText[m].classList.remove('active');
         }
    }
   
     
   });
  }


  function progressView(){
    let diagramBox = document.querySelectorAll('.diagram');
    diagramBox.forEach((box) => {
        let deg = (360 * box.dataset.percent / 100) + 180;
        if(box.dataset.percent >= 50){
            box.classList.add('over_50');
        }else{
            box.classList.remove('over_50');
        }
        box.querySelector('.piece.right').style.transform = 'rotate('+deg+'deg)';
    });
  }
  progressView();

}

$('div[href^="#"').on('click', function() {

  let href = $(this).attr('href');

  $('html, body').animate({
      scrollTop: $(href).offset().top - 100
  });

  // var item = document.getElementById(href.replace('#', '')).firstChild.nextSibling;
  // #FA0CFF, #FA0CFF, #FF3ECA, #FFB648
  // linear-gradient(180deg,  #FA0CFF, #FA0CFF, #FF3ECA, #FFB648);


  var item = $(href).children('.item');
  item.css({
    boxShadow: "0px 0px 0px 2px var(--gradient, #FA0CFF)",
    // outline: '#FFB648 solid'
  })
  // item.style.boxShadow = "0px 0px 0px 2px var(--gradient, #FA0CFF)";
  setTimeout(function(){
    item.css({
      boxShadow: "none",
      // outline: "none"
    }) ;
    },2000);
  return false;
});


$('.popup_checkbox').click(function() {
  if ($('input.popup_checkbox_input').is(':checked')) {
    $('.popup_img').css({
      'display': 'block'
    });
    $('.popup_li').css({
      'cursor': 'pointer'
    });

    $('.popup_img_grey').css({
      'display': 'none'
    });
  } else {
    $('.popup_img').css({
      'display': 'none'
    });
    $('.popup_img_grey').css({
      'display': 'block'
    });
    $('.popup_li').css({
      'cursor': 'not-allowed'
    });
  }
});


const slide = (slider,step,period) => () => {
  const startTime = Date.now()
  const startLeft = slider.scrollLeft
  const render = () => {
      const dt = Date.now() - startTime
      if(dt < period){
          slider.scrollLeft = startLeft + step * dt / period 
          requestAnimationFrame(render)
      }
  }
  requestAnimationFrame(render)
}

(()=>{
  const slider = document.querySelector('#projects_icons')
  document.querySelector('#prev_icon').addEventListener('click', slide(slider,-240,200))
  document.querySelector('#next_icon').addEventListener('click', slide(slider, 240,200))
})();
const slider = document.querySelector('#projects_icons');
slider.scrollLeft = slider.scrollLeft + 649;


const mediaQuery = window.matchMedia('(max-width: 360px)')
const mediaQuery2 = window.matchMedia('(min-width: 992px) and (max-width: 1200px)')
function handleTabletChange(e) {
  if (e.matches) {
    var testTarget = document.getElementsByClassName("accs");
    [...testTarget].forEach(element => {
      element.textContent = element.textContent.replace('accounts', 'accs')
    });
  }
}

mediaQuery.addListener(handleTabletChange);
mediaQuery2.addListener(handleTabletChange);
handleTabletChange(mediaQuery);
handleTabletChange(mediaQuery2);

const mediaQuery1 = window.matchMedia('(min-width: 360px) and (max-width: 992px)') 
const mediaQuery4 = window.matchMedia('(min-width: 1200px)')
function handleTabletChange1(e) {
  if (e.matches) {
    var testTarget = document.getElementsByClassName("accs");
    [...testTarget].forEach(element => {
      element.textContent = element.textContent.replace('accs', 'accounts')
    });
  }
}

mediaQuery1.addListener(handleTabletChange1)
mediaQuery4.addListener(handleTabletChange1)
handleTabletChange1(mediaQuery1);
handleTabletChange1(mediaQuery4); 



let icons = document.querySelectorAll('.icon_wrap')
for ( let icon of icons){
  href = icon.getAttribute('href');
  panel = document.querySelector(href).firstChild.nextSibling;
  if (panel.classList.contains('icon-hot')){
    icon.classList.add('icon_wrap_hot');
    let div = document.createElement('div');
    div.className = "hot_fire";
    div.innerHTML = "🔥";
    let img = icon.querySelector('img');
    img.style.position = 'relative';
    img.style.left = '7px'
    icon.append(div);
  }
}

let hide_news_height = $('.news_panel_hide').height();

$('.news_panel_hide').css({
  'height':0
});

$(document).ready(function() {
  $('.hide_news').click(function() {

      $('.news_panel').animate({
        height:0,
        opacity: 0,
        zIndex: -1
      }, 'slow');
      $('.news_panel_hide').animate({
        height: hide_news_height,
        opacity: 1,
        zIndex: 2,
        marginTop: 20
        
      }, 'slow');
      // console.log($('.top-tabs').offset().top);
      // console.log(window.scrollY);
      $('html, body').animate({
        scrollTop: $('.top-tabs').offset().top + 39
    }, 0);

      
  });
  $('.show_news').click(function() {

    let news_height = $('.slick-list').height();
    

    $('.news_panel').animate({
      height: news_height,
      opacity: 1,
      zIndex: 1
    });
    $('.news_panel_hide').animate({
      height: 0,
      opacity: 0,
      zIndex: -2,
      marginTop: 0
    });
});
});

$(window).on('resize', function() {
  if ($('.news_panel').height() != 0){
    $('.news_panel').css({
      height: ''
    })
  }
  
  
});
  
let icons_list = document.getElementById('projects_icons');
let childs = icons_list.children;
let child_len = childs.length;
let before_scroll = icons_list.scrollLeft;
icons_list.addEventListener('scroll', function(){
  let childs_after = icons_list.children;
  
  if ((icons_list.scrollLeft < 200) && (childs_after.length <= child_len*4) && (before_scroll > icons_list.scrollLeft)) {
    // 59px - item width
    icons_list.scrollLeft = icons_list.scrollLeft + 59*child_len/3
    
  };

  if (icons_list.scrollLeft > (child_len/3)*59){
    icons_list.scrollLeft = icons_list.scrollLeft - 59*child_len/3
  }
  before_scroll = icons_list.scrollLeft;
  

})

check_to_up_btn = function(){
  
  if (window.scrollY > ($('.page_tarif').offset().top -20 - $('.icon_list').height())){
    if ($('.to_up_btn').css('opacity') != 1){
      $('.to_up_btn').css({
        // 'display': 'block'
        'opacity': 1,
        'pointer-events': ''
        
      })
    }
    
  }
  else{
    
    if ($('.to_up_btn').css('opacity') == 1){
      $('.to_up_btn').css({
        'opacity' : 0,
        'pointer-events': 'none'
      });
      // setTimeout(function(){
      //   $('.to_up_btn').css({
      //     'display': 'none',
      //     'opacity' : 1
      //   });
      // }, 300)
    }
    

  }
}
check_to_up_btn()
document.addEventListener('scroll', check_to_up_btn)

$('.to_up_btn').on('click', function(){
    $('html, body').animate({
      scrollTop: $('body').offset().top
    }, 0);
});


$(".read_more").on("click", function(){
  var full_text = $(this).closest('.news_info').children('.news_text_part')
  var date = full_text.children('.news_date')
  var text = full_text.children('.news_text')
  var title = full_text.children('.news_title')
  console.log(title.html());

  var modal = $('.news_modal_body')
  // console.log(modal.children('.news_text').html());
  modal.children('.news_date').html(date.html());
  modal.children('.news_title').html(title.html())
  modal.children('.news_text').html(text.html()+text.html()+text.html());
  
})

const newsMediaQuery = window.matchMedia('(max-width: 577px)')

function newsOpenModal() {
  $(this).closest('.news_content').children('.news_info').children('.news_nav_row').children('.read_more_wrap').children('button').click()
}

function newsHandleTabletChange(e) {
  if (e.matches) {
    $(".news_pic").on("click", newsOpenModal)
    $(".news_text_part").on("click", newsOpenModal)
  }
  else{
    $(".news_pic").unbind('click')
    $(".news_text_part").unbind('click');
  }
}


newsMediaQuery.addListener(newsHandleTabletChange);
newsHandleTabletChange(newsMediaQuery);



