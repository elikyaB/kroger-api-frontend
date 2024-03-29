// import { get } from "mongoose";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Logo from "../components/Logo";

const Login = (props) => {
    let navigate = useNavigate()
    
    const URL = props.backend+'/user'
    const getUser = async (account) => {
        // make the post request to our API
        await fetch(URL+'/login', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "username": account.username,
                "password": account.password
            }
        }).then(function(response) {
            return response.json()
        }).then(function(data) {
            // console.log(data)
            props.getAuth(data)
        })
    }

    //state to hold form data
    const [newForm, setNewForm] = useState({
        username: "",
        password: ""
    })

    //handleChange function to sync input with state 
    const handleChange = (event) =>{
        // make a copy of state
        const newState = {...newForm}
        // update the newState
        newState[event.target.name] = event.target.value
        // update the state
        setNewForm(newState)
    }

    // handleSubmit function for when form is submitted
    const handleSubmit = (event) => {
        // prevent the page from refreshing
        event.preventDefault()
        // pass the form data to createPeople function
        getUser(newForm)
            .then(
                // reset the form to empty
                setNewForm({
                    username: "",
                    password: ""
            }))
        .then(navigate("/shop/products"))
    }

    const form = (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="auth-form"
            value={newForm.username}
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
         
          <input
            type="password"
            className="auth-form"
            value={newForm.password}
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <input type="submit" className="auth-button" value="Login" />
        </form>
      );

    return (
    <div>
        <Logo />
        {form}
    </div>
    )
}

export default Login