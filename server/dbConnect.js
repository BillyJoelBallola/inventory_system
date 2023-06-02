import mysql from "mysql";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory_system'
})

if(connection){
    connection.connect();
    console.log("Database connected.");
}else{
    console.log("Database disconnected.");
}

export default connection;