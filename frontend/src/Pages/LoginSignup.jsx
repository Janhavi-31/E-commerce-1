import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;
  await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => (responseData = data));

  console.log("Response:", responseData);

  if (responseData.success) {
    localStorage.setItem('auth-token', responseData.token);
    window.location.replace("/"); // or use navigate("/")
  } else {
    alert(responseData.errors || "Login failed");
  }
  };
  // const signup = async () => {
  //   console.log("Signup Function Executed", formData);
  //   let responseData;
  //   await fetch('http://localhost:5000/signup',{
  //     method:'POST',
  //     headers:{
  //       Accept:'application/json',
  //       //'application/form-data',
  //       'Content-Type':'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   }).then((response)=> response.json()).then((data)=>responseData=data)

  //   if (responseData.success) {
  //     localStorage.setItem('auth-token',responseData.token);
  //     window.location.replace("/");
  //   }
  // }

const signup = async () => {
  console.log("Signup Function Executed", formData);

  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("Signup Response:", data);

    if (!response.ok) {
      // Handle 400 or any other error
      alert(data.errors || "Signup failed");
      return;
    }

    if (data.success) {
      localStorage.setItem("auth-token", data.token);
      window.location.replace("/");
    }
  } catch (error) {
    console.error("Signup Error:", error);
    alert("Something went wrong. Try again later.");
  }
};


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler}  type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler}  type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"? <p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>: <p className="loginsignup-login">Create an account <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
        
       
        
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
    
  )
};
export default LoginSignup;
