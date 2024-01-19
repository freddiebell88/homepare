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
    const [listingCheckBoxes, setlistingCheckBoxes] = useState(new Array(4).fill(false))
    //the value inside new Array is hardcoded for demo, it should be updated to what the length of listings in the collection
    const [selectedThumbnails, setSelectedThumbnails] = useState([])
    const [opened, { open, close }] = useDisclosure(false);

    const handleCheckChange = () => {
        setCompareChecked(!compareChecked)
    }

    const handleThumbnailCheckOnChange = (position) => {
        const updatedListingCheckBoxes = listingCheckBoxes.map((listing, index) =>
        index === position ? !listing : listing )

        setlistingCheckBoxes(updatedListingCheckBoxes)
        setSelectedThumbnails()
        console.log('selectedThumbnails', selectedThumbnails)


    }

    const previewSelectedThumbnails = () => {
        //when the are clicked/checked
        //our selected thumbnails should go up into the
        //new selected thumbnails array
        //and be shown as in the size auto modal
    }

    const handleCompareClick = () => {
        console.log('compare click')
        //after checking which listings they want to compare
        //user hits the compare button (ideally on the preview)
        //and a full screen modal pops out
        //with the comparison table
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
        {!compareChecked &&
        <Modal opened={opened} onClose={close} centered>
            <DetailsCard />
        </Modal>}
        
        <div className='thumnail-grid-in-collections-detail'>
        <div  onClick={open} className='listing-thumbnail-in-collections-detail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        {compareChecked === true && <><input 
        type="checkbox"
        checked={listingCheckBoxes[0]}
        onChange={() => handleThumbnailCheckOnChange(0)}
        /><label>Compare</label></>}
        </div>

        <div  onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        {compareChecked === true && <><input 
        type="checkbox"
        checked={listingCheckBoxes[1]}
        onChange={() => handleThumbnailCheckOnChange(1)}
        /><label>Compare</label></>}
        </div>

        <div  onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        {compareChecked === true && <><input 
        type="checkbox"
        checked={listingCheckBoxes[2]}
        onChange={() => handleThumbnailCheckOnChange(2)}
        /><label>Compare</label></>}
        </div>

        <div  onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        {compareChecked === true && <><input 
        type="checkbox"
        checked={listingCheckBoxes[3]}
        onChange={() => handleThumbnailCheckOnChange(3)}
        /><label>Compare</label></>}
        </div>
        </div>
        </>
    )
}
