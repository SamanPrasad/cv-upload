import Table from "../components/CandidateList/Table";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Paginator from "../components/Paginator";
import MainLayout from "../layouts/MainLayout";

export const CandidateContext = createContext<ContextInterface>(
  {} as ContextInterface
);
interface ContextInterface {
  candidatesList: Candidate[];
  setCandidatesList: Dispatch<SetStateAction<Candidate[]>>
}
interface Candidate {
  _id: string;
  name: string;
  email: string;
  cvUrl: string;
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
      .catch((err) => console.log("Error :" + err.response.data.error.message));
  };

  useEffect(() => {
    getCandidates();
  }, []);

  //pagination
  const range = 3;
  const startingValue = (activePage - 1) * range;
  const endingValue = startingValue + (range - 1);

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
                {candidatesList.length > 0}
                <CandidateContext.Provider value={{ candidatesList, setCandidatesList }}>
                  <Table candidatesList={candidatesList} startingIndex={startingValue} endingIndex={endingValue} />
                </CandidateContext.Provider>
                <div className="d-flex justify-content-center">
                  {candidatesList.length > 0 && <Paginator
                    activePage={activePage}
                    itemsCount={candidatesList?.length}
                    range={range}
                    onPageClick={onPageClick}
                  />}
                  {candidatesList.length == 0 && <h2 className="text-center text-secondary">No data to display</h2>}
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
