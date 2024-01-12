import { useDisclosure } from "@mantine/hooks"
import { PasswordInput, Stack } from "@mantine/core"

export function Login() {
    const [visible, {toggle}] = useDisclosure(false);

    return (
        <>
        <h1>Login:</h1>
        <p>Username goes here</p>
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
        </>
    )
}