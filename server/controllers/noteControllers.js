import { nanoid } from 'nanoid';
import  fs  from 'fs';

// Path to json file
const dataPath = './data/data.json' // Check path
// Date to new note
const todayDate = new Date().toISOString().slice(0, 10);



// GET all notes from json file
export const getAllNotes = (req, res) => {  
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
}



// GET specific note by id
export const getNote = (req, res) => {
    try {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            
            // Gets an updated list containing the specific note
            const getNote = JSON.parse(data).find((note) => note.id === req.params.id)

            if (!getNote) {
                throw new Error("Note not found")
            }

            res.json(getNote)
        });

    } catch(err) {
        res.status(404).json(err.message)
    }     
}



// GET all notes on specific country
export const getCountry = (req, res) => {
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
}



// DELETEs note by id
export const deleteNote = (req, res) => {
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
                res.json(`Note from ${foundNote.name} regarding ${foundNote.city} in ${foundNote.country} has been removed`);
            })
        });
    }catch(err) {
        res.status(404).json(err.message)
    }
}



// POST - Creates new note
export const createNote = (req, res) => {
    try {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            if(!req.body || (!req.body.name || !req.body.city || !req.body.comment || !req.body.country )) {
                throw new Error("Data was not provided correctly")
            } 

            // Gets json file and new note 
            data = JSON.parse(data) 
            let newNote = req.body 

            // Adds new unique id and todays date to the note.
            newNote.id = nanoid()
            newNote.date = todayDate 

            // Adds the note to json file
            data.push(newNote)

            // Sends in the updated json-file
            fs.writeFile(dataPath, JSON.stringify(data), (err) => {
                if (err) {
                    throw err;
                }
                res.json(`${newNote.country} has now a new comment!`);
                
            })
        })
    } catch(err) {
        res.status(404).json(err.message)
    }
}


// PUT Edit note
export const editNote = (req, res) => {
    try {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            if(!req.body || (!req.body.id || !req.body.name || !req.body.city || !req.body.comment || !req.body.country )) {
                throw new Error("Data was not provided correctly")
            } 
 
            data = JSON.parse(data) 

            // Find index and also checks if the note exists. 
            const findIndex = data.findIndex(note => note.id == req.body.id)

            if(findIndex == -1) {
                throw new Error("Id does not exist")
            }

            // Gets previous object before it gets edited (for use to feedback)
            const findNote = data.find(note => note.id == req.body.id)

            // Updates the previous note with updated info
            data[findIndex] = req.body 

            // Sends in the updated json-file
            fs.writeFile(dataPath, JSON.stringify(data), (err) => {
                if (err) {
                    throw err;
                }
                res.json(`Comment from ${findNote.name} regarding ${findNote.city} in ${findNote.country} has now ben updated with new info!`);
            })
        })
    } catch(err) {
        res.status(404).json(err.message)
    }
}
