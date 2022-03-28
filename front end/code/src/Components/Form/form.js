import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Form(){
    const Navigate = useNavigate()
    const [user,setUser] = useState({
        file:"",author:"",location:"",description:""
    })

    let name,value
    const handleInputs = (e)=>{
        console.log(e)
        name = e.target.name
        value = e.target.value
        setUser({...user,[name]:value})
    }
    console.log(user)

    const PostData = async(e)=>{
        e.preventDefault()
        const {file,author,location,description} = user
        const res = await fetch("https://back-end-insta-clone.herokuapp.com/addData",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                file,author,location,description
            })
        })
        const data = await res.json()
        if(data.status === "Success"){
            window.alert("Data Posted")
            Navigate('/posts')
        }else{
            window.alert("Invalid")
        }
    }

    return(
        <>
        <form method="POST">
            <input type="text" name="file" placeholder="Image" value={user.file} onChange={handleInputs}></input><br></br>
            <input type="text" name="author" placeholder="Author" value={user.author} onChange={handleInputs}></input>
            <input type="text" name="location" placeholder="Location" value={user.location} onChange={handleInputs}></input><br></br>
            <input type="text" name="description" placeholder="Description" value={user.description} onChange={handleInputs}></input><br></br>
            <button type="submit" onClick={PostData}>Post</button>
        </form>
        </>
    )
}