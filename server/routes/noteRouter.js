import { nanoid } from 'nanoid';

const noteRoutes = (app, fs) => {

    // Path to json file
    const dataPath = './data/data.json'
    // Date to new note
    const todayDate = new Date().toISOString().slice(0, 10);

    // GET all notes from json file
    app.get("/api/notes", (req, res) => {  
        try {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                res.json(JSON.parse(data)); 
            });
        } catch(err) {
            res.status(500).json(err.message)
        }
    })



    // GET specific note by id
    app.get("/api/note/:id", (req, res) => {
        try {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                
                // Gets an updated list containing the specific note
                const getNote = JSON.parse(data).find((note) => note.id === Number(req.params.id))
    
                if (!getNote) {
                    throw new Error("Note not found")
                }

                res.json(getNote)
            });

        } catch(err) {
            res.status(404).json(err.message)
        }     
    })



    // GET all notes on specific country
    app.get("/api/notes/:country", (req, res) => {
        try {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                
                // Gets an updated list that only contains notes about the specific country 
                const getCountry = JSON.parse(data).filter((country) => country.country == req.params.country)

                if(!getCountry) {
                    throw new Error("Country has no comments")
                } 
                
                res.json(getCountry) 
            });
        }catch(err) {
            res.status(404).json(err.message)
        }
    })



    // DELETEs note by id
    app.delete("/api/notes/:id", (req, res) => {
        try {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }

                // Check if note exists
                const foundNote = JSON.parse(data).find((note) => note.id == req.params.id)

                if (!foundNote) {
                    throw new Error("Id does not exist")
                }

                // Removes object with the specific id and returns an updated list
                const updatedData = JSON.parse(data).filter(note => note.id != req.params.id)
                
                // updatedData replaces the previous data of the json-file
                fs.writeFile(dataPath, JSON.stringify(updatedData), (err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send(`Note from ${foundNote.name} regarding ${foundNote.city} has been removed`);
                })
            });
        }catch(err) {
            res.status(404).json(err.message)
        }
    })



    // POST - Creates new note
    app.post("/api/notes", (req, res) => {
        try {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }

                if(!req.body || (!req.body.name || !req.body.city || !req.body.comment || !req.body.country )) {
                    throw new Error("Data was not provided correctly")
                } 

                // Gets json file and new note 
                let currentData = JSON.parse(data) 
                let newNote = req.body 

                // Adds new unique id and todays date to the note.
                newNote.id = nanoid()
                newNote.date = todayDate 

                // Adds the note to json file
                currentData.push(newNote)

                // Sends in the updated json-file
                fs.writeFile(dataPath, JSON.stringify(currentData), (err) => {
                    if (err) {
                        throw err;
                    }
                    res.json(`${newNote.country} has now a new comment!`);
                })
            })
        } catch(err) {
            res.status(404).json(err.message)
        }
    })
}

export default noteRoutes