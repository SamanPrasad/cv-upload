import Table from "../components/CandidateList/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Paginator from "../components/Paginator";
import MainLayout from "../layouts/MainLayout";

interface Candidate {
  _id: string;
  name: string;
  email: string;
  url: string;
  no_of_questions: number;
}

function CandidateListPage() {
  //state
  const [activePage, setActivePage] = useState(1);
  const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);

  //get candidates
  const getCandidates = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/candidates/all")
      .then((res) => {
        console.log(res.data.success.data)
        setCandidatesList(res.data.success.data);
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
                {candidates.length > 0}
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
