const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true},
    contraseña: { type: String, required: true}
}, {
    timestamps: true // crea y actualiza dependiendo lo que se requiera 
})

module.exports = mongoose.model("User", userSchema, "Usuarios")