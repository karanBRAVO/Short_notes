// importing express and path
const EXPRESS = require("express")
const PATH = require("path")
const CRYPTO = require("crypto")

// creating database if not there
require("../connection/conn")

// creating collections
const DB_MODEL = require("../model/model")
const AUTH_MODEL = require("../model/model2")

// // creating app
const APP = EXPRESS()

// getting port else set to default 
const PORT = process.env.PORT || 8899

// setting the host name
const HOSTNAME = '192.168.43.157'

// setting the slug
const SLUG = 'auth'

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
APP.get("/auth", (req, res) => {
    res.render("auth")
})
APP.get("/shortNotes", (req, res) => {
    DB_MODEL.find().then((data) => {
        console.log(`[SUCCESS] data fetched successfully`)
        inc_count(data[data.length - 1].count)
        res.render("index", { data: data, count: data[data.length - 1].count })
    }).catch((err) => {
        console.log(`[!ERROR] unable to fetch the data`)
        console.log(err)
    })
})
APP.post("/shortNotesAuth/:slug1/:slug2/:slug3", (req, res) => {
    AUTH_MODEL.findOne({ _id: "63e111a39da432618e4ae011" }).then((data) => {
        let hashPassword = CRYPTO.createHash("sha256").update(req.params.slug2).digest("hex")
        if ((req.params.slug1 === data.username) && (hashPassword === data.userid) && (req.params.slug3 === data.email)) {
            res.redirect("/shortNotes")
        }
        else {
            res.redirect("/auth")
        }
    }).catch((err) => {
        console.log(err)
    })
})
APP.get("/addFirstData", async (req, res) => {  // only for testing
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
APP.get("/addAUTHdetails", async (req, res) => {  // only for testing
    const addDATAtoDB = new AUTH_MODEL({
        username: "karan yadav",
        userid: "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f",
        email: "ky@gmail.com"
    })
    await addDATAtoDB.save()
    res.send("Data added to DB.")
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
    res.redirect("/shortNotes")
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
    res.redirect("/shortNotes")
})
APP.post("/deleteData/:slug1", (req, res) => {
    DB_MODEL.deleteOne({ deleteBtn_id: req.params.slug1 }).then((data) => {
        console.log(`[SUCCESS] data deleted successfully`)
        console.log(data)
    }).catch((err) => {
        console.log(`[!ERROR] error while deleting`)
        console.log(err)
    })
    res.redirect("/shortNotes")
})

// starting app
APP.listen(PORT, HOSTNAME, (err) => {
    if (!(err)) {
        console.log(`Server started...`)
        console.log(`Go to ~ http://${HOSTNAME}:${PORT}/${SLUG}`)
    }
})
