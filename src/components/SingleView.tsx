import CandidateDetails from "./CandidateDetails";
import InterviewStatus from "./interview/InterviewStatus";
import InterviewQuestions from "./interview/InterviewQuestions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Paginator from "./Paginator";
import { useState } from "react";

interface Props {
  userDetails: {
    userId: number;
    candidateName: string;
    email: string;
    stack: string;
    position: string;
    cvUrl: string;
  };
  interviewDetails: {
    id: number;
    candidateId: string;
    accessKey: string;
    interviewDate: string;
    startTime: string;
    status: string;
  };
  questions: {
    id: number;
    question: string;
    answer: string;
    candidateAnswer: string;
    isCorrect: string;
  }[];
}

function SingleView({ interviewDetails, userDetails, questions }: Props) {
  const redirectTo = (to: string) => {
    const redirect = useNavigate();
    redirect(to);
  };

  //state
  // const [activePage, setActivePage] = useState(1);
  // const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);

  //pagination
  // const range = 3;
  // const startingValue = (activePage - 1) * range;
  // const endingValue = startingValue + range;
  // const candidates = candidatesList?.slice(startingValue, endingValue);

  return (
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
        >
          Delete Candidate
        </button>
      </div>
      <div className="row justify-content-center mb-5">
        <div className="col-8 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-secondary rounded-pill mt-3 mx-1 pt-1 pb-1 w-25"
            onClick={() => redirectTo("/")}
          >
            <FontAwesomeIcon icon={faUser} className="me-3" />
            Add Candidate
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary rounded-pill mt-3 mx-1 pt-1 pb-1 w-25"
            onClick={() => redirectTo("/list")}
          >
            <FontAwesomeIcon icon={faList} className="me-3" />
            List Candidate
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleView;
