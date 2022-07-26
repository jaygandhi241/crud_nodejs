const express=require("express")
const route=express.Router() 
const controller=require("../controller/controller")
const Userdb = require("../model/model")
const services=require("../services/render")
route.get("/",services.homeRoutes)
route.get("/add",services.addRoutes)
route.get("/update",services.updateRoutes)
var userdb=require("../model/model.js")
// route.get("/toatalpage",(req,res)=>{
//   res.send(userdb.find().count())
// })
//api
route.post("/api/users",controller.create)
route.get("/api/users",controller.find)
route.post("/api/users/fetch",controller.find)
route.put("/api/users/:id",controller.update)
route.delete("/api/users/:id",controller.delete)
route.get("/search",controller.searchmenu)
route.get("/genderselect",controller.select)



module.exports=route