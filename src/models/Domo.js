var mongoose = require('mongoose');
var _ = require('underscore');

var DomoModel;

function setName(name) {
  return _.escape(name).trim();
};

var DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName
  },

  age: {
    type: Number,
    min: 0,
    required: true
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account'
  },

  createdDate: {
    type: Date,
    default: Date.now
  },

  weight: {
    type: Number,
    required: true,
    default: 1
  }
});

DomoSchema.methods.toAPI = function() {
  return {
    name: this.name,
    age: this.age,
    weight: this.weight
  };
};

DomoSchema.statics.findByOwner = function(ownerId, callback) {
  var search = {
    owner: mongoose.Types.ObjectId(ownerId)
  };

  return DomoModel.find(search).select("name age weight").exec(callback);
};

DomoSchema.statics.updateWeight = function(domoId, weight, callback) {
  DomoModel.update({"_id": domoId}, {"weight": weight}).exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
