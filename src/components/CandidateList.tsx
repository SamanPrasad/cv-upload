import axios from "axios";
import {
  Dispatch,
  MouseEvent,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";

interface Props {
  candidates: {
    id: number;
    name: string;
    email: string;
    url: string;
    no_of_questions: number;
  }[];
}

interface Candidate {
  id: number;
  name: string;
  email: string;
  url: string;
  no_of_questions: number;
}

function CandidateList({ candidates }: Props) {
  //interfaces
  interface QuestionNumber {
    refInput: RefObject<HTMLInputElement>;
    disabled: Boolean;
    setDisable: Dispatch<SetStateAction<boolean>>;
  }
  //States
  const refInputs: QuestionNumber[] = [];

  //Create ref objects
  const createInputRef = () => {
    const [disabled, setDisabled] = useState(true);

    let questionNumber: QuestionNumber = {
      refInput: useRef(null),
      disabled: disabled,
      setDisable: setDisabled,
    };

    refInputs.push(questionNumber);
    return questionNumber.refInput;
  };

  //Update number of questions
  const updateNumberOfQuestions = (
    candidate: Candidate,
    index: number,
    event: MouseEvent
  ) => {
    const questionNumberObj = refInputs[index];

    //initial value. This is because disabled status is updated asynchronously
    const initialDisableStatus = questionNumberObj.disabled;

    //Change button color
    if (questionNumberObj.disabled) {
      event.currentTarget.classList.remove("btn-outline-primary");
      event.currentTarget.classList.add("btn-primary");
    } else {
      event.currentTarget.classList.add("btn-outline-primary");
      event.currentTarget.classList.remove("btn-primary");
    }

    questionNumberObj.setDisable(!questionNumberObj.disabled);

    if (questionNumberObj.refInput.current) {
      questionNumberObj.refInput.current.disabled =
        questionNumberObj.disabled as boolean;
    }

    const data = JSON.stringify({
      id: candidate.id,
      number: refInputs[index].refInput.current?.value,
    });

    //send request
    !initialDisableStatus &&
      axios
        .post(import.meta.env.VITE_TEST_API + "/update", data, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          console.log("Successful!");
        })
        .catch((err) => console.log("Update Error :" + err.message));
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Full Name</th>
            <th scope="col">E-Mail</th>
            <th scope="col">No. of Questions</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates?.map((item, index) => (
            <tr key={item.id}>
              <td>•</td>
              <td className="cv-td">{item.name}</td>
              <td className="cv-td">{item.email}</td>
              <td className="d-flex justify-content-start align-items-center">
                <input
                  className="cv-list-input"
                  type="text"
                  defaultValue={item.no_of_questions}
                  placeholder={item.no_of_questions.toString()}
                  ref={createInputRef()}
                  disabled={refInputs[index].disabled as boolean}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary mx-1 ms-2 py-0"
                  onClick={(event) =>
                    updateNumberOfQuestions(item, index, event)
                  }
                >
                  {refInputs[index].disabled ? "Edit" : "Update"}
                  Test
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-primary mx-1 py-0"
                >
                  <a href={item.url} className="cv-anchor">
                    Download CV
                  </a>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary mx-1 py-0"
                >
                  <a
                    href={import.meta.env.VITE_BASE_URL + "/view/" + item.id}
                    className="cv-anchor"
                  >
                    View
                  </a>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateList;
