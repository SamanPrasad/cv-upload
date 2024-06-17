import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  const createCandidate = (event: FormEvent) => {
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

  //validate form
  const schema = z.object({
    name: z.string().nonempty("Name cannot be empty"),
    email: z.string().nonempty("E-Mail cannot be empty"),
    stack: z.string().nonempty("Stack cannot be empty"),
    position: z.string().nonempty("Stack cannot be empty"),
    cv: z.object({
      name: z.string().min(1, "erro errorrr"), // Ensure the filename is not empty
      type: z.string().regex(/pdf$/), // Validate that the file type is PDF
      size: z.number().max(5242880), // Limit the file size to 5MB (5242880 bytes)
    }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const test = (data: FormData) => console.log(data);
  //return component
  return (
    <MainLayout>
      <div className="container align-items-center full-height">
        <div className="row justify-content-center">
          <div className="col-8">
            <h1 className="my-5 text-center display-2">CV Upload</h1>
            <form onSubmit={handleSubmit(test)}>
              <div className="input-group mb-3">
                <label htmlFor="name" className="input-group-text label-width">
                  Full Name
                </label>
                <input
                  // ref={refName}
                  {...register("name")}
                  type="text"
                  className="form-control"
                  placeholder="John Doe"
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  id="name"
                  name="name"
                />
                {errors.name && <p>Error Name</p>}
              </div>
              <div className="input-group mb-3">
                <label htmlFor="email" className="input-group-text label-width">
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
                  name="email"
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
                  name="stack"
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
                  name="position"
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
                {errors.cv && <p>{errors.cv.message}</p>}
              </div>
              <div className="input-group justify-content-center">
                <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  // onClick={createCandidate}
                >
                  Create Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AddCandidate;
