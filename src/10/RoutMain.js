import { BrowserRouter, Routes, Route } from "react-router-dom"
import RouteHome from "./RouteHome"
import RoutePage1 from './RoutePage1'
import RouteNav from "./RouteNav"
import RoutePage2 from "./RoutePage2"
const RoutMain = () => {
  return (
    <BrowserRouter>
        <main className="container">
        <section >
            <h1 className="text-2x1 font-bold m-5 text-center">react-route-dom으로 라우팅</h1>
        
        <RouteNav/></section>
        <Routes>
            <Route path="/"    element={<RouteHome/>}/>
            <Route path="/page1/:item"    element={<RoutePage1/>}/>
            <Route path="/page2"    element={<RoutePage2/>}/>
        </Routes>
       </main>
    </BrowserRouter>
  )
}

export default RoutMain
