const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// CONTROLADOR DE REGISTRO  
const register = async (req, res) =>  {
    const { nombre, contraseña} = req.body
    try {
        const crypto = await bcrypt.genSalt(10)
        const contraseñaHash = await bcrypt.hash(contraseña, crypto)

        const newUser = new User({ nombre, contraseña: contraseñaHash})
        await newUser.save()

        res.status(201).json({ message: "Usuario registrado con exito"})
        
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}


// CONTROLADOR DE LOGIN

const login = async (req, res) => {
    const { nombre, contraseña} = req.body

    try {
        const user = await User.findOne({ nombre })
        if (!user) return res.status(400).json({ message: "Credenciales incorrectas"})

        const isValido = await bcrypt.compare(contraseña, user.contraseña)
        if (!isValido) return res.status(400).json({ message: "Credenciales incorrectas"})

        const token = jwt.sign(
            {id: user._id, nombre: user.nombre },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        )

        res.json({ message: "Login exitoso", token})
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = { register, login}