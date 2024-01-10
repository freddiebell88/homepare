import homeData from "./data/homes.json";

export function ComparisonTable () {
    return (
        <>
        <table>
            <caption>Compare Listings</caption>
            <tbody>
            <tr>
                <th scope="col">Checklist</th>
                <th scope="col">{homeData.value[0].UnparsedAddress}</th>
                <th scope="col">{homeData.value[1].UnparsedAddress}</th>
                <th scope="col">{homeData.value[2].UnparsedAddress}</th>
            </tr>
            <tr>
                <th scope="col">List Price</th>
                <td>${homeData.value[0].ListPrice}</td>
                <td>${homeData.value[1].ListPrice}</td>
                <td>${homeData.value[2].ListPrice}</td>
                
            </tr>
            <tr>
                <th scope="row">Bedrooms</th>
                <td>{homeData.value[0].BedroomsTotal}</td>
                <td>{homeData.value[1].BedroomsTotal}</td>
                <td>{homeData.value[2].BedroomsTotal}</td>
            </tr>
            <tr>
                <th scope="row">Bathrooms</th>
                <td>{homeData.value[0].BathroomsTotalInteger}</td>
                <td>{homeData.value[1].BathroomsTotalInteger}</td>
                <td>{homeData.value[2].BathroomsTotalInteger}</td>
            </tr>
            <tr>
                <th scope="row">Yard</th>
            </tr>
            <tr>
                <th scope="row">HOA</th>
            </tr>
            <tr>
                <th scope="row">Garage</th>
            </tr>
            <tr>
                <th scope="row">SQ Ft</th>
                <td>sqFootage={homeData.value[0].LivingArea}</td>
                <td>sqFootage={homeData.value[1].LivingArea}</td>
                <td>sqFootage={homeData.value[2].LivingArea}</td>
            </tr>
            </tbody>
        </table>
        </>
    )
}