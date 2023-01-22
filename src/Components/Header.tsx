import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { crudContext } from "../context/crudContext";
function Header() {
  let {loggedIn,setLoggedIn} = useContext(crudContext)
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="header">
      <ul>
        <div>
          <NavLink to={"/"}>Suppliers</NavLink>
          <NavLink to={"/products"}>Products</NavLink>
          <NavLink to={"/categories"}>Categories</NavLink>
        </div>
        <div>
          {loggedIn ? (
            <button
            className="log-out"
              onClick={() => {
                localStorage.removeItem("user");
                setLoggedIn(false);
              }}
            >
              Log Out
            </button>
          ) : (
            <NavLink to={"/login"}>Log In</NavLink>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Header;
