import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Radio, Group, Title, Text } from "@mantine/core";
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
        })
        form.setValues({
            bathrooms : `${res.data.bathrooms}`,
            bedrooms :`${res.data.bedrooms}`,
            garage : `${res.data.garage}` ,
            hoa : `${res.data.hoa}` ,
        })
        console.log(res.data)
      }).catch((err) => {
        return setError(err.response.data.message)
     })}, [token])


 

    const handleSubmit = (values) => {
        const { bathrooms, bedrooms, garage, hoa } = values;
        console.log('updating user preferences')
        console.log(`${token}`)
        console.log(bathrooms)
        console.log(bedrooms)
        console.log(hoa)
        console.log(garage)
        axios.put('https://homepare-backend.onrender.com/user-preference', {
            "bathrooms": bathrooms,
            "bedrooms": bedrooms,
            "hoa": hoa,
            "garage": garage,
        }, {
            headers: {
               authorization: `x-access-token ${token}`
            }
        }).then((res) => {
            navigate('/checklist')
    }).catch((err) => {
      return setError(err.response.data.message)
   })
    
}

console.log(form.initialValues)

    return (
        <>
        { error && <Text c="red" >{error}</Text>}
        <Container
        size="30rem">
        <Title order={2}>Edit your checklist:</Title>
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
            name="garage"
            label="Do you want a home with or without a garage?"
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
            label="Do you want a home with or without an HOA (Home Owner's Association)?"
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