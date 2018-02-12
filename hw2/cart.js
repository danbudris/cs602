function json(response){
    return response.json();
};

$(document).ready(()=>{

    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        }
      });

    $.get("http://localhost:3030/cartInfo",(data) => {
        cart = data;
        console.log(data)})
    .then((data) => {
        $.get("http://localhost:3030/inventory", (data) => {
            inventory = data;
            console.log(data)})
        .then(()=>{
            let cartTotal = 0;
            let cartWeight = 0;
            let cartList = [];
            let cartArea = $('<div />');
            for(var item in cart){
                let itemcost = (inventory['Inventory'][item]['price']);
                cartTotal += (cart[item] * itemcost);
                cartWeight += (inventory['Inventory'][item]['weight'] * cart[item]);
                cartList.push([inventory['Inventory'][item]['itemName'], itemcost, cart[item]]);
                cartArea.append('<input id="'+ item +'_input" value ="' + cart[item] + '"> <label>' + inventory['Inventory'][item]['itemName'] + '</label><br>')
            };

            $("#cartInfo").html(cartArea);

            let totalWithTax = (cartTotal + (cartTotal * .0625));
            
            if (cartWeight > 11) {
                shipping = 10.00;
            }
            else if (cartWeight >= 6){
                shipping = 7.50;
            }
            else if (cartWeight > 0){
                shipping = 5.00;
            }
            else {
                shipping = 0;
            };
            let orderTotal = totalWithTax + shipping;

            $("#orderPreTotal").html("Total Before Tax and Shipping: $" + cartTotal.toFixed(2));
            $("#orderWeight").html("Order Weight: " + cartWeight.toFixed(2) +"lbs");
            $("#orderShipping").html("Shipping Cost: $" + shipping);
            $("#orderTotal").html("Total Order with Tax and Shipping: $" + orderTotal.toFixed(2));

            console.log(cartList);
            console.log(orderTotal);
        });
    });
    
    //The following two click events/functions are very redundant, prime for refactoring into a reusable function or object

    $("#updateCart").click(()=>{
        let item1 = $("#item1_input").val()
        let item2 = $("#item2_input").val()
        let item3 = $("#item3_input").val()
        let item4 = $("#item4_input").val()
        let item5 = $("#item5_input").val()
    
        let order = {
            item1: item1,
            item2: item2,
            item3: item3,
            item4: item4,
            item5: item5
        };
    
        $.post("http://localhost:3030/modifyCart",order,(data)=>{
            console.log(data['failedToPurchase']);
            let errors = data['failedToPurchase'];
            let success = data['purchased'];
            if (data['failedToPurchase']){
                alert("Failed to Purchase the following items: \n"+ errors +"\nNot enough in stock!");
            };
            window.location.reload(true);
        });
    });

    $("#checkout").click(()=>{
        let item1 = $("#item1_input").val()
        let item2 = $("#item2_input").val()
        let item3 = $("#item3_input").val()
        let item4 = $("#item4_input").val()
        let item5 = $("#item5_input").val()
    
        let order = {
            item1: item1,
            item2: item2,
            item3: item3,
            item4: item4,
            item5: item5
        };
    
        $.post("http://localhost:3030/checkout",order,(data)=>{
            console.log(data['failedToPurchase']);
            let errors = data['failedToPurchase'];
            let success = data['purchased'];
            if (data['failedToPurchase']){
                alert("Failed to Purchase the following items: \n"+ errors +"\nNot enough in stock!");
            };
            window.location.reload(true);
        });
    });

    $('#continueShopping').click(()=>{
        window.location.href = './shopping.html';
    });

});