import axios from "axios";
import { useEffect, useState } from "react";

export function Checklist ({token}) {
    const [preferences, setPreferences] = useState({
        bathrooms : 0,
        bedrooms : 0,
        garage : false ,
        hoa : false,
        yard : false
    });

    useEffect(() => {
    axios.get('https://homepare-backend.onrender.com/user-preference',{
        headers: {
          authorization: `x-access-token ${token}`
        }
      }).then((res) => {
        setPreferences(res.data)
        console.log(res.data)
      })}, [token])



    console.log('this is checklist')
    return(
        <>
        <h1>Checklist</h1>
        <h2>You are looking for:</h2>
        <h3>{`${preferences.bedrooms} Bedroom`}</h3>
        <h3>{`${preferences.bathrooms} Bathroom home`}</h3>
        <h3>{`Yard: ${preferences.yard}`}</h3>
        <h3>{`Garage: ${preferences.garage}`}</h3>
        <h3>{`HOA: ${preferences.hoa}`}</h3>
        {/* yard, garage, and HOA can disappear if user selects 'not sure' */}
        </>
    )
}