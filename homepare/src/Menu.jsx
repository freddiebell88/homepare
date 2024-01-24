import { UserAccount } from "./UserAccount";
import { Checklist } from "./checklist";
import { useDisclosure } from '@mantine/hooks';
import { Burger, Text} from '@mantine/core';
import { IconHomePlus, IconHomeCheck, IconHomeCog, IconHomeHeart} from '@tabler/icons-react';
import { Menu as MantineMenu } from '@mantine/core';
import { Link } from "react-router-dom";

export function Menu({children}) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <>
        <MantineMenu width={200}>
        <MantineMenu.Target> 
        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
        </MantineMenu.Target>

        <MantineMenu.Dropdown>
            <Link to="/">
                <MantineMenu.Item leftSection={<IconHomeHeart size={25} />}>
                <Text size="md" fw={500}>My Dashboard</Text>
                </MantineMenu.Item>
                </Link>
            <Link to="/listingInput">
                <MantineMenu.Item leftSection={<IconHomePlus size={25} />}>
                <Text size="md" fw={500}>Add a Listing</Text>
                </MantineMenu.Item>
            </Link>
            <Link to="/checklist">
                <MantineMenu.Item leftSection={<IconHomeCheck size={25} />}>
                <Text size="md" fw={500}>Checklist</Text>
                </MantineMenu.Item>
                </Link>
            <Link to="/UserAccount">
                <MantineMenu.Item leftSection={<IconHomeCog size={25} />}>
                <Text size="md" fw={500}>My Account</Text>
                </MantineMenu.Item>
                </Link>
        </MantineMenu.Dropdown>
        </MantineMenu>
        {children}
        </>
    )
}

//   {/* <p>🍔 Menu:</p>
//         <p>Add Listing</p>
//         <ListingInput />
//         <p>Checklist</p> */}
//         {/* <Checklist /> */}
//         {/* <p>My Account</p> */}
//         {/* <UserAccount /> */}