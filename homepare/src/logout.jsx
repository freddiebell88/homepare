import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, Flex } from "@mantine/core";


export function Logout({ token, setAuth, username }) {
    const navigate = useNavigate()
    console.log({token})

    const handleClick = () => {
        axios.post('https://homepare-backend.onrender.com/logout',
        {
            headers:{
                authorization: "x-access token",
            }
        })
        .then(() => {
            console.log("Logged out")
        })
    }

    return (
        <>
        <Container>
            <h1>Are you sure you want to log out?</h1>
            <br></br>
            <Button type="submit">Yes</Button>
            &nbsp;
            <Link to="/UserAccount"><Button type="submit">No</Button></Link> 
        </Container>
        </>
    )
}