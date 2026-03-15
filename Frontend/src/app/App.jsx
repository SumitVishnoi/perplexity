import { RouterProvider } from "react-router"
import { router } from "./routes/app.routes"


function App() {


  return (
    <RouterProvider router={router}/>
  )
}

export default App
