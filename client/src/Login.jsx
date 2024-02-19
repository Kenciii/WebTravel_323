import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [travels, setTravels] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await axios.get("http://localhost:8081/travels");
        setTravels(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTravels();
  }, []);

  const deleteTravel = async (id) => {
    await axios.delete(`http://localhost:8081/travels/${id}`);
    setTravels(travels.filter((travel) => travel.id !== id));
  };

  const renderTravels = () => {
    return travels.map((travel) => (
      <div key={travel.id} className="col-4 mb-3">
        <div className="card shadow-lg">
          <img
            src={travel.imageURL}
            className="card-img-top"
            style={{ height: "300px", cursor: "pointer" }}
            alt="..."
            onClick={() => history(`/home/${travel.id}`)}
          />
          <div className="card-body">
            <h4 className="card-title">{travel.title}</h4>
            <div className="">
              {user?.role === "admin" && (
                <>
                  <button
                    className="btn btn-outline-primary buttons"
                    onClick={() => history(`/home/edit/${travel.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteTravel(travel.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    try {
      const user = await axios.post("http://localhost:8081/user/login", data);
      if (user.data.status === "aktivan") {
        localStorage.setItem("user", JSON.stringify(user.data));
        history("/home");
      } else {
        alert(
          "You are not an active user! Please contact admin to activate your account."
        );
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
      alert("Incorrect username or password!");
    }
  };

  return (
    <>
      <div className="background-video">
        <video autoPlay loop muted>
          <source src="img/video-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-8 col-md-6 col-lg-4 mx-auto">
         
            <div className="card border-0 rounded-3" style={{ opacity: 0.9 }}>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-4 fw-light fs-5">
                  Sign In
                </h5>
                <form onSubmit={submitForm}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInput">Username...</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingPassword">Password...</label>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <button
                        className="btn btn-primary btn-login text-uppercase fw-bold w-100"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </div>
                    <div className="col-md-6 mb-1">
                      <button
                        className="btn btn-primary btn-login text-uppercase fw-bold w-100"
                        onClick={() => history("/register")}
                      >
                        Register
                      </button>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-outline-secondary btn-login text-uppercase fw-bold mt-3"
                      onClick={() => {
                        const guest = {
                          status: "neaktivan",
                          role: "guest",
                        };
                        localStorage.setItem("user", JSON.stringify(guest));
                        history("/home");
                      }}
                    >
                      Continue as guest
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="paragraph">
        <p>Most visited destinations</p>
      </div>

      <div className="container travels">
        <div className="row">
         
          {renderTravels()}
        </div>
      </div>

      <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Company Info</h5>
            <p>Touristic</p>
            <p>Address, City</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="col-md-4">
            <h5>Useful Links</h5>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul>
              <li><a href="https://twitter.com/">Twitter</a></li>
              <li><a href="https://www.facebook.com/">Facebook</a></li>
              <li><a href="https://www.instagram.com/">Instagram</a></li>
            </ul>
          </div>
          <span><p>© 2024 Touristic. All rights reserved.</p></span>
        </div>
      </div>
    </footer>

    </>
  );
};

export default Home;
