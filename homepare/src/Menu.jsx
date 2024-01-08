import { UserAccount } from "./UserAccount";
import { Checklist } from "./checklist";
import { ListingInput } from "./listingInput";

export function Menu() {
    return (
        <>
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