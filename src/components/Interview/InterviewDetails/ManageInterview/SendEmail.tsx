import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface Props {
    setInterviewErrorMessage: Dispatch<SetStateAction<string>>;
    setInterviewErrorClass: Dispatch<SetStateAction<string>>;
    setIsEmailSending: Dispatch<SetStateAction<boolean>>;
    candidateId: string;
}

function SendEmail({ setInterviewErrorClass, setInterviewErrorMessage, setIsEmailSending, candidateId }: Props) {

    //Send Email
    const sendEmail = (candidateId: string) => {
      setIsEmailSending(true);
        const data = {
          candidateId: candidateId,
        };
        axios
          .post(import.meta.env.VITE_API_URL + "/api/interviews/send-interview-details", data)
          .finally(()=>{
            //Stop loader
            setIsEmailSending(false);
          })
          .then((res) => {
            //no candidate found
            res.data.success.data == null ? setInterviewErrorClass("cv-error-message") : setInterviewErrorClass("cv-success-message");
            
            setInterviewErrorMessage(res.data.success.message);
          })
          .catch((err) => {
            console.log("Error :", err.message);
            setInterviewErrorClass("cv-error-message")
            setInterviewErrorMessage(err.response.data.error.message)
          });
      };

    return (<button
        type="button"
        className="btn btn-outline-success mt-3 mx-1 pt-1 pb-1 w-25"
        onClick={() => {
            sendEmail(candidateId);
        }}
    >
        Send Email
    </button>)
}

export default SendEmail;