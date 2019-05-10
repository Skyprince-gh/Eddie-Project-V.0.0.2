window.onload = function () {

  //DOM Manipulation
  let add = document.getElementById('add');
  add.addEventListener('click', function (e) {
    e.preventDefault();
    e.target.parentElement.parentElement.classList.remove('fadeIn', 'delay-1s');
    e.target.parentElement.parentElement.classList.add('fadeOutLeft');
    let addContacts = document.querySelector('.add-contacts');

    setTimeout(function () {
      e.target.parentElement.parentElement.classList.add('hide');
      addContacts.classList.remove('hide')
      addContacts.classList.add('fadeInRight', 'show');
    }, 500);
    //console.log('classlist: ', e.target.parentElement.parentElement.classList);

    let searchBox = addContacts.querySelector('input');
     var timer;
    activateTimer = function(){
      console.log('timer activated')
      timer = setTimeout(function(){
        $.ajax({
          type: 'POST',
          url: '/search',
          data: { keystroke: searchBox.value },
          success: function (data) {
            console.log('matches: ', data);
          },
          error: function (err) {
  
          }
        });
  
      }, 2000)
    }
    

    searchBox.addEventListener('keyup', function () {

     clearTimeout(timer) 
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