import { useState } from "react"
import HeaderNav from "./components/HeaderNav"
import Main from "./components/Main"


function App() {
  // link to backend (localhost:#### or heroku)
  const backend = "https://kweb-project3.herokuapp.com"

  const [auth, setAuth] = useState(null)
  console.log(auth)

  const getAuth = (user) => {
    const token = {id: user._id}

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
      <HeaderNav backend={backend} auth={auth}/>
      <Main backend={backend} auth={auth} getAuth={getAuth}/>
    </div>
  )
}

export default App;

