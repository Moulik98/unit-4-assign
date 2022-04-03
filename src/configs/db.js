const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb+srv://Soumya:288543Sou@cluster0.a3fox.mongodb.net/test?retryWrites=true&w=majority");
};