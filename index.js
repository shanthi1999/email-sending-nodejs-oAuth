const express = require('express');
const app = express();
const routes = require('./routes');
const PORT  = process.env.PORT || 7000;

app.use(express.json());
app.use('/api',routes);

app.listen(PORT,()=>{
    console.log("port connected.....")
})