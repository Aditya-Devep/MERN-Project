const express = require('express')
const app = express();

// CORS Policy 
var cors = require('cors')
app.use(cors())

// API Endpoints
var productRoutes = require('./routes/productRoutes')
app.use('/api', productRoutes)


// Middlewares 

// To serve Static data
app.use(express.static('public/'))

// TO Handle JSON data 
app.use(express.json())

// To Handle POST Method Data
app.use(express.urlencoded({ extended:true }))





// Routing 


app.get('/', (req, res)=>{
    return res.status(200).send('<h1>Welcome to aMart Shop Application</h1>')
})

const PORT = 4000 || process.env.PORT;
const HOST = '127.0.0.1';

app.listen(PORT, HOST, ()=>{
    console.log('Server is Running...')
})