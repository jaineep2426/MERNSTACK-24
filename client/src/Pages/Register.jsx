import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register =()=>{

    const[user , setUser] =useState({
        Username:"",
        Email:"",
        MobileNo:"",
        Password:""
    });

    const navigate=useNavigate();

    const {storeTokenInLS} = useAuth();

    //handling the input values
const handleInput=(e)=>{
    let name=e.target.name;
    let value=e.target.value;

    setUser({
        ...user,
        [name]:value,
    })
    console.log(e)
};

//handling the form submission
const handleSubmit=async(e)=>{
e.preventDefault();
console.log(user);
try {
    

const response =await fetch(`http://localhost:3000/api/auth/register`,{
    method:"POST" , 
    headers:{
        'Content-Type':"application/json"
    },
    body:JSON.stringify(user),
});

const res_data=await response.json();
console.log("response from server" , res_data.extraDetails);
if(response.ok){
   
    storeTokenInLS(res_data.token);
    toast.success("Registration Successfully")
    setUser({
        Username:"",
        Email:"",
        MobileNo:"",
        Password:""
    })
    navigate("/");
}
else{
    toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message );
}
console.log(response);
}
catch (error) {
    console.log("register" , error);
}

}
    return<>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/register.png" alt="registration"
                            width="500" height="500" />
                        </div>

                       { /*registration */ }
                       <div className="registration-form">
                        <h1 className="main-heading mb-3">Registration Form</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="Username">Username</label>
                                <input type="text"
                                 name="Username" 
                                 placeholder="Enter Your Username"
                                  id="Username"
                                    required
                                    autoComplete="off"
                                    value={user.Username}
                                    onChange={handleInput}
                                  />
                            </div>

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
                                <label htmlFor="MobileNo">MobileNo</label>
                                <input type="number"
                                 name="MobileNo" 
                                 placeholder="Enter Your Mobile No"
                                  id="MobileNo"
                                    required
                                    autoComplete="off"
                                    value={user.MobileNo}
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

                            <button type="submit" className="btn btn-submit">Register Now</button>
                        </form>
                       </div>
                       
                    </div>
                </div>
            </main>
        </section>
    </>
}