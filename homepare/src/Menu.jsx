import { UserAccount } from "./UserAccount";
import { Checklist } from "./checklist";
import { ListingInput } from "./listingInput";
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff, IconFolderHeart, IconHeartCheck, IconUserCircle} from '@tabler/icons-react';
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
            <Link to="/listingInput"><MantineMenu.Item>
                <IconHome2/> Add a Listing </MantineMenu.Item></Link>
            <Link to="/"><MantineMenu.Item>
                <IconFolderHeart/> My Dashboard</MantineMenu.Item></Link>
            <Link to="/checklist"> <MantineMenu.Item>
                <IconHeartCheck/> Checklist</MantineMenu.Item></Link>
            <Link to="/UserAccount"><MantineMenu.Item>
                <IconUserCircle/> My Account</MantineMenu.Item></Link>
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