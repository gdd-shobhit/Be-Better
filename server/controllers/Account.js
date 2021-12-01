const models = require('../models');
const crypto = require('crypto');
const { Account } = models;

const loginPage = (req, res) => {

  let loggedIn = false;
  let admin = false;
  if(req.session.account != null)
  {
    loggedIn = true;
    if(req.session.account.admin)
    {
      admin = true;
    }
  }

  res.render('login', { csrfToken: req.csrfToken(), loggedIn:loggedIn,admin:admin});
};

const logout = (req, res) => {

  req.session.destroy();
  res.redirect('/',200,{loggedIn:false,admin:false});
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
    return res.json({ redirect: '/shop' });
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
      return res.json({ redirect: '/shop' });
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

  const user = `${req.body.user}`;
  const oldPassword = `${req.body.oldPass}`;
  const newPassword = `${req.body.newPass}`;
  const newPassword2  = `${req.body.newPass2}`;

  Account.AccountModel.findByUsername(user,(err,doc)=>{

    if(err)
      console.log(err);

    if(!doc)
      return res.status(404).json({message:"User now found"});

    // const accountData = {
    //   username:doc.username,
    //   admin:doc.admin,
    //   salt:doc.salt,
    //   password: doc.password,
    // };

    let account = new Account.AccountModel;
  const iterations = 10000;
  const keyLength = 64;

    crypto.pbkdf2(oldPassword, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => {
      if (hash.toString('hex') !== doc.password) {
        return res.status(401).json({message:"old password not match"});
      }
      
      if(newPassword != newPassword2)
        return res.status(401).json({message:"password not match"});

      return Account.AccountModel.generateHash(newPassword, (salt, hash) => {
      
        account = doc;
        account.password = hash;
        account.salt = salt;

        const savePromise = account.save();

        savePromise.then(()=>{
          return res.status(201).json({ redirect: '/login' });
        });

        savePromise.catch((err) => {
          console.log(err);
    
          return res.status(400).json({ error: 'An error occurred' });
        });
      })
    });
  });  
}

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.changePassword = changePassword;
module.exports.getToken = getToken;
