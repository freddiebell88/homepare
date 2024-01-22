import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, Flex } from "@mantine/core";


export function Logout({ token, username, setAuth }) {

    const navigate = useNavigate()
    console.log({token})

    const handleClick = () => {
        axios.get('https://homepare-backend.onrender.com/logout',
        {
            headers:{
                authorization: `x-access-token ${token}`,
            }
        })
        .then(() => {
            setAuth("", "")
            console.log("Logged out")
            navigate('/login')
        })
    }

    return (
        <>
        <Container>
            <h1>Are you sure you want to log out?</h1>
            <br></br>
            <Button type="submit" onClick={handleClick}>Yes</Button>
            &nbsp;
            <Link to="/UserAccount"><Button type="submit">No</Button></Link> 
        </Container>
        </>
    )
}