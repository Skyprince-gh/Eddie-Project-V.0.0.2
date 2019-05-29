window.onload = function () {
  let body = document.querySelector('body');
  let userId = body.getAttribute('id');
  let addBtn = document.getElementById('add');
  let settingsBtn = document.getElementById('settings');
  let settingsPanel = document.querySelector('.settings');
  let contactsPanel = document.querySelector('.contacts-panel');
  let backToContactsBtn = document.getElementById('back-to-contacts');
  let searchBackToContacts = document.getElementById('search-back-to-contacts');
  let addContacts = document.querySelector('.add-contacts');

  //DOM Manipulation

  //WHAT HAPPENS WHEN THE SETTINGS BUTTON IS CLICKED
  settingsBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.nodeName === 'BUTTON') {
      e.target.parentElement.parentElement.classList.remove('show', 'fadeInLeft', 'fadeOutRight');
      // e.target.parentElement.parentElement.classList.add('fadeOutRight')

      //hide contacts panel
      setTimeout(function () {
        e.target.parentElement.parentElement.classList.add('hide')

        //show settings panel
        settingsPanel.classList.remove('hide');
        settingsPanel.classList.add('show');

      }, 500);

    }
  })



  //WHAT HAPPENS WHEN THE BACK TO CONTACTS BUTTON IS CLICKED FROM SEARCH
  searchBackToContacts.addEventListener('click', function (e) {

    if (e.target.nodeName === 'BUTTON') {
      e.stopPropagation();
      e.preventDefault();
      addContacts.classList.remove('show');
      addContacts.classList.add('fadeOutRight')
     

      //Hide search Panel
      setTimeout(function(){      
        addContacts.classList.add('hide');
        contactsPanel.classList.remove('hide', 'fadeOutLeft');
        contactsPanel.classList.add('show', 'fadeIn');
      }, 500);

    }
  });





  //WHAT HAPPENS WHEN BACK TO CONTACTS BUTTON IS CLICKED
  backToContactsBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.nodeName === 'BUTTON') {
      e.target.parentElement.parentElement.classList.remove('show');
      //e.target.parentElement.parentElement.classList.add('fadeOutRight');

      //hide settings panel
      setTimeout(function () {
        e.target.parentElement.parentElement.classList.add('hide');

        //show contacts panel panel
        contactsPanel.classList.remove('hide');
        contactsPanel.classList.add('show');

      }, 500)
    }
  });


  //WHAT HAPPENS WHEN THE ADD BUTTON IS CLICKED

  addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.nodeName);
    if (e.target.nodeName === 'BUTTON') {
      //fade the contact list out
      e.target.parentElement.parentElement.classList.remove('fadeIn', 'delay-1s', 'show');
      e.target.parentElement.parentElement.classList.add('fadeOutLeft');

      //Reveal add contacts panel in few millisecons

      let searchBox = addContacts.querySelector('input');
      let timer;
      let collection;

      setTimeout(function () {
        e.target.parentElement.parentElement.classList.add('hide');
        addContacts.classList.remove('hide', 'fadeOutRight')
        addContacts.classList.add('fadeInRight', 'show');
      }, 500);
      //console.log('classlist: ', e.target.parentElement.parentElement.classList);


      //WHAT HAPPENS WHEN USER TYPES INTO SEARCH BOX
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
                  console.log('id: ', id);
                  
                  //POPULATE CARD
                  popUpAddContact = document.querySelector('.popup-add-contact');

                  popUpAddContact.innerHTML = `
             <img src="assets/images/user-picture.jpeg" alt="">
             <button class="add"><i class="material-icons">add</i></button>
     
             <div id='${id}' class="contact-info">
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


                  //WHAT HAPPENS WHEN USER CLICK ADD CONTACT BUTTON ON POPUP MENUS ADD CONTACT

                  popUpAddContact.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Hello');

                    //clear search-box
                    searchBox.value = '';
                    //clear list
                    collection.innerHTML = '';
                    //fire Ajax function to send add user to contact list
                    $.ajax({
                      url: '/addContact',
                      type: 'POST',
                      data: { contactId: id, contactName: name },
                      success: function (data) {
                        popUpAddContact.classList.remove('show');
                        popUpAddContact.classList.add('hide');
                        cover.classList.remove('show');
                        cover.classList.add('hide');
                        addContacts.classList.remove('hide');
                        addContacts.classList.add('show');
                      },
                      error: function (e) {
                        console.log(e);
                      }

                    });
                  });
                })
              })




            },
            error: function (err) {

            }
          });

        }, 500) //waiting period 500 milliseconds before search is activated
      }


      searchBox.addEventListener('keyup', function () {
        if (searchBox.value.length === 0) {
          collection.innerHTML = '';
        }
        clearTimeout(timer);
        console.log('timer cleard')
        activateTimer();

      })
    }
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