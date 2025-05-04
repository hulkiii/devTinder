const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://admin:vf9gI0Vqjm0NkQeM@namastedev.fhs0p9t.mongodb.net/devTinder"
    );
};

module.exports = connectDB;

