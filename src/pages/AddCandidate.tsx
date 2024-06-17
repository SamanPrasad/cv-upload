import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCandidate() {
  //interfaces
  interface Stack {
    id: number;
    name: string;
  }

  interface Position {
    id: number;
    position: string;
  }

  //input data
  const refName = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refStack = useRef<HTMLSelectElement>(null);
  const refPosition = useRef<HTMLSelectElement>(null);
  const refCv = useRef<HTMLInputElement>(null);

  const [stacksList, setStacksList] = useState<Stack[]>([]);
  const [positionList, setPositionList] = useState<Position[]>([]);

  //redirecting
  const navigate = useNavigate();

  //Handle submit
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let formData = new FormData();
    if (refName.current) {
      formData.append("name", refName.current.value);
    }
    if (refEmail.current) {
      formData.append("email", refEmail.current.value);
    }
    if (refStack.current) {
      formData.append("stack", refStack.current.value);
    }
    if (refPosition.current) {
      formData.append("position", refPosition.current.value);
    }
    if (refCv.current && refCv.current.files) {
      formData.append("file", refCv.current.files[0]);
    }

    console.log(formData);
    axios.post(import.meta.env.VITE_TEST_API + "/create", formData).then(() => {
      navigate("/list");
    });
  };

  //fetch stacks list
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/stacks")
      .then((res) => {
        setStacksList(res.data);
      })
      .catch((err) => {
        console.log("Error :" + err.message);
      });
  }, []);

  //fetch positions list
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/positions")
      .then((res) => {
        setPositionList(res.data);
      })
      .catch((err) => {
        console.log("Error :" + err.message);
      });
  }, []);

  //return component
  return (
    <div className="container align-items-center full-height">
      <div className="row justify-content-center">
        <div className="col-8">
          <h1 className="my-5 text-center display-2">CV Upload</h1>
          <form>
            <div className="input-group mb-3">
              <label
                htmlFor="name"
                className="input-group-text label-width"
                id="basic-addon1"
              >
                Full Name
              </label>
              <input
                ref={refName}
                type="text"
                className="form-control"
                placeholder="John Doe"
                aria-label="name"
                aria-describedby="basic-addon1"
                id="name"
              />
            </div>
            <div className="input-group mb-3">
              <label
                htmlFor="email"
                className="input-group-text label-width"
                id="basic-addon1"
              >
                E-mail
              </label>
              <input
                ref={refEmail}
                type="text"
                className="form-control"
                placeholder="John@example.com"
                aria-label="email"
                aria-describedby="basic-addon1"
                id="email"
              />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text label-width" htmlFor="stack">
                Stack
              </label>
              <select
                ref={refStack}
                className="form-select"
                id="stack"
                defaultValue=""
              >
                <option value="">Choose...</option>
                {stacksList.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <label
                className="input-group-text label-width"
                htmlFor="position"
              >
                Position
              </label>
              <select
                ref={refPosition}
                className="form-select"
                id="position"
                defaultValue=""
              >
                <option value="">Choose...</option>
                {positionList.map((item, index) => (
                  <option key={index} value={item.position}>
                    {item.position}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text label-width" htmlFor="cv">
                Upload CV
              </label>
              <input
                accept="application/pdf"
                ref={refCv}
                type="file"
                className="form-control"
                id="cv"
                name="cv"
              />
            </div>
            <div className="input-group justify-content-center">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleSubmit}
              >
                Create Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCandidate;
