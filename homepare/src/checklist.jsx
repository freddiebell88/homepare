import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container } from "@mantine/core"

export function Checklist ({token}) {
    const [preferences, setPreferences] = useState({
        bathrooms : 0,
        bedrooms : 0,
        garage : false ,
        hoa : false,
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
        <Container
        size="30rem"
        >
        <h1>Checklist</h1>
        <h2>You are looking for:</h2>
        <h3>{`${preferences.bedrooms} Bedrooms`}</h3>
        <h3>{`${preferences.bathrooms} Bathrooms`}</h3>
        <h3>{`Garage: ${preferences.garage === true ? 'Yes' : 'No'}`}</h3>
        <h3>{`HOA: ${preferences.hoa === true ? 'Yes' : 'No'}`}</h3>
        &nbsp;
        <Link to="/editChecklist"><Button>Edit?</Button></Link>
        </Container>
        </>
    )
}

