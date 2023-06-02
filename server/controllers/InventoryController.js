import db from "../dbConnect.js"

const activityLog = (action) => {
    db.query(`INSERT INTO activity_logs (action) VALUES ('${action}')`, (err, row) => {
        if (err) return res.status(500).json(err);
    })
}

export const addItem = async (req, res) => {
    const { name, description, category, quantity } = await req.body;
    const query = `INSERT INTO inventory (name, description, category, quantity) VALUES ("${name}", "${description}", "${category}", "${quantity}")`;
    db.query(query, (err, row) => {
        if (err) return res.status(500).json(err);
        res.json(row);
        activityLog("Add item in inventory.");
    })
}

export const updateItem = async (req, res) => {
    const { id, name, description, category, quantity } = await req.body;
    const query = `UPDATE inventory SET name = "${name}", description = "${description}", category = "${category}", quantity = "${quantity}" WHERE id = "${id}"`;
    db.query(query, (err, row) => {
        if (err) return res.status(500).json(err);
        res.json(row);
        activityLog(`${name} info was edited.`);
    })
}

export const getAllItems = async (req, res) => {
    db.query("SELECT * FROM inventory", (err, row) => {
        if (err) return res.status(500).json(err);
        res.json(row);
    })
}

export const getItemsById = async (req, res) => {
    const { id } = await req.params;
    db.query(`SELECT * FROM inventory WHERE id = "${id}"`, (err, row) => {
        if (err) return res.status(500).json(err);
        res.json(row);
    })
}

export const deleteItem = async (req, res) => {
    const { id } = await req.params;
    db.query(`DELETE FROM inventory WHERE id = "${id}"`, (err, row) => {
        if (err) return res.status(500).json(err);
        res.json(row);
        activityLog(`Item id ${id} was deleted.`);
    })
}

export const filterByDate = async (req, res) => {
    const { from, to } = await req.body;
    const filterQuery = `SELECT * FROM inventory WHERE date >= "${from}" AND date <= "${to}"`;
    db.query(filterQuery, (err, row) => {
        if (err) return res.status(500).json(err);
        res.json(row);
    })
}