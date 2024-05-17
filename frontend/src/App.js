import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import  Error  from "./Pages/Error"
import BuyNow, { Confirmation ,Card} from "./Pages/BuyNow";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/online-shopping/project-in/93.61.06.00/109601639/home'  element={<Home/>}/>
          <Route path='/' exact element={<Login/>}/>
          <Route path='/online-shopping/project-in/93.61.06.00/register' element={<Register/>}/>
          <Route path="/online-shopping/project-in/93.61.06.00/10960/cart" element={<Cart/>}/>
          <Route path="/online-shopping/project-in/93.61.06.00/10960/product/:_id" element={<Product/>} />
          <Route path="/online-shopping/projct-in/93.61.06.09/buynow" element={<BuyNow/>} />
          <Route path="/online-shopping/projct-in/93.61.06.09/conformation" element={<Confirmation/>} />
          <Route path="/online-shopping/projct-in/93.61.06.09/card" element={<Card/>} />
          <Route path="/online-shopping/projct-in/93.61.06.09/error" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
