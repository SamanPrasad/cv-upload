import ScheduleInterviewButton from "./InterviewDetails/ScheduleInterview/ScheduleInterviewButton";
import { Dispatch, SetStateAction, useState } from "react";
import CancelInterview from "./InterviewDetails/ManageInterview/CancelInterview";
import SendEmail from "./InterviewDetails/ManageInterview/SendEmail";
import InterviewDetails from "./InterviewDetails";
import interviewStatus from "../../constants";
import { RotatingLines } from "react-loader-spinner";

interface Props {
    interviewDetails: InterviewDetails;
    candidateId: string;
    setInterviewDetails: Dispatch<SetStateAction<InterviewDetails>>;
}

interface InterviewDetails {
    interviewId: string;
    candidateId: string;
    accessKey: string;
    interviewDate: string;
    startTime: string;
    status: string;
}

function Interview({ interviewDetails, candidateId, setInterviewDetails }: Props) {
    //States
    const [interviewErrorMessage, setInterviewErrorMessage] = useState("");
    const [interviewErrorClass, setInterviewErrorClass] = useState("");
    const [isEmailSending, setIsEmailSending] = useState(false);

    return (
        <div style={{}} className="p-0">
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
                        {Object.keys(interviewDetails).length == 0 && <div className="row justify-content-center">
                            <ScheduleInterviewButton modalId="scheduleModal">
                                Schedule Interview
                            </ScheduleInterviewButton>
                        </div>}
                        {Object.keys(interviewDetails).length > 0 && <div className="row">
                            <InterviewDetails interviewDetails={interviewDetails} />
                        </div>}
                        {Object.keys(interviewDetails).length > 0 && <div className="row justify-content-center">
                            {(Number(interviewDetails.status) == interviewStatus.SCHEDULED || Number(interviewDetails.status) == interviewStatus.CANCELED || Number(interviewDetails.status) == interviewStatus.NOT_PARTICIPATED) && <ScheduleInterviewButton modalId="scheduleModal">
                                Re-schedule Interview
                            </ScheduleInterviewButton>}
                            {Number(interviewDetails.status) == interviewStatus.SCHEDULED && <CancelInterview isEmailSending={isEmailSending} setInterviewErrorClass={setInterviewErrorClass} setInterviewErrorMessage={setInterviewErrorMessage} interviewId={interviewDetails.interviewId} setInterviewDetails={setInterviewDetails} interviewDetails={interviewDetails} />}
                            {Number(interviewDetails.status) == interviewStatus.SCHEDULED && <SendEmail setIsEmailSending={setIsEmailSending} setInterviewErrorClass={setInterviewErrorClass} setInterviewErrorMessage={setInterviewErrorMessage} candidateId={candidateId} />}
                            <div className={"row justify-content-center " + interviewErrorClass + " mt-2"}>
                                {isEmailSending ? <div className="d-flex justify-content-center"><RotatingLines strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="25"
                                    visible={true} /></div> : <h5 className="text-center">{interviewErrorMessage}</h5>}
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Interview;
