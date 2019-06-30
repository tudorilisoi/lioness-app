import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export default () => toast(

// );

export default {
    info: stringValue => toast.info(stringValue, {
        position: toast.POSITION.TOP_CENTER
    }),
    error: stringValue => toast.error(stringValue, {
        position: toast.POSITION.TOP_CENTER
    }),
}