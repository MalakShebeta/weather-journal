/*const res = require("express/lib/response");
const { request } = require("http");*/

/* Global Variables */
const baseUrl="https://api.openweathermap.org/data/2.5/weather?zip=";
const myApiKey="&appid=25ae5315a2852d96d730ed8b803cf913&units=metric";

// Create a new date instance dynamically with JS
let dat = new Date();
let newDate = dat.getMonth()+1+'.'+ dat.getDate()+'.'+ dat.getFullYear();

const feelings= document.querySelector('#feelings');
const zip= document.querySelector('#zip');
const button= document.querySelector('#generate');
//click event function to see what will happen if the user clicked the button
button.addEventListener("click",(event) => {
    if (zip.value.trim("")=== "" || feelings.value.trim("") === "")
    {
        return alert("there are empty field please fill it");
        
    } else {
    getTheData(baseUrl,zip.value,myApiKey)
    .then(data=>{
        postRequest("/addData",{
            date: newDate,
            temp: data.main.temp,
            content:feelings.value,
    });
})
    .then(() =>
         updateUi());
  }});

//Post request to send the data to the server 
 const postRequest= async(url="" ,data={})=>{
    const response = await fetch (url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(data), //its used to change the data to JSOn 
    });
    
try{
   const result= await response.json();
   return result;
}
catch(error){
    console.log(error)
}};

// function to get the weather data 
const getTheData = async(baseUrl , zip , myApiKey)=>{
    const data = await fetch(baseUrl+zip+myApiKey);
    try {
        const response = await data.json();
        console.log(response);
        return response;
    } catch (error) {
    console.log('Error:',error) 
    }
}
// update user interface 
   const updateUi= async()=>{
    const request = await fetch("/getData");
    try {
        const response = await request.json();
        document.querySelector("#date").innerHTML= `Date: ${response.date}`;
        document.querySelector("#temp").innerHTML= `Temperature:${response.temp} c `;
        document.querySelector("#content").innerHTML= `Your feeling:${response.content}`;
    } catch (error) {
        console.log('Error:',error);
    }
}