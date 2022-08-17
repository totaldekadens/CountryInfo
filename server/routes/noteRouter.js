

const noteRoutes = (app, fs) => {

    // Path to json file
    const dataPath = './data/data.json'

    // Helper methods read and write
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };




    // ROUTES


    // GET all notes from json file
    app.get("/api/notes", (req, res) => {
        
        readFile(data => {
            res.json(data);
        }, true);
    })



    // GET specific note by id
    app.get("/api/note/:id", (req, res) => {
        
        const noteId = Number(req.params.id)

        // Todo: Use helper method
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            
            let parsedData = JSON.parse(data)
            
            // Gets an updated list containing the specific note
            const getNote = parsedData.filter((note) => note.id === noteId)

            if(getNote.length > 0) {
                res.json(getNote)
            } else {
                res.json("Note not found")
            }
        });
    })



    // GET all notes on specific country
    app.get("/api/notes/:country", (req, res) => {
        
        const chosenCountry = req.params.country

        // Todo: Use helper method
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            
            let parsedData = JSON.parse(data)
            
            // Gets an updated list that only contains notes about the specific country  
            const getCountry = parsedData.filter((country) => country.country === chosenCountry)

            if(getCountry.length > 0) {
                res.json(getCountry)
            } else {
                res.json("Notes not found")
            }
        });
    })


    
    // DELETEs note by id
    app.delete("/api/delete/:id", (req, res) => {

        readFile(data => {

            const noteId = req.params.id;
            
            // Removes object with the specific id and returns an updated list
            const updatedData = data.filter(item => item.id != noteId)
            
            // updatedData replaces the previous data of the json-file
            writeFile(JSON.stringify(updatedData, null, 2), () => {
                res.status(200).send(`Note with id: ${noteId} has been removed`);
            });
        },
            true);
    })




    //// POST In progress.....

    let fsData = fs.readFileSync(dataPath)
    let myObject = JSON.parse(fsData) 

    app.post("/api/notes", (req, res) => {

        let newData = req.body

        console.log(req.body)

        /*     let newData = {
            "id": 8,
            "country": "Sweden",
            "city": "Stockholm",
            "name": "Viviene",
            "comment": "Nondisp transverse fx shaft of unsp femr, 7thC",
            "date": "2021/08/26"
        } */

        myObject.push(newData)

        let newData2 = JSON.stringify(myObject);

        fs.writeFile("./data/data.json", newData2, (err) => {
            // Error checking
            if (err) throw err;

            console.log("New data added");
        });

    })








}

export default noteRoutes