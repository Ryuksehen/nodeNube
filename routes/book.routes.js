const express = require("express")
const router = express.Router()
const {
    getBooks,
    getBookId,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/book.controller')

const authMiddleware = require('../middleware/auth.middleware')

// RUTAS PUBLICAS
router.get('/', getBooks)

router.get('/:id', getBookId)


// RUTAS PRIVADAS
router.post('/', authMiddleware, createBook)

router.put('/:id', authMiddleware, updateBook)

router.patch('/:id', authMiddleware, updateBook)

router.delete('/:id', authMiddleware, deleteBook)

module.exports = router