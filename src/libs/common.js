import {saveCookie , getCookie} from './auth'

/**
 * 打印日志
 */
const debug = true
export function aLog(...args) {
    if (debug) {
        console.log(args)
    }
}

/**
 * ssoLogin 登录跳转
 */
export function ssoLogin (type) {
    const loginReurl = (window.location.href).substring(0 , window.location.href.indexOf('#'));
    aLog(loginReurl)
    let company_id = getCompanyId();
    let reurl = encodeURIComponent(loginReurl);
	window.location.href = `${_global.sso_root}/login?type=${type}&company_id=${company_id}&reurl=${reurl}`;
}

/**
 * [getUrlParameter 获取url中问号后所接的参数]
 * @param  {[string]} parameter [参数名]
 * @return {[string]}           [参数值]
 */
export function getUrlParameter (parameter) {
    let _url = location.href; //获取_url中"?"符后的字串
  	let theRequest = new Object();
  	if (_url.indexOf("?") != -1) {
   		let str = _url.split("?")[1],
        	strs = str.split("&");
        	aLog('.................strs',strs)
	    for(let i = 0; i < strs.length; i++) {
	      	theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
	    }
  	}
    aLog('theRequest',theRequest['token'])
  	if (theRequest[parameter] != undefined) {
  		aLog(theRequest[parameter]);
        if(theRequest[parameter].indexOf("#") != -1){
  		    return theRequest[parameter].substring(0, theRequest[parameter].indexOf("#"));
        }else{
            return theRequest[parameter]
        }
  	} else {
  		return null;
  	}
}

export function getCompanyId () {
	//return _global.company_id;
	//return getCookie(company_id);
    return getUrlParameter('company_id')
}

export function getWeiDianId () {
  return getUrlParameter('weidian_id')
}

export function getDeskId () {
    return getUrlParameter('desk_id')
}