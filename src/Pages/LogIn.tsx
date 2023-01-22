import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { crudContext } from "../context/crudContext";

function LogIn() {
  const [userInfo, setUserInfo] = useState<{}>({ name: "", password: "" });
  const navigate = useNavigate();
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const { setLoggedIn } = useContext(crudContext);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify(userInfo));
    setLoggedIn(true);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="login">
        <h2>Sigh Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label id="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter a username"
              onChange={handleInput}
              required
            />
          </div>
          <div>
            <label id="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a password"
              onChange={handleInput}
              required
            />
          </div>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
