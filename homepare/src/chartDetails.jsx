import { useState } from "react";
import { Container } from "@mantine/core";

//chartDetails compares the data from the API against the user questionnaire data

export function ChartDetails() {
    const [bedroom, setBedroom] = useState('');
    const [bathroom, setBathroom] = useState('');
    const [garage, setGarage] = useState(null);
    const [yard, setYard] = useState(null);
    const [hoa, setHoa] = usestate(null)

    return (
        <Container>
            <p># of Bedrooms</p>
            <p># of Bathrooms</p>

        </Container>
    )
}