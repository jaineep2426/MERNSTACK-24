import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = ()=>{

    const[data , setData]= useState({
        Username : "",
        Email: "",
        MobileNo :""
    });

    const params= useParams();
    const {authorizationToken} = useAuth();

    const getSingleUserData=async()=>{
        const response =await fetch(`http://localhost:3000/api/admin/users/${params.id}` , {
            method:"GET",
            headers:{
                Authorization :authorizationToken
            }
        });
        const data= await response.json();
            console.log(`users single data: ${data}`);

            setData(data);
           // if(response.ok){
            //    getAllUsersData();
           // }
    }

    useEffect(()=>{
        getSingleUserData();
    } , [])
const handleInput=(e)=>{
let name = e.target.name;
let value = e.target.value;

setData({
    ...data,
    [name] : value,
});
};

// to update the data dynamically
const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:3000/api/admin/users/update/${params.id}` , {
            method:"PATCH",
            headers:{
                "Content-Type" : "application/json",
                Authorization :authorizationToken
            },
            body:JSON.stringify(data),
        }
    );
    if(response.ok){
        toast.success("Updated Successfully");
    }
    else{
        toast.error(" Not Updated");
    }
   
    } catch (error) {
        console.log(error);
    }
}

    return  <section className="section-contact">
    <div className="contact-content container">
        <h1 className="main-heading">Update User Data</h1>
    </div>

    <div className="container grid grid-two-cols">
        

        {/*Contact form*/}
        <section className="section-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Username">Username</label>
                    <input type="text" name="Username" id="Username" autoComplete="off" required value={data.Username} onChange={handleInput} />
                </div>

                <div>
                    <label htmlFor="Email">Email</label>
                    <input type="email" name="Email" id="Email" autoComplete="off" required value={data.Email} onChange={handleInput} />
                </div>

                <div>
                <label htmlFor="MobileNo">Message</label>
                <input type="number" name="MobileNo" id="MobileNo" autoComplete="off" required value={data.MobileNo} onChange={handleInput} />
                </div>

                <div>
                    <button type="submit">Update</button>
                </div>
            </form>
        </section>
    </div>
    
</section>
}