import { UserAccount } from "./UserAccount";
import { Checklist } from "./checklist";
import { ListingInput } from "./listingInput";
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff, IconFolderHeart, IconHeartCheck} from '@tabler/icons-react';
import { Menu as MantineMenu } from '@mantine/core';
import { Link } from "react-router-dom";

export function Menu() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <>
        <MantineMenu width={200}>
        <MantineMenu.Target> 
        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
        </MantineMenu.Target>

        <MantineMenu.Dropdown>
            <MantineMenu.Item>
                <Link to="listingInput"><IconHome2/> Add a Listing</Link></MantineMenu.Item>
            <MantineMenu.Item>
                <Link to="dashboard"><IconFolderHeart/> My Dashboard</Link></MantineMenu.Item>
            <MantineMenu.Item>
                <Link to="checklist"><IconHeartCheck/> Checklist</Link></MantineMenu.Item>
        </MantineMenu.Dropdown>
        </MantineMenu>
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