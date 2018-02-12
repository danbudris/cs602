const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const fs = require('fs');
const app = express();

let rawdata = fs.readFileSync('./inventory.json');
let inventory = JSON.parse(rawdata);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// set up the session, which will be used to store the cart items
app.use(session({
    name: "session-id",
    secret:"chocolate is good",
    saveUninitialized: false,
    resave: true,
    store: new FileStore(),
    cookie: { 
        secure: false,
        cart: {item1:0,item2:0,item3:0,item4:0,item5:0},
        maxAge: 1000 * 60 * 24
    }
    })
);

// allow cross origin requests (cause I'm janky and this is local)
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
app.use(function printSession(req, res, next) {
    console.log('req.session', req.session);
    return next();
  });

app.get('/', (req, res, next) => {
    res.json(inventory);
    return next();
});

app.get('/update/:itemid/:ammount', (req, res, next) => {
    inventory['Inventory'][req.params.itemid]['quantityInStock'] = inventory['Inventory'][req.params.itemid]['quantityInStock'] - req.params.ammount;
    console.log(inventory);
});

app.post('/saveCart', (req, res, next) => {
    let errorList = [];
    let successList = [];
    //for each item in the request, add it to the session cart and modify the inventory
    for (var key in req.body){
        if (req.body[key] != 0){
            var stock = inventory['Inventory'][key]['quantityInStock'];
            let quantity = parseInt(req.body[key]) + parseInt(req.session.cart[key]);

            if (stock - quantity < 0){
                console.log("ERROR");
                errorList.push(key);
            }
            else {
                //inventory['Inventory'][key]['quantityInStock'] -= quantity;
                req.session.cart[key] = (parseInt(quantity)).toString();
                console.log(key + " " + stock);
                successList.push(key);
            };
        };
    };
    console.log(inventory);
    console.log(stock);
    console.log(req.session.id);
    console.log(req.session.cart);
    let returnValue = {
        "failedToPurchase": (errorList.toString()),
        "purchased":(successList.toString())
    };
    res.json(returnValue);
});

app.post('/modifyCart', (req, res, next) => {
    let errorList = [];
    let successList = [];
    for (var key in req.body){
        let stock = inventory['Inventory'][key]['quantityInStock'];
        let quantity = req.body[key];
        //let diff = (quantity - parseInt(req.session.cart[key]));

        if (stock - quantity < 0){
            console.log("ERROR");
            errorList.push(key);
        }
        else {
            //inventory['Inventory'][key]['quantityInStock'] -= diff;
            req.session.cart[key] = (quantity).toString();
            successList.push(key);
        };
    };
    let returnValue = {
        "failedToPurchase": (errorList.toString()),
        "purchased":(successList.toString()),
    };
    res.json(returnValue);
});

app.get('/cartInfo', (req, res, next) => {
    res.json(req.session.cart);
});

app.post('/checkout', (req, res, next) => {
    let errorList = [];
    let successList = [];
    //for each item in the request, add it to the session cart and modify the inventory
    for (var key in req.body){
        if (req.body[key] != 0){
            var stock = inventory['Inventory'][key]['quantityInStock'];
            let quantity = parseInt(req.body[key]);

            if (stock - quantity < 0){
                console.log("ERROR");
                errorList.push(key);
            }
            else {
                inventory['Inventory'][key]['quantityInStock'] -= quantity;
                req.session.cart[key] = 0;
                successList.push(key);
            };
        };
    };
    let returnValue = {
        "failedToPurchase": (errorList.toString()),
        "purchased":(successList.toString()),
    };
    res.json(returnValue);
});

app.get('/inventory', (req, res, next) => {
    res.send(inventory);
});

//Set an empty car up for sessions without a cart
app.post('/setCart', (req, res, next) => {
    try {
        console.log(req.session.cart["item1"]);
    }
    catch (e){
        req.session.cart = req.body;
    };
    res.send('Cart Set')
});

app.listen(3030);