import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./components/Header"
import Main from "./components/Main"

function App() {
  // link to backend (localhost:#### or heroku)
  const backend = "http://localhost:3001"
  let navigate = useNavigate()

  const [auth, setAuth] = useState(null)
  console.log(auth)

  const getAuth = (user) => {
    const token = [
      {id: user._id},
      {loggedIn: true}
    ]

    const seedData = async () => {
      // make the get request to our API
      await fetch(URL+'/seed', {
          method: "get",
          headers: {"Content-Type": "application/json"},
      })
    }

    seedData()
    
    setAuth(token)
  }

  // useEffect(() => {
  //   if (auth === null 
  //     && window.location !== '/') {
  //       navigate('/')
  //     }
  // })

  return (
    <div className="App">
      <Header backend={backend} auth={auth}/>
      <Main backend={backend} auth={auth} getAuth={getAuth}/>
    </div>
  )
}

export default App;

