
export const getToken=()=>{
    let userInfo= JSON.parse(localStorage.getItem("userInfo"))
    return userInfo;
}

export const setToken=(data)=>{
    return localStorage.setItem("userInfo",JSON.stringify(data));
}

export const removeToken=()=>{
     localStorage.removeItem("userInfo");
     return window.location.href="/";
}