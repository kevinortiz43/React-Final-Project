import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul className="nav-links">
        <NavLink style={{textDecoration:"none", color: "white"}} to="free"><h1>List of free games</h1></NavLink>
        <NavLink style={{textDecoration:"none", color: "white"}} to="deals"><h1>List of Deals</h1></NavLink>
        <NavLink style={{textDecoration:"none", color:"white"}} to="credits"><h1>Credits</h1></NavLink>
        <NavLink style={{textDecoration:"none", color: "white"}} to="contact"><h1>Contact us</h1></NavLink>
      </ul>
    </nav>
  );
}

