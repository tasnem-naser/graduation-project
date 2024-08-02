
import { globalError } from "./middleware/gobalErrorMiddleware.js"
import userRouter from "./modules/User/user.routes.js"
import auctionRouter from "./modules/auction/auction.routes.js"
import biddeeRouter from "./modules/bidders/bidders.routes.js"
import cartRouter from "./modules/cart/cart.routes.js"
import categoryRouter from "./modules/category/category.routes.js"
import contactRouter from "./modules/contact/contact.routes.js"
import favoritepageRouter from "./modules/favoritepage/favoritepage.routes.js"
import photoRouter from "./modules/machine/machine.routes.js"
import OrderRouter from "./modules/orders/order.routes.js"
import productRouter from "./modules/product/product.routes.js"
import subcategoryRouter from "./modules/subcategory/subcategory.routes.js"
import technicalRouter from "./modules/technical/technical.routes.js"




export const bootstap = (app)=>{
    app.use('/api/v1/categories',categoryRouter)
    app.use('/api/v1/subcategories',subcategoryRouter)
    app.use('/api/v1/products',productRouter)
    app.use("/api/v1/users",userRouter);
    app.use("/api/v1/technical",technicalRouter);
    app.use("/api/v1/carts",cartRouter);
    app.use("/api/v1/orders",OrderRouter);
    app.use("/api/v1/bidders",biddeeRouter);
    app.use("/api/v1/favoritepage",favoritepageRouter);
    app.use("/api/v1/photo",photoRouter);
    app.use("/api/v1/auction",auctionRouter);
    app.use("/api/v1/contact",contactRouter);

 



    app.get('/', (req, res) => res.send('Hello World!'))

    
app.use(globalError)
}