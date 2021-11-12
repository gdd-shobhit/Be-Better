const mongoose = require('mongoose');
const { contains } = require('underscore');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let ItemModel = {};

const convertId = mongoose.Types.ObjectId;
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

    createdData: {
        type: Date,
        default: Date.now,
    },
});

ItemSchema.statics.toAPI = (doc) => ({
    name:doc.name,
    price:doc.price,
    tags:doc.tags,
});

ItemSchema.statics.findAll = (callback) =>{
    return ItemModel.find({}).select('name price tags').lean().exec(callback);
};

ItemSchema.statics.findByTags = (itemTag,callback) =>{
    const search = {
        tag: {$nin:[itemTag]},
    };

    return ItemModel.find(search).select('name price tags').lean().exec(callback);
};

ItemModel = mongoose.model('Items',ItemSchema);

module.exports.ItemModel = ItemModel;
module.exports.ItemSchema = ItemSchema;