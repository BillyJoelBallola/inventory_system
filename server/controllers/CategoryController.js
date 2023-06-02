import db from "../dbConnect.js";

const activityLog = (action) => {
    db.query(`INSERT INTO activity_logs (action) VALUES ('${action}')`, (err, row) => {
        if (err) return res.status(500).json(err);
    })
}

export const addCategory = async (req, res) => {
    const { name } = await req.body;
    const query = `INSERT INTO category (name) VALUES ("${name}")`;
    db.query(query, (err, row) => {
        if (err) return res.status(500).json(err);
        res.json(row);
        activityLog("Add new category.");
    })
}

export const updateCategory = async (req, res) => {
    const { name, id } = await req.body;
    const query = `UPDATE category SET name = "${name}" WHERE id = "${id}"`;
    db.query(query, (err, row) => {
        if (err) return res.status(500).json(err);
        res.json(row);
        activityLog(`${name} info was edited.`);
    })
}

export const getAllCategory = async (req, res) => {
    db.query("SELECT * FROM category", (err, row) => {
        if (err) return res.status(500).json(err);
        res.json(row);
    })
}

export const deleteCategory = async (req, res) => {
    const { id } = await req.params;
    db.query(`DELETE FROM category WHERE id = "${id}"`, (err, row) => {
        if (err) return res.status(500).json(err);
        res.json(row);
        activityLog(`Category id ${id} was deleted.`);
    })
}