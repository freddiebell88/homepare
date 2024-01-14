import { useState, useEffect } from "react";
import axios from "axios";
import homeData from "./data/homes.json";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { DetailsCard } from "./detailsCard";

export function ListingInput() {

    return (
        <>
        <h2>Input Your Listing Address</h2>
        <SearchBar />
        {/* <Preview 
            thumbnail={homeData.value[0].Media[0].Thumbnail}
            streetAddress={homeData.value[0].UnparsedAddress}
        /> */}
        {/* <SearchBarFilter /> */}
        {/* <div>{preview}</div> */}
        </>
    )
}

export function Preview( { address, previewImage} ) {

    const previewWidth = "100px";
    const [opened, { open, close }] = useDisclosure(false);


    return (
        <>
        <Modal opened={opened} onClose={close} centered>
            <DetailsCard />
        </Modal>
        <div onClick={open} className="previewCard">
        <img src={previewImage}/>
        <h3>{address}</h3>
            <button>View Listing Details</button>
            <button>Add to My Listings</button>
        </div>
        </>
    )
}

const SearchBar = () => {
    const [input, setInput] = useState('');
    const [listingList, setListingList] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        axios.get('https://homepare-backend.onrender.com/homes').then((response)=>{setListingList(response.data.homes)})
    },[])

    // setListingList(response.data.results)

    return (
        <form>
            <input
                type="search"
                placeholder="Input Listing"
                onChange={(e)=>setInput(e.target.value)}
                value={input}
            />
            <button>Look Up</button>
            <h2>Results:</h2>
            {listingList.filter((listing) => {
                if(input===""){
                    return listing
                 } else if (listing.address.toLowerCase().includes(input.toLowerCase())){
                    return listing
                    }
                    })
                .map((listing) => {
                    return (
                    <>
                    {/* <Modal opened={opened} onClose={close} centered>
                    <DetailsCard />
                    </Modal> */}
                    <Preview 
                        key={listing._id}
                        address={listing.address}
                        previewImage={listing.images[0].Thumbnail}/>
                    {/* <div key={listing._id} onClick={open}>
                        <img src={listing.images[0].Thumbnail}/>
                        <h3>{listing.address}</h3>
                    </div> */}
                    </>
                    )
            })}

        </form>
    )
}

