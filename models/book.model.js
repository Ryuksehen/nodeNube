const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    id: { type: Number, required: true, uniqued: true},
    nombre: {type: String, required: true},
    autor: { type: String, required: true},
    año: { type: Number, required: true},
    categoria: { type: String, required: true}
}, {
    timestamps: true, // esto crea autmoaticamente creactedAt y updatedAt
    versionKey: false
})

module.exports = mongoose.model("Book", bookSchema, "Libros")