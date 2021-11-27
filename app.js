const express = require("express");
const bodyParser = require("body-parser");
 const request =require("request");
const https= require("https");
const app =express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
    // res.sendFile(__dirname + "/style.css");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("your server has started");
})



app.post("/",function(req,res){
const first= req.body.fName;
  const last= req.body.lName;
  const email= req.body.eMail;
  // console.log(first, last,email);
  const data ={
    members:[
      {
      email_address: email,
      status: "subscribed",
      merge_fields  :{
        FNAME: first,
        LNAME: last
      }
    }
    ]
  };

  const jsonData= JSON.stringify(data);
const url= "https://us5.api.mailchimp.com/3.0/lists/344c9e6cf4";
const option={
  method: "POST",
  auth : "bhuppi_15:709d22d8f37c3602dcd1609ceba7d48e-us5"
}
 const request = https.request(url,option,function(response){
  if(response.statusCode == 200){
 res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }


   response.on("data", function(data){
     console.log(JSON.parse(data));
   })

 })
 request.write(jsonData);
 request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
 })
app.post("/success", function(req,res){
  res.redirect("/");
})




//api key 709d22d8f37c3602dcd1609ceba7d48e-us5
// list id 344c9e6cf4
