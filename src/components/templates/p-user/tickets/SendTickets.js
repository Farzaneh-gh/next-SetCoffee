
"use client";
import React , { useState,useEffect } from "react";
import styles from "./SendTickets.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";
const SendTickets = () => {
  const router=useRouter(); 
const [title, setTitle] = useState("");
const [body, setBody] = useState("");
const [departments, setDepartments] = useState([]);
const [subDepartments, setSubDepartments] = useState([]);
const [department, setDepartmentId] = useState("");
const [subDepartment, setSubDepartmentId] = useState("");
const [priority, setPriority] = useState("1");
const [errors, setErrors] = useState({});

useEffect(()=>{
const fetchDepartment = async () => {
  try{
const response=await fetch(`/api/department`);
const data=await response.json();
setDepartments(data.data);

  }catch(err){
    console.log(err);
  }
}
 fetchDepartment();
 
},[])

 const handelSelectDepartment=async(e)=>{
   setDepartmentId(e.target.value);
   setErrors(prev=>({...prev,department:""}));
   const response=await fetch(`/api/department/subDepartment/${e.target.value}`);
   const data=await response.json();
   setSubDepartments(data.data);
 }

 const handelSubmit=async()=>{
  let errors={};
  if(title.trim()==="")errors.title="Title is required";
  if(body.trim()==="")errors.body="Body is required";
  if(department.trim()==="")errors.department="Department is required";
  if(subDepartment.trim()==="")errors.subDepartment="SubDepartment is required";
  if(priority.trim()==="")errors.priority="Priority is required";
  if(Object.keys(errors).length)return setErrors(errors);

  try{
    const response = await fetch(`/api/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        department,
        subDepartment,
        body,
        priority,
        title,
      }),
    });
    if(!response.ok){
      showSwal("Something went wrong","error","ok");
      return;
    }
    if(response.status===201){
    swal({title:"Ticket sent successfully",icon:"success",buttons:"ok"}).then(()=>location.reload());
    }
  }catch(err){
    console.log(err);
  }
 }
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span>Send Ticket</span>
        <span>
          <Link href="/p-user/tickets">All Tickets</Link>
        </span>
      </h1>
      <main>
        <div className={styles.inputs}>
          {" "}
          <div>
            <label>Department</label>
            <select onChange={handelSelectDepartment}>
              <option value="-1">select department</option>
              {departments?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className={styles.error}>{errors.department}</p>
            )}
          </div>
          <div>
            <label>Ticket</label>
            <select onChange={(e) => {setSubDepartmentId(e.target.value), setErrors(prev=>({...prev,subDepartment:""}))}}>
              <option value="-1">select ticket</option>
              {subDepartments?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
                
              ))}
            </select>
            {errors.subDepartment && (
              <p className={styles.error}>{errors.subDepartment}</p>
            )}
          </div>
        </div>

        <div className={styles.inputs}>
          {" "}
          <div>
            <label>subject</label>
            <input
              type="text"
              placeholder="subject"
              value={title}
              onChange={(e) => {setTitle(e.target.value); setErrors(prev=>({...prev,title:""}))}}
            />
            {errors.title && <p className={styles.error}>{errors.title}</p>}
          </div>
          <div>
            <label>Priority</label>
            <select onChange={(e) => setPriority(e.target.value)}>
              <option value="1">low</option>
              <option value="2">medium</option>
              <option value="3">higth</option>
            </select>
          
          </div>
        </div>

        <div className={styles.textarea}>
          <label>Message</label>
          <textarea
            rows={10}
            value={body}
            onChange={(e) => {setBody(e.target.value); setErrors(prev=>({...prev,body:""}))}}
          ></textarea>
          {errors.body && <p className={styles.error}>{errors.body}</p>}
        </div>

        <div className={styles.uploader}>
          <span>Maximum size: 6 MB</span>
          <span>Allowed formats: jpg, png, jpeg, rar, zip</span>
          <input type="file" />
        </div>

        <button className={styles.btn} onClick={handelSubmit}>
          <IoIosSend />
          Send Ticket
        </button>
      </main>
    </div>
  );
};

export default SendTickets;
