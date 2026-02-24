1. User Management APIs

- [] Register User → POST /api/users/register
- [] Login User → POST /api/users/login
- [] Logout User → POST /api/users/logout
- [] Get User Profile → GET /api/users/:id
- [] Update User Profile → PUT /api/users/:id
- [] Change Password → PUT /api/users/:id/password
- [] Forgot Password / Reset Password → POST /api/users/forgot-password & POST /api/users/reset-password

2. Product APIs

- [] Handle listing, details, and searching of products.
- [] Get All Products → GET /api/products
- [] Get Product by ID → GET /api/products/:id
- [] Search Products → GET /api/products/search?query=...
- [] Filter Products → GET /api/products?category=...&price_min=...&price_max=...
- [] Add Product (Admin) → POST /api/products
- [] Update Product (Admin) → PUT /api/products/:id
- [] Delete Product (Admin) → DELETE /api/products/:id

3. Category APIs

- [] Optional but recommended for organized products.
- [] Get All Categories → GET /api/categories
- [] Get Category by ID → GET /api/categories/:id
- [] Add Category (Admin) → POST /api/categories
- [] Update Category (Admin) → PUT /api/categories/:id
- [] Delete Category (Admin) → DELETE /api/categories/:id

4. Cart APIs

- [] To manage user shopping carts.
- [] Get User Cart → GET /api/cart
- [] Add Item to Cart → POST /api/cart
- [] Update Cart Item Quantity → PUT /api/cart/:itemId
- [] Remove Item from Cart → DELETE /api/cart/:itemId
- [] Clear Cart → DELETE /api/cart

5. Order APIs

- [] For placing and tracking orders.
- [] Create Order → POST /api/orders
- [] Get All Orders (Admin) → GET /api/orders
- [] Get User Orders → GET /api/orders/user/:userId
- [] Get Order by ID → GET /api/orders/:id
- [] Update Order Status (Admin) → PUT /api/orders/:id/status
- [] Cancel Order → PUT /api/orders/:id/cancel

6. Payment APIs

- [] If you want to integrate payments (Stripe, PayPal, etc.)
- [] Initiate Payment → POST /api/payments/initiate
- [] Verify Payment → POST /api/payments/verify
- [] Get Payment History → GET /api/payments/user/:userId

7. Wishlist APIs (Optional)

- [] For users to save products for later.
- [] Get Wishlist → GET /api/wishlist
- [] Add Item to Wishlist → POST /api/wishlist
- [] Remove Item from Wishlist → DELETE /api/wishlist/:itemId

8. Reviews & Ratings APIs (Optional)

- [] Allow users to review products.
- [] Get Product Reviews → GET /api/products/:id/reviews
- [] Add Review → POST /api/products/:id/reviews
- [] Update Review → PUT /api/products/:id/reviews/:reviewId
- [] Delete Review → DELETE /api/products/:id/reviews/:reviewId

9. Admin & Analytics APIs (Optional for small shop, useful later)

- [] Get Sales Report → GET /api/admin/reports/sales
- [] Get User Report → GET /api/admin/reports/users
- [] Get Product Report → GET /api/admin/reports/products
