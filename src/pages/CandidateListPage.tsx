import { useNavigate } from "react-router-dom";
import Table from "../components/candidate-list/Table";
import { useEffect, useState } from "react";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
import Paginator from "../components/Paginator";
import MainLayout from "../layouts/MainLayout";

interface Candidate {
  id: string;
  name: string;
  email: string;
  url: string;
  no_of_questions: number;
}

function CandidateListPage() {
  //state
  const [activePage, setActivePage] = useState(1);
  const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);
  // const navigate = useNavigate();

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
    <MainLayout>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="my-5 text-center display-2">List of Candidates</h1>
            <div className="row justify-content-center">
              <div className="col-8">
                <Table candidates={candidates} />
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
      </div>
    </MainLayout>
  );
}

export default CandidateListPage;
