import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import SingleView from "../components/SingleView";
import MainLayout from "../layouts/MainLayout";
import CandidateDetails from "../components/CandidateDetails";
import InterviewStatus from "../components/interview/InterviewStatus";
import InterviewQuestions from "../components/interview/InterviewQuestions";

interface ContextInterface {
  status: boolean;
  setStatus: (val: boolean) => void;
}

interface UserDetails {
  userId: number;
  candidateName: string;
  email: string;
  stack: string;
  position: string;
  cvUrl: string;
}

interface InterviewDetails {
  id: number;
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

function Candidate() {
  const { userId } = useParams();
  const redirect = useNavigate();
  // const [component, setComponent] = useState<ReactElement>();
  const [status, setStatus] = useState(false); //Used for re-fetching data once the schedule is done

  const [userDetails, setUserDetails] = useState({} as UserDetails);
  const [interviewDetails, setInterviewDetails] = useState(
    {} as InterviewDetails
  );
  const [questions, setQuestions] = useState([] as Questions[]);
  // console.log("interview details ", interviewDetails);
  // const temp = (
  //   <SingleView
  //     userDetails={userDetails}
  //     interviewDetails={interviewDetails}
  //     questions={questions}
  //   />
  // );

  //Delete Candidate
  const deleteCandidate = (candidateId: number) => {
    axios
      .delete(
        import.meta.env.VITE_TEST_API + "/candidate/delete/" + candidateId
      )
      .then((res) => {
        console.log(res.data.message);
        redirect("/list");
      });
  };

  useEffect(() => {
    console.log("toggled ", status);
    axios
      .get(import.meta.env.VITE_TEST_API + "/candidate/" + userId)
      .then((res) => {
        // const element = (
        //   <SingleView
        //     userDetails={res.data.success.data.userDetails}
        //     interviewDetails={res.data.success.data.interviewDetails}
        //     questions={res.data.success.data.questions}
        //   />
        // );
        // setComponent(element);
        setUserDetails(res.data.success.data.userDetails);
        setInterviewDetails(res.data.success.data.interviewDetails);
        setQuestions(res.data.success.data.questions);
        console.log(res.data.success.message);
        // console.log("rendered", res.data.success.data.interviewDetails);
      })
      .catch((err) => {
        if (err.response?.status) {
          redirect("/page-not-found");
        }
      });
  }, [status]);

  return (
    Object.keys(userDetails).length != 0 && (
      <MainLayout>
        <CandidateContext.Provider value={{ status, setStatus }}>
          {/* <div>{component}</div> */}
          <div className="container">
            <CandidateDetails candidateDetails={userDetails} />
            <InterviewStatus interviewDetails={interviewDetails} />
            <InterviewQuestions questions={questions} />
            {/* <Paginator
        activePage={activePage}
        itemsCount={candidatesList?.length}
        range={range}
        onPageClick={onPageClick}
      /> */}
            <div className="row justify-content-center my-5">
              <button
                type="button"
                className="btn btn-outline-danger mt-3 mx-1 pt-1 pb-1 w-25"
                title="Remove candidate from the system, including the corresponding interviews"
                onClick={() => {
                  deleteCandidate(userDetails.userId);
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

export default Candidate;
