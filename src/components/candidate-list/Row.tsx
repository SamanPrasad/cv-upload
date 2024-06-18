import axios from "axios";
import { useRef, useState } from "react";

interface Props {
  candidate: Candidate;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  url: string;
  no_of_questions: number;
}

function Row({ candidate }: Props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const refCount = useRef<HTMLInputElement>(null);

  const updateCount = (candidateId: string) => {
    if (isEnabled) {
      const count = refCount.current?.value;
      const data = {
        candidateId: candidateId,
        noOfQuestions: count,
      };

      axios
        .put(import.meta.env.VITE_TEST_API + "/update", data)
        .then((res) => {
          console.log("Successful!");
        })
        .catch((err) => console.log("Update Error :" + err.message));
    }

    setIsEnabled(!isEnabled);
  };

  return (
    <tr key={candidate.id}>
      <td>•</td>
      <td className="cv-td">{candidate.name}</td>
      <td className="cv-td">{candidate.email}</td>
      <td className="d-flex justify-content-start align-items-center">
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
            setIsEnabled(!isEnabled);
            updateCount(candidate.id);
          }}
        >
          {isEnabled ? "Update" : "Edit"}
        </button>
      </td>
      <td>
        <button type="button" className="btn btn-outline-primary mx-1 py-0">
          <a href={candidate.url} className="cv-anchor">
            Download CV
          </a>
        </button>
        <button type="button" className="btn btn-outline-primary mx-1 py-0">
          <a
            href={import.meta.env.VITE_BASE_URL + "/view/" + candidate.id}
            className="cv-anchor"
          >
            View
          </a>
        </button>
      </td>
    </tr>
  );
}

export default Row;
