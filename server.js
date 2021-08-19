const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const PORT = 3005;
const app = express();

const KEY = "5xUJIDt7XHcvB1g3HmBmMZm3GlbfYrgxQ1rCm2Kj";

app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(bodyParser());

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
  }));

// const requestEndpoint = "https://developer.nrel.gov/api/reopt/v1/annual_kwh?api_key=r3lqvKOwb1wqwDfZGBZPFfgy21MrKgF52wufeCks&doe_reference_name=Hospital&latitude=40.123&longitude=-111.123";

// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
// app.get('/getData', cors(corsOptions), async (req, res) => {
//     let latitude = req.query.latitude;
//     let longitude = req.query.longitude;
//     let referenceName = req.query.referenceName;
//     console.log("latitude",latitude, "longitude", longitude, "referenceName", referenceName)
//     const requestEndpoint = "https://developer.nrel.gov/api/reopt/v1/annual_kwh?api_key=r3lqvKOwb1wqwDfZGBZPFfgy21MrKgF52wufeCks&doe_reference_name="+referenceName+"&latitude="+latitude+"&longitude="+longitude;
//     const fetchOptions = {
//         method: 'GET'
//     }
//     const response = await fetch(requestEndpoint, fetchOptions);
//     const jsonResponse = await response.json();
//     res.json(jsonResponse);
// });

app.get('/getAnnualLoad', cors(corsOptions), async (req, res) => {
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let referenceName = req.query.referenceName;
    console.log("latitude",latitude, "longitude", longitude, "referenceName", referenceName);
    const requestEndpoint = "https://developer.nrel.gov/api/reopt/v1/annual_kwh?api_key="+KEY+"&doe_reference_name="+referenceName+"&latitude="+latitude+"&longitude="+longitude;
    const fetchOptions = {
        method : 'GET'
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json();
    res.json(jsonResponse)
})

app.get('/getAnnualMmbtu', cors(corsOptions), async (req, res) => {
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let referenceName = req.query.referenceName;
    console.log("latitude",latitude, "longitude", longitude, "referenceName", referenceName);
    const requestEndpoint = "https://reopt.nrel.gov/tool/annual-mmbtu?doe_reference_name="+referenceName+"&latitude="+latitude+"&longitude="+longitude;
    const fetchOptions = {
        method : 'GET'
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json()
    res.json(jsonResponse)
})

app.get('/getAnnualTonHr', cors(corsOptions), async (req, res) => {
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let referenceName = req.query.referenceName;
    console.log("latitude",latitude, "longitude", longitude, "referenceName", referenceName);
    const requestEndpoint = "https://reopt.nrel.gov/tool/annual-tonhour?doe_reference_name="+referenceName+"&latitude="+latitude+"&longitude="+longitude
    const fetchOptions = {
        method : 'GET'
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json()
    res.json(jsonResponse)
})

app.get('/getSimulateProfileFetcher', cors(corsOptions), async (req, res) => {
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let referenceName = req.query.referenceName;
    let annualKwh = req.query.annual_kwh;
    console.log("latitude",latitude, "longitude", longitude, "referenceName", referenceName, annualKwh);
    const requestEndpoint = "https://developer.nrel.gov/api/reopt/v1/simulated_load?api_key="+KEY+"&doe_reference_name="+referenceName+"&latitude="+latitude+"&longitude="+longitude+"&annual_kwh="+annualKwh
    const fetchOptions = {
        method : 'GET'
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json()
    res.json(jsonResponse)
})

app.get('/getSimulateThermal', cors(corsOptions), async (req, res) => {
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let referenceName = req.query.referenceName;
    let annualmmbtuValue = req.query.annual_mmbtu;
    let LOAD_TYPE = "heating"
    console.log("latitude",latitude, "longitude", longitude, "referenceName", referenceName, "annualmmbtuValue", annualmmbtuValue, "LOAD_TYPE", LOAD_TYPE);
    const requestEndpoint = "https://developer.nrel.gov/api/reopt/v1/simulated_load?api_key="+KEY+"&load_type="+LOAD_TYPE+"&doe_reference_name="+referenceName+"&latitude="+latitude+"&longitude="+longitude+"&annual_mmbtu="+annualmmbtuValue
    const fetchOptions = {
        method : 'GET'
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json()
    res.json(jsonResponse)
})

app.get('/getSimulateCold', cors(corsOptions), async(req, res) => {
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let referenceName = req.query.referenceName;
    let LOAD_TYPE = "cooling"
    let annualTonHourValue = req.query.annual_tonhour;
    console.log("latitude",latitude, "longitude", longitude, "referenceName", referenceName, "annualTonHourValue", annualTonHourValue, "LOAD_TYPE", LOAD_TYPE);
    const requestEndpoint = "https://developer.nrel.gov/api/reopt/v1/simulated_load?api_key="+KEY+"&load_type="+LOAD_TYPE+"&doe_reference_name="+referenceName+"&latitude="+latitude+"&longitude="+longitude+"&annual_tonhour="+annualTonHourValue
    const fetchOptions = {
        method : 'GET'
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json()
    res.json(jsonResponse)
})

app.get('/getChpDefaultStat', cors(corsOptions), async(req, res) => {
    let CHP_PRIME_MOVER = 'recip_engine';
    const requestEndpoint = "https://developer.nrel.gov/api/reopt/v1/schedule_stats?api_key="+KEY+"&chp_prime_mover="+CHP_PRIME_MOVER+"&year=2017";
    const fetchOptions = {
        method : 'GET'
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json()
    res.json(jsonResponse)
})

app.get('/getChpValuesFetcher', cors(corsOptions), async(req, res) => {
    let existingBoilerProductionType = "hot_water";
    // let averageBoilerFuelLoad = "1.3974863013698597";
    let averageBoilerFuelLoad = req.query.avg_boiler_fuel_load_mmbtu_per_hr;
    const requestEndpoint = "https://developer.nrel.gov/api/reopt/v1/chp_defaults?api_key="+KEY+"&existing_boiler_production_type_steam_or_hw="+existingBoilerProductionType+"&avg_boiler_fuel_load_mmbtu_per_hr="+averageBoilerFuelLoad
    const fetchOptions = {
        method : 'GET'
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json()
    res.json(jsonResponse)
})

app.get('/getAbsorptionChillerDefault', cors(corsOptions), async(req, res) => {
    let existingBoilerProductionType = "hot_water";
    let maxTon = req.query.max_cooling_load_tons;
    const requestEndpoint = "https://developer.nrel.gov/api/reopt/v1/absorption_chiller_defaults?api_key="+KEY+"&hot_water_or_steam="+existingBoilerProductionType+"&max_cooling_load_tons="+maxTon
    const fetchOptions = {
        method : 'GET'
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json()
    res.json(jsonResponse)
})

app.post('/submitRequest', cors(corsOptions), async(req, res) => {
    console.log("Request body",req.body)
    const requestEndpoint = "https://developer.nrel.gov/api/reopt/v1/job?api_key="+KEY
    const fetchOptions = {
        method : 'POST',
        body: JSON.stringify(req.body),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json()
    res.json(jsonResponse)
})

app.get('/fetchResult', cors(corsOptions), async(req, res) => {
    console.log("key",req.query)
    let uniqueId = req.query.result
    const requestEndpoint = "https://developer.nrel.gov/api/reopt/v1/job/"+uniqueId+"/results?api_key="+KEY
    const fetchOptions = {
        method : 'GET'
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json()
    res.json(jsonResponse)
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});