
function getDataUser(location){
    document.getElementById("loader").style.display = "block";
    const userData=fetch( `http://api.weatherapi.com/v1/current.json?key=ed39f910374745828f093658241602&q=${location}`)
    .then(response=>{
        if(!response.ok){
            throw new Error(`Incorrect network error ${response.status}`);
        }
        return response.json()})
    .catch(error=>{
        console.log(`Found Error`);
    })
    .finally(()=>{document.getElementById("loader").style.display = "none";
})
    return userData;
    }


async function processData(data) {
  let newData = await data;
    const {humidity, is_day:isDay,temp_c:temp,condition:{text: conditionWeather} }=newData.current;
  return { conditionWeather, humidity, isDay, temp };
}

function addButtonEventListener() {
  const button = document.getElementById("button");
  button.addEventListener("click", getInput);
}
async function getInput() {
  const formInput = document.getElementById("location").value;
  const data = await getDataUser(formInput);
  const processedData = await processData(data);
  displayData(processedData);
}

function displayData(processedData) {
  const inputContainerDiv = document.getElementById("input-container");
  const displayDiv = document.createElement("div");
  console.log(processedData);
  displayDiv.innerHTML = `<div><div>Condition: ${processedData.conditionWeather}</div><div>Humidity: ${processedData.humidity}</div><div>Temperature: ${processedData.temp}</div></div>`;
  inputContainerDiv.removeChild(inputContainerDiv.lastChild);
  inputContainerDiv.append(displayDiv);
}
addButtonEventListener();
