async function getData(location){
    document.getElementById('loader').style.display = 'block';
try{const response=await fetch(`http://api.weatherapi.com/v1/current.json?key=ed39f910374745828f093658241602&q=${location}`);
if(!response.ok){
    throw new Error(`HTTP error: Error Code ${response.status}`)
}
const data=await response.json();
return data;
}
catch(error){
    console.log("Error");
}
finally{
    document.getElementById('loader').style.display = 'none';

}
}

async function processData(data){
    let newData=await data;

    const conditionWeather=newData.current.condition.text;
    const humidity=newData.current.humidity;
    const isDay=newData.current.is_day;
    const temp=newData.current.temp_c;
    return {conditionWeather, humidity, isDay, temp};
}


function addButtonEventListener(){
    const button=document.getElementById('button');
    button.addEventListener('click',getInput);
}
async function getInput(){
    
    const formInput=document.getElementById('location').value;
    const data=await getData(formInput);
    const processedData=await processData(data);
    displayData(processedData);
}


 function displayData(processedData){
    const inputContainerDiv=document.getElementById('input-container');
    const displayDiv=document.createElement('div');
    console.log(processedData)
    displayDiv.innerHTML=`<div><div>Condition: ${processedData.conditionWeather}</div><div>Humidity: ${processedData.humidity}</div><div>Temperature: ${processedData.temp}</div></div>`;
    inputContainerDiv.removeChild(inputContainerDiv.lastChild);
    inputContainerDiv.append(displayDiv)
}
addButtonEventListener();