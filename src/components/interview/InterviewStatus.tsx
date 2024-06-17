import ScheduleInterviewButton from "./schedule-interview/ScheduleInterviewButton";
import ScheduleInterviewModal from "./schedule-interview/ScheduleInterviewModal";

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
  const scheduleElement = (
    <div className="row justify-content-center">
      <ScheduleInterviewButton modalId="scheduleModal" />
    </div>
  );
  const editScheduleElement = (
    <div className="container">
      <div className="row justify-content-center pt-3">
        <div className="col-5">
          <h5 className="text-center">Interview Status</h5>
          <h3 className="text-primary text-center">
            <strong>Scheduled</strong>
          </h3>
        </div>
      </div>
      <div className="row justify-content-center">
        <button
          type="button"
          className="btn btn-outline-primary mt-3 mx-1 pt-1 pb-1 w-25"
        >
          Re-schedule Interview
        </button>
        <button
          type="button"
          className="btn btn-outline-warning mt-3 mx-1 pt-1 pb-1 w-25"
        >
          Cancel Interview
        </button>
        <button
          type="button"
          className="btn btn-outline-danger mt-3 mx-1 pt-1 pb-1 w-25"
        >
          Delete Interview
        </button>
      </div>
      <div className="row justify-content-center">
        <button
          type="button"
          className="btn btn-outline-success mt-3 mx-1 pt-1 pb-1 w-25"
        >
          Send E-Mail
        </button>
      </div>
    </div>
  );
  return (
    <div style={{ position: "relative" }} className="p-0">
      <div style={{ position: "absolute", width: "100%" }}>
        <ScheduleInterviewModal modalId="scheduleModal" />
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
            {interviewDetails?.status != "Scheduled"
              ? scheduleElement
              : editScheduleElement}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewStatus;
