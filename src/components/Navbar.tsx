import { faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-9">
          <nav className="navbar justify-content-center bg-light">
            <Link
              to={"/"}
              style={{ textDecoration: "none" }}
              className="rounded-pill w-25 mx-2"
            >
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill pt-1 pb-1 w-100"
              >
                <FontAwesomeIcon icon={faUser} className="me-3" />
                Add Candidate
              </button>
            </Link>
            <Link
              to={"/list"}
              style={{ textDecoration: "none" }}
              className="rounded-pill w-25 mx-2"
            >
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill pt-1 pb-1 w-100"
              >
                <FontAwesomeIcon icon={faList} className="me-3" />
                List Candidate
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
