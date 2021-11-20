const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin ,controllers.Account.logout);
  app.get('/shop', mid.requiresSecure, controllers.Items.merchPage);
  app.get('/home', mid.requiresSecure, controllers.Account.homePage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/getItems',mid.requiresSecure,mid.requiresLogin,controllers.Items.getItems);
    // Setup post requests to /upload.
    app.post('/upload', controllers.Items.uploadFile);

    // Setup get requests to /retrieve
    app.get('/retrieve', mid.requiresSecure ,controllers.Items.retrieveFile);
  
    // Setup get requests to the root for the index page.
    app.get('/uploadPage',controllers.Items.uploadPage);

};

module.exports = router;
