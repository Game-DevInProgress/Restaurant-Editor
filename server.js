const pug = require('pug');
const express = require('express');
const fs = require('fs');
let app = express();

let restaurants = {}
let restaurantID = 0;

fs.readdir("./restaurants", (err,files) => {
    if(err) return console.log(err);
    for (let i = 0; i < files.length; i++) {
        let restaurant = require("./restaurants/" + files[i]);
        restaurants[restaurant.id] = restaurant;
        restaurantID++;
    }
    app.listen(3000)
    console.log("Server listening at http://localhost:3000");
});

//middleware
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(express.json());

app.get('/', (_,response) => {
    response.send(
        pug.renderFile("pages/homepage.pug",{})
    )
})

app.route("/restaurants").get((request,response)=>{
    var content_type = request.headers.accept.split(",")[0];// Gets the type of the accept header
    
    if(content_type === 'text/html'){
        response.send(
            pug.renderFile("pages/restaurants.pug",{restaurants:restaurants})
        )
    }
    else if(content_type === 'application/JSON'){
        let restaurant_list = Object.keys(restaurants);
        response.json({"restaurants":restaurant_list})
    }
    else{
        response.status(404);
        response.write("Uknown Content-Type: " + content_type)
    }
    
}).post((req,res)=>{
    if(req.body.name.length > 0 && parseInt(req.body["delivery_fee"]) >= 0 && parseInt(req.body["min_order"]) >= 0){
        req.body["delivery_fee"] = parseFloat(req.body["delivery_fee"]).toFixed(2);
        req.body["min_order"] = parseFloat(req.body["min_order"]).toFixed(2);
        restaurants[restaurantID] = req.body;
        restaurants[restaurantID].id = restaurantID;
        restaurants[restaurantID].menu = {}
        restaurantID++;
		res.json(restaurants[restaurantID-1]);
    }
    
})

app.get("/addRestaurant", (_,response)=>{
    response.send(pug.renderFile("pages/addRestaurant.pug",{}))
})

app.route("/restaurants/:id").get((request,response)=>{
    var content_type = request.headers.accept.split(",")[0];
    if(restaurants.hasOwnProperty(request.params.id)){
        if(content_type === 'text/html'){
            response.send(
                pug.renderFile("pages/restaurant.pug",{restaurant:restaurants[request.params.id]})
            )
        }
        else if(content_type === 'application/JSON'){
            if(restaurants.hasOwnProperty(request.params)){
                console.log(request.params)
                response.json(restaurants[request.params.id])
            }
        }
        else{
            response.sendStatus(404);
            response.write("Uknown Content-Type: " + content_type)
        }
    }else{
        response.sendStatus(404);
    }
    
}).put((request,response)=>{
    let {newItems} = request.body;
    let {newCats} = request.body;
    let {name} = request.body;
    let {deliveryFee} = request.body;
    let {minOrder} = request.body;
    let lastElement;


    for(let i=0;i<newCats.length;i++){//add categories to the menu
        restaurants[request.params.id]["menu"][newCats[i]] = {}
    }
    for(let i=0;i<newItems.length;i++){//add items to the specified categories in the menu
        lastElement =Object.keys(restaurants[request.params.id]["menu"][newItems[i]["Cat"]]).length;
        restaurants[request.params.id]["menu"][newItems[i]["Cat"]][lastElement] = newItems[i];
    }

    restaurants[request.params.id]["name"] = name;
    restaurants[request.params.id]["delivery_fee"] = deliveryFee;
    restaurants[request.params.id]["min_order"] = minOrder;
    
    response.sendStatus(200);
})