const { Schema, model } = require("mongoose")


// Esquema para los precios condicionales
const conditionalPriceSchema = new Schema({
    condition: {
        part: { type: String, required: true }, 
        value: { type: String, required: true } 
    },
    price: {
        type: Number,
        required: true
    }
}, { _id: false });


// Esquema para las combinaciones no disponibles
const unavailableCombinationSchema = new Schema({
    part: { type: String, required: true },
    value: { type: String, required: true } 
}, { _id: false });


// Esquema para las opciones de personalización
const optionSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    conditionalPrices: [conditionalPriceSchema], // para precios que dependen de otras opciones
    unavailableWith: [unavailableCombinationSchema] // para combinaciones no disponibles
}, { _id: false });


// Esquema para los grupos de opciones
const optionGroupSchema = new Schema({
    part: { type: String, required: true },
    options: [optionSchema]
}, { _id: false });


// Esquema principal del producto
const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is mandatory']
        },
        basePrice: {
            type: Number,
            default: 0
        },
        customizableParts: [optionGroupSchema], 
        isCustomizable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)


const Product = model("Product", productSchema)
module.exports = Product