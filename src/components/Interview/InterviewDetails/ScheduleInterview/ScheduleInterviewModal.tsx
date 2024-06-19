import axios from "axios";
import { useContext, useRef, useState } from "react";
import { CandidateContext } from "../../../../pages/CandidatePage";

interface Props {
  modalId: string;
  candidateId: string;
  interviewId?:string
  // getCandidateDetails:()=>void
}

function ScheduleInterviewModal({ modalId, candidateId, interviewId }: Props) {
  console.log('int id', interviewId)
  console.log("can ssss", candidateId);
  const refDateTime = useRef<HTMLInputElement>(null);
  const [cssClass, setCssClass] = useState("");
  let scheduledDateTime: string = "";

  const { getCandidateDetails } = useContext(CandidateContext);
  // const { status, setStatus } = useContext(CandidateContext);

  const handleButtonClick = () => {
    const dateTime = refDateTime.current?.value;
    const temp = dateTime?.split("T");
    if (temp && temp.length == 2) {
      const date = temp[0];
      const time = temp[1];
      let data = {
        candidateId: candidateId,
        interviewDate: date,
        startTime: time,
      };

      scheduledDateTime = date + " | " + time;

      saveData(data);
    }
  };

  //Schedule Interview
  const scheduleInterview = ()=>{

  }

  //Save data
  const saveData = (data: {
    candidateId: string;
    interviewDate: string;
    startTime: string;
  }) => {
    axios
      .post(import.meta.env.VITE_API_URL + "/api/interviews/schedule", data)
      .then((res) => {
        console.log(res.data.success.message)
        resetInput();
        setCssClass("cv-show");
        // setStatus(!status);
        getCandidateDetails()
      })
      .catch((err) => console.log('err',err.message));
  };

  //Reset Input
  const cancelInput = () => {
    resetInput();
    setCssClass("");
  };
  const resetInput = () => {
    if (refDateTime.current) refDateTime.current.value = "";
  };

  return (
    <div
      className="modal fade modal-dialog modal-dialog-centered"
      id={modalId}
      aria-hidden="true"
      style={{ display: "none",position: "fixed", left:"50%", transform: 'translateX(-50%)'}}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title text-center fs-5 w-100">
              Schedule Interview
            </h1>
          </div>
          <div className="modal-body">
            <label htmlFor="interview" className="me-3">
              Select Date and Time:
            </label>
            <input
              className="border rounded"
              type="datetime-local"
              id="interview"
              name="interview"
              ref={refDateTime}
            />
          </div>
          <div className={"border cv-response-message " + cssClass}>
            <h5 className="text-center text-success">
              Scheduled Successfully !
            </h5>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary rounded-pill w-25"
              data-bs-dismiss="modal"
              onClick={cancelInput}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary rounded-pill w-25"
              onClick={handleButtonClick}
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleInterviewModal;
