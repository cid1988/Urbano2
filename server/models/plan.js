const mongoose = require('mongoose');
const { Schema } = mongoose;

const planSchema = new Schema({
    _id: { type: String, required: false}
},{
    versionKey: false
});

module.exports = mongoose.model('Plan', planSchema, 'poa.planes');