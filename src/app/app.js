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

// setting the host name
const HOSTNAME = 'localhost'

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

let count = undefined;
function inc_count(len) {
    count = len + 1;
}

// creating routes
APP.get("/", (req, res) => {
    DB_MODEL.find().then((data) => {
        console.log(`[SUCCESS] data fetched successfully`)
        inc_count(data[data.length - 1].count)
        res.render("index", { data: data, count: data[data.length - 1].count })
    }).catch((err) => {
        console.log(`[!ERROR] unable to fetch the data`)
        console.log(err)
    })
})
APP.get("/addFirstData", async (req, res) => {
    const addDataToDB = new DB_MODEL({
        heading: "My Notes App",
        description: "this is my notes app created using html css and javascript.",
        dateTime: "1/29/2023, 1:25:48 PM",
        count: 1,
        optionsLinksCont_id: "optionsLinksCont_1",
        optionsDots_id: "optionsDots_1",
        editBtn_id: "editBtn_1",
        deleteBtn_id: "deleteBtn_1"
    })
    await addDataToDB.save()
    res.send("Data added successfully")
})
APP.post("/addData/:slug1/:slug2/:slug3", async (req, res) => {
    const addDataToDB = new DB_MODEL({
        heading: req.params.slug2,
        description: req.params.slug3,
        dateTime: req.params.slug1,
        count: count,
        optionsLinksCont_id: `optionsLinksCont_${count}`,
        optionsDots_id: `optionsDots_${count}`,
        editBtn_id: `editBtn_${count}`,
        deleteBtn_id: `deleteBtn_${count}`
    })
    await addDataToDB.save()
    console.log("Data added successfully")
    res.redirect("/")
})
APP.post("/updateData/:slug1/:slug2/:slug3", (req, res) => {
    DB_MODEL.updateOne({ editBtn_id: req.params.slug3 }, {
        $set: {
            heading: req.params.slug1,
            description: req.params.slug2,
        }
    }).then((data) => {
        console.log(`[SUCCESS] data updated`)
        console.log(data)
    }).catch((err) => {
        console.log(`[!ERROR] error occured while updating`)
        console.log(err)
    })
    res.redirect("/")
})
APP.post("/deleteData/:slug1", (req, res) => {
    DB_MODEL.deleteOne({ deleteBtn_id: req.params.slug1 }).then((data) => {
        console.log(`[SUCCESS] data deleted successfully`)
        console.log(data)
    }).catch((err) => {
        console.log(`[!ERROR] error while deleting`)
        console.log(err)
    })
    res.redirect("/")
})

// starting app
APP.listen(PORT, HOSTNAME, (err) => {
    if (!(err)) {
        console.log(`Server started...`)
        console.log(`Go to ~ http://${HOSTNAME}:${PORT}`)
    }
})
