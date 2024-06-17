// import { useState } from "react";
import axios from "axios";
import ScheduleInterviewButton from "./schedule-interview/ScheduleInterviewButton";
import ScheduleInterviewModal from "./schedule-interview/ScheduleInterviewModal";
import { CandidateContext } from "../../pages/Candidate";
import { useContext } from "react";

interface Props {
  interviewDetails: {
    id: number;
    candidateId: string;
    accessKey: string;
    interviewDate: string;
    startTime: string;
    status: string;
  };
}

function InterviewStatus({ interviewDetails }: Props) {
  //States
  const { status, setStatus } = useContext(CandidateContext);

  //Send Email
  const sendEmail = (candidateId: string) => {
    const data = {
      candidateId: candidateId,
    };
    axios
      .post(import.meta.env.VITE_TEST_API + "/interview/send-email", data)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error :", err.message);
      });
  };

  //Cancel Interview
  const cancelInterview = (candidateId: string) => {
    let data = {
      candidateId: candidateId,
      status: "Cancel",
    };
    axios
      .post(import.meta.env.VITE_TEST_API + "/interview/update/", data)
      .then((res) => {
        console.log(res.data.message);
        setStatus(!status);
      })
      .catch((err) => console.log("Error :", err.message));
  };

  //Delete interview
  const deleteInterview = (interviewId: number) => {
    axios
      .delete(
        import.meta.env.VITE_TEST_API + "/interview/delete/" + interviewId
      )
      .then((res) => {
        console.log(res.data.message);
        setStatus(!status);
      })
      .catch((err) => console.log("Error :", err.message));
  };
  //States
  // const [hasInterview, setHasInterview] = useState(
  //   Object.keys(interviewDetails).length == 0 ? false : true
  // );
  // const [sheduleDateTime, setScheduleDateTime] = useState(
  //   Object.keys(interviewDetails).length == 0
  //     ? ""
  //     : interviewDetails.interviewDate + " | " + interviewDetails.startTime
  // );
  // const [interviewStatus, setInterviewStatus] = useState(
  //   Object.keys(interviewDetails).length == 0 ? "" : interviewDetails.status
  // );

  // console.log("inter comp", interviewDetails);

  const scheduleElement = (
    <div className="row justify-content-center">
      <ScheduleInterviewButton modalId="scheduleModal">
        Schedule Interview
      </ScheduleInterviewButton>
    </div>
  );
  const editScheduleElement = (
    <div className="container">
      <div className="row justify-content-center pt-3">
        <div className="col-5">
          <h5 className="text-center">Interview Status</h5>
          <h3 className="text-primary text-center pt-2">
            <strong>{interviewDetails?.status}</strong>
          </h3>
          <h3 className="text-dark text-center pb-2">
            <strong>
              {interviewDetails?.interviewDate +
                " | " +
                interviewDetails.startTime}
            </strong>
          </h3>
        </div>
      </div>
      <div className="row justify-content-center">
        <ScheduleInterviewButton modalId="scheduleModal">
          Re-schedule Interview
        </ScheduleInterviewButton>
        <button
          type="button"
          className="btn btn-outline-warning mt-3 mx-1 pt-1 pb-1 w-25"
          onClick={() => {
            cancelInterview(interviewDetails.candidateId);
          }}
        >
          Cancel Interview
        </button>
        <button
          type="button"
          className="btn btn-outline-danger mt-3 mx-1 pt-1 pb-1 w-25"
          onClick={() => {
            deleteInterview(interviewDetails.id);
          }}
        >
          Delete Interview
        </button>
      </div>
      <div className="row justify-content-center">
        <button
          type="button"
          className="btn btn-outline-success mt-3 mx-1 pt-1 pb-1 w-25"
          onClick={() => {
            sendEmail(interviewDetails.candidateId);
          }}
        >
          Send E-Mail
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ position: "relative" }} className="p-0">
      <div style={{ position: "absolute", width: "100%" }}>
        <ScheduleInterviewModal
          candidateId={interviewDetails.candidateId}
          modalId="scheduleModal"
        />
      </div>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="row justify-content-center">
              <h1 className="mt-5 pb-1 text-center display-2">
                Interview Details
              </h1>
            </div>
            <div className="row justify-content-center pb-4">
              <div className="col-7">
                <div className="cv-divider"></div>
              </div>
            </div>
            {Object.keys(interviewDetails).length == 0
              ? scheduleElement
              : editScheduleElement}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewStatus;
