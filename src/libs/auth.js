let cookieConfig = {}

if (_global.debug == false) {
    cookieConfig = {
        domain: _global.cookie_domain,
        path: "/",
        expires: new Date(new Date().getTime() + 1000 * 3600 * 24 * 7)
    }
} else {
    cookieConfig = {
        domain: "localhost",
        path: "/",
        expires: new Date(new Date().getTime() + 1000 * 3600 * 24 * 7)
    }
}

/**
 * [saveCookie 保存cookie]
 * @param  {[string]} name  [cookie名]
 * @param  {[string]} value [cookie值]
 */
export function saveCookie(name, value) {
    document.cookie = `${name} = ${value};domain = ${cookieConfig.domain};path = ${cookieConfig.path};expires = ${cookieConfig.expires}`;
}

/**
 * [getCookie 获取指定cookie值]
 * @param  {[string]} name [cookie名]
 * @return {[string]}      [cookie值]
 */
export function getCookie(name) {
    let strCookie = document.cookie.replace(/\s/ig,""); //去掉空格
    //aLog(strCookie)
    let arrCookie = strCookie.split(";");
    //aLog(arrCookie);
    for(let i = 0;i < arrCookie.length;i++){
        let arr = arrCookie[i].split("=");
        if(arr[0] == name){
            return arr[1];
        }
    }
    return "";
}

/**
 * [removeCookie 删除指定cookie值]
 * @param  {[string]} name [cookie名]
 */
export function removeCookie(name) {
    let expires_time = new Date(new Date().getTime() + 1000 * 3600 * 24 * -1);
    document.cookie = `${name} = '';expires = ${expires_time}`;
}

/**
 * [getCookieAuth 获取token值]
 * @return {[string]} [token值]
 */
export function getCookieAuth() {
    return encodeURIComponent(getCookie(_global.token_name))
}

