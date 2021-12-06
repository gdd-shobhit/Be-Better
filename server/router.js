const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/changePassword', mid.requiresSecure, controllers.Account.changePassword);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresSecure, mid.requiresLogin, controllers.Account.logout);
  app.get('/shop', mid.requiresSecure, mid.requiresLogin, controllers.Items.merchPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/getItems', mid.requiresSecure, mid.requiresLogin, controllers.Items.getItems);
  app.get('/getCart', mid.requiresSecure, mid.requiresLogin, controllers.Account.getCart);
  app.get('/cart', mid.requiresSecure, mid.requiresLogin, controllers.Account.cartPage);
  app.post('/upload', mid.requiresSecure, mid.requiresLogin, controllers.Items.uploadFile);
  // app.get('/upload',mid.requiresSecure,mid.requiresLogin,controllers.Items.merchPage);
  // Setup get requests to /retrieve
  app.get('/retrieve', mid.requiresSecure, mid.requiresLogin, controllers.Items.retrieveFile);
  app.delete('/deleteItem', mid.requiresSecure, mid.requiresLogin, controllers.Items.deleteItem);
  // app.get('/deleteItem',mid.requiresSecure,mid.requiresLogin,controllers.Items.merchPage);
  // Setup get requests to the root for the index page.
  app.get('/uploadPage', controllers.Items.uploadPage);
  app.get('/checkoutPage', mid.requiresSecure, mid.requiresLogin, controllers.Account.checkoutPage);

  app.post('/addToCart', mid.requiresSecure, mid.requiresLogin, controllers.Account.addToCart);
};

module.exports = router;
