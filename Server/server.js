 const http=require('http')
 const app=require('./app')
 const connectDB=require('./DB/db')
 connectDB()
 const server=http.createServer(app);
 const port=process.env.PORT || 4000
 server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
 })