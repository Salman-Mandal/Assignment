const express = require("express");
const Users = require("./user.json");
const fs = require("fs");


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
// --------------Middleware Task ---------------------------------
// not all the user can see user list, only admin can see
app.get("/users", checkrole("admin"), (req, res) => {
    res.json({
        success: true,
        Users
    })
})
// Middleware for checking the role-----------------
function checkrole(role) {
    return (req, res, next) => {
        const userId = req.headers["id"];
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required in headers"
            });
        }
        const user = Users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (user.role === role) {
            next(); 
        } else {
            res.status(403).json({
                success: false,
                message: "Access denied. Admins only."
            });
        }
    };
}













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
});

// ----------------------------------------------Patch----------------------------------------------------------

app.patch("/users/:id", (req, res) => {
    const userId = req.params.id;
    const userIndex = Users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        const updatedUser = { ...Users[userIndex], ...req.body }; // Merge existing user with the updates
        Users[userIndex] = updatedUser;

        fs.writeFileSync('./user.json', JSON.stringify(Users, null, 2));

        res.json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});
// -----------------------------------------------------------------Delete--------------------------------------
app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    const userIndex = Users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        const deletedUser = Users.splice(userIndex, 1);

        fs.writeFileSync('./user.json', JSON.stringify(Users, null, 2));

        res.json({
            success: true,
            message: "User deleted successfully",
            user: deletedUser
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});



app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
})