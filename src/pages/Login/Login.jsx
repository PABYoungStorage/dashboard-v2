import { useState } from "react";
import "./login.css";
import { json, useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [otp, setotp] = useState({
    status: false,
    value: "",
  });
  const navigate = useNavigate();
  const otpverify = async () => {
    if (otp.status && otp.value) {
      let login = await fetch("http://localhost:3000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp: otp.value,
        }),
      }).then((res) => res.json());
      Object.keys(login).map((a) => {
        if (a == "status") {
          if (login[a] == true) {
            alert("Successfully verified");
            navigate("/dashboard");
          } else {
            alert(login.message);
          }
        }
      });
    }
  };
  const submit = async () => {
    // if (data.username === "akshaya" && data.password === "akshaya123") {
    //   navigate("/dashboard");
    // }else{
    //   alert("Incorrect username or password")
    // }
    if (data.username && data.password) {
      let login = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      }).then((res) => res.json());
      Object.keys(login).map((a) => {
        if (a == "status") {
          if (login[a] == true) {
            alert("Successfully login");
            setotp((a) => ({ ...a, status: true }));
          } else {
            alert(login.message);
          }
        }
      });
    }
  };
  return (
    <>
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
      <div className="login-class">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form>
          <img src="violet white-01.png" id="login-img" alt="" srcSet="" />

          {otp.status || (
            <>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Email or Phone"
                id="username"
                onChange={(e) =>
                  setData((a) => ({ ...a, [e.target.name]: e.target.value }))
                }
                value={data.username}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                onChange={(e) =>
                  setData((a) => ({ ...a, [e.target.name]: e.target.value }))
                }
                value={data.password}
              />

              <button type="button" onClick={submit}>
                Log In
              </button>
            </>
          )}
          {otp.status && (
            <>
              <label htmlFor="otp">OTP Verify</label>
              <input
                type="number"
                name="otp"
                placeholder="otp"
                id="otp"
                onChange={(e) =>
                  setotp((a) => ({ ...a, value: e.target.value }))
                }
                value={otp.value}
              />

              <button type="button" onClick={otpverify}>
                Verify
              </button>
            </>
          )}
          {/* <a href="/dashboard">Log In</a> */}
        </form>
      </div>
    </>
  );
};

export default Login;
