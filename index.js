require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const User=require('./user');
const seed=require('./seedData');

const app=express();



app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/userData', 
{

    useNewUrlParser: true,
    useUnifiedTopology: true

    
}).then(()=>{
    console.log("Db connected")
}).catch(err=>{
    console.log(err);
})


//seed();
app.post('/setdata',async(req,res)=>{
      
        try{
            const user={name:req.body.name}
             jwt.sign(user,process.env.ACCESS_TOKEN_SECRET) 
              
         const data= await User.insertMany(req.body.data);
            console.log('inserted');
            res.json(data);
        }catch(err){
            console.log(err);
        }
       })


app.get('/getData',async(req,res)=>{
     try{
        const data=await User.find();
        res.json(data);
     }catch(err){
         console.log(err);
     }
})

app.get('/getData/:id',async (req,res)=>{
    try{
        const data=await User.findById(req.params.id);
        res.json(data);
    }catch(err){
        console.log(err);
    }


   
})


app.delete('/delete/:id',(req,res)=>{
    User.findByIdAndDelete(req.params.id,function(err,data){
        if(err)
        {
            console.log(err);
        }else{
            console.log('data deleted');
        }
    })
})

app.put('/update/:id',async (req,res)=>{

    try{
        const data=req.body.data;
    
        await User.findByIdAndUpdate({_id:req.params.id},{
            $set:
            {
            name:req.body.data.name,
            gender:req.body.data.gender,
            city:req.body.data.city,
            dob:req.body.data.dob,
            mobno:req.body.data.mobno,
            country:req.body.data.country

        
        }
        },function(err,data){
            if(err){
                console.log(err);

            }else{
                 console.log('Data Updated')
            }
        })
    }catch(err){
        console.log(err);
    }
      
    //   const data=await User.find();
        //    res.json(data);
      
})


app.get('/',(req,res)=>{
    
})




app.listen(4000,(req,res)=>{
    console.log("server running at port 4000")
})