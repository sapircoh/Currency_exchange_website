import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import Render from "./Render";

function MainPage() {
  const navigate = useNavigate();
  useEffect(() => {
    try{
      fetch('http://localhost:3001/main')
      .then((res) => res.json())
      .then((data) => {        
        if(!data.user){          
          navigate("/");
        }
      });
    }
    catch(err) {console.log(err);}
  });

  return (
    <div>
      <Render />
      <BackButton/>
    </div>
  );
}

export default MainPage;