import interviewStatus from "../../constants";

interface Props {
  interviewDetails: {
    interviewId: string;
    candidateId: string;
    accessKey: string;
    interviewDate: string;
    startTime: string;
    status: string;
  };
}

function InterviewDetails({ interviewDetails }: Props) {
  return (<div>
    <div>
      <h5 className="text-center">Interview Status</h5>
      <h3 className="text-primary text-center pt-2">
        <strong>{
          Number(interviewDetails?.status) == interviewStatus.SCHEDULED
            ? "Scheduled"
            : Number(interviewDetails?.status) == interviewStatus.STARTED
              ? "Started"
              : Number(interviewDetails?.status) == interviewStatus.COMPLETED
                ? "Completed"
                : Number(interviewDetails?.status) == interviewStatus.NOT_PARTICIPATED
                  ? "Not Participated"
                  : "Canceled"}</strong>
      </h3>
      <h3 className="text-dark text-center pb-2">
        <strong>
          {interviewDetails?.interviewDate +
            " | " +
            interviewDetails.startTime}
        </strong>
      </h3>
    </div>
    {interviewDetails != null && <div className="mt-4 mb-3">
      <h5 className="text-center">Interview Code</h5>
      <h3 className="text-center text-secondary"><strong>{interviewDetails.accessKey}</strong></h3>
    </div>}
  </div>)
}

export default InterviewDetails;