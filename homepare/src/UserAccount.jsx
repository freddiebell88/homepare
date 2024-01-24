import { TextInput, PasswordInput, Button, Group, Box, Text } from '@mantine/core';
import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from '@mantine/form';


export function UserAccount({ token }) {
   const [userProfile, setUserProfile] = useState([]);
   const [savedData, setSavedData] = useState([]);
   const [message, setMessage] = useState("");

   const form = useForm({
      initialValues: {
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      },

      validate: {

      },
  })

   // Get existing user info to populate page
   useEffect(() => {
      axios.get("https://homepare-backend.onrender.com/user", {
         headers: {
            authorization: `x-access-token ${token}`
         }}).then((res) => {
            console.log(res.data.user[0])
            setUserProfile(res.data.user[0])
      }).catch((err) => {
         return setMessage(err.response.data.message)
      })}, [token]);

      const saveUpdates = (values) => {
         const { username, password, email } = values;
         axios.put("https://homepare-backend.onrender.com/user", {
            "username": username,
            "password": password,
            "email": email
         }, {
            headers: {
               authorization: `x-access-token ${token}`
            }
         }).then((res) => {
            setMessage("Save Successful!")
         }).catch((err) => {
            return setMessage(err.response.data.message)
         })
         
      }

   return (
    <>
    <div className="w-full h-screen flex justify-center items-center">
    <div className="w-3/12">
      <Text c="red">{ message }</Text>
    <h1>Your account details:</h1>
    <form onSubmit={form.onSubmit((values) => saveUpdates(values))}>
      <TextInput
      label="Update E-mail address"
      placeholder={userProfile.email} 
      {...form.getInputProps('email')}
      />
      <TextInput
      label="Update Username:"
      placeholder={userProfile.username}
      {...form.getInputProps('username')}
      />
      <TextInput
      label="Update Password:"
      placeholder="Password:"
      />
      <br></br>
      <Button type='submit'>Save</Button>
    </form>
    &nbsp;
    <Link to="/logout"><Button>Logout?</Button></Link>
    </div>
    </div>
    </>
   )
}