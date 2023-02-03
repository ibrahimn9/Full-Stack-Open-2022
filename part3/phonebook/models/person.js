const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery',false)
mongoose
   .connect(url)
   .then(_ => console.log('connected to the database'))
   .catch(error => error.message)

const personSchema = new mongoose.Schema({
    name: {type: String, minLenght: 3, required: true},
    number: {type: String, minLenght: 8, required: true, validate: {
        validator: function(v) {
            return `/\d{3}-d{7}`.test(v)
        },
        message: props => `${props.value} is not a valid phone number`
    }},
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)