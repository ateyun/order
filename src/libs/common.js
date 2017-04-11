import {saveCookie} from './auth'

const debug = true
export function aLog(...args) {
    if (debug) {
        console.log(args)
    }
}

export function ssoLogin (type) {
    const loginReurl = location.href;
    aLog(loginReurl)
	saveCookie("loginReurl", loginReurl);
	location.href = `${_global.sso_root}/login?company_id=${_global.company_id}&reurl=${loginReurl}/login`;
}

export function getUrlParameter (parameter) {
    let _url = location.search; //获取_url中"?"符后的字串
  	let theRequest = {};
  	if (_url.indexOf("?") != -1) {
   		let str = _url.substr(1),
        	strs = str.split("&");
	    for(let i = 0; i < strs.length; i++) {
	      	theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
	    }
  	}
  	if (theRequest[parameter] != undefined) {
  		return theRequest[parameter];
  	} else {
  		return null;
  	}
}