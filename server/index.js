const mongoose = require("mongoose");
const express = require("express")
const app = express();
const cors = require("cors");

app.use(express.json())
app.use(cors());

const port = process.env.PORT || 5000;

const DB = "mongodb+srv://tanay:tanaysharma@cluster0.o36kf.mongodb.net/bookyDB?retryWrites=true&w=majority";
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection successfull");
}).catch((err) => {
    console.log(err);
})


app.get("/", (req, res) => {
    res.send("sdfsd");
})

const bookySchema = mongoose.Schema({
    bookName: String,
    userName: String,
    userId: String,
    userEmail: String
})

const bookyCollection = mongoose.model("bookyCollection", bookySchema);

app.post("/details", (req, res) => {

    const firstDocument = new bookyCollection(req.body)
    firstDocument.save();
})

app.listen(port, () => console.log("listening"));



