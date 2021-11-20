const models = require('../models');
const Item = models.Items;

const uploadPage = (req, res) => {
  Item.ItemModel.findAll((err,docs) => {
    if(err) {
      console.log(err);
      return res.status(400).json({error: 'An error occurred'});
    }
    
    return res.render('itemUpload', {csrfToken: req.csrfToken(), items:docs});
  });
};

const merchPage = (req, res) => {
  Item.ItemModel.findAll((err,docs) => {
    if(err) {
      console.log(err);
      return res.status(400).json({error: 'An error occurred'});
    }
    
    return res.render('shop', {csrfToken: req.csrfToken(), items:docs});
  });
};


// Our upload handler.
const uploadFile = (req, res) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded' });
  }

  // Once we are sure we have a file, we want to pull our sample file out of our
  // req.files object. It is called sampleFile because that is what we named it on
  // line 19 of our /views/upload.handlebars file. Here, we are destructuring our
  // req.files object to pull out sampleFile and store it in it's own variable.
  // The line below is equivalent to:   const sampleFile = req.files.sampleFile.
  const { sampleFile } = req.files;

  const ItemObject = {
    name: req.body.name,
    price: req.body.price,
    tags:['Shirt','Sweatshirt'],
    owner: req.session.account._id,
    image: sampleFile,
  }

  // Once we have the file, we want to create a mongo document based on that file
  // that can be stored in our database.
  const fileDoc = new Item.ItemModel(ItemObject);

  console.log(fileDoc);
  // Once we have that mongo document, we can save it into the database.
  const savePromise = fileDoc.save();

  // The promises 'then' event is called if the document is successfully stored in
  // the database. If that is the case, we will send a success message to the user.
  savePromise.then(() => {
    res.status(201).json({ message: 'Upload Successful! ' });
  });

  // The promises 'catch' event is called if there is an error when adding the document
  // to the database. If that is the case, we want to log the error and send a 400 status
  // back to the user.
  savePromise.catch((error) => {
    console.dir(error);
    res.status(400).json({ error: 'Something went wrong uploading' });
  });

  // Finally we will return the savePromise to prevent eslint errors.
  return savePromise;
};

// Our retrieval handler.
const retrieveFile = (req, res) => {

  if (!req.query.fileName) {
    return res.status(400).json({ error: 'Missing File Name! ' });
  }

  return Item.ItemModel.findOne({ name: req.query.fileName }, (error, doc) => {
    console.log(doc);
    // If there is an error, log it and send a 400 back to the client.
    if (error) {
      console.dir(error);
      return res.status(400).json({ error: 'An error occured retrieving the file. ' });
    }

    // If no file with that name is found, but the search is successful, an error will not be
    // thrown. Instead, we will simply not recieve and error or a doc back. In that case, we
    // want to tell the user that the file they were looking for could not be found.
    if (!doc.image) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.writeHead(200, { 'Content-Type': doc.image.mimetype, 'Content-Length': doc.image.size });
    return res.end(doc.image.data);
  });
};


const getItems = (request,response) => {
    const req = request;
    const res = response;
  
    return Item.ItemModel.findAll((err,docs) => {
      if(err) {
        console.log(err);
        return res.status(400).json({error:'An error occurred'});
      }
  
      return res.json({items:docs});
    });
  };

  const getToken = (request,response) => {
    const req  = request;
    const res = response;
  
    const csrfJSON = {
      csrfToken: req.csrfToken(),
    };
  
    res.json(csrfJSON);
  };


module.exports.getToken = getToken;
module.exports.getItems = getItems;
module.exports.uploadPage = uploadPage;
module.exports.uploadFile = uploadFile;
module.exports.retrieveFile = retrieveFile;
module.exports.merchPage = merchPage;
