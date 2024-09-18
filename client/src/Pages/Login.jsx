import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL="http://localhost:3000/api/auth/login";
export const Login =()=>{
    const[user , setUser] = useState({
        Email:"",
        Password:""
    });

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    const handleInput=(e)=>{
       let name=e.target.name;
       let value=e.target.value;

       setUser({
        ...user,
        [name]:value
       })
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
       try {
        const response=await fetch(URL ,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",

            },
            body:JSON.stringify(user),
        });
        console.log("login form" , response);
        const res_data=await response.json();
        if(response.ok){
           
            toast.success("Login Successfully")
               storeTokenInLS(res_data.token);
   
            setUser({Email:"",
        Password:""});
        navigate("/");
        }
        else{
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message );
            console.log("Invalid Credential")
        }
       } catch (error) {
        console.log(error);

       }
    }
    return<>
                <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/login.png" alt="login"
                            width="500" height="500" />
                        </div>

                       { /*registration */ }
                       <div className="registration-form">
                        <h1 className="main-heading mb-3">Login Form</h1>
                        <br />
                        <form onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="Email">Email</label>
                                <input type="email"
                                 name="Email" 
                                 placeholder="Enter Your Email"
                                  id="Email"
                                    required
                                    autoComplete="off"
                                    value={user.Email}
                                    onChange={handleInput}
                                  />
                            </div>

                            <div>
                                <label htmlFor="Password">Password</label>
                                <input type="password"
                                 name="Password" 
                                 placeholder="Enter Your Password"
                                  id="Password"
                                    required
                                    autoComplete="off"
                                    value={user.Password}
                                    onChange={handleInput}
                                  />
                            </div>
                            <br />

                            <button type="submit" className="btn btn-submit">Login Now</button>
                        </form>
                       </div>
                       
                    </div>
                </div>
            </main>
        </section>
    </>
}