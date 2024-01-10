import { useState } from "react";
import homeData from "./data/homes.json";

const SearchBarFilter = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(homeData);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        filterData(value);
    };

    const filterData = (searchTerm) => {
        const filteredData = homeData.filter((item) => 
        item.name.toUpperCase().includes(searchTerm.toUpperCase())
        );
        setFilteredData(filteredData);
    };

    return (
        <div>
            <input 
                type="text"
                placeholder="Input Listing Address..."
                value={searchTerm}
                onChange={handleInputChange}
            />

            <div>
                {filteredData.map((item) => (
                    <li key={item.value}>{item.UnparsedAddress}</li>
                ))}
            </div>
        </div>
    )
}

export default SearchBarFilter

export function ListingInput() {
    return (
        <>
        <h1>Input Your Listing Address</h1>
        <SearchBarFilter />
        </>
    )
}