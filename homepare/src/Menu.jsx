import { UserAccount } from "./UserAccount";
import { Checklist } from "./checklist";
import { ListingInput } from "./listingInput";
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';


export function Menu() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <>
        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />;
        <p>🍔 Menu:</p>
        <p>Add Listing</p>
        <ListingInput />
        <p>Checklist</p>
        <Checklist />
        <p>My Account</p>
        <UserAccount />
        </>
    )
}