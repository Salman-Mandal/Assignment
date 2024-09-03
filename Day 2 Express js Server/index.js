const express = require("express");
const Users = require("./user.json");


const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
    console.log("Hello There");
    res.json({
        success: true,
        message: "Hello There"
    })
})

app.get("/users", (req, res) => {
    res.json({
        success: true,
        Users
    })
})
app.get("/users/:id", (req, res) => {

    const userId = req.params.id;
    const user = Users.find(u => u.id === userId);
    if (user) {
        res.json({
            success: true,
            user
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
})



app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
})