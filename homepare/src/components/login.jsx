import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { matchesField, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks"
import { TextInput, PasswordInput, Stack, Button, Box, Title, Text } from "@mantine/core"
import { IconUserCircle } from "@tabler/icons-react";

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
        axios
            .post('https://homepare-backend.onrender.com/login', {
                "username": username,
                "password": password,
            })
            .then((res) => {
                setAuth(username, res.data.token)
                navigate('/')
            })
            .catch((err) => setError(err.response.data.message))
    }

    return (
        <>
        { error && <Text c="red">{error}</Text>}
        <div className="w-screen flex justify-center h-screen items-center">
        <div className="w-3/5">
        <Title order={2}>Login</Title>
        <br></br>
        <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
            label="Username"
            placeholder="Your Username"
            leftSection={<IconUserCircle size={16} />}
            {...form.getInputProps('username')}
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