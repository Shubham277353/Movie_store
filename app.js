const express = require("express");
const { url } = require("node:inspector");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const { error } = require("node:console");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));


app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {

    if(error){
        throw error;
    }
    console.log(`Server listening on port ${PORT}`);
})