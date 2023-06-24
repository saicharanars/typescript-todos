"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newtodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newtodo);
    res.status(201).json({ message: "added todo", todos: todos });
});
router.put('/todo/:todoid', (req, res, next) => {
    const tid = req.params.todoid;
    const todoindex = todos.findIndex((todoitem) => todoitem.id === tid);
    if (todoindex >= 0) {
        todos[todoindex] = { id: todos[todoindex].id, text: req.body.text };
        return res.status(200).json({ message: 'updated', data: todos });
    }
    return res.status(404).json({ message: "coudnot find anything" });
});
router.delete('/delete/:id', (req, res, next) => {
    todos = todos.filter((todoitem) => todoitem.id !== req.params.id);
    res.status(200).json({ message: "deleted" });
});
exports.default = router;
