const { log } = require('console');
const express=require('express')
const app=express()
const path=require('path');
const { config } = require('process');
const pool=require(path.join(__dirname,'config','studentDB'));


app.use(express.json());
//post info
app.post('/info',(req,res)=>{
    console.log(req.body);
    const datalist={
        name:req.body.name,
        age:req.body.age
    }
    
    pool.query('insert into info set ?',datalist,(error,result,field)=>{
        if(error) { console.log(error)}
        else{
            console.log('Data inserted successfully');
            res.send('Data inserted successfully');

        }
        

    })
})
//post mark
app.post('/mark',(req,res)=>{
    console.log(req.body);
    const ob=req.body;
    const avg=(ob.mark_1+ob.mark_2+ob.mark_3+ob.mark_4+ob.mark_5)/5;
    const pect=(avg/100)*100;
    const datalist={
        rolno:req.body.rolno,
        mark_1:ob.mark_1,
        mark_2:ob.mark_2,
        mark_3:ob.mark_3,
        mark_4:ob.mark_4,
        mark_5:ob.mark_5,
        average:avg,
        percentage:pect

    }
    
    pool.query('insert into mark set ?',datalist,(error,result,field)=>{
        if(error) { console.log(error)}
        else{
            console.log('Data inserted successfully');
            res.send('Mark Data inserted successfully');

        }
        

    })
})
//get information
app.get('/all',(req,res)=>{
    const query=`SELECT info.name,mark.*
    FROM mark
    JOIN info ON mark.rolno = info.rolno`;
    pool.query(query,(error,result,field)=>{
        if(error) { console.log(error)}
        else{
            
            res.send(result);

        }  
    })
})


app.listen(3050,()=>{
    console.log('app is listening 3050')
})