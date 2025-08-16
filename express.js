const url = require("url");
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Refactoring router through Express`);
})

app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
    res.set({"Content-Type": "text/html; charset=utf-8"});
    res.json("[user] name : andy, age : 30");
}

function feed(req, res) {
    res.json(`<ul>
        <li>Post 1</li>
        <li>Post 2</li>
        <li>Post 3</li>
    </ul>`);
}