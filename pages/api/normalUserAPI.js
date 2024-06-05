const API = "https://api.indexithub.com/api"

//send message
export const sendEmail = (user)=> {
    return fetch(`${API}/submit_normaluserdetails`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({email:user})
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
} 

// send email
export const sendMessage = (user)=> {
    return fetch(`${API}/submit_normaluserdetails`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(user)
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
} 

// get all message
export const getAllMessages = () =>{
    return fetch(`${API}/view_allmessage`)
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

// get message details
export const getMessageDetails = (id) =>{
    return fetch(`${API}/view_messagedetails/${id}`)
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

//to delete project
export const deleteMessage = (id, token) =>{
    return fetch(`${API}/delete_message/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res =>res.json())
    .catch(err =>console.log(err))
}


