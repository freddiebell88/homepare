import { useState } from "react";
import { useDisclosure } from "@mantine/hooks"
import { Input, CloseButton, PasswordInput, Stack, Button } from "@mantine/core"
import { IconAt } from "@tabler/icons-react";

export function Login() {
    const [value, setValue] = useState('Clear me');
    const [visible, {toggle}] = useDisclosure(false);

    return (
        <>
        <div className="w-full flex justify-center h-screen items-center">
        <div className="w-3/12">
        <h1>Login:</h1>
        <p>Username</p>
        <Input placeholder="Your Email" leftSection={<IconAt size={16} />} />
        <Stack>
            <PasswordInput
            label="Password"
            defaultValue={visible}
            onVisibilityChange={toggle}
            />
            
        <PasswordInput
        label="Confirm Password"
        defaultValue="secret"
        visible={visible}
        onVisibilityChange={toggle}
        />
        </Stack>
        <p>Don't have an account? Sign up!</p>
        <Button>Register</Button>
        </div>
        </div>
        </>
    )
}