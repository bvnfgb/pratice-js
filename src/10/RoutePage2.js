import queryString from "query-string"
import { useLocation } from "react-router-dom"

const RoutePage2 = () => {
    const item=useLocation().search
  return (
    <article>
RoutePage2 :{item}
    </article>
  )
}

export default RoutePage2
