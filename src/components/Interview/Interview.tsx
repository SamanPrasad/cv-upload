import axios from "axios";
import ScheduleInterviewButton from "./InterviewDetails/ScheduleInterview/ScheduleInterviewButton";
import { CandidateContext } from "../../pages/CandidatePage";
import { useContext, useState } from "react";
import CancelInterview from "./InterviewDetails/ManageInterview/CancelInterview";
import SendEmail from "./InterviewDetails/ManageInterview/SendEmail";
import InterviewDetails from "./InterviewDetails";

interface Props {
    interviewDetails: {
        interviewId: string;
        candidateId: string;
        accessKey: string;
        interviewDate: string;
        startTime: string;
        status: string;
    };
    candidateId: string;
    rescheduledTime: string;
}

function Interview({ interviewDetails, rescheduledTime, candidateId }: Props) {
    //States
    const [hasInterview, setHasInterview] = useState(Object.keys(interviewDetails).length == 0 ? false : true)
    const [interviewErrorMessage, setInterviewErrorMessage] = useState("")

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
                        {hasInterview || <div className="row justify-content-center">
                            <ScheduleInterviewButton modalId="scheduleModal">
                                Schedule Interview
                            </ScheduleInterviewButton>
                        </div>}
                        {hasInterview && <div className="row">
                            <InterviewDetails interviewDetails={interviewDetails} rescheduledTime={rescheduledTime} />
                        </div>}
                        {hasInterview && <div className="row justify-content-center">
                            <ScheduleInterviewButton modalId="scheduleModal">
                                Re-schedule Interview
                            </ScheduleInterviewButton>
                            <CancelInterview setInterviewErrorMessage={setInterviewErrorMessage} setHasInterview={setHasInterview} interviewId={interviewDetails.interviewId} />
                            <SendEmail setInterviewErrorMessage={setInterviewErrorMessage} candidateId={candidateId} />
                            <div className="row cv-error-message mt-2">
                                <h5 className="text-center">{interviewErrorMessage}</h5>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Interview;
