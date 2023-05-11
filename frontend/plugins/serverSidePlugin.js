import Vue from 'vue';
import { mapGetters } from 'vuex';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

// mixins for using common methods

Vue.mixin({
    computed: {
        ...mapGetters({
          authUser: "getAuthUser",
        }),
    },
    methods: {
        async callApi(method, url, dataObj) {
            const token = await this.getCookie('token')

            try {
                let data = await this.$axios({
                    config: {
                    withCredentials: true
                    },
                    headers: {
                    Authorization: `Bearer ${token}`
                    },
                    method: method,
                    url: url,
                    data: dataObj,

                })
                return data
            } catch (e) {
                return e.response
            }
        },
        getCookie(key) {
            return cookies.get(key)
        },

        deleteCookie(key, option = {}) {
            return cookies.remove(key, option)
        },
        setCookie(key, value, option = {
            path: '/',
            maxAge: 2592000,
            sameSite: 'strict',
            // httpOnly: true,
            secure: false
            }) {
            return cookies.set(key, value, option)
        },
    }
})

