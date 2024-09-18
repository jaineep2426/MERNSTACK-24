import { useState } from "react";
import { useAuth } from "../store/auth";


const defaultConatctFormData={
    Username:"",
    Email:"",
    Message:""
};
export const Contact =()=>{


    const [contact , setContact] = useState(defaultConatctFormData);

    const [userData , setUserData]= useState(true);
    const {user}=useAuth();

    if(userData && user){
        setContact({
            Username:user.Username,
            Email:user.Email,
            Message:"",
        });
        setUserData(false);
    }

    const handleInput=(e)=>{
        const name= e.target.name;
        const value=e.target.value;

        setContact({
            ...contact,
            [name]:value,

        });
    };
        const handleSubmit=async(e)=>{
             e.preventDefault();
          try {
            const response=await fetch("http://localhost:3000/api/form/contact",
                {
                    method:'POST',
                    headers:{
                        'Content-Type':"application/json"
                    },
                    body:JSON.stringify(contact)
                }
            );
            if(response.ok){
                setContact(defaultConatctFormData);
                const data=await response.json();
                console.log(data);
                alert("Message send successfully");
            }
           
          } catch (error) {
            alert("Message was not send")
            console.log(error);
          }
             
        }
    
    return<>
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Contact Us</h1>
            </div>

            <div className="container grid grid-two-cols">
                <div className="contact-img">
                    <img src="/images/contact.png" alt="contact" />
                </div>

                {/*Contact form*/}
                <section className="section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="Username">Username</label>
                            <input type="text" name="Username" id="Username" autoComplete="off" required value={contact.Username} onChange={handleInput} />
                        </div>

                        <div>
                            <label htmlFor="Email">Email</label>
                            <input type="email" name="Email" id="Email" autoComplete="off" required value={contact.Email} onChange={handleInput} />
                        </div>

                        <div>
                        <label htmlFor="Message">Message</label>
                           <textarea name="Message" id="Message" cols="30" rows="5" autoComplete="off" required value={contact.Message} onChange={handleInput}></textarea>
                        </div>

                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </section>
            </div>
            <section className="mb-3">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117331.68800211296!2d72.56314627437952!3d23.22068823002979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b987c6d6809%3A0xf86f06a7873e0391!2sGandhinagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1726159409887!5m2!1sen!2sin" width="100%" height="350"  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </section>
    </>
}