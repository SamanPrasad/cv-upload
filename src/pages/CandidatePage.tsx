import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CandidateDetails from "../components/CandidateDetails";
import InterviewDetails from "../components/Interview/InterviewDetails";
import Paginator from "../components/Paginator";
import InterviewQuestionsTable from "../components/Interview/InterviewDetails/InterviewQuestions/InterviewQuestionsTable";
import ScheduleInterviewModal from "../components/Interview/InterviewDetails/ScheduleInterview/ScheduleInterviewModal";

interface ContextInterface {
  getCandidateDetails: () => void;
  setStatus:(val:boolean)=>void;
  status:boolean;
}

interface CandidateDetailsInf {
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidateStack: string;
  candidatePosition: string;
  candidateCvUrl: string;
}

interface InterviewDetails {
  _id: string;
  candidateId: string;
  accessKey: string;
  interviewDate: string;
  startTime: string;
  status: string;
}

interface Questions {
  id: number;
  question: string;
  answer: string;
  candidateAnswer: string;
  isCorrect: string;
}
export const CandidateContext = React.createContext<ContextInterface>(
  {} as ContextInterface
);

function CandidatePage() {
  const { candidateId } = useParams();
  const redirect = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [status, setStatus] = useState(false); //Used for re-fetching data once the schedule is done

  const [candidateDetails, setCandidateDetails] = useState({} as CandidateDetailsInf);
  const [interviewDetails, setInterviewDetails] = useState(
    {} as InterviewDetails
  );
  const [questionsList, setQuestionsList] = useState([] as Questions[]);

  //Delete Candidate
  const deleteCandidate = (candidateId: string) => {
    axios
      .delete(
        import.meta.env.VITE_BASE_URL + "/candidate/delete/" + candidateId
      )
      .then((res) => {
        console.log(res.data.message);
        redirect("/list");
      });
  };

  useEffect(() => {
    // axios
    //   .get(import.meta.env.VITE_API_URL + "/api/candidates/candidate-details/" + candidateId)
    //   .then((res) => {
    //     console.log(res.data.success.data[0])
    //     setCandidateDetails(res.data.success.data[0].candidateDetails);
    //     setInterviewDetails(res.data.success.data[0].interviewDetails);
    //     setQuestionsList(res.data.success.data[0].questions);
    //     console.log(res.data.success.message);
    //   })
    //   .catch((err) => {
    //     if (err.response?.status) {
    //       redirect("/page-not-found");
    //     }
    //   });
    getCandidateDetails();
  }, []);

  //Get candidate details
  const getCandidateDetails = ()=>{
    console.log('cand id',candidateId)
    axios
      .get(import.meta.env.VITE_API_URL + "/api/candidates/candidate-details/" + candidateId)
      .then((res) => {
        console.log('fff',res.data.success.data[0])
        setCandidateDetails(res.data.success.data[0].candidateDetails);
        setInterviewDetails(res.data.success.data[0].interviewDetails);
        setQuestionsList(res.data.success.data[0].questions);
        console.log(res.data.success.message);
      })
      .catch((err) => {
        console.log('err',err.response);
        if (err.response?.status) {
          redirect("/page-not-found");
        }
      });
  }

  //pagination
  const range = 3;
  const startingValue = (activePage - 1) * range;
  const endingValue = startingValue + range;
  const questions = questionsList?.slice(startingValue, endingValue);

  //Generate pagination data
  const onPageClick = (page: number) => {
    setActivePage(page);
  };

  return (
    Object.keys(candidateDetails).length != 0 && (
      <MainLayout>
        <CandidateContext.Provider value={{ getCandidateDetails, status, setStatus }}>
        {/* <div className="border d-flex" style={{ position: "absolute", width: "100%", height:"100vh" }}> */}
          <ScheduleInterviewModal interviewId={interviewDetails._id} modalId="scheduleModal" candidateId={candidateDetails.candidateId}/>
        {/* </div> */}
          {/* <div>{component}</div> */}
          <div className="container border border-danger px-0" style={{ position:"relative" }}>
            <CandidateDetails candidateDetails={candidateDetails} />
            <InterviewDetails
              interviewDetails={interviewDetails}
              candidateId={candidateDetails.candidateId}
            />
            <InterviewQuestionsTable questions={questions} />
            {questions.length > 0 && (
              <div className="row justify-content-center">
                <div className="col-8 d-flex justify-content-center">
                  <Paginator
                    activePage={activePage}
                    itemsCount={questionsList?.length}
                    range={range}
                    onPageClick={onPageClick}
                  />
                </div>
              </div>
            )}
            <div className="row justify-content-center my-5">
              <button
                type="button"
                className="btn btn-outline-danger mt-3 mx-1 pt-1 pb-1 w-25"
                title="Remove candidate from the system, including the corresponding interviews"
                onClick={() => {
                  deleteCandidate(candidateDetails.candidateId);
                }}
              >
                Delete Candidate
              </button>
            </div>
          </div>
        </CandidateContext.Provider>
      </MainLayout>
    )
  );
}

export default CandidatePage;
