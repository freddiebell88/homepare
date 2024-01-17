import { ListingDetails } from './ListingDetails'
import { DetailsCard } from './detailsCard'
import { ListingInput } from './listingInput'
import homeData from './data/homes.json'
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

export function CollectionDetail() {
    const thumbWidth = "100px";
    const thumbHeight = "100px";


    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
        <p>This is the collection detail page, cards containing house image thumbnail and address will be mapped out here</p>
        <h1> My Listings </h1>
{/* listing thumbnail could be a component wrapped in a context provider? */}
        <Modal opened={opened} onClose={close} centered>
            <DetailsCard />
        </Modal>
        
        <div  onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        </div>
        
        
        
        
        <div onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[1].Media[2].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[1].UnparsedAddress}</p>
        </div>

        <div onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[2].Media[5].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[2].UnparsedAddress}</p>
        </div>

        <div onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[2].Media[7].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[2].UnparsedAddress}</p>
        </div>
        
        </>
    )
}
