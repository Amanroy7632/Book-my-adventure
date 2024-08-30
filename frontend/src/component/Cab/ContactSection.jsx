import React, { useState } from "react";
import "./contactsection.css";
import { FaLocationArrow } from "react-icons/fa";
import { MdCall, MdMail } from "react-icons/md";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { useCurrentUser } from "../../context/userContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../constraints";
import { Button } from "../commonUi";
const ContactSection = () => {
    // const [formData,setFormData] = useState({
    //     name:"",
    //     emial:"",
    //     phone:"",
    //     message:""
    // })
    const {alertMessage,setAlertMessage,onCloseHandler} =useCurrentUser()
    const [loading,setLoading] = useState(false)
    const {register,handleSubmit,reset} = useForm()
    async function onMessageSubmit(data){
        console.log(data);
        if ([data.email,data.phone,data.name].some(field=>field.trim()==="")) {
          setAlertMessage({message:"All fields are required",type:"error",title:""})
          return;
        }
        try {
          setLoading(true)
          const response = await axios.post(`${BASE_URL}/cabs/contact`,data)
          if (response.status===200) {
            setAlertMessage({
              message:"Thanks for your contacting us",type:"success",title:"Thanks"
            })
            reset()
          }
          setLoading(false)
        } catch (error) {
          setLoading(false)
          setAlertMessage({message:"Something went wrong"+error.message,type:"error"})
        }
        // call an api and store the data 
        // setAlertMessage("Congratulations Message submitted successfully")
        // setAlertMessage({
        //   message:"Message submitted successfully",
        //   title:"Congratulations",
        //   type:"success"
        // })
      }
  return (
    <section className="contact">
      <div className="content">
        <h2>Contact Us</h2>
        <p>Contact us for more information or to book a cab.</p>
      </div>
      <div className="contact-container">
        <div className="contactInfo">
          <div className="box">
            <div className="icon">
              <FaLocationArrow />
            </div>
            <div className="text">
              <h3>Address</h3>
              <p>
                410012 New Delhi Road,
                <br />
                Delhi,India,
                <br />
                89765432
              </p>
            </div>
          </div>
          <div className="box">
            <div className="icon">
              <MdCall />
            </div>
            <div className="text">
              <h3>Phone</h3>
              <p>100-000-0000</p>
            </div>
          </div>
          <div className="box">
            <div className="icon">
              <MdMail />
            </div>
            <div className="text">
              <h3>Email</h3>
              <p>bookmyadventure049@gmail.com</p>
            </div>
          </div>
          <h2 className="txt">Connect with us</h2>
          <ul className="sci">
            <li>
              <a href="#">
                <AiFillFacebook />
              </a>
            </li>
            <li>
              <a href="#">
                <AiFillTwitterSquare />
              </a>
            </li>
            <li>
              <a href="#">
                <AiFillLinkedin />
              </a>
            </li>
            <li>
              <a href="#">
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </div>

        <div className="contactForm">
          <form onSubmit={handleSubmit(onMessageSubmit)}>
            <h2>Send Message</h2>
            <div className="inputBox">
              <input type="text" name="name" required="required" {...register("name",{
                required:true
              })} />
              <span>Full Name</span>
            </div>
            <div className="inputBox">
              <input type="email" name="email" required="required" {...register("email",{
                required:true
              })} />
              <span>Email</span>
            </div>
            <div className="inputBox">
              <input type="number" name="phone" required="required" {...register("phone",{
                required:true
              })} />
              <span>Phone</span>
            </div>
            <div className="inputBox">
              <textarea required="required" name="message" {...register("message",{required:true})}></textarea>
              <span>Type your Message...</span>
            </div>
            <div className="inputBox">
              <Button type="submit" className=" rounded-none bg-[#00bcd4] p-[10px] text-xl font-[500] px-6">{loading?"Sending...":"Send"}</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
