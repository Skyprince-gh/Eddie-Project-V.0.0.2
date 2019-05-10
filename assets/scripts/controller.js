const bodyParser = require('body-parser');
const firebase = require('./firebase.js');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var expressLogging = require('express-tracking');

// let passData = function(user, cred){
//     user = user;
//     credentials = cred;
//     console.log('user is: ' , user)
// }

const controller = function (app) {
    app.use(bodyParser.urlencoded({
        limit: "200mb",
        extended: true
    }));
    app.use(bodyParser.json({ limit: "200mb" }));

    //tracking express
    app.use(expressLogging());

    //tracking changes
    firebase.auth.onAuthStateChanged(user => {
        if (user != null) {
            console.log('user id: ', user.uid, '\n user logged in');
        }
        else {
            console.log('user logged out');
        }
    })
    //General Requests
    app.get('/', (req, res) => {
        res.render('index');
        console.log('rendered index page')

    });
    app.get('/index', (req, res) => {
        res.render('index');
        console.log('rendered index page')
    });

    app.get('/chat', function (req, res) {
        console.clear();
        //console.log('user credentials: ' , credentials);
        console.log(req.query);
        res.render('chat', { user: req.query });
    })

    app.get('/contacts', (req, res) => {
        console.clear()
        res.render('contacts', { user: req.query });
        console.log('rendered contacts page')
    });



    //Signin requests

    app.get('/signin', (req, res) => {
        firebase.auth.signOut().then(() => {
            res.render('signin', { user: req.query });
        });
    });


    app.post('/signin', urlencodedParser, (req, res) => {
        console.log('email: ', req.body.email, ' password: ', req.body.password);

        firebase.auth.signInWithEmailAndPassword(req.body.email, req.body.password).then(cred => {
            console.log('user id: ', cred.user.uid, '\nuser signed in');
            //redirect user to contacts page if signin is correct
            res.redirect(`/contacts?username=${req.body.username} &uid=${cred.user.uid}`);

        }).catch(err => { //if there is an error signin in
            console.log('error signning in: ', err, '\nerror signing in');
            res.render('signinErr', { error: err });
        });

    });


    //Signup requests

    app.get('/signup', (req, res) => {
        res.render('signup');
        console.log('rendered singup page')
    });



    app.post('/signup', urlencodedParser, (req, res) => {

        if (req.body.password === req.body.confirmPassword) {
            console.log(req.body.password, req.body.confirmPassword);
            //console.log("email: "+ req.body.email , "\npassword: "+ req.body.password, "\n username: " + req.body.username);
            firebase.auth.createUserWithEmailAndPassword(req.body.email, req.body.password).then(cred => {
                firebase.firestore.collection('user data').add({
                    accountNo: cred.user.uid,
                    profilePicture: '',
                    name: req.body.username,
                    email: cred.user.email,
                    contacts: [],
                    conversations: [],
                });

                //redirect user to contact page
                res.redirect(`/contacts?username=${req.body.username}&uid=${cred.user.uid}`);
                console.log('user signed up', '\nsigned in');

            }).catch(err => {
                //console.log('error: ', err.message);        
                res.render('signupErr', { error: err.message });
            });
        }
    });

    app.post('/search', urlencodedParser, function (req, res) {
        firebase.firestore.collection('user data').get().then(snapshot => {
            //search each name in the userdatabase and compare to keystroke
            let matches = [];
            snapshot.docs.forEach(doc => {
                console.log('name is: ', doc.data().name);
                result = compareName(req.body.keystroke, doc.data().name);
                if(result){//matches the name given
                     //add te name to list of matches
                     matches.push({name: doc.data().name, id: doc.id});
                }

            })
            res.send(matches)
        });
    });

    function compareName(keystroke, name) {
        let regex = new RegExp(keystroke, 'gi');
        if (regex.test(name)) {
            return true;
        }
        else {
            return false;
        }
    } 


}

module.exports = controller;