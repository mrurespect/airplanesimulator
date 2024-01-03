
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from "./Components/Layout/Layout";
import Map from "./Components/Map/Map";
import AeoroportContextProvider from "./Components/Context/AeoroportContextProvider";
import VolContexProvider from "./Components/Context/VolContexProvider";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";

function App() {
    let routers = createBrowserRouter([
        {path:"/",element:<Layout/>,children:[
                { path:"simulation",element: <Map/> },
                {index:true,element:<Home/>},
                {path:"login",element:<Login/>}
            ]}
        ]
    )

    return (<>
            <VolContexProvider>
                <AeoroportContextProvider>
                    <RouterProvider router={routers}/>
                </AeoroportContextProvider>
            </VolContexProvider>
    </>

    )
}
export default App;
