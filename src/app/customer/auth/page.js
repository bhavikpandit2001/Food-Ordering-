'use client'
import { useState } from "react"
import CustomerHeader from "../../_components/customer/CustomerHeader"
import UserLogin from "../../_components/customer/UserLogin"
import UserSignup from "../../_components/customer/UserSignup"

const Auth=()=>{
    const [login,setLogin]=useState(true)
    return(
        <div>
            <CustomerHeader />
            <div className="container">
            <h1>{login?'User Login':'User Signup'}</h1>
            {
                login?<UserLogin />:<UserSignup />
            }
            <button className="button-link" onClick={()=>setLogin(!login)}>
                {login?'Do not have account? Signup':'Already have account ? login'}
            </button>
            </div>
        </div>
    )
}

export default Auth