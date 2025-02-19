'use client'
import { useState } from "react"
import DeliveryLogin from "../_components/deliverypartner/DeliveryLogin"
import DeliverySignup from "../_components/deliverypartner/DeliverySignup"
import DeliveryHeader from "../_components/deliverypartner/DeliveryHeader"


const Auth = () => {
    const [login, setLogin] = useState(true)
    return (
        <div>
            <DeliveryHeader />
            <div className="container">
                <h1>{login ? 'Delivery Login' : 'Delivery Signup'}</h1>
                {
                    login ? <DeliveryLogin /> : <DeliverySignup />
                }
                <button className="button-link" onClick={() => setLogin(!login)}>
                    {login ? 'Do not have account? Signup' : 'Already have account ? login'}
                </button>

            </div>
        </div>
    )
}

export default Auth