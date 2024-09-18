import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts=()=>{
    const [contactData , setContactData] =useState([]);
    const {authorizationToken}= useAuth();

    const getContactsData=async()=>{
        try {
            const response = await fetch("http://localhost:3000/api/admin/contacts" , {
                method: "GET",
                headers:{
                    Authorization:authorizationToken,
                }
            });
            const data = await response.json();
            console.log("contact data " , data);
            if(response.ok){
                setContactData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteContactById = async(id)=>{
        try {
            const response = await fetch(`http://localhost:3000/api/admin/contacts/delete/${id}`,{
                method: 'DELETE',
                headers:{
                    Authorization:authorizationToken,
                }
            });
            if(response.ok){
                getContactsData();
                toast.success("Deleted Successfully")
            }
            else{
                toast.success("Not Deleted")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
  getContactsData();
    }, [])
    return (
    <>
    <section className="admin-contact-section">
        <h1>Admin Contact Data</h1>
        <div className="container admin-users">
        {contactData.map((curContactData , index)=>{
            const {Username , Email , Message , _id}=curContactData;
            return (<div key={index}>
            <p>{Username}</p>
            <p>{Email}</p>
            <p>{Message}</p>
            <button className="btn" onClick={()=> deleteContactById(_id)}>
                delete
            </button>
            </div>)
        })}
        </div>
    </section>
   
    </>);
};