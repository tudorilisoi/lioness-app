import { toast, cssTransition, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//custom constant ids
const toastIDs = {
    error: 'error',
    info: 'info',
    warn: 'warn',
}

const Zoom = cssTransition({
    enter: 'zoomIn',
    exit: 'zoomOut',
    // default to 750ms, can be omitted
    duration: 300,
});

/**
 * 
 * @param {string} type 'error', 'info' or 'warn'
 * @param {string} stringValue 
 */
const toastMessage = (type, stringValue) => {
    const id = toastIDs[type]
    toastIDs[type] = toast[type](stringValue, {
        position: toast.POSITION.TOP_CENTER,
        transition: Zoom,
        autoClose: 3000,
        toastId: id,
    })
}

export default {
    info: toastMessage.bind(null, 'info'),
    error: toastMessage.bind(null, 'error'),
}
