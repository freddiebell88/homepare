import { CollectionDetail } from './CollectionDetail'
import { ComparisonTable } from './comparisonTable'
import homeData from './data/homes.json'
import { Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DetailsCard } from './detailsCard';

export function UserCollections() {
    const thumbWidth = "100px";
    const thumbHeight = "100px";

    const [opened, { open, close }] = useDisclosure(false);


//TO DO

// ALTERNATE VIEWS
// if user has no collections
// return <h1>"You don't have any collections!"<br></br>Add one <a href={add a collection}>here!</a>"</h1>

//if user clicks 'see more'
//render collections detail

//Show only 6 listings in the collections scroll before the user has to click see more
//Possibly change 'see more' to 'see x number of listings'
// add a 3 dot menu right aligned on the same line as collection name that allows you to EDIT or DELETE the collection
//Add divider lines between collections

    return (
        <>
        <Modal opened={opened} onClose={close} centered>
            <DetailsCard />
        </Modal>
        <div className='collections-wrapper-in-user-collections'>
        Collection 1 Name
        <div className='userCollection'>
        {/* The name of the collection comes directly from the user */}
        <div onClick={open} className='listing-thumbnail'>
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
        
        <div onClick={open} className='listing-thumbnail'>
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

        </div>

        <p className='see-more-in-user-collections'>See More</p>
        {/* See more should pull up collection details */}
        </div>
        <hr class="rounded-divider-in-user-collections"></hr>
        
        {/* <CollectionDetail />
        <ComparisonTable /> */}
        </>
    )
}