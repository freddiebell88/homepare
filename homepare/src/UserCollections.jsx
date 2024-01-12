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

    return (
        <>
        <h1> My Collections </h1>
        <Modal opened={opened} onClose={close} centered>
            <DetailsCard />
        </Modal>
        Collection 1 Name
        {/* The name of the collection comes directly from the user */}
        <div className='userCollection'>
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

        <p>See more</p>
        {/* See more should take us to collection details */}

        Collection 2 Name
        <div className='userCollection'>
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
        
        <p>See more</p>
        {/* <CollectionDetail />
        <ComparisonTable /> */}
        </>
    )
}