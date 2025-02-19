'use client'
import { useState } from "react"
import RestaurantLogin from "../_components/restaurant/RestaurantLogin"
import RestaurantSignup from "../_components/restaurant/RestaurantSignup"
import RestaurantHeader from "../_components/restaurant/RestaurantHeader"


const Auth=()=>{
    const [login,setLogin]=useState(true)

    return(
        <div>
            <RestaurantHeader/>
            <div className="container">
            <h1>{login?'Restaurant Login':'Restaurant Signup'}</h1>
            {
                login?<RestaurantLogin />:<RestaurantSignup />
            }
            <button className="button-link" onClick={()=>setLogin(!login)}>
                {login?'Do not have account? Signup':'Already have account ? login'}
            </button>
    
            </div>
        </div>
    )
}

export default Auth