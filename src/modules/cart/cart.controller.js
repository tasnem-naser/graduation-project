import asyncHandler from "express-async-handler";
import { productmodel } from "../../../databases/models/product.model.js";
import { cartModel } from "../../../databases/models/cart.model.js";
import  {isValidObjectId}  from "mongoose";
const calculateTotalCartPrice = (cart) => {
  let totalPrice = 0;

  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalCartprice = totalPrice;
  cart.totalCartpriceAfterDiscount = undefined;
  return totalPrice;
};

//@desc add product to cart
//@route POST
//@access private/User
export const addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const product = await productmodel.findById(productId);
  if (!product) {
    res.status(404).json({ message: "Product Not Found" });
  }

  const productPrice = product.price;
  //get cart for logged in user
  let cart = await cartModel.findOne({ user: req.user._id,_id: req.user.cart });
  //if no cart
  // if (!cart) {
  //   //create a new cart for this user with the product
  //   cart = await cartModel.create({
  //     user: req.user._id,
  //     //we can use $addtoSet

  //     cartItems: [{ product: productId, price: productPrice }],
  //   });
  // } else {
    // is this product exists in the cart,update product quantity
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );
    //find index if there is no item with this productid and color it will return -1
    //if productIndex > -1 then he found a product with  this productid and color  then i will update the quantity
    const qty = Number(quantity) || 0;
    if(qty>=1&&product.toJSON()?.quantity - qty < 0) throw new Error("max quantity is "+ product.toJSON()?.quantity)

    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      
      
      const productQty = qty ? qty || 1 : cart.cartItems[productIndex].quantity + 1
      console.log(product.toJSON()?.quantity);  

      if(product.toJSON()?.quantity - productQty < 0) throw new Error("max quantity is "+ product.toJSON()?.quantity)
            cartItem.quantity = productQty;
      // add this item to cart in his index
      cart.cartItems[productIndex] = cartItem;
    } else {
      //if the product is not exist in the cart ,push product to cartItem array
      cart.cartItems.push({ product: productId, price: productPrice, quantity: qty?qty:1 });
    }
  //}

  //calculate total cart price
  calculateTotalCartPrice(cart);

  await cart.save();

  res.status(200).json({
    status: "success",
    numberOfCartItems: cart.cartItems.length,
    message: "product added to cart successfully",
    data: cart,
  });
});

//@desc get logged user cart
//@route GET
//@access private/User
export const getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404).json({ message: "cart Not Found" });
  }
  res.status(200).json({
    status: "success",
    numberOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// //@desc remove item from cart
// //@route DELETE
// //@access private/User
// export const removeSpecificCartItem = asyncHandler(async (req, res, next) => {
//   const cart = await  cartModel.findOneAndUpdate(
//     { user: req.user._id },
//     {
//       //remove an item from cart if exists
//       $pull: { cartItems: { _id: req.params.itemId } },
//     },
//     { new: true }
//   );

//   //calculate total cart price
//   calculateTotalCartPrice(cart);

//   await cart.save();

//   res.status(200).json({
//     status: "success",
//     numberOfCartItems: cart.cartItems.length,
//     data: cart,
//   });
// });

export const removeProductFromCart = async (req, res, next) => {
  // * destructure data from authUser
  const { productId } = req.params;
  // const { _id } = req.authUser;
  console.log(req.user._id);
  // * check Cart
  const userCart = await cartModel.findOne({
    user: req.user._id,
    "cartItems.product": productId,
  });
  if (!userCart) {
    return next({ message: "Cart not found", cause: 404 });
  }

  // * remove product from cart
  userCart.cartItems = userCart.cartItems.filter(
    (product) => product.product.toString() !== productId
  );

  userCart.subTotal = calculateTotalCartPrice(userCart);

  // * save changes
  const newCart = await userCart.save();

  // * check if cart is empty
  if (newCart.cartItems.length === 0) {
    await cartModel.findByIdAndDelete(newCart._id);
  }

  // * response successfully
  res.status(200).json({
    success: true,
    message: "product deleted from cart successfully",
    data: newCart,
  });
};


    // Respond with success message and updated cart data
   

/**
 * Calculate the total price of items in the cart.
//  * @param {Object} cart - The cart object.
//  * @returns {Number} - The total price.
//  */
// const calculateTotalCartPrice = (cart) => {
//   // Implement the logic to calculate total cart price here
//   let total = 0;
//   for (const item of cart.cartItems) {
//     total += item.price * item.quantity;
//   }
//   return total;
// };
//@desc clear all items from cart
//@route DELETE
//@access private/User
export const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.updateOne({ user: req.user._id.valueOf() },{cartItems:[],totalCartprice: 0,
    totalCartpriceAfterDiscount: 0});

  res.status(200).json({ success: true, message: "delete successfully"});
});

export const updateProductQuantity = asyncHandler(async (req, res, next) => {
  const { productId , quantity} = req.body;
  const product = await productmodel.findById(productId);
  if (!product) {
    res.status(404).json({ message: "Product Not Found" });
  }
  
  //get cart for logged in user
  let cart = await cartModel.findOne({ user: req.user._id, _id: req.user.cart });
  if (!cart) throw new Error("cart not found");

  //if no cart
  // if (!cart) {
  //   //create a new cart for this user with the product
  //   cart = await cartModel.create({
  //     user: req.user._id,
  //     //we can use $addtoSet

  //     cartItems: [{ product: productId, price: productPrice }],
  //   });
  // } else {
    // is this product exists in the cart,update product quantity
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );
    //find index if there is no item with this productid and color it will return -1
    //if productIndex > -1 then he found a product with  this productid and color  then i will update the quantity
    const qty = Number(quantity) || 0;
    if(qty>=1&&product.toJSON()?.quantity - qty < 0) throw new Error("max quantity is "+ product.toJSON()?.quantity)
    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      
      
      
      cartItem.quantity = qty;
      // add this item to cart in his index
      cart.cartItems[productIndex] = cartItem;
    } else {
      //if the product is not exist in the cart ,push product to cartItem array
      throw new Error("product not found");
    }
  //}

  //calculate total cart price
  calculateTotalCartPrice(cart);

  await cart.save();

  res.status(200).json({
    status: "success",
    numberOfCartItems: cart.cartItems.length,
    message: "product updated successfully",
    data: cart,
  });
});




