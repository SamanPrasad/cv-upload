import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface Props {
    setInterviewErrorMessage: Dispatch<SetStateAction<string>>;
    candidateId: string;
}

function SendEmail({ setInterviewErrorMessage, candidateId }: Props) {

    //Send Email
    const sendEmail = (candidateId: string) => {
        const data = {
          candidateId: candidateId,
        };
        axios
          .post(import.meta.env.VITE_API_URL + "/api/interviews/send-interview-details", data)
          .then((res) => {
            console.log(res.data.success.message);
            setInterviewErrorMessage(res.data.success.message);
          })
          .catch((err) => {
            console.log("Error :", err.response.data.error.message);
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