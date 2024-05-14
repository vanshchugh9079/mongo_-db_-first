const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

const {PORT,USER_NAME,PASSWORD} =process.env
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
async function main() {
    try {
        let dbresponse=await mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@cluster15.h7tlojn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster15`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        let Student=mongoose.model("student",{name:String,age:Number,class:Number})
        let vansh=new Student({name:"vansh",age:20,class:12})
        vansh.save().then(data=>console.log(data))
    } catch (error) {
        console.log(error);
    }
  
}
main()

