import db from "../dbConnect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "../config.js";
import fs from "fs";

const brcyptSalt = bcrypt.genSaltSync(10);

const encryptPassword = (pass) => {
    return bcrypt.hashSync(pass, brcyptSalt, (err, hash) => hash);
}

export const addAccount  = async (req, res) => {
    const { name, username, password, role } = await req.body;
    const usernameQuery = `SELECT * FROM accounts WHERE username = "${username}"`;
    db.query(usernameQuery, (err, row) => {
        if (err) return res.status(500).json(err);
        if(row.length === 0){
            const query = `INSERT INTO accounts (name, username, password, role) VALUES ('${name}', '${username}', '${encryptPassword(password)}', '${role}')`;
            db.query(query, (err, row) => {
                if (err) return res.status(500).json(err);
                res.status(200).json(row);
               
            })
        }else{
            res.json("Username already used. Try again.");
        }
    })
}

export const updateAccount = async (req, res) => {
    const { id, name, username } = await req.body;
    const query = `SELECT * FROM accounts WHERE id = ${id}`;
    db.query(query, (err, row) => {
        if (err) return res.status(500).json(err);
        if(row.length !== 0){
            const updateQuery = `UPDATE accounts SET name = "${name}", username = "${username}" WHERE id = "${id}"`;
            db.query(updateQuery, (err, row) => {
                if (err) return res.status(500).json(err);
                res.json(row);
            })
        }
    })
}

export const updateAccountPassword = async (req, res) => {
    const { id, password } = await req.body;
    const query = `SELECT * FROM accounts WHERE id = ${id}`;
    db.query(query, (err, row) => {
        if (err) return res.status(500).json(err);
        if(row.length !== 0){
            const updateQuery = `UPDATE accounts SET password = "${encryptPassword(password)}" WHERE id = "${id}"`;
            db.query(updateQuery, (err, row) => {
                if (err) return res.status(500).json(err);
                res.json(row);
            })
        }
    })
}

export const getAllAccounts  = async (req, res) => {
    const { token } = await req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
        if (err) return res.status(500).json(err);
        db.query(`SELECT * FROM accounts WHERE id <> ${data.id}`, (err, rows) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(rows);
        })
    })
    
}

export const getAccountById  = async (req, res) => {
    const { id } = await req.params;
    const query = `SELECT * FROM accounts WHERE id = ${id}`;
    db.query(query, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    })
}

export const deleteAccount  = async (req, res) => {
    const { id } = await req.params;
    const query = `DELETE FROM accounts WHERE id = ${id}`;
    db.query(query, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(rows);
    })
}

export const currentUser = async (req, res) => {
    const { token } = await req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
            if(err) throw err;
            const userLoggedQuery = `SELECT * FROM accounts WHERE id = "${data.id}"`;
            db.query(userLoggedQuery, (err, row) => {
                if (err) return res.status(500).json(err);
                res.json(row);
            })
        })
    }else{
        res.json(null);
    }
}

export const updateImageAccount = async (req, res) => {
    const { token } = await req.cookies;
    const { uploadedImage } = await req.body;
    try {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
            if(err) throw err;
            const userLogged = `SELECT * FROM accounts WHERE id = ${data.id}`;
            db.query(userLogged, (err, row) => {
                if(row[0].image !== ""){
                    fs.unlink(`./uploads/${row[0].image}`, (err) => {
                        if(err) throw err;
                    });
                }

                const updateImage = `UPDATE accounts SET image = "${uploadedImage}" WHERE id = "${row[0].id}"`;
                db.query(updateImage, (err, row) => {
                    if (err) res.status(500).json(err);
                    res.json(row);
                })
            })
        })
    } catch (error) {   
        res.json(error.message);
    }
}
