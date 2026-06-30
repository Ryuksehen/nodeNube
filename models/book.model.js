const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    id: { type: Number, rerquired: true, uniqued: true},
    nombre: {type: String, required: true},
    autor: { type: String, required: true},
    año: { type: Number, required: true},
    categoria: { type: String, requerid: true}
}, {
    timestamps: true // esto crea autmoaticamente creactedAt y updatedAt
})

module.exports = mongoose.model("Book", bookSchema, "Libros")