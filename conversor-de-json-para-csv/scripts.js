const converterForm  = document.querySelector("#converter-form")
const converterInput  = document.querySelector("#converterInput")
const jsonToCsvButton  = document.querySelector("#jsonToCsvButton")
const csvToJsonButton  = document.querySelector("#csvToJsonButton")

function jsonToCsv(json){
    const headers = Object.keys(json[0]);
    const csvRows = [];
    csvRows.push(headers.join(","));

    for(const row of json){
        const values = headers.map(header => {
            let value = row[header];

            if(value === null || value === undefined) {
                value = "";
            } else if(typeof value === "object") {
                value = JSON.stringify(value);
            }

            return value;
        })
        csvRows.push(values.join(","));
    }

    return csvRows.join("\n");

}

function csvToJson (csv){
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    const json = [];

    for(let i = 1; i < lines.length; i++){
        const values = lines[i].split(",");
        const row = {};

        for(let j = 0; j < values.length; j++){
            let value = values[j];
            if(value[0] === "{" || value[0] === "["){
                value = JSON.parse(value)
            }

            row[headers[j]] = value;
        }
        json.push(row);
    }
    displayJason(json);
}

jsonToCsvButton.addEventListener("click", function (){
    const json = JSON.parse(converterInput.value.trim());
    const csv = jsonToCsv(json);
    downloadCsv(csv);
});

function downloadCsv(csv){
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", 
    "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
    );
    downloadLink.setAttribute("download", "data.csv");
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

csvToJsonButton.addEventListener("click", ()=>{
    const csv = converterInput.value.trim();
    const json = csvToJson(csv);
});

function displayJason(json){
    const resultArea = document.createElement("pre");
    resultArea.textContent =JSON.stringify(json, null, 2);
    document.body.appendChild(resultArea);
}