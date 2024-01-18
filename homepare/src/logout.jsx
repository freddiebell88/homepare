import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, Container } from "@mantine/core";

export function Logout({token}) {

    console.log({token})

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