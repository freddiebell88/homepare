import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, Text } from "@mantine/core";
import { useState } from "react";


export function Logout({ token, username, setAuth }) {
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const handleClick = () => {
        setAuth("", "");
        axios.get('https://homepare-backend.onrender.com/logout',
        {
            headers:{
                authorization: `x-access-token ${token}`,
            }
        })
        .then(() => {
            navigate('/login')
        }).catch((err) => {
            return setErrorMessage(err.response.data.message)
         })
    }

    return (
        <>
        { errorMessage && <Text c="red" >{errorMessage}</Text>}
        <div className="w-full h-screen flex justify-center items-center">
        <div className="w-3/5">
        <Container>
            <h1>Are you sure you want to log out?</h1>
            <br></br>
            <Button type="submit" onClick={handleClick}>Yes</Button>
            &nbsp;
            <Link to="/user-account"><Button type="submit">No</Button></Link> 
        </Container>
        </div>
        </div>
        </>
    )
}