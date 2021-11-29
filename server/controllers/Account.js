const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken(), loggedIn:false });
};

const homePage = (req, res) => {
  res.render('home',{ csrfToken: req.csrfToken(), loggedIn:true});
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All Fields are Required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);
    req.body.token = req.session.account.token;
    return res.json({ redirect: '/home' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;
  const password2 = `${req.body.pass2}`;
  const adminPass = `${req.body.pass3}`;
  let admin = false;
  if (!username || !password || !password2) {
    return res.status(400).json({ error: 'All Fields are Required' });
  }

  if (password !== password2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  if (adminPass === 'admin') {
    admin = true;
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username,
      admin,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/home' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

const changePassword = (request,response) => {

  const req = request;
  const res = response;
  
  const username = `${req.body.user}`;
  const oldPassword = `${req.body.oldPass}`;
  const newPassword = `${req.body.newPass}`;

  
}

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.homePage = homePage;
