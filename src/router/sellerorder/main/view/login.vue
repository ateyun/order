<template>
    <div class="m-login">
    </div>
</template>

<script>
import { getUrlParameter } from '../../../../libs/common'
import { getCookie, saveCookie, removeCookie } from '../../../../libs/auth'

 export default {
    components: {

    },
    data () {
        return {
        }
    },
    mounted () {
        let _token = getUrlParameter("token");
        aLog(_token)
        if(_token != null){
            saveCookie(_global.token_name, _token);
            location.href = getCookie("loginReurl");
        }else{
            aLog('没有token')
        }
    }
}
</script>

