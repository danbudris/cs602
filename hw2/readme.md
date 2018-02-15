## Chocolate Store Basic Shopping Cart: Homework Two
Dan Budris

dbudris@bu.edu

CS 602, Server Side Web Development, Spring 2018


### Structure
This application is composed of four major components:
- Store front; composed of Shopping.html and Shopping.js
- Shopping cart; composed of Cart.html and Cart.js
- Backend express app and server; composed of app.js
- Inventory; composed of inventory.json

### Logic
app.js loads the inventory.json file into memory at runtime.  All changes made to the inventory are persisted only to memory, and are never saved back to the file.

The store front (shopping.html) allows you to add items to your cart.  When you attempt to add an item to your cart, the sum of the requested quantity and the quantity of that item in your cart is checked against the available inventory.  If you are requesting too many of the item, none are added to your cart and an error message is displayed.  If you request an available number of items, the requested quantity of the itme is added to the item in the cart stored in your session cookie.

The cart loads the quantity of each item in your cart from your session cookie, and displays the totals.  If you modify the numbers on the cart page, it sets the quantity in your cart (session cookie) to match.

When the 'checkout' button is pressed, the quantity of items in your cart (session cookie cart object) is subtracted from the 'inventory' object stored in-memory on the backend express app, and the values in your session cookie cart are cleared.