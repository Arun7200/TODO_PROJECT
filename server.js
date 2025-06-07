const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// In-memory array to store todos
let items = [];

// GET: Display todo list with optional priority filter
app.get('/', (req, res) => {
    const filter = req.query.filter;
    const filteredItems = filter ? items.filter(i => i.priority === filter) : items;
    res.render("list", { ejes: filteredItems, selectedFilter: filter || "" });
});

// POST: Add new todo
app.post('/', (req, res) => {
    const { ele1, priority } = req.body;
    if (!ele1.trim()) return res.redirect('/');
    items.push({ task: ele1.trim(), priority: priority || 'Low' });
    res.redirect('/');
});

// POST: Delete todo
app.post('/delete/:index', (req, res) => {
    const index = req.params.index;
    items.splice(index, 1);
    res.redirect('/');
});

// POST: Edit todo
app.post('/edit/:index', (req, res) => {
    const { updatedTask, priority } = req.body;
    const index = req.params.index;
    if (updatedTask.trim()) {
        items[index] = { task: updatedTask.trim(), priority: priority || 'Low' };
    }
    res.redirect('/');
});

app.listen(5000, () => {
    console.log("Server started on http://localhost:5000");
});