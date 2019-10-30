window._ = require('lodash');
window.Pusher = require('pusher-js');
import memoryDriver from 'localforage-memoryStorageDriver';
import localforage from 'localforage';
import cookie from "universal-cookie";
import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';
import Echo from "laravel-echo";

export default async ()=>{

        localforage.defineDriver(memoryDriver).then((er)=>{
                const forageStore = localforage.createInstance({
                        // List of drivers used
                        driver: [
                                localforage.INDEXEDDB,
                                localforage.LOCALSTORAGE,
                                memoryDriver._driver
                        ],
                        // Prefix all storage keys to prevent conflicts
                        name: 'my-cache'
                });



                const config = {
                        excludeHeaders: true,
                        baseURL : window.baseurl,
                        headers:{
                                'X-Requested-With' : 'XMLHttpRequest',
                        },
                        adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
                };

                const Cook = new cookie();
                // axios.defaults.headers['X-CSRF-TOKEN'] =  Cook.get('XSRF-TOKEN');

                if (Cook.get('token')){
                        config.headers['Authorization'] = 'Bearer'+' '+Cook.get('token');
                        axios.defaults.headers['Authorization'] = 'Bearer'+' '+Cook.get('token');
                }
                window.axios  = axios.create(config);
                window.Echo = new Echo({
                        broadcaster: 'pusher',
                        key: '2d1618aedf92436ea5ce',
                        cluster: 'ap1',
                        forceTLS: true,
                        // authEndpoint: '/api/broadcasting/auth',
                        // auth: {
                        //         headers: {
                        //                 Authorization: 'Bearer ' + Cook.get('token'),
                        //         },
                        // },
                });
        })
}