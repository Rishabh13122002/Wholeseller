import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import './App.css';
import { useState } from "react";
import WebFont from "webfontloader";
import { useEffect } from "react";
import Footer from "./component/layout/Footer/Footer"
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products"
import  Search  from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp.js";
import  store  from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions"
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile"
import  UpdateProfile  from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword"
import ForgotPassword from "./component/User/ForgotPassword"
import ResetPassword from "./component/User/ResetPassword"
import Cart from "./component/Cart/Cart"
import Shipping from "./component/Cart/Shipping"
import ConfirmOrder from "./component/Cart/ConfirmOrder"
import axios from "axios";
import Payment from "./component/Cart/Payment"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess"
import MyOrders from "./component/Order/MyOrders"
import OrderDetails from "./component/Order/OrderDetails"
import Dashboard from "./component/admin/Dashboard"
import ProductList from "./component/admin/ProductList"
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct"
import OrderList from "./component/admin/OrderList"
import ProcessOrder from "./component/admin/ProcessOrder"
import UsersList from "./component/admin/UsersList.js"
import UpdateUser from "./component/admin/UpdateUser"
import ProductReviews from "./component/admin/ProductReviews"
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());
    getStripeApiKey();
  },[])
  return (
    <Router>
    <Header />
    {isAuthenticated&& <UserOptions user={user} />}
    {stripeApiKey&&(<Elements stripe={loadStripe(stripeApiKey)}><Routes>{isAuthenticated&&<Route exact path="/process/payment" Component={Payment}/>}</Routes></Elements>)}
    <Routes>
    <Route exact path="/" Component={Home} />
    <Route exact path="/product/:id" Component={ProductDetails} />
    <Route exact path="/products" Component={Products}/>
    <Route path="/products/:id" Component={Products}/>
    <Route exact path="/search" Component={Search}/>
    {isAuthenticated&&<Route exact path="/account" Component={Profile}/>}
    {isAuthenticated&&<Route exact path="/me/update" Component={UpdateProfile}/>}
    {isAuthenticated&&<Route exact path="/password/update" Component={UpdatePassword}/>}
    <Route exact path="/password/forgot" Component={ForgotPassword}/>
    <Route exact path="/password/reset/:token" Component={ResetPassword}/>
    <Route exact path="/login" Component={LoginSignUp}/>
    <Route exact path="/cart" Component={Cart}/>
    {isAuthenticated&&<Route exact path="/shipping" Component={Shipping}/>}
    {isAuthenticated&&<Route exact path="/order/confirm" Component={ConfirmOrder}/>}
    {isAuthenticated&&<Route exact path="/success" Component={OrderSuccess}/>}
    {isAuthenticated&&<Route exact path="/orders" Component={MyOrders}/>}
    {isAuthenticated&&<Route exact path="/order/:id" Component={OrderDetails}/>}
    {isAuthenticated&&user.role==="admin"&&<Route exact path="/admin/dashboard" Component={Dashboard}/>}
    {isAuthenticated&&user.role==="admin"&&<Route exact path="/admin/products" Component={ProductList}/>}
    {isAuthenticated&&user.role==="admin"&&<Route exact path="/admin/product" Component={NewProduct}/>}
    {isAuthenticated&&user.role==="admin"&&<Route exact path="/admin/product/:id" Component={UpdateProduct}/>}
    {isAuthenticated&&user.role==="admin"&&<Route exact path="/admin/orders" Component={OrderList}/>}
    {isAuthenticated&&user.role==="admin"&&<Route exact path="/admin/order/:id" Component={ProcessOrder}/>}
    {isAuthenticated&&user.role==="admin"&&<Route exact path="/admin/users" Component={UsersList}/>}
    {isAuthenticated&&user.role==="admin"&&<Route exact path="/admin/user/:id" Component={UpdateUser}/>}
    {isAuthenticated&&user.role==="admin"&&<Route exact path="/admin/reviews" Component={ProductReviews}/>}
    </Routes>
    <Footer/>
    </Router>
  );
}

export default App;
