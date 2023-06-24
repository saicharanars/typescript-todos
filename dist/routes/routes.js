"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newtodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newtodo);
    res.status(201).json({ message: "added todo", todos: todos });
});
router.put('/todo/:todoid', (req, res, next) => {
    const params = req.body;
    const tid = params.todoid;
    const body = req.body;
    const todoindex = todos.findIndex((todoitem) => todoitem.id === tid);
    if (todoindex >= 0) {
        todos[todoindex] = { id: todos[todoindex].id, text: body.text };
        return res.status(200).json({ message: 'updated', data: todos });
    }
    return res.status(404).json({ message: "coudnot find anything" });
});
router.delete('/delete/:id', (req, res, next) => {
    const params = req.body;
    todos = todos.filter((todoitem) => todoitem.id !== params.todoid);
    res.status(200).json({ message: "deleted" });
});
exports.default = router;
