const mongoose = require('mongoose');


module.exports = () => {
    mongoose
        .connect("mongodb+srv://Viswa:mEJITWQ3Xl5ewCDS@cluster0.wffh7.mongodb.net/User?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
        ).then(result => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log(err);
        });

    mongoose.connection.on('connected', () => {
        console.log("MongoDB connected");
    });

    mongoose.connection.on('disconnected', () => {
        console.log("MongoDB disconnected");
    });
}


//url:mongodb+srv://Viswa:<password>@cluster0.wffh7.mongodb.net/<dbname>?retryWrites=true&w=majority
//password : mEJITWQ3Xl5ewCDS