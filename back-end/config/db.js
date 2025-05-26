const mysql = require ('mysql2/promise')

const pool = mysql.createPool({
    user:'root',
    host:'localhost',
    database:'task',
    password:''
})

const testconnection = async () =>{
    try{
        const result = await pool.getConnection()
        console.log('Database Connection Successful...')

    }
    catch(err)
    {
        console.log(err)
        console.log('Failed to Connect Database...')

    }
}

module.exports = pool;