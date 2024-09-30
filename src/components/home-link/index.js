import { Link } from "react-router-dom";
import './style.css'

function HomeLink({homeLinkContent}) {

  return (
    <Link to={'/'} className='HomeLink'> {homeLinkContent} </Link>
  );
}

export default HomeLink;