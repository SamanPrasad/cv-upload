import axios, { AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { CandidateContext } from "../../../../pages/CandidatePage";

interface Props {
  modalId: string;
  candidateId: string;
  interviewId?: string;
  setRescheduledTime:Dispatch<SetStateAction<string>>;
}

function ScheduleInterviewModal({ modalId, candidateId, interviewId, setRescheduledTime }: Props) {
  const refDateTime = useRef<HTMLInputElement>(null);
  const [cssClass, setCssClass] = useState("");
  const[responseMessage, setResponseMessage] = useState("")

  const { getCandidateDetails } = useContext(CandidateContext);

  const handleButtonClick = () => {
    const dateTime = refDateTime.current?.value;
    const temp = dateTime?.split("T");
    if (temp && temp.length == 2) {
      const date = temp[0];
      const time = temp[1];
      let axiosPromise = {} as Promise<AxiosResponse>;

      if (interviewId) {
        axiosPromise = rescheduleInterview(interviewId, date, time);
      }else{
        axiosPromise = scheduleInterview(candidateId, date, time)
      }

      axiosPromise
      .then((res) => {
        console.log(res.data.success.message)
        if(interviewId){
          setResponseMessage("Rescheduled Successfully !")
          setRescheduledTime(date+" | "+time)
        }else{
          setResponseMessage("Scheduled Successfully !")
          getCandidateDetails()
        }
        setCssClass("cv-show text-success");
        resetInput();
      })
      .catch((err) => {
        console.log("Error :",err.response.data.error.message)
        setResponseMessage(err.response.data.error.message)
        setCssClass("cv-show text-danger");
      });
    }
  };

  //Schedule Interview
  const scheduleInterview = (candidateId: string, interviewDate: string, startTime: string):Promise<AxiosResponse> => {
    let data = {
      candidateId,
      interviewDate,
      startTime
    }
    return axios.post(import.meta.env.VITE_API_URL + "/api/interviews/schedule", data)
  }

  //Reschedule Interview
  const rescheduleInterview = (interviewId: string, interviewDate: string, startTime: string):Promise<AxiosResponse> => {
    let data = {
      interviewId,
      interviewDate,
      startTime
    }
    return axios.put(import.meta.env.VITE_API_URL + "/api/interviews/reschedule", data)

  }

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
      style={{ display: "none", position: "fixed", left: "50%", transform: 'translateX(-50%)' }}
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
          <div className={"cv-response-message " + cssClass}>
            <h5 className="text-center">
              {responseMessage}
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
