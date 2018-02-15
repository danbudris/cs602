function json(response){
    return response.json();
};

$(document).ready(()=>{
    fetch('http://127.0.0.1:3030')
    .then(json)
    .then((data) => {
        console.log(data)
        console.log(data['Inventory'])
        var inventory = data['Inventory']
        $("#item1").html("Name: " + JSON.stringify(data['Inventory']['item1']['itemName']));
        $("#item2").html("Name: " + JSON.stringify(data['Inventory']['item2']['itemName']));
        $("#item3").html("Name: " + JSON.stringify(data['Inventory']['item3']['itemName']));
        $("#item4").html("Name: " + JSON.stringify(data['Inventory']['item4']['itemName']));
        $("#item5").html("Name: " + JSON.stringify(data['Inventory']['item5']['itemName']));
        $("#item1price").html("Price: $" + JSON.stringify(data['Inventory']['item1']['price']));
        $("#item2price").html("Price: $" + JSON.stringify(data['Inventory']['item2']['price']));
        $("#item3price").html("Price: $" + JSON.stringify(data['Inventory']['item3']['price']));
        $("#item4price").html("Price: $" + JSON.stringify(data['Inventory']['item4']['price']));
        $("#item5price").html("Price: $" + JSON.stringify(data['Inventory']['item5']['price']));
    });
 
    //This is neccessary for the cookie to travel over the ajax requst, as far as I can tell
    //see https://stackoverflow.com/questions/2870371/why-is-jquerys-ajax-method-not-sending-my-session-cookie
    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        }
      });

    //Create an empty cart object;
    let cartObject = {
        item1: "0",
        item2: "0",
        item3: "0",
        item4: "0",
        item5: "0"
    };

    //Post the empty cart to the API; this will initialize the cookie if a cart does not already exist
    $.post("http://localhost:3030/setCart",cartObject,(data)=>{
        console.log(data + '!!!!!!');
    });

    //Bind the add functions to the add button
    $("#addToCart").click(()=>{
        let item1 = $("#item1_input").val()
        let item2 = $("#item2_input").val()
        let item3 = $("#item3_input").val()
        let item4 = $("#item4_input").val()
        let item5 = $("#item5_input").val()
    
        console.log('testing');
    
        let order = {
            item1: item1,
            item2: item2,
            item3: item3,
            item4: item4,
            item5: item5
        };
    
        $.post("http://localhost:3030/saveCart",order,(data)=>{
            console.log(data['failedToAddToCart!']);
            let errors = data['failedToPurchase'];
            let success = data['purchased'];
            if (data['failedToPurchase']){
                alert("Failed to Purchase the following items: \n"+ errors +"\nNot enough in stock!");
            };
        });
        window.location.reload(true);
    });
    
    //bind the checkout fucntions to the checkout button
    $('#checkout').click(()=>{
        window.location.href = './cart.html';
    });
});