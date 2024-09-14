import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.models = {}
const Request = mongoose.model.requests || mongoose.model("requests", requestSchema)
export default Request