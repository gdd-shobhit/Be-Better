const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let ItemModel = {};

//const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const ItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        set:setName,
    },

    price:{
        type: Number,
        min:0,
        required:true,
    },
    tags:{
        type: [String],
        required:true,
    },

    owner: {
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'Account',
    },

    image: {
        data: { // The data of our file. This is stored as a byte array.
            type: Buffer,
          },
          size: { // The size of our file in bytes.
            type: Number,
          },
          encoding: { // The encoding type of the image in the byte array.
            type: String,
          },
          tempFilePath: { // The temp file path.
            type: String,
          },
          truncated: { // If our file has been cut off.
            type: Boolean,
          },
          mimetype: { // The type of data being stored.
            type: String,
          },
          md5: { // The md5 hash of our file.
            type: String,
          },
    
    
    },
    createdData: {
        type: Date,
        default: Date.now,
    },
});

ItemSchema.statics.toAPI = (doc) => ({
    name:doc.name,
    price:doc.price,
    tags:doc.tags,
    image:doc.image,
});

ItemSchema.statics.findAll = (callback) =>{
    return ItemModel.find({}).select('name price tags image').exec(callback);
};

ItemSchema.statics.findByTags = (itemTag,callback) =>{
    const search = {
        tag: {$nin:[itemTag]},
    };

    return ItemModel.find(search).select('name price tags image').lean().exec(callback);
};

ItemSchema.statics.findByName = (name,callback) =>{
  const search = {
      name: name,
  };

  return ItemModel.find(search).select('name price tags image').exec(callback);
};

ItemModel = mongoose.model('Items',ItemSchema);

module.exports.ItemModel = ItemModel;
module.exports.ItemSchema = ItemSchema;