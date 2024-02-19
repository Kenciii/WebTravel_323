import axios from "axios";
import { useEffect, useState } from "react";
import Travels from "./Travels";

const Home = () =>{
  const [travels, setTravel] = useState([]);

  useEffect(() =>{
    const getData = async () =>{
      try{
        const response = await axios.get("http://localhost:8081/travels");
        setTravel(response.data);
      }catch(error){
        console.log(error);
      }
    };
    getData();
  }, []);

  if(travels.length===0){
    return(
      <div className="mx-auto mt-5 text-center">
          No posts to show! Please contact admin to add travels!
      </div>
    );
  }

  return (

    
    <div className="container m-auto row row-cols-1 row-cols-md-3 g-4 mt-2 w-100">
      {travels.map((n) =>(
        <div key={n.id}>
          <Travels data={n} />
        </div>
      ))}
    </div>
  );
};

export default Home;