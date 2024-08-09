import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import Login from '../features/user/Login'

function ExternalPage(){
    document.title = "SI Jurnal - Login";

    return(
        <div className="">
                <Login />
        </div>
    )
}

export default ExternalPage