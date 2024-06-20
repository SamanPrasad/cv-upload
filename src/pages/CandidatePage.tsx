import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CandidateDetails from "../components/CandidateDetails";
import InterviewDetails from "../components/Interview/InterviewDetails";
import Paginator from "../components/Paginator";
import InterviewQuestionsTable from "../components/Interview/InterviewDetails/InterviewQuestions/InterviewQuestionsTable";
import ScheduleInterviewModal from "../components/Interview/InterviewDetails/ScheduleInterview/ScheduleInterviewModal";
import Interview from "../components/Interview/Interview";

interface ContextInterface {
  getCandidateDetails: () => void;
  setStatus: (val: boolean) => void;
  status: boolean;
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
  interviewId: string;
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
  candidateAnswers: string;
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
  const [rescheduledTime, setRescheduledTime] = useState("");

  const [candidateDetails, setCandidateDetails] = useState({} as CandidateDetailsInf);
  const [interviewDetails, setInterviewDetails] = useState(
    {} as InterviewDetails
  );
  const [questionsList, setQuestionsList] = useState([] as Questions[]);

  const [candidateErrorMessage, setCandidateErrorMessage] = useState("");

  //Delete Candidate
  const deleteCandidate = (candidateId: string) => {
    axios
      .delete(
        import.meta.env.VITE_API_URL + "/api/candidates/delete/" + candidateId
      )
      .then((res) => {
        console.log(res.data.message);
        redirect("/list");
      }).catch(err=>{
        console.log("Error :", err.response.data.error.message);
        setCandidateErrorMessage(err.response.data.error.message)
      });
  };

  useEffect(() => {
    getCandidateDetails();
  }, []);

  //Get candidate details
  const getCandidateDetails = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/candidates/candidate-details/" + candidateId)
      .then((res) => {
        setCandidateDetails(res.data.success.data[0].candidateDetails);
        setInterviewDetails(res.data.success.data[0].interviewDetails);
        setQuestionsList(res.data.success.data[0].questions);
        console.log(res.data.success.message);
      })
      .catch((err) => {
        console.log('Error :', err.response.data.error.message);
        if (err.response.status == 400) {
          redirect("/page-not-found");
        }
      });
  }

  //pagination
  const range = 3;
  const startingValue = (activePage - 1) * range;
  // const endingValue = startingValue + range;
  const endingValue = startingValue + (range - 1);
  const questions = questionsList?.slice(startingValue, endingValue);

  //Generate pagination data
  const onPageClick = (page: number) => {
    setActivePage(page);
  };
  
  return (
    Object.keys(candidateDetails).length != 0 && (
      <MainLayout>
        <CandidateContext.Provider value={{ getCandidateDetails, status, setStatus }}>
          <ScheduleInterviewModal setRescheduledTime={setRescheduledTime} interviewId={interviewDetails.interviewId} modalId="scheduleModal" candidateId={candidateDetails.candidateId} />
          <div className="container px-0">
            <CandidateDetails candidateDetails={candidateDetails} />
            {/* <InterviewDetails
              rescheduledTime={rescheduledTime}
              interviewDetails={interviewDetails}              
            /> */}
            <Interview rescheduledTime={rescheduledTime} interviewDetails={interviewDetails} candidateId={candidateDetails.candidateId}/>
            <InterviewQuestionsTable questionsList={questionsList} startingIndex={startingValue} endingIndex={endingValue} />
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
            <div className="row justify-content-center mt-5">
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
            <div className="row cv-error-message mt-2 mb-5">
              <h5 className="text-center">{candidateErrorMessage}</h5>
            </div>
          </div>
        </CandidateContext.Provider>
      </MainLayout>
    )
  );
}

export default CandidatePage;
