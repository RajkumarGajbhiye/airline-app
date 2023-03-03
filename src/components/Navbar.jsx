


import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"
const { Header } = Layout;


const Navbar = () => {
  const items = [

    //thali route
    {
      key: 1,
      label: <Link style={{padding:"50px"}} to={"/home"}>Home</Link>
    },
    
    
  ];

  return (
    <div className={"header_content"}>
      <Header
        style={{
        display:"flex",
        justifyContent:"center",
        padding: '0 50px',
      }}>
        
    <div className="logo"/>
  
       <Menu
        style={{color:"red",textDecoration:"none",fontWeight:"bolder",fontSize:"40px",}}
        items={items}
      />
      
     
    </Header> 
  </div>
);
}

export default Navbar;

