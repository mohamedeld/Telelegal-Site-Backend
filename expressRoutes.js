const {app} = require("./server");
const jwt = require("jsonwebtoken");

app.get("/user-link",(req,res)=>{
    const appData = {
        professionalUserName:"Mohamed Elrfaay",
        appDate:Date.now()
    }
    const token = jwt.sign(appData,process.env.SECRET_KEY);

    res.send(`https://localhost:5173/join-video?token=${token}`)
})

app.post("/validate-data",(req,res)=>{
    const token = req.body?.token;
    if(!token){
        return res.status(401).send("No token provided");
    }
    const decodedData = jwt.verify(token,process.env.SECRET_KEY);
    if(!decodedData){
        return res.status(401).send("Invalid token");
    }
    res.json(decodedData);
})