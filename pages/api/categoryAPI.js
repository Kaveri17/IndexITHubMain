const API = "https://api.indexithub.com/api"
// const API = "http://localhost:8000/api"

export const addCategory = (category, token) =>{
    console.log(token)
    return fetch (`${API}/category/add_category`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(res =>res.json())
    .catch(err=>console.log(err))
}

//to view all 
export const getAllCategories = () =>{
    // let API = "http://localhost:8000/api"
    return fetch(`${API}/category/view_category`)
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

// to get category details
export const getCategoryDetails = (id) =>{
    return fetch(`${API}/category/view_categorydetailsbyid/${id}`)
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

//to update category
export const updateCategory = (id, category, token) =>{
    return fetch(`${API}/category/update_category/${id}`,{
        method: "PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(res =>res.json())
    .catch(err=>console.log(err))
}


//to delete category
export const deleteCategory = (id, token) =>{
    return fetch(`${API}/category/delete_category/${id}`,{
        method: "DELETE",
        headers:{
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res =>res.json())
    .catch(err=>console.log(err))
}