const express = require('express');

const env = require('dotenv');

const app = express();
const path = require('path');
const cors = require('cors');

const mongoose = require('mongoose');

const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');


//envionment variable or constant
env.config();

//mongodb 
//mongodb+srv://<username>:<password>@cluster0.3jszl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerce")
.then(()=>{
    console.log("connection is successful");
}).catch((e)=>{
    console.log(e);
})
app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));

app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server is RUNNING at port ${process.env.PORT}`);
});

