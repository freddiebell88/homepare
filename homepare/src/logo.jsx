import { Group, Title, Text } from "@mantine/core"
import { IconHomeCheck } from "@tabler/icons-react"

export function Logo() {
    return (
        <Group align="left-start">
        <IconHomeCheck color="var(--mantine-color-dark-4)" size={48} />
        <Title c="var(--mantine-color-dark-4)" order={1} fw="900">Home<Text span c="#00A6BA" inherit>Pare</Text>
        </Title>
    </Group>
    )
}