import { TextInput, Button } from "@mantine/core"
import { Link } from "react-router-dom"


export function UserAccount() {
   return (
    <>
    <div className="w-full h-screen flex justify-center items-center">
    <div className="w-3/12"> 
    <h1>Your account details:</h1>
    <TextInput
    label="Update E-mail address"
    placeholder="E-mail address"
    />
    <TextInput
    label="Update Username:"
    placeholder="Username"
    />
    <TextInput
    label="Update Password:"
    placeholder="Password:"
    />
    <br></br>
    <Button>Save</Button>
    &nbsp;
    <Link to="/logout"><Button>Logout?</Button></Link>
    </div>
    </div>
    </>
   )
}