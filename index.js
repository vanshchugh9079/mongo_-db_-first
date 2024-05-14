const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

async function main() {
    return await mongoose.connect('mongodb+srv://vanshchugh9079:a1s1d1f1g1@cluster15.h7tlojn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster15', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
}

main()
    .then((data) => {
        console.log(data.mquery());
        app.get('/', (req, res) => {
            res.send("Hello World");
        });

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(err => console.error(err));
