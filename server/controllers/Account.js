const crypto = require('crypto');
const models = require('../models');

const { Account } = models;
const Item = models.Items;

const loginPage = (req, res) => {
  let loggedIn = false;
  let admin = false;
  if (req.session.account != null) {
    loggedIn = true;
    if (req.session.account.admin) {
      admin = true;
    }
  }

  res.render('login', { csrfToken: req.csrfToken(), loggedIn, admin });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/', 200, { loggedIn: false, admin: false });
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
      itemsInCart: [],
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

const cartPage = (req, res) => {
  let loggedIn = false;
  let admin = false;
  if (req.session.account != null) {
    loggedIn = true;
    if (req.session.account.admin) {
      admin = true;
    }
  }
  return res.render('cart', { loggedIn, admin });
};

const addToCart = (request, response) => {
  const req = request;
  const res = response;

  return Account.AccountModel.findByUsername(req.session.account.username, (err, doc) => {
    if (err) console.log(err);

    if (!doc) return res.status(404).json({ message: 'User not found' });

    let account = new Account.AccountModel();
    account = doc;
    if (req.body.cartItemsId) account.itemsInCart = req.body.cartItemsId;
    else account.itemsInCart = [];

    const savePromise = account.save();

    savePromise.then(() => res.status(201).json({ itemsInCart: account.itemsInCart }));

    savePromise.catch((er) => {
      console.log(er);

      return res.status(400).json({ error: 'An error occurred' });
    });

    return false;
  });
};

const getCart = async (request, response) => {
  const req = request;
  const res = response;
  const items = [];

  Account.AccountModel.findByUsername(req.session.account.username, async (err, doc) => {
    if (err) console.log(err);
    if (!doc) return res.status(400).json({ message: 'Something went wrong' });

    let loggedIn = false;
    let admin = false;
    if (req.session.account != null) {
      loggedIn = true;
      if (req.session.account.admin) {
        admin = true;
      }
    }

    for (const _id of doc.itemsInCart) {
      if (items.length === 0) {
        const item = await Item.ItemModel.findOne({ _id }).select('id name price').lean();
        const obj = {
          _id: item._id,
          name: item.name,
          price: item.price,
          qty: 1,
        };
        items.push(obj);
      } else {
        let found = false;
        for (const obj of items) {
          if (String(obj._id) === String(_id)) {
            console.log();
            obj.qty++;
            found = true;
          }
        }

        if (!found) {
          const item = await Item.ItemModel.findOne({ _id }).select('id name price').lean();
          const obj = {
            _id: item._id,
            name: item.name,
            price: item.price,
            qty: 1,
          };
          items.push(obj);
        } else {
          found = false;
        }
      }
    }
    return res.status(200).json({
      itemsInCart: doc.itemsInCart, loggedIn, admin, items,
    });
  });
};

const changePassword = (request, response) => {
  const req = request;
  const res = response;

  const user = `${req.body.user}`;
  const oldPassword = `${req.body.oldPass}`;
  const newPassword = `${req.body.newPass}`;
  const newPassword2 = `${req.body.newPass2}`;

  Account.AccountModel.findByUsername(user, (err, doc) => {
    if (err) console.log(err);

    if (!doc) return res.status(404).json({ message: 'User not found' });

    let account = new Account.AccountModel();
    const iterations = 10000;
    const keyLength = 64;

    crypto.pbkdf2(oldPassword, doc.salt, iterations, keyLength, 'RSA-SHA512', (error, hash) => {
      if (error) console.log(error);

      if (hash.toString('hex') !== doc.password) {
        return res.status(401).json({ message: 'old password not match' });
      }

      if (newPassword !== newPassword2) return res.status(401).json({ message: 'password not match' });

      return Account.AccountModel.generateHash(newPassword, (salt, passHash) => {
        account = doc;
        account.password = passHash;
        account.salt = salt;

        const savePromise = account.save();

        savePromise.then(() => res.status(201).json({ redirect: '/login' }));

        savePromise.catch((er) => {
          console.log(er);

          return res.status(400).json({ error: 'An error occurred' });
        });
        return savePromise;
      });
    });
    return false;
  });
};

const checkoutPage = (request, response) => {
  const req = request;
  const res = response;

  res.render('checkout', { csrfToken: req.csrfToken(), loggedIn: true });
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.changePassword = changePassword;
module.exports.getToken = getToken;
module.exports.checkoutPage = checkoutPage;
module.exports.getCart = getCart;
module.exports.cartPage = cartPage;
module.exports.addToCart = addToCart;
