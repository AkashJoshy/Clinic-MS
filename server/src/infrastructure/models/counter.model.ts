import { Schema, model } from "mongoose";


const counterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true,
        default: 0
    }
})


const CounterModel = model("Counter", counterSchema)
export default CounterModel