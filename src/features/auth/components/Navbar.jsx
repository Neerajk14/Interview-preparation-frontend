import { Link } from "react-router-dom";
 import { useAuth } from "../hooks/useAuth.js";
import "../../../style.scss"
function Navbar() {
  const { user, handleLogout } = useAuth();

  return (
    <nav>
      <div className="nav-container">Job Ready</div>

      <div className="nav-menu">
        <ul>
        

          {user && (
            <li onClick={handleLogout}>
              Logout
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
