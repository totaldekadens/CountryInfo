import { getAllNotes, createNote, editNote, getNote, deleteNote, getCountry } from "../controllers/noteControllers.js"

const noteRoutes = (app) => {

    app.route("/api/notes")
        // GET all notes from json file
        .get(getAllNotes)
        // POST Create new note
        .post(createNote)
        // PUT Edit note
        .put(editNote)

    app.route("/api/notes/:id")
        // GET specific note by id
        .get(getNote)
        // DELETEs note by id
        .delete(deleteNote)

    app.route("/api/notes/country/:country")
        // GET all notes on specific country by country
        .get(getCountry)
}

export default noteRoutes