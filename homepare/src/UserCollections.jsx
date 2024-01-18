import { CollectionDetail } from './CollectionDetail'
import { ComparisonTable } from './comparisonTable'
import homeData from './data/homes.json'
import { Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DetailsCard } from './detailsCard';
import { useState } from 'react';
import axios from 'axios';

export function UserCollections() {
    const thumbWidth = "100px";
    const thumbHeight = "100px";

    const [opened, { open, close }] = useDisclosure(false);

    const handleNewCollectionClick = () => {
        console.log("new collection button clicked");
        <Modal opened={opened} onClose={close} centered>
            <NewCollection />
        </Modal>
        
    }
//TO DO

// ALTERNATE VIEWS
// if user has no collections
// return <h1>"You don't have any collections!"<br></br>Add one <a href={add a collection}>here!</a>"</h1>

//if user clicks 'see more'
//render collections detail

//Show only 6 listings in the collections scroll before the user has to click see more
//Possibly change 'see more' to 'see x number of listings'
// add a 3 dot menu right aligned on the same line as collection name that allows you to EDIT or DELETE the collection

    return (
        <>
        <Modal opened={opened} onClose={close} centered>
            <DetailsCard />
        </Modal>
        <div className='collections-wrapper-in-user-collections'>
        Collection 1 Name
        <div className='userCollection'>
        {/* The name of the collection comes directly from the user */}
        <div onClick={open} className='listing-thumbnail-in-user-collections'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p className='thumbnail-text-in-user-collections'>{homeData.value[0].UnparsedAddress}</p>
        </div>
        
        <div onClick={open} className='listing-thumbnail-in-user-collections'>
        <img src={homeData.value[1].Media[2].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p className='thumbnail-text-in-user-collections'>{homeData.value[1].UnparsedAddress}</p>
        </div>

        <div onClick={open} className='listing-thumbnail-in-user-collections'>
        <img src={homeData.value[2].Media[5].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p className='thumbnail-text-in-user-collections'>{homeData.value[2].UnparsedAddress}</p>
        </div>

        <div onClick={open} className='listing-thumbnail-in-user-collections'>
        <img src={homeData.value[2].Media[7].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p className='thumbnail-text-in-user-collections'>{homeData.value[2].UnparsedAddress}</p>
        </div>
        
        <div onClick={open} className='listing-thumbnail-in-user-collections'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p className='thumbnail-text-in-user-collections'>{homeData.value[0].UnparsedAddress}</p>
        </div>
        
        <div onClick={open} className='listing-thumbnail-in-user-collections'>
        <img src={homeData.value[1].Media[2].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p className='thumbnail-text-in-user-collections'>{homeData.value[1].UnparsedAddress}</p>
        </div>

        <div onClick={open} className='listing-thumbnail-in-user-collections'>
        <img src={homeData.value[2].Media[5].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p className='thumbnail-text-in-user-collections'>{homeData.value[2].UnparsedAddress}</p>
        </div>

        <div onClick={open} className='listing-thumbnail-in-user-collections'>
        <img src={homeData.value[2].Media[7].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p className='thumbnail-text-in-user-collections'>{homeData.value[2].UnparsedAddress}</p>
        </div>

        </div>

        <p className='see-more-in-user-collections'>See More</p>
        {/* See more should pull up collection details */}
        </div>
        <hr className="rounded-divider-in-user-collections"></hr>
        
        <div className='collections-wrapper-in-user-collections'>
            <button onClick={handleNewCollectionClick} >New Collection</button>
        </div>
        {/* <CollectionDetail />
        <ComparisonTable /> */}
        <NewCollection />
        </>
    )
}

export function NewCollection() {
    const [collectionInput, setCollectionInput] = useState("")

    const handleSaveCollection = (e) => {
        console.log("save button clicked")
        axios.post('https://homepare-backend.onrender.com/collections', {
            search_name: collectionInput
        }, {
            headers: {
                authorization: "x-access-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld3VzZXI5IiwiaWF0IjoxNzA1NTk1NDY5LCJleHAiOjE3MDU2ODE4Njl9.S1kPErLtGajmty_NF5sOUEle56onmCjpZ9svk-K1eOc"
            }
        })
    }

    return (
        <>
        <form onSubmit={handleSaveCollection} >
            <input 
                type='text'
                placeholder='Name your new collection'
                onChange={(e)=>setCollectionInput(e.target.value)}
                value={collectionInput}
            />
            <button type="submit">Save</button>
        </form>
        </>
    )
}