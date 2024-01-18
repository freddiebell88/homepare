import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { matchesField, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks"
import { Input, TextInput, CloseButton, PasswordInput, Stack, Button, Box } from "@mantine/core"
import { IconMail, IconUserCircle } from "@tabler/icons-react";

export function Login({ setAuth }) {
    const [value, setValue] = useState('Clear me');
    const [visible, {toggle}] = useDisclosure(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email:''
        },
    validate: {
        confirmPassword: matchesField(
            'password',
            'Passwords are not the same'
        )
    }
    }

    )

    const handleSubmit = (values, token) => {
        const { username, password, email } = values; 
        console.log('submitting form')
        console.log(username)
        console.log(password)
        console.log(`${token}`)
        console.log(email);
        axios
            .post('https://homepare-backend.onrender.com/login', {
                "username": username,
                "password": password,
            })
            .then((res) => {
                setAuth(username, res.data.token)
                navigate('/')
            })
            .catch((err) => setError(err.response.data.non_field_errors[0]))
    }

    return (
        <>
        <div className="w-full flex justify-center h-screen items-center">
        <div className="w-3/12">
        <h1>Login:</h1>
        <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
            label="Username"
            placeholder="Your Username"
            leftSection={<IconUserCircle size={16} />}
            {...form.getInputProps('username')}
            />
            <TextInput
            label="Email"
            placeholder="Your Email"
            leftSection={<IconMail size={16}/>}
            {...form.getInputProps('email')}
            />
        <Stack>
            <PasswordInput
            label="Password"
            defaultValue={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps('password')}
            />
            
        <PasswordInput
        label="Confirm Password"
        defaultValue="secret"
        visible={visible}
        onVisibilityChange={toggle}
        {...form.getInputProps('confirmPassword')}
        />
        <Button type="submit">Login</Button>
        </Stack>
        &nbsp;
        &nbsp;
        &nbsp;
        <p>Don't have an account? Sign up!</p>
        <Link to="/register"><Button>Register</Button></Link>
        </form>
        </Box>
        </div>
        </div>
        </>
    )
}