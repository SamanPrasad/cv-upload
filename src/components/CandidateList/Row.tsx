import axios from "axios";
import { useContext, useRef, useState } from "react";
import { CandidateContext } from "../../pages/CandidateListPage";

interface Props {
  candidate: Candidate;
  index: number
}

interface Candidate {
  _id: string;
  name: string;
  email: string;
  cvUrl: string;
  no_of_questions: number;
}

function Row({ candidate, index }: Props) {
  const { candidatesList, setCandidatesList } = useContext(CandidateContext);
  const [countUpdateErrorMessage, setCountUpdateErrorMessage] = useState("")
  const [isEnabled, setIsEnabled] = useState(false);
  const[cssClass, setCssClass] = useState("");
  const refCount = useRef<HTMLInputElement>(null);

  //Update count
  const updateCount = (candidateId: string) => {
    if (isEnabled) {
      const count = refCount.current?.value;
      const data = {
        candidateId: candidateId,
        noOfQuestions: count,
      };

      axios
        .put(import.meta.env.VITE_API_URL + "/api/candidates/update-no-of-questions", data)
        .then((res) => {
          const candidatesTemp = [...candidatesList];
          candidatesTemp[index].no_of_questions = Number(count);
          setCandidatesList(candidatesTemp);
          setIsEnabled(!isEnabled);
        })
        .catch((err) => {
          console.log("Error :" + err.response.data.error.message);
          setCountUpdateErrorMessage(err.response.data.error.message)
          setCssClass("cv-show")
        });
    } else {
      setIsEnabled(!isEnabled);
    }
  };

  return (
    <tr key={candidate._id}>
      <td>•</td>
      <td className="cv-td">{candidate.name}</td>
      <td className="cv-td">{candidate.email}</td>
      <td>
        <div className="d-flex align-items-center">
          <input
            className="cv-list-input"
            type="number"
            min={1}
            defaultValue={candidate.no_of_questions}
            ref={refCount}
            disabled={isEnabled ? false : true}
            onPaste={(e: any) => {
              e.preventDefault();
              return false;
            }}
          />
          <button
            type="submit"
            className={
              isEnabled
                ? "btn btn-primary mx-1 ms-2 py-0"
                : "btn btn-outline-primary mx-1 ms-2 py-0"
            }
            onClick={() => {
              updateCount(candidate._id);
            }}
          >
            {isEnabled ? "Update" : "Edit"}
          </button>
        </div>
        <div className={"p-0 cv-response-message"+cssClass+" cv-error-message"}>
          <p className="text-center m-0 p-0">{countUpdateErrorMessage}</p>
        </div>
      </td>
      <td>
        <a href={candidate.cvUrl} className="cv-anchor btn btn-outline-primary mx-1 py-0">
          Download CV
        </a>
        <a
          href={import.meta.env.VITE_BASE_URL + "/view/" + candidate._id}
          className="cv-anchor btn btn-outline-primary mx-1 py-0"
        >
          View
        </a>
      </td>
    </tr>
  );
}

export default Row;
