const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const { PORT, USER_NAME, PASSWORD } = process.env;

if (!PORT || !USER_NAME || !PASSWORD) {
    console.error('Missing required environment variables: PORT, USER_NAME, PASSWORD');
    process.exit(1); // Exit the process if any of the required env vars are missing
}

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@cluster15.h7tlojn.mongodb.net/myDatabase?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Define the schema and model
        const studentSchema = new mongoose.Schema({
            name: String,
            age: Number,
            class: Number
        });
        const Student = mongoose.model('student', studentSchema);

        app.post('/', async (req, res) => {
            try {
                const { name, age, class: className } = req.body;
                const student = new Student({ name, age, class: className });
                const data = await student.save();
                res.status(201).send(data); // Send 201 status code for created
                console.log(data);
            } catch (error) {
                res.status(400).send({ error: error.message }); // Send 400 status code for bad request
                console.log(error);
            }
        });

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

main();
