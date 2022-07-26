var userdb=require("../model/model.js")
exports.create=(req,res)=>{

    //validate request
    if(!req.body){
        res.status(400).send({message:"content is not there"})
        return;
    }
    const user=new userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender
    })

    //save in db

    user 
     .save(user)
     .then(data=>{
        res.redirect("/")
     }).catch(err=>{
        res.status(500).send({message:err.message||"error"})
     })
    
}





exports.find=(req,res)=>{

   
 if(req.query.id){
    const id=req.query.id;
    userdb.findById(id)
    .then(data=>{
        if(!data){
            res.status(400).send({message:"id is not matchin"})

        }else{
            res.status(200).send(data)

        }
    }).catch(err=>{
        res.status(400).send({message:"cant get the user"})
    })
 }     
 
else{
         let currentPage=1 
         if(req.query.page){
            currentPage=req.query.page||1
         }
        console.log("currentPage:"+currentPage)
        
         
        const pageSize = 7    
        const skip = pageSize * (currentPage-1);
        const limit = pageSize;
       
        const count= userdb.find().count()
        totalpage=count/limit
        const sort={name:1}
        userdb.find({},{}).skip(skip).limit(limit).sort(sort).then(data=>{
            if(!data){
                res.send("err")
            }
            else{
                res.render("index",{users:data})
            }
        }
        ).catch(err=>{
            console.log("err");
        })

}

}


exports.update=(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"data to updated can not be empty"})
    }
       const id=req.params.id;
    userdb.findByIdAndUpdate(id,req.body).then(data=>{
        if(!data){
            res.send({message:'cannot update'})
            res.redirect("/")
        }else{
            res.send(data)
            res.redirect("/")
            console.log("the id is" +id)
            console.log("data is " + data)
        }
    }).catch(err=>{
        res.send({message:err.message||"message err"})
        res.redirect("/")
    })

}

exports.delete=(req,res)=>{
    const id=req.params.id;
    console.log(id)
    
    userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"id is not match"})
        }else{
            res.status(200).send({
                message:"deleted users"
            })
        }
    }).catch(err=>{
        res.status(500).send({message:"user not deleted"})
    })
}

exports.searchmenu=(req,res,next)=>{
    const searchname=req.query.name;
    // const searchemail=req.query.email;
    if(searchname){
    userdb.find({name:{$regex:searchname,$options:"$i"}})
    .then(data=>{
        if(data){
        res.render("index",{users:data})
        }
        else{
        res.send("<h3>No Data Found</h3>")
        }
    }).catch(err=>{
        res.send(err)
    })
    }
} 
    
exports.select=(req,res)=>{
    const select=req.query.gender;
    console.log(select)
    userdb.find({gender:select}).then(data=>{
        if(!data){
            res.send("err")
        }
        else{
            res.render("index",{users:data})
        }
    }
    ).catch(err=>{
        console.log("err");

    
    })
}
