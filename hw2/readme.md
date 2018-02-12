## CS 602 Spring 2018 HW 2: Session Persistence
# Dan Budris <Dbudris@bu.edu>

App.js contains the Express.js backend, which runs on port 3030.  The `Inventory.json` file contains the inventory; this is loaded into memory at run time and changes to it are done in-memory for the duration of the app.  The cart information in a custom field in the session cookie.  As a customers quantities are updated, they are only updated in the session cookie; once they check out, the session cookie quantities are subtracted from the inventory and the cookie is cleared.

Cart.html and Cart.js contain the javascript, html and css for the cart page.  This page displays the current quantities in the cart, allows for modifications, and allows the user to check out.

Shopping.html and Shopping.js contain the javascript, html and css for the shopping page.  This page displays the inventory and allows the customer to add items to their cart.

Final.html contains the html and css for a final 'thank you' page to be displayed on checkout. 
