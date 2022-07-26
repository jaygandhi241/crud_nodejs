const axios =require("axios")
exports.homeRoutes=(req,res)=>{
    //make a get req 
    axios.get(`http://localhost:3000/api/users`)
    .then(function(response){
        console.log(response);
        res.render("index",{users:response.data})
    }).catch(err=>{
        res.send({message:"error"})
    })
}
exports.addRoutes=(req,res)=>{
    res.render("add_user")
}
exports.updateRoutes=(req,res)=>{
    console.log("req data is "+ req.query.id);
    axios.get("http://localhost:3000/api/users",{params:{id:req.query.id}})
    .then(function(userdata){
        res.render("update_user",{users:userdata.data})
        console.log(users)
    }).catch(err=>{
        res.render(err)
    })
   
}
