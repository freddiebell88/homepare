import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container, Title, Text, Modal} from "@mantine/core"


export function Checklist ({token}) {
    const [errorMessage, setErrorMessage] = useState("")
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
      }).catch((err) => {
        return setErrorMessage(err.response.data.message)
     })}, [token])



    console.log('this is checklist')
    return(
        <>
        <div className="w-full h-screen flex justify-center items-center">
        <Container
        size="30rem"
        >
        { errorMessage && <Text c="red">{errorMessage}</Text> }
        <Title order={2} >You are looking for:</Title>
        <br></br>
        <Text size="lg">{`${preferences.bedrooms} Bedrooms`}</Text>
        <Text >{`${preferences.bathrooms} Bathrooms`}</Text>
        <Text >{`Garage: ${preferences.garage === true ? 'Yes' : 'No'}`}</Text>
        <Text >{`HOA: ${preferences.hoa === true ? 'Yes' : 'No'}`}</Text>
        <br></br>
        <Link to="/editChecklist"><Button size="md">Edit?</Button></Link>
        </Container>
        </div>
        
        </>
    )
}

