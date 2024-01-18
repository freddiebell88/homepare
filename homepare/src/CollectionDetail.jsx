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

    const [compareChecked, setCompareChecked] = useState(false)
    const [thumbailCompareChecked, setThumbailCompareChecked] = useState(false)
    const [opened, { open, close }] = useDisclosure(false);

    const handleCheckChange = () => {
        setCompareChecked(!compareChecked)
        //when the main compare button is clicked, disable the thumbnail details pop out
    }

    const handleThumbnailCheckChange = () => {
        setThumbailCompareChecked(!thumbailCompareChecked)
    }

    return (
        <>
        <p>This is the collection detail page, cards containing house image thumbnail and address will be mapped out here</p>
        <h1> Collection Title </h1>
        <input 
        type="checkbox"
        checked={compareChecked}
        onChange={handleCheckChange}
        /><label>Compare?</label>
        <Modal opened={opened} onClose={close} centered>
            <DetailsCard />
        </Modal>
        
        <div className='thumnail-grid-in-collections-detail'>
        <div  onClick={open} className='listing-thumbnail-in-collections-detail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        <input 
        type="checkbox"
        checked={thumbailCompareChecked}
        onChange={handleThumbnailCheckChange}
        /><label>Compare</label>
        </div>
        
        <div  onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        <input 
        type="checkbox"
        checked={thumbailCompareChecked}
        onChange={handleThumbnailCheckChange}
        /><label>Compare</label>
        </div>
        <div  onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        <input 
        type="checkbox"
        checked={thumbailCompareChecked}
        onChange={handleThumbnailCheckChange}
        /><label>Compare</label>
        </div>
        <div  onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        <input 
        type="checkbox"
        checked={thumbailCompareChecked}
        onChange={handleThumbnailCheckChange}
        /><label>Compare</label>
        </div>
        </div>
        </>
    )
}
