const express = require('express');
const app = express();
const port = 3000;
let posts = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json(posts);
});

app.post("/posts", (req, res) => {
    const {title, name, text} = req.body;

    posts.push({id: posts.length +1, title, name, text, createdDt : Date()});
    res.json({title, name, text});
})

app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    const filteredPosts = posts.filter((post) => post.id !== +id);
    const isLengthChanged = filteredPosts.length !== posts.length;
    posts = filteredPosts;
    if(isLengthChanged) {
        res.json("OK");
        return;
    }
    res.json("NOT CHANGED");
})

app.listen(port, () => {
    console.log("Welcome posts Start!");
})