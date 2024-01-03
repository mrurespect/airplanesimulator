import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
    const [user,setUser]=useState({
        username:'',
        password:''
    });
    const [error,setError]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    let navigate =useNavigate();
    function getUserData(eventInfo){
        let myUSer ={...user};
        myUSer[eventInfo.target.name]=eventInfo.target.value ;
        setUser(myUSer);
    }
    async function sendLoginDataToApi() {
        let url = `http://localhost:8080/login/user`;
        let {data} = await axios.post(url, user);
        console.log(data)
        //let data={message:"success",token:"cc"} //just for testing

        if (data==="Login successful"){
            //login|Home
            setIsLoading(false);
            localStorage.setItem("userToken",data);
            navigate("/Simulation");
        }else{
            setError(data);
            setIsLoading(false);
        }
    }
    function submitLoginForm(e){
        setIsLoading(true)
        e.preventDefault();
            setTimeout(function () {sendLoginDataToApi().then( setIsLoading(false))}, 1000);
    }


    return (<><div className="container vh-100 d-flex justify-content-center align-items-center ">
        <img src="img_1.png" alt=""/>
        <form onSubmit={submitLoginForm} className="w-75 mx-auto pb-5 mb-5 p-5  border border-2 shadow">
            <h2 className="text-center">Login</h2>
            <br/>
            <label htmlFor="username">UserName : </label>
            <input onChange={getUserData} className="form-control my-input my-2" type="username" id="username" name="username"/>
            <label htmlFor="password">Password : </label>
            <input onChange={getUserData} className="form-control my-input my-2" type="password" id="password" name="password"/>
            <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-info py-2 m-0" >
                    {isLoading ===true ? <i className="spinner-border border-3"></i>:'Login'}
                </button>
                {error?<div className="alert alert-danger py-2 m-0">{error}</div>:''}
            </div>
        </form>
    </div>
    </>);
}
export default Login;