// imports
const express = require("express");
const dotenv = require("dotenv");
const needle = require("needle");
const cors = require("cors");

// dotenv
dotenv.config();
const BearerToken = process.env.BEARER_TOKEN;

// iniciando express
const app = express();
app.use(express.static('public'));
app.use(cors())

// URL das requisições
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent"; // Ultimos tweets do usuário
const locationUrl = "https://api.twitter.com/2/tweets?ids="; // Dados do tweet

// Função pegando 
const getTweetsUser = async(id, quantity) => {    
    const params = {
        'query': 'from:'+ id+' -is:retweet',
        'expansions': 'geo.place_id',
    }
    const response = await needle('get', endpointUrl, params,{
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${BearerToken}`
        }
    })
    console.log(response.status)
    if (response.statusCode !== 200) {
         throw new Error(response.body.error);
    }
    if (response.body){
        let location = [];
        let data = [];
        for(let i = 0; i < quantity; i++) {    
            location.push(response.body.includes.places[i]);
            data.push(response.body.data[i]);
        }   
        let res = {location: location, data: data} 
        return res;
    }
    else
        throw new Error("Requisição falhou"); 
}

const getTweetData = async(req, res) => {
    try {
        let tweetsUser = await getTweetsUser(req.params.id,req.params.quantity);
        res.send(tweetsUser);
    } catch (error) {
        res.send(error);
    }
}


// Rotas
app.get("/tweet/:id/:quantity",getTweetData);

// Iniciando servidor
app.listen(process.env.PORT,() => {
    console.log('Servidor rodando na porta: ',process.env.PORT)
});


// app.get("/map", (req, res) => {
    //     res.sendFile(__dirname + "/public/index.html");
    // })

// app.get("/location",getTweetLocation);

// const getLocationTweet = async() => {

//     const params = {
//         'ids': '1568318517631410177',
//         'expansions': 'geo.place_id',
//     }

//     const response = await needle('get', locationUrl, params, {
//         headers: {
//             "User-Agent": "v2TweetLookupJS",
//             "authorization": `Bearer ${BearerToken}`
//         }})

//     if (response.statusCode !== 200) {
//         throw new Error(response.body.error.message);
//    }
//    if (response.body) {
//         return response.body;
//    }
//    else {
//        throw new Error("Requisição falhou");
//    }  
// }
  
// const getTweetLocation = async(req, res) => {
//     try {
//         let twitterData = await getLocation();
//         res.send(twitterData);
//     } catch (error) {
//         res.send(error);
//     }
// }
