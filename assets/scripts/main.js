  //DOM Manipulation
  let add = document.getElementById('add');
  add.addEventListener('click', function(e){
      e.preventDefault();
      e.target.parentElement.parentElement.classList.remove('fadeIn', 'delay-1s');
      e.target.parentElement.parentElement.classList.add('fadeOutLeft');
      console.log('classlist: ', e.target.parentElement.parentElement.classList);

      let addContacts = document.querySelector('.add-contacts');
      addContacts.classList.add('fadeInRight', 'delay-1s');
     

  })