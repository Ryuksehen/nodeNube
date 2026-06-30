const Book = require("../models/book.model");

// CONTROLADOR DE OBTENER
const getBooks = async (re, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CONTROLADOR PARA OBTENER POR ID

const getBookId = async (req, res) => {
  const { id } = req.params; // busca el numero en la url
  try {
    const book = await Book.findOne({ id: Number(id) });

    if (!book) {
      return res
        .status(404)
        .json({ message: "Libro no encontrado con ese ID" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ menssage: error.message });
  }
};

// CONTROLADOR DE CREAR
const createBook = async (req, res) => {
  const { id, nombre, autor, año, categoria } = req.body;
  try {
    const newBook = new Book({ id, nombre, autor, año, categoria });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// CONTROLADOR DE ACTUALIZAR
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { nombre, autor, año, categoria } = req.body;
  try {
    const bookUpdated = await Book.findOneAndUpdate(
      // modificado para que busque por el id del modelo
      { id: Number(id) },
      { nombre, autor, año, categoria }, // aqui solo estos campos por uqe se va a modificar solo esos campos el id es unico asi queno
      { new: true },
    );
    if (!bookUpdated) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.json(bookUpdated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// CONTROLADOR DE ELIMINAR
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const bookDeleted = await Book.findOneAndDelete(id);

    if (!bookDeleted) {
      return res
        .status(404)
        .json({ message: "No se encontró el libro con ese ID" });
    }

    res.json({ message: "Libro eliminado correctamente " });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBookId,
  createBook,
  updateBook,
  deleteBook,
};
