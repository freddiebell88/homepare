import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container, Title, Text, Group} from "@mantine/core"


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
        <Title ta="center" order={2} >You are looking for a home with:</Title>
        <br></br>
        <Text ta="center" fw={500} size="xl">{`${preferences.bedrooms} Bedrooms`}</Text>
        <Text ta="center" fw={500} size="xl">{`${preferences.bathrooms} Bathrooms`}</Text>
        <Text ta="center" fw={500} size="xl">{preferences.garage === true ? 'Yes' : 'No'} Garage</Text>
        <Text fw={500} ta="center" size="xl">{preferences.hoa === true ? 'Yes' : 'No'} HOA</Text>
        <br></br>
        <Group ta="center" justify="center"><Link to="/editChecklist"><Button size="md">Edit?</Button></Link></Group>
        </Container>
        </div>
        
        </>
    )
}

