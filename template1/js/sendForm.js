//send form
let form = document.querySelector('.banner-modal-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let bannerFormInput = document.querySelector('.banner-modal-form__input');
    if (bannerFormInput.value == 0) {
      document.querySelector('.invalid-feedback').classList.add('active');
      return
    } else {
      document.querySelector('.invalid-feedback').classList.remove('active');
    }
    let formData = new FormData(form);
    let request = new XMLHttpRequest();
    request.open('POST', '/mail.php', true);
    request.send(formData);
    request.addEventListener('readystatechange', function() {
      if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText)
      console.log('Form sended');
      document.querySelector('.banner-modal-form__inner .success').classList.add('active');
      document.querySelector('.banner-modal-form__inner .success').classList.add('active');
      let btn = document.querySelector('.banner-modal-form__btn');
      btn.disabled = true;
      // let data = JSON.parse(this.responseText);
      //   if(data.success == 1) {
      //     console.log('Form sended');
      //     document.querySelector('.banner-modal-form__inner .success').classList.add('active');
      //     let btn = document.querySelector('.banner-modal-form__btn');
      //     btn.disabled = true;
      //   } else {        
      //     document.querySelector('.invalid-feedback').classList.add('active');
      //   }
      } else {
        
      }
    });
  })
}