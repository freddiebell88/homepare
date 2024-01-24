import axios from "axios";
import { Route, useNavigate, Link } from "react-router-dom";
import { Questionnaire } from "./questionnaire";
import { TextInput, PasswordInput, Button, Title, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconUserCircle, IconAsterisk } from "@tabler/icons-react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export function Register({setAuth}) {
    const [value, setValue] = useState('');
    const [visible, {toggle}] = useDisclosure(false)
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
        },

        validate: {

        },
    })

    const handleSubmit = (values) => {
        const { username, password, email, first_name, last_name } = values;
        console.log(username);
        console.log(password);
        console.log(email);
        console.log(first_name);
        console.log(last_name);
        axios.post('https://homepare-backend.onrender.com/register', {
            "username": username,
            "password": password,
            "email": email,
            "first_name": first_name,
            "last_name": last_name
        }).catch((err) => {
            console.log("this is the message", err);
            setError(err.response.data.non_field_errors[0])}).then((res) => {
        return axios
        .post('https://homepare-backend.onrender.com/login', {
            "username": username,
            "password": password,
        })}).then((res) => {
            console.log(res);
            setAuth(username, res.data.token)
            navigate('/questionnaire')
        }).catch((err) => {
            return setError(err.response.data.message)
         })

    };

    return (
        <>
        { error && <Text >{error}</Text>}
        <div className="w-full h-screen flex items-center justify-center">
        <div className="w-3/12">
        <Title order={2}>Sign up below:</Title>
        <br></br>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput 
            withAsterisk
            label="Username"
            placeholder="Create Username"
            leftSection={<IconUserCircle size={16}/>}
            {...form.getInputProps('username')}
            />
            <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Create Password"
            defaultValue={visible}
            onVisibilityChange={toggle}
            leftSection={<IconAsterisk size={16}/>}
            {...form.getInputProps('password')}
            />
            <TextInput 
            withAsterisk
            label="Email"
            placeholder="Enter your email address"
            leftSection={<IconAt size={16}/>}
            {...form.getInputProps('email')}
            />
            <TextInput 
            label="First Name"
            placeholder="Enter your first name"
            {...form.getInputProps('first_name')}
            />
            <TextInput 
            label="Last Name"
            placeholder="Enter your last name"
            {...form.getInputProps('last_name')}
            />
        <br></br>
        <Button type="submit">Register</Button>
        </form>
        {/* <Questionnaire /> */}
        </div>
        </div>
        </>
    )
}