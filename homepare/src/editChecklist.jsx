import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Radio, Group } from "@mantine/core";
import { useForm } from "@mantine/form";


export function EditChecklist({ token }) {

    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [preferences, setPreferences] = useState({
        bathrooms : 0,
        bedrooms : 0,
        garage : false ,
        hoa : false,
        yard : false
    });

    const form = useForm({ 
        initialValues: {...preferences},
    }
    )

    useEffect(() => {
    axios.get('https://homepare-backend.onrender.com/user-preference',{
        headers: {
          authorization: `x-access-token ${token}`
        }
      }).then((res) => {
        setPreferences({
            bathrooms : `${res.data.bathrooms}`,
            bedrooms :`${res.data.bedrooms}`,
            garage : `${res.data.garage}` ,
            hoa : `${res.data.hoa}` ,
            yard : `${res.data.yard}` ,
        })
        form.setValues({
            bathrooms : `${res.data.bathrooms}`,
            bedrooms :`${res.data.bedrooms}`,
            garage : `${res.data.garage}` ,
            hoa : `${res.data.hoa}` ,
            yard : `${res.data.yard}` ,
        })
        console.log(res.data)
      })}, [token])


 

    const handleSubmit = (values) => {
        const { bathrooms, bedrooms, garage, hoa, yard } = values;
        console.log('updating user preferences')
        console.log(`${token}`)
        console.log(bathrooms)
        console.log(bedrooms)
        console.log(hoa)
        console.log(yard)
        console.log(garage)
        axios.put('https://homepare-backend.onrender.com/user-preference', {
            "bathrooms": bathrooms,
            "bedrooms": bedrooms,
            "hoa": hoa,
            "yard": yard,
            "garage": garage,
        }, {
            headers: {
               authorization: `x-access-token ${token}`
            }
        }).then((res) => {
            navigate('/checklist')
    }).catch((err) => setError(err.response.data.non_field_errors[0]))
    
}

console.log(form.initialValues)

    return (
        <>
        <Container
        size="30rem">
        <h1>Edit your checklist:</h1>
        <br></br>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Radio.Group
            defaultValue={preferences.bedrooms}
            name="bedrooms"
            label="How many bedrooms are you looking for?"
            {...form.getInputProps('bedrooms')}
            >
          <Group mt="xs">
            <Radio value="1" label="1" />
            <Radio value="2" label="2" />
            <Radio value="3" label="3" />
            <Radio value="4" label="4" />
          </Group>
        </Radio.Group>
        <br></br>
        <Radio.Group
            defaultValue={preferences.bathrooms}
            name="bathrooms"
            label="How many bathrooms are you looking for?"
            {...form.getInputProps('bathrooms')}
            >
          <Group mt="xs">
            <Radio value="1" label="1" />
            <Radio value="2" label="2" />
            <Radio value="3" label="3" />
            <Radio value="4" label="4" />
          </Group>
        </Radio.Group>
        <br></br>
        <Radio.Group
            name="yard"
            label="Are you looking for a yard?"
            {...form.getInputProps('yard')}
            >
          <Group mt="xs">
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Group>
        </Radio.Group>
        <br></br>
        <Radio.Group
            name="garage"
            label="Are you looking for a Garage?"
            {...form.getInputProps('garage')}
            >
          <Group mt="xs">
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Group>
        </Radio.Group>
        <br></br>
        <Radio.Group
            name="hoa"
            label="Are you looking for an HOA?"
            {...form.getInputProps('hoa')}
            >
          <Group mt="xs">
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Group>
        </Radio.Group>
        <br></br>
        <Button type="submit" onClick={handleSubmit}>Update</Button>
        </form>
        </Container>
        </>
    )
    }