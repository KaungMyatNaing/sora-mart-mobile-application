// import React from 'react';
// import { Toast } from 'toastify-react-native';

// const ToastHelper = {

//     toast: (text = '', icon = null ,type = '') => {

//         if(type == 'error') {
//             Toast.error(text);
//         } else if(type == 'success') {
//             Toast.success(text);
//         } else if(type == 'warning') {
//             Toast.warning(text);
//         } else if(type == 'default') {
//             Toast.default(text);
//         } else if(type == 'dark') {
//             Toast.dark(text);
//         } else {
//             Toast.success(text);
//         }
//     },

// }

import Toast from 'react-native-toast-message';

const ToastHelper = {
        toast: (text = '', icon = null ,type = '') => {
                Toast.show({
                    type: type,
                    text1: text
                  });
        
        },
    
    }

export default ToastHelper;