import React, {useEffect} from "react";
import Logo from '../images/background.jpg';
import { Link } from "react-router-dom";
import Footer from "./Footer";
import './home.css';

function Home() {
  useEffect(() => {
    try{
      fetch('http://localhost:3001/')
      .then((res) => res.json());
    }
    catch(err) {console.log(err);}
  });
  
  return (
    <>

      <div>
        <img src={Logo} alt="this is currency"/>
        <br />
      </div>
      <div>
        <br></br>
        <Link to="login">
          <button className="enter">enter the website</button>
        </Link>
        <br></br>
      </div>
      <br></br>
      <Footer />
    </>
  );
}

export default Home;
