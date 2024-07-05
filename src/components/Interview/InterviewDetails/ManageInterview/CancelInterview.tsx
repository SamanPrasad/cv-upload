import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import interviewStatus from "../../../../constants";

interface Props {
    setInterviewErrorMessage: Dispatch<SetStateAction<string>>;
    interviewId: string;
    setInterviewDetails: Dispatch<SetStateAction<InterviewDetails>>;
    setInterviewErrorClass: Dispatch<SetStateAction<string>>;
    interviewDetails:InterviewDetails;
    isEmailSending: boolean; //to stop cancelling the interview while sending the email
}

interface InterviewDetails {
    interviewId: string;
    candidateId: string;
    accessKey: string;
    interviewDate: string;
    startTime: string;
    status: string;
}

function CancelInterview({ setInterviewErrorMessage, interviewId, setInterviewDetails, interviewDetails, setInterviewErrorClass, isEmailSending }: Props) {

    //Cancel Interview
    const cancelInterview = (interviewId: string) => {
        let data = {
            interviewId: interviewId,
        };

        axios
            .post(import.meta.env.VITE_API_URL + "/api/interviews/cancel", data)
            .then((res) => {
                
                //Candidate not found
                if(res.data.success.data == null){
                    setInterviewErrorClass("cv-error-message")
                    setInterviewErrorMessage(res.data.success.message);
                    return;
                }
                
                setInterviewErrorClass("cv-success-message");
                setInterviewErrorMessage("");
                setInterviewDetails({...interviewDetails, status:interviewStatus.CANCELED.toString()})
            })
            .catch((err) => {
                console.log("Error :", err.message);
                setInterviewErrorClass("cv-error-message");
                setInterviewErrorMessage(err.response.data.error.message)
            });
    };

    return (<button
        type="button"
        className="btn btn-outline-danger mt-3 mx-1 pt-1 pb-1 w-25"
        onClick={isEmailSending ? ()=>{} : () => {
            cancelInterview(interviewId);
        }}
    >
        Cancel Interview
    </button>)
}

export default CancelInterview;