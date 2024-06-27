const BACKEND_URL = "http://127.0.0.1:8080/api/v1/"

export const register = async (fullname: string, email: string, password: string, username: string) => {

    const data = {
        fullname,
        email,
        password,
        username
    }
    const registeredUser = await fetch(`${BACKEND_URL}users/newUserSignIn`,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify(data)
    }).then((res) => {
        console.log(res)
        return res;
    }).catch((error) => {
        console.log(error)
        return error
    })
    return registeredUser;
    
    
}

export const login = async (email: string, password: string) => {

    const data = {
        email,
        password,
    }
    const loggedInUser = await fetch(`${BACKEND_URL}users/existingUserLogin`,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify(data)
    }).then((res) => {
        
        return res;
    }).catch((error) => {
        console.log(error)
        return error
    })
    return loggedInUser;
    
    
}