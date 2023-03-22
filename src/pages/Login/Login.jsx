import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [data,setData] = useState({
        username:"",
        password:"",
    })
    const navigate = useNavigate();
    const submit = ()=>{
        if(data.username === "akshaya" && data.password === "akshaya123"){
            navigate("/dashboard");
        }
    }
  return (
    <div className="login-class">
      <head>
        <title>Attirant Login</title>

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
          rel="stylesheet"
        />
      </head>

      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form>
        <img src="violet white-01.png" id="login-img" alt="" srcset="" />

        <label for="username">Username</label>
        <input type="text" name="username" placeholder="Email or Phone" id="username" onChange={(e)=>setData(a=>({...a,[e.target.name]:e.target.value}))} value={data.username} />

        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" id="password" onChange={(e)=>setData(a=>({...a,[e.target.name]:e.target.value}))} value={data.password} />

        <button onClick={submit}>Log In</button>
        {/* <a href="/dashboard">Log In</a> */}
      </form>
    </div>
  );
};

export default Login