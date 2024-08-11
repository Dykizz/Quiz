export const getCookie = (cname) =>{
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length ; i++){
        let c = ca[i];
        while (c.charAt(0) === ' '){
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0){
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

export const setCookie = (cname, cvalue, exdays)=>{
    let d = new Date();
    d.setTime(d.getTime() + exdays*60*60*24*1000);
    let expires = "expires=" + d.toUTCString(d);
    document.cookie = cname + "=" + cvalue + "; " + expires ;
}

export const deleteCookie = (cname) =>{
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`
}

export const deleteAllCookies = ()=>{
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length ; i++){
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > - 1 ? cookie.substring(0,eqPos) : cookie;
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
}