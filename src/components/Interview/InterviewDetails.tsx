interface Props {
  interviewDetails: {
    interviewId: string;
    candidateId: string;
    accessKey: string;
    interviewDate: string;
    startTime: string;
    status: string;
  };
  rescheduledTime: string;
}

function InterviewDetails({ interviewDetails, rescheduledTime }: Props) {
  return (<div>
    <h5 className="text-center">Interview Status</h5>
    <h3 className="text-primary text-center pt-2">
      <strong>{
        Number(interviewDetails?.status) == 0
          ? "Scheduled"
          : Number(interviewDetails?.status) == 1
            ? "Started"
            : Number(interviewDetails?.status) == 2
              ? "Completed"
              : Number(interviewDetails?.status) == 3
                ? "Not Participated"
                : "Canceled"}</strong>
    </h3>
    <h3 className="text-dark text-center pb-2">
      <strong>
        {rescheduledTime.length > 0 ? rescheduledTime : (interviewDetails?.interviewDate +
          " | " +
          interviewDetails.startTime)}
      </strong>
    </h3>
  </div>)
}

export default InterviewDetails;