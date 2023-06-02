import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../dbConnect.js";
import "../config.js";

export const login = async (req, res) => {
    const { username, password } = await req.body;
    db.query(`SELECT * FROM accounts WHERE username = "${username}"`, (err, row) => {
        if(err) throw err;
        if(row.length !== 0){
            const correctPass = bcrypt.compareSync(password, row[0].password);
            if(correctPass){
                jwt.sign({ role: row[0].role, name: row[0].name, username: row[0].username, password: row[0].password, id: row[0].id }, process.env.JWT_SECRET, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token);
                    res.json(row);
                });
            }else{
                res.json("Incorrect Password");
            }
        }else{
            res.json("User not found");
        }
    })
}

export const logout = (req, res) => {
	res.cookie("token", "").json(true);
};

export const verifyUser = async (req, res) => {
    const { token } = await req.cookies;
    const { password, username } = await req.body;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
        if(err) throw err;
        const correctPass = bcrypt.compareSync(password, data.password);
        if(correctPass){
            res.status(200).json(true);
        }else{
            res.json(false);
        }
    })
} 

export const verifyForgetPassword = async (req, res) => {
    const { username } = await req.body;
    const query = `SELECT * FROM accounts WHERE username = "${username}"`;
    db.query(query, (err, row) => {
        if(err) throw err;
        if(row.length !== 0){
            res.status(200).json(row[0]);
        }else{
            res.json(false);
        }
    })
}