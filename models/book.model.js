const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)

const bookSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    autor: { type: String, required: true},
    año: { type: Number, required: true},
    categoria: { type: String, required: true}
}, {
    timestamps: true, // esto crea autmoaticamente creactedAt y updatedAt
    versionKey: false
})

bookSchema.plugin(AutoIncrement, { inc_field: "id"})

module.exports = mongoose.model("Book", bookSchema, "Libros")