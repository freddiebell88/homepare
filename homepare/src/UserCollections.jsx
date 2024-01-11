import { CollectionDetail } from './CollectionDetail'
import { ComparisonTable } from './comparisonTable'
import homeData from './data/homes.json'

export function UserCollections() {
    const thumbWidth = "100px";
    const thumbHeight = "100px";

    return (
        <>
        <h1> My Collections </h1>
        Collection Name
        <div className='userCollection'>
        <div className='listing-thumbnail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        </div>
        
        <div className='listing-thumbnail'>
        <img src={homeData.value[1].Media[2].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[1].UnparsedAddress}</p>
        </div>

        <div className='listing-thumbnail'>
        <img src={homeData.value[2].Media[5].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[2].UnparsedAddress}</p>
        </div>

        <div className='listing-thumbnail'>
        <img src={homeData.value[2].Media[7].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[2].UnparsedAddress}</p>
        </div>
        </div>
        {/* <CollectionDetail />
        <ComparisonTable /> */}
        </>
    )
}