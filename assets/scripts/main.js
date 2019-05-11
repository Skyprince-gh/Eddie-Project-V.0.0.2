window.onload = function () {
let body = document.querySelector('body');
let userId = body.getAttribute('id');
  //DOM Manipulation
  let add = document.getElementById('add');
  add.addEventListener('click', function (e) {
    e.preventDefault();
    //console.log('clicked')
    e.target.parentElement.parentElement.classList.remove('fadeIn', 'delay-1s');
    e.target.parentElement.parentElement.classList.add('fadeOutLeft');
    let addContacts = document.querySelector('.add-contacts');
    let searchBox = addContacts.querySelector('input');
    let timer;
    let collection;

    setTimeout(function () {
      e.target.parentElement.parentElement.classList.add('hide');
      addContacts.classList.remove('hide')
      addContacts.classList.add('fadeInRight', 'show');
    }, 500);
    //console.log('classlist: ', e.target.parentElement.parentElement.classList);

    activateTimer = function () {

      timer = setTimeout(function () {
        $.ajax({
          type: 'POST',
          url: '/search',
          data: { keystroke: searchBox.value },
          success: function (data) {
            //GET SEARCH DATA AND DISPLAY
            //console.log('matches: ', data);

            collection = addContacts.querySelector('ul.collection');
            collection.innerHTML = '';

            data.forEach(result => {
              console.log('info: ', result.info);
              collection.innerHTML += `<li info='${result.info}' email="${result.email}"class="contact" id="${result.id}">${result.name}</li>`;
            })


            contacts = collection.querySelectorAll('li');

            //HANDLE CONTACT CLICKS AND DISPLAY INFO
            contacts.forEach(contact => {
              contact.addEventListener('click', function (e) {
                let id = e.target.id;
                let name = e.target.innerHTML;
                let email = e.target.getAttribute('email');
                let info = e.target.getAttribute('info');

                //POPULATE CARD

                popUpAddContact = document.querySelector('.popup-add-contact');

                popUpAddContact.innerHTML = `
             <img src="assets/images/user-picture.jpeg" alt="">
             <button class="add"><i class="material-icons">add</i></button>
     
             <div class="contact-info">
                 <h1 class="name">
                     ${name}
                 </h1>
                 <p class="email">${email}</p>
                 <p class="info">
                     ${info}
                 </p>
             </div>
             `;
                popUpAddContact.classList.remove('hide');
                popUpAddContact.classList.add('show');
                cover.classList.remove('hide');
                cover.classList.add('show');
                addContacts.classList.remove('show');
                addContacts.classList.add('hide')


                //ADD CONTACT

                popUpAddContact.addEventListener('click', function(e){
                  e.preventDefault();
                  e.stopPropagation();
                  
                  //fire Ajax function to send add user to contact list
                 $.ajax({
                   url: '/addContact',
                  type: 'POST',
                  data: {contactId: id, userId: userId, contactName: name },
                  success: function(data){

                  },
                  error: function(e){
                    console.log(e)
                  }

                 });
                });
              })
            })




          },
          error: function (err) {

          }
        });

      }, 1000)
    }


    searchBox.addEventListener('keyup', function () {
      if (searchBox.value.length === 0) {
        collection.innerHTML = '';
      }
      clearTimeout(timer);
      console.log('timer cleard')
      activateTimer();

    })
    //inject data into a drop down list
  })

}
  //Watch node js videos on how to use setTimeOut and waitforseconds
  //user must use search box to look for contacts
  //Create user list drop down
  //Contacts must be stored in registered users section.
  //register a bunch of users about 10;
  //Watch web-sockets tutorial
  //return to angie app



  //Card Info
  //  popUpAddContact = document.querySelector('.popup-add-contact');
            //  let cardName = popUpAddContact.querySelector('h1.name');
            //  cardName.innerHTML = name;
            //  let cardEmail = popUpAddContact.querySelector('p.email');
            //  cardEmail.innerHTML = email;
            //  let cardInfo = popUpAddContact.querySelector('p.info');
            //  cardInfo.innerHTML = info;

            //  popUpAddContact.classList.remove('hide'); 
            //  popUpAddContact.classList.add('show');

            //  let addContacts = document.querySelector('.add-contacts');        
            //  let cover = document.querySelector('#cover');
            //  cover.classList.remove('hide'); 
            //  cover.classList.add('show'); 
            //  addContacts.classList.remove('show'); 
            //  addContacts.classList.add('hide')