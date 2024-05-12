import { Button, Menu  } from "semantic-ui-react";
import { Link , useNavigate} from "react-router-dom";
import MovieSearch from "./seacrch";
export const Navbar = () => {

  const isLoggedIn = localStorage.getItem("guest_sesion_id") !== null ;

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("guest_sesion_id");
    navigate("/auth");
  }

  

  return (
    <Menu fixed="top" size="huge">
      <Menu.Item as={Link} to="/" style={{ fontSize: "1.5rem" }} >
        Home
      </Menu.Item>

      <Menu.Item as={Link} to="/rated" style={{ fontSize: "1.5rem" }}>
        Rated
      </Menu.Item>

      <MovieSearch />

      <Menu.Menu position="right">
        {isLoggedIn ?(<Menu.Item as={Button} style={{ fontSize: "1.5rem" }} onClick={logout}>
          Logout
        </Menu.Item>) : 
        <Menu.Item as={Link} to="/auth" style={{ fontSize: "1.5rem" }}>
          Acc
        </Menu.Item>
        }
      </Menu.Menu>
    </Menu>
  );
};
