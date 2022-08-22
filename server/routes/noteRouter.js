import { getAllNotes, createNote, editNote, getNote, deleteNote, getCountry } from "../controllers/noteControllers.js"
import express from 'express'

export const router = express.Router()

// GET all notes from json file
router.get("/", getAllNotes)
// POST Create new note
router.post("/", createNote)
// PUT Edit note
router.put("/", editNote)


// GET specific note by id
router.get("/:id", getNote)
// DELETEs note by id
router.delete("/:id", deleteNote)

// GET all notes on specific country by country
router.get("/country/:country", getCountry)
    