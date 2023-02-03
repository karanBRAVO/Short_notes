// importing express and path
const EXPRESS = require("express")
const PATH = require("path")

// creating database if not there
require("../connection/conn")

// creating collections
const DB_MODEL = require("../model/model")

// creating app
const APP = EXPRESS()

// getting port else set to default 
const PORT = process.env.PORT || 8899

// using css and client side js
const PUBLIC_PATH = PATH.join(__dirname, "../../public/")
APP.use(EXPRESS.static(PUBLIC_PATH))

// to get the post request data
APP.use(EXPRESS.urlencoded({
    extended: false
}))

// creating views engine
APP.set("view engine", "hbs")
// setting views folder path
const VIEWS_PATH = PATH.join(__dirname, "../../views")
APP.set("views", VIEWS_PATH)

// creating routes
APP.get("/", (req, res) => {
    DB_MODEL.findOne({ heading: 'My Notes App' }).then((data) => {
        console.log(`[SUCCESS] data fetched successfully`)
        console.log(data)
        res.render("index", { data: data })
    }).catch((err) => {
        console.log(err)
    })
})
APP.get("/addFirstData", async (req, res) => {
    const addDataToDB = new DB_MODEL({
        heading: "My Notes App",
        description: "this is my notes app created using html css and javascript.",
        dateTime: "1/29/2023, 1:25:48 PM"
    })
    await addDataToDB.save()
    res.send("Data added successfully")
})
APP.post("/addData/:slug1/:slug2/:slug3", async (req, res) => {
    const addDataToDB = new DB_MODEL({
        heading: req.params.slug2,
        description: req.params.slug3,
        dateTime: req.params.slug1
    })
    await addDataToDB.save()
    console.log("Data added successfully")
    res.redirect("/")
})

// starting app
APP.listen(PORT, (err) => {
    if (!(err)) {
        console.log(`Server started...`)
        console.log(`Go to ~ http://localhost:${PORT}`)
    }
})
