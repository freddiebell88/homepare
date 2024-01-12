import { useState } from "react";
import homeData from "./data/homes.json";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { DetailsCard } from "./detailsCard";

export function ListingInput() {

    return (
        <>
        <h2>Input Your Listing Address</h2>
        <SearchBar />
        <Preview 
            thumbnail={homeData.value[0].Media[0].Thumbnail}
            streetAddress={homeData.value[0].UnparsedAddress}
        />
        {/* <SearchBarFilter /> */}
        {/* <div>{preview}</div> */}
        </>
    )
}

export function Preview( {thumbnail, streetAddress} ) {

    const previewWidth = "100px";
    const [opened, { open, close }] = useDisclosure(false);


    return (
        <>
        <Modal opened={opened} onClose={close} centered>
            <DetailsCard />
        </Modal>
        <div onClick={open} className="previewCard">
            <img src={thumbnail} alt="thumbnail photo of house" width={previewWidth}/>
            <p>{streetAddress}</p>
            <button>View Listing Details</button>
            <button>Add to My Listings</button>
        </div>
        </>
    )
}

const SearchBar = () => {
    const [input, setInput] = useState('');

    

    

    return (
        <form>
            <input
                type="search"
                placeholder="Input Listing"
                onChange={(e) => setInput(e.target.value)}
                value={input}
            />
            <button>Search</button>

        </form>
    )
}


