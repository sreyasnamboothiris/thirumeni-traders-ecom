

## Cart Table

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | int | Primary key |
| user_id | int | Foreign key to users table |
| cart_id | int | (user id) |
| price | decimal | Price of the product |
| created_at | timestamp | Timestamp of the cart |
| updated_at | timestamp | Timestamp of the cart |


## Cart Item Table

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | int | Primary key |
| cart_id | int | Foreign key to cart table |
| product_id | int | Foreign key to products table |
| quantity | int | Quantity of the product |
| price | decimal | Price of the product |
| created_at | timestamp | Timestamp of the cart item |
| updated_at | timestamp | Timestamp of the cart item |

