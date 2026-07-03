require("dotenv").config()
const dns = require("dns");

// Force Google DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = require('./src/app');
const connectDb = require('./src/config/db');
connectDb();
app.listen(3000,()=>{
    console.log("server is running at port  3000");  
})
