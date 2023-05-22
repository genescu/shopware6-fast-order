**Instructions on installing** 

The Shopware6 FastOrderPlugin is a plugin that allows for faster ordering. To install this plugin, please follow these steps:
1. Run the command` php bin/console plugin: refresh`
2. Run the command` php bin/console plugin: install --activate FastOrderExtensionStore` 
3. Run the command` php bin/console cache: clear`


**Description**


The Fast Order Plugin is a Shop ware plugin that allows customers to quickly and easily place an order for a product using its product number and desired quantity.

This plugin utilizes Doctrine DB AL to create a database table called` fast_order` with fields including` id`,` product_number`,` quantity`,` version_id`,` created_at`, and` updated_at`. The` id` field serves as the primary key for this table.

Upon installing the plugin, the` fast_order` table will be created if it does not already exist in the database.

In case the plugin is un installed, by default all data related to the plugin will be deleted from the database. However, if the` keep UserData` function is enabled, the data will remain intact in the database.



The program has three functions that are accessible through different URLs.
```
The first function( URL:/ fast-order) lets users see a page where they can quickly order products.

The second function( URL:/ fast-order/suggest/{search}) suggests products to users based on what they type into a search bar.

The third function( URL:/ fast-order/add-cart) lets users add products to their shopping cart and checkout.
```
Each function uses different variables that allow the program to communicate with the online store's databases and shopping cart system. Overall, these instructions make it easier for users to quickly order products from this online store.



This plugin is designed to be simple and efficient, allowing customers to quickly place an order without additional steps.
