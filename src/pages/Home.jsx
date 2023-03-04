import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css"

const Home = () => {
  const [state, setState] = useState([]);
 const [isDeleted, setIsDeleted] = useState(false);
  const [perPage,setPerPage] = useState(10)
  const [currentPage,setCurrentPage] = useState(1)
  const [totalAirline,setTotalAirline] = useState(0)
  const navigate = useNavigate();
 
  //fetch data
  const displaydata = () => {
    axios
      .get(`https://airlinebackend.vercel.app/details?page=${currentPage}&limit=${perPage}`)
      .then((response) => {
        console.log(response.data.data);
        setState(response.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };


  //go to edit page
  const redirectEditPage = (_id) => {
    navigate(`/edit/${_id}`);
  };

  //delete data
  const handleDelete = (id) => {
    axios
      .delete("https://airlinebackend.vercel.app/details",{data:{_id:id}})
      .then((response) => {
        console.log(response.data.data);
        setIsDeleted(!isDeleted)
      })
      .catch((err) => {
        console.log(err);
      });
      
  };

  useEffect(() => {
    displaydata();
  }, [isDeleted,currentPage,perPage]);

  //pagination:
  
  const numOfTotalPages = Math.ceil(state.length/perPage);

  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  const indexofLastdata = currentPage * perPage;
  const indexofFirstdata = indexofLastdata - perPage;

  const visibleData = state.slice(indexofFirstdata,indexofLastdata);

  const prePageHandler=()=>{
if(currentPage !==1){
  setCurrentPage(currentPage-1)
}
  }

const nextPageHandler=()=>{
  if(currentPage !== numOfTotalPages){
    setCurrentPage(currentPage+1)
  }
}

  return (
    <>
    <select className="show" onChange={(e)=>setPerPage(e.target.value)}>
      <option value="10">10</option>
      <option value="30">30</option>
      <option value="50">50</option>
    </select>
    <div>
      <h1>Airline Info Hub</h1>
      <table className="airlines">
        <thead>
          <tr>
            <th>Sr.no</th>
            <th>Id</th>
            <th>Name</th>
            <th>Country</th>
            <th>Slogan</th>
            <th>Established</th>
            <th>Logo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((ele, i) => (
            <tr key={i}>
                <td>{i+1}</td>
              <td>{ele._id}</td>
              <td>{ele.name}</td>
              <td>{ele.country}</td>
              <td>{ele.slogan}</td>
              <td>{ele.established}</td>
              <td>
                <img width="100px" max-height="50px" src={ele.logo} />
              </td>
              <td className="button_action">
                <img
                  style={{
                    marginLeft: "50px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                  src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-edit-interface-kiranshastry-lineal-color-kiranshastry-1.png"
                  onClick={() => redirectEditPage(ele._id)}
                />
                <img
                  style={{ marginLeft: "20px", cursor: "pointer" }}
                  src="https://img.icons8.com/color/48/000000/delete-forever.png"
                  onClick={() => handleDelete(ele._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table><br></br>
      <nav className="d-flex justify-content-center">
        <span  className= "pre" onClick={prePageHandler}>Pre</span>
        <ul className="pagination">

        {
         pages.map(ele => (
          <li className = {ele === currentPage ? "page-item active" : "page-item"} key={ele} onClick={()=>setCurrentPage(ele)} >
            <p className="page-link">{ele}</p>
          </li>
         )) 
        }
         <span className= "next" onClick={nextPageHandler}>Next</span>
        </ul>
       
      </nav>

      
    </div>
    </>
  );
};

export default Home;

