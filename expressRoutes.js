const {app} = require("./server");

app.get("/test",(req,res)=>{
    res.json("test route")
})