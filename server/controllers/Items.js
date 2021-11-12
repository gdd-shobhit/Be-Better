const models = require('../models');
const Item = models.Items;

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