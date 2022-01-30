import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul className="nav-links">
        <Link style={{textDecoration:"none"}} to="credits"><h1>Credits</h1></Link>
        <Link style={{textDecoration:"none"}} to="free"><h1>List of free games</h1></Link>
        <Link style={{textDecoration:"none"}} to="deals"><h1>List of Deals</h1></Link>
        <Link style={{textDecoration:"none"}} to="contact"><h1>Contact us</h1></Link>
      </ul>
    </nav>
  );
}

export default Nav;
