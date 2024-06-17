import { useNavigate } from "react-router-dom";
import CandidateList from "../components/CandidateList";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Paginator from "../components/Paginator";

interface Candidate {
  id: number;
  name: string;
  email: string;
  url: string;
  no_of_questions: number;
}

function ListView() {
  //state
  const [activePage, setActivePage] = useState(1);
  const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);

  //get candidates
  const getCandidates = () => {
    axios
      .get(import.meta.env.VITE_TEST_API + "/candidates")
      .then((res) => {
        setCandidatesList(res.data.data);
      })
      .catch((err) => console.log("Data fetching error :" + err.message));
  };

  useEffect(() => {
    getCandidates();
  }, []);

  //Redirect
  const redirect = () => {
    const navigate = useNavigate();
    navigate("/");
  };

  //pagination
  const range = 3;
  const startingValue = (activePage - 1) * range;
  const endingValue = startingValue + range;
  const candidates = candidatesList?.slice(startingValue, endingValue);

  //Generate pagination data
  const onPageClick = (page: number) => {
    setActivePage(page);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="my-5 text-center display-2">List of Candidates</h1>
          <div className="row justify-content-center">
            <div className="col-8">
              <CandidateList candidates={candidates} />
              <div className="d-flex justify-content-center">
                <Paginator
                  activePage={activePage}
                  itemsCount={candidatesList?.length}
                  range={range}
                  onPageClick={onPageClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-4 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-secondary rounded-pill mx-1 px-4"
            onClick={redirect}
          >
            <FontAwesomeIcon icon={faUser} className="me-3" />
            Add New Candidate
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListView;
