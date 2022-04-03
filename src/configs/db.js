const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect("mongodb+srv://Soumya:288543@cluster0.ivqiu.mongodb.net/u4c2?retryWrites=true&w=majority");
};