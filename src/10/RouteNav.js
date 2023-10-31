
import { Link } from "react-router-dom"
const RouteNav = () => {
  return (
    <div>
      <nav>
  <ul>
    <li><strong>라우팅 연습</strong></li>
  </ul>
  <ul>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/page1/1'>page1</Link></li>
    <li><Link to='/page2' >page2</Link></li>
  </ul>
</nav>
    </div>
  )
}

export default RouteNav
