import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import AboutUs from "./About-us/aboutus";
import Workspace from "./Workspace/workspace";
import records from "./records/records.json";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
  

//   return (
//     <div className="App">
//       {
//       records && records.length>0 && records.map((val) =>{
//         return(
//           <h1 key={val.id}>{val.title}</h1>
//         )
//       })
//     }
//       <BrowserRouter>
//         {isLoggedIn ? (
//           <div>
//             <div className="d-flex flex-row min-vh-100 ">
//               <Navbar />
//               <div className="container-fluid dashboard content-cointainer mt-0 px-0">
//                 <Routes>
//                   <Route path="/dashboard" element={<Dashboard />} />
//                   <Route path="/about-us" element={<AboutUs />} />
//                   <Route path="/workspace" element={<Workspace />} />
//                 </Routes>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <Routes>
//             <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//           </Routes>
//         )}
//       </BrowserRouter>
//     </div>
//   );
// }
function App1(){
  const [data,setData,setIsLoggedIn] = useState([])
  const getData = () =>{
    fetch('records.json', {headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  })
  .then((response) =>{
    return response.json();
  }
    )
    .then((myjson) => {
      setData(myjson)
      })
  
  }

  useEffect(()=>{
    getData()
  },[])

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const client = localStorage.getItem("client");
    if (client) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="App">
      {
      records && records.length>0 && records.map((val) =>{
        return(
          <h1 key={val.id}>{val.title}</h1>
        )
      })
          }
          </div>
  )
}
          


/*export default App;*/
export default App1;
