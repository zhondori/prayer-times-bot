const mongoose = require("mongoose");
const { DB_URL } = require("../../config");

module.exports = async () => {
    try {
        await mongoose.connect(DB_URL)
        console.log("DATABASE CONNECTED")
    } catch (err) {
        console.log("DATABASE CONNECTION FAILED")
        console.log(err)
    }
}