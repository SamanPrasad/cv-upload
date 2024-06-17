import axios from "axios";
import { useContext, useRef, useState } from "react";
import { CandidateContext } from "../../../pages/Candidate";

interface Props {
  modalId: string;
  candidateId: string;
}

function ScheduleInterviewModal({ modalId, candidateId }: Props) {
  const refDateTime = useRef<HTMLInputElement>(null);
  const [cssClass, setCssClass] = useState("");
  let scheduledDateTime: string = "";

  const { status, setStatus } = useContext(CandidateContext);

  const scheduleInterview = () => {
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

  //Save data
  const saveData = (data: {
    candidateId: string;
    interviewDate: string;
    startTime: string;
  }) => {
    axios
      .post(import.meta.env.VITE_TEST_API + "/schedule", data)
      .then((res) => {
        // console.log("inner", res.data.message);
        resetInput();
        setCssClass("cv-show");
        // onSchedule(true, scheduledDateTime, "Scheduled");
        setStatus(!status);
      })
      .catch((err) => console.log(err.messsage));
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
      className="modal fade modal-dialog modal-dialog-centered cv-modal-position"
      id={modalId}
      aria-hidden="true"
      style={{ display: "none" }}
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
              onClick={scheduleInterview}
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
