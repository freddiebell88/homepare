import { Questionnaire } from "./questionnaire";
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export function Register() {
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

    return (
        <>
        <div className="w-full h-screen flex items-center justify-center">
        <div className="w-3/12">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput 
            label="Username"
            placeholder="Create Username"
            {...form.getInputProps('username')}
            />
            <TextInput 
            label="Password"
            placeholder="Create Password"
            {...form.getInputProps('password')}
            />
            <TextInput 
            label="Email"
            placeholder="Enter your email address"
            {...form.getInputProps('email')}
            />
            <TextInput 
            label="First Name"
            placeholder="Enter your First Name"
            {...form.getInputProps('first_name')}
            />
            <TextInput 
            label="Last Name"
            placeholder="create last name"
            {...form.getInputProps('last_name')}
            />
        </form>
        <Button type="submit">Register</Button>
        {/* <Questionnaire /> */}
        </div>
        </div>
        </>
    )
}