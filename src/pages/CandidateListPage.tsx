import Table from "../components/CandidateList/Table";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Paginator from "../components/Paginator";
import MainLayout from "../layouts/MainLayout";
import { RotatingLines } from "react-loader-spinner";

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
  const [isLoading, setIsLoading] = useState(false);
  const[cssClass, setCssClass] = useState("");
  const[responseMessage, setResponseMessage] = useState("");

  //get candidates
  const getCandidates = () => {
    //Start loader
    setIsLoading(true);

    axios
      .get(import.meta.env.VITE_API_URL + "/api/candidates/all")
      .finally(()=>{
        //stop loader
        setIsLoading(false);
      })
      .then((res) => {
        //no data found
        if(res.data.success.data == null){
          setCssClass("cv-show text-secondary");
          setResponseMessage("No Data Found");
        }
        
        setCandidatesList(res.data.success.data);
      })
      .catch((err) => {
        console.log("Error :" + err.message);
        setCssClass("cv-show text-danger");
        setResponseMessage(err.response.data.error.message);
      });
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
                <CandidateContext.Provider value={{ candidatesList, setCandidatesList }}>
                  <Table candidatesList={candidatesList} startingIndex={startingValue} endingIndex={endingValue} />
                </CandidateContext.Provider>
              </div>
            </div>
            <div className="row">
              {isLoading ? <div className="d-flex justify-content-center">
                <RotatingLines strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="50"
                  visible={true} />
              </div> : <h2 className={"text-center "+ cssClass}>{responseMessage}</h2>}
            </div>
            <div className="row justify-content-center">
              <div className="d-flex justify-content-center">
                {candidatesList != null && candidatesList.length != 0 && <Paginator
                  activePage={activePage}
                  itemsCount={candidatesList?.length}
                  range={range}
                  onPageClick={onPageClick}
                />}
              </div>
            </div>            
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CandidateListPage;
