import { useState } from "react";
import homeData from "./data/homes.json";

export function ListingInput() {
    const preview = (
        <>
        <img /> 
        {/* src is media image from json - can pass that prop */}
        <p>Address</p>
        {/* address also from json */}
        </>
    )
    return (
        <>
        <h2>Input Your Listing Address</h2>
        <SearchBar />
        <Preview 
            thumbnail={homeData.value[0].Media[0].Thumbnail}
            streetAddress={homeData.value[0].UnparsedAddress}
        />
        {/* <SearchBarFilter /> */}
        <div>{preview}</div>
        </>
    )
}

export function Preview( {thumbnail, streetAddress} ) {

    const previewWidth = "100px";

    return (
        <div className="previewCard">
            <img src={thumbnail} alt="thumbnail photo of house" width={previewWidth}/>
            <p>{streetAddress}</p>
            <button>Add to My Listings</button>
        </div>
    )
}

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');

    // const streetAddress = {homeData.value[0].UnparsedAddress}

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        homeData.filter((listing) => {
            return listing.UnparsedAddress.match(searchInput);
        })
    }

    return (
        <form>
            <input
                type="search"
                placeholder="Input Listing"
                onChange={handleChange}
                value={searchInput}
            />
            <button>Search</button>

        </form>
    )
}

export default SearchBar
// const SearchBarFilter = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredData, setFilteredData] = useState(homeData);

//     const handleInputChange = (event) => {
//         const { value } = event.target;
//         setSearchTerm(value);
//         filterData(value);
//     };

//     const filterData = (searchTerm) => {
//         const filteredData = homeData.filter((item) => 
//         item.name.toUpperCase().includes(searchTerm.toUpperCase())
//         );
//         setFilteredData(filteredData);
//     };

    
//     return (
//         <div>
//             <input 
//                 type="text"
//                 placeholder="Input Listing Address..."
//                 value={searchTerm}
//                 onChange={handleInputChange}
//             />

//             <div>
//                 {filteredData.map((item) => (
//                     <li key={item.value}>{item.UnparsedAddress}</li>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default SearchBarFilter
