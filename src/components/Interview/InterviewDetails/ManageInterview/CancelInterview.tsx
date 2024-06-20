import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface Props {
    setInterviewErrorMessage: Dispatch<SetStateAction<string>>;
    setHasInterview: Dispatch<SetStateAction<boolean>>;
    interviewId: string;
}

function CancelInterview({ setInterviewErrorMessage, setHasInterview, interviewId }: Props) {

    //Cancel Interview
    const cancelInterview = (interviewId: string) => {
        let data = {
            interviewId: interviewId,
        };

        axios
            .post(import.meta.env.VITE_API_URL + "/api/interviews/cancel", data)
            .then((res) => {
                console.log(res.data.success.message);
                setHasInterview(false);
                setInterviewErrorMessage("");
            })
            .catch((err) => {
                console.log("Error :", err.response.data.error.message);
                setInterviewErrorMessage(err.response.data.error.message)
            });
    };

    return (<button
        type="button"
        className="btn btn-outline-danger mt-3 mx-1 pt-1 pb-1 w-25"
        onClick={() => {
            cancelInterview(interviewId);
        }}
    >
        Cancel Interview
    </button>)
}

export default CancelInterview;