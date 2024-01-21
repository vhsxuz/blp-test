import React from "react";
import {Routes, Route} from 'react-router';
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Item from "../pages/Item";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/update-item/:id" element={<Item />} />
    </Routes>
  );
}

export default Router;