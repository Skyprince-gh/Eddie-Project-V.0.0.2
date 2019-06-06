
const config = {
    apiKey: "AIzaSyBawDmkESvSIJ-o0heENrOcp0mkXo7Q3CM",
    authDomain: "eddie-project-d2d84.firebaseapp.com",
    databaseURL: "https://eddie-project-d2d84.firebaseio.com",
    projectId: "eddie-project-d2d84",
    storageBucket: "gs://eddie-project-d2d84.appspot.com/",
    messagingSenderId: "211996821751"
}
firebase.initializeApp(config);

let body = document.querySelector('body');
// Settings Panel 
let addImage = document.querySelector('.add-image');
let picture = document.getElementById('profile-picture');
let addInfo = document.getElementById('add-user-info');
let infoForm = document.getElementById('user-info');
let userInfoDisplay = document.getElementById('info-display');
let userInfoSubmit = document.getElementById('submit-user-info');
let textArea = document.getElementById('text-area');
let currentInfo = document.getElementById('current-info');




let loadProfile = function () {
    firebase.firestore().collection('user data').where('accountNo', '==', body.id).get().then(snapshot => {
        let profilePicture = snapshot.docs[0].data().profilePicture;
        console.log('picture: ',profilePicture);
        picture.setAttribute("src", profilePicture);
    })
}

let progress = function (snapshot) {
    snapshot.ref.getDownloadURL().then(url => {
        picture.setAttribute("src", url);

        firebase.firestore().collection('user data').where('accountNo', '==', body.id).get().then(snapshot => {
            let id = snapshot.docs[0].id
            console.log(id)
            firebase.firestore().collection('user data').doc(id).update({
                profilePicture: url,
            })
        })
    })
}

let error = function (err) {

}
let complete = function () {
    console.log('complete');
}

loadProfile();


addImage.addEventListener('change', function (e) {
    e.preventDefault();
    e.stopPropagation();
    let file = e.target.files[0];
    console.log(file.name)
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = new firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref('profile-pictures/' + file.name);
    var task = storageRef.put(file);

    task.on('state_changed', progress, error, complete)
})


addInfo.addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    infoForm.classList.remove('hide');
    userInfoDisplay.classList.add('hide');
    infoForm.classList.add('show');
})

userInfoSubmit.addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    firebase.firestore().collection('user data').where('accountNo', '==', body.id).get().then(snapshot => {
        let id = snapshot.docs[0].id
        console.log(id)
        firebase.firestore().collection('user data').doc(id).update({
            info: textArea.value,
        }).then(function(){
            currentInfo.innerHTML = textArea.value;
            textArea.value = "";
            infoForm.classList.remove('show');
            infoForm.classList.add('hide');
            userInfoDisplay.classList.add('show');
            
        })
    })    
})


