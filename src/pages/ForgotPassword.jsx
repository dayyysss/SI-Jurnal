import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import ForgotPassword from '../features/user/ForgotPassword'
import Login from '../features/user/Login'

function ExternalPage(){
    document.title = "SI Jurnal - Lupa Password";

    return(
        <div className="">
                <ForgotPassword />
        </div>
    )
}

export default ExternalPage