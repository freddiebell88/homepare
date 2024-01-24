import { Link } from "react-router-dom";
import { Container, Button } from "@mantine/core";
import { IconExclamationCircle, IconError404 } from "@tabler/icons-react";

export function NotFound() {
    return (

        <div className="w-full h-screen flex justify-center items-center">
        <div className="w-3/12">
            <Container>
            <IconExclamationCircle color="red" size={40}>
            </IconExclamationCircle>
            <h1>Uh oh! Page not found.</h1>
            <br></br>
            <p>It looks like the page you are looking for doesn't exist.</p>
            <br></br>
            <Link to='/'><Button>Go Home?</Button></Link>
            </Container>
        </div>
        </div>
    )
}