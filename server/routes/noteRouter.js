const noteRoutes = (app, fs, data) => {

    const dataPath = './data/data.json'

    // GET all notes from json file (fs fixed)
    app.get("/api/notes", (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(JSON.parse(data));
        });
    })

    // GET all notes on specific country (not fs)
    app.get("/api/note/:id", (req, res) => {
        const noteId = Number(req.params.id)

        const getNote = data.filter((note) => 
            note.id === noteId
        )
        console.log(getNote)
        res.json(getNote)
    })

    // GET specific note by id (not fs)
    app.get("/api/notes/:country", (req, res) => {
        const chosenCountry = req.params.country

        const getCountry = data.filter((country) => 
            country.country === chosenCountry
        )

        res.json(getCountry)
    })





    //// POST In progress.....

    let fsData = fs.readFileSync(dataPath)
    let myObject = JSON.parse(fsData)

    app.post("/api/notes", (req, res) => {

    let newData = req.body

    console.log(req.body)

    /*  let newData = {
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