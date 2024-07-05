import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";

//interfaces
interface Stack {
  _id: string;
  name: string;
}
interface Position {
  _id: string;
  name: string;
}

function AddCandidatePage() {
  const [stacksList, setStacksList] = useState<Stack[]>([]);
  const [positionList, setPositionList] = useState<Position[]>([]);
  const[isCreatingCandidate, setIsCreatingCandidate] = useState(false);

  const [candidateCreateErrorMessage, setCandidateCreateErrorMessage] = useState(false);

  //redirecting
  const navigate = useNavigate();

  //fetch stacks list
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/stacks")
      .then((res) => {
        setStacksList(res.data.success.data);
      })
      .catch((err) => {
        console.log("Error :" + err.message);
      });
  }, []);

  //fetch positions list
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/positions")
      .then((res) => {
        setPositionList(res.data.success.data);
      })
      .catch((err) => {
        console.log("Error :" + err.message);
      });
  }, []);

  //validate form
  const schema = z.object({
    name: z.string().min(1, "Please enter a name"),
    email: z.string().email("Please enter a valid email"),
    stack: z.string().min(1, "Please choose a stack"),
    position: z.string().min(1, "Please choose a position"),
    file: z
      .instanceof(FileList)
      .refine((files) => files.length == 1, {
        message: "Please upload a file",
      })
      .refine((files) => "application/pdf" == files[0]?.type, {
        message:
          "File type not supported. Please upload a PDF file.",
      }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //Submit form
  const submitCandidate = (data: FormData) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("stack", data.stack);
    formData.append("position", data.position);
    formData.append("cv", data.file[0]);

    //start loader
    setIsCreatingCandidate(true);

    axios
      .post(import.meta.env.VITE_API_URL + "/api/candidates/create", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).finally(()=>{
        //stop loader
        setIsCreatingCandidate(false);
      })
      .then((res) => {
        //position not found
        if(res.data.success.data == null){
          setCandidateCreateErrorMessage(res.data.success.message);
          return;
        }

        navigate("/list");
      })
      .catch((err) => {
        console.log("Error :",err.message);
        setCandidateCreateErrorMessage(err.response.data.error.message);
      });
  };

  //return component
  return (
    <MainLayout>
      <div className="container align-items-center full-height">
        <div className="row justify-content-center">
          <div className="col-8">
            <h1 className="my-5 text-center display-2">CV Upload</h1>
            <form onSubmit={handleSubmit(submitCandidate)}>
              <div className="input-group">
                <label htmlFor="name" className="input-group-text label-width">
                  Full Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="form-control"
                  placeholder="John Doe"
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  id="name"
                />
              </div>
              <div className="cv-error-message mt-0 px-2">
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div className="input-group mt-3">
                <label htmlFor="email" className="input-group-text label-width">
                  E-mail
                </label>
                <input
                  {...register("email")}
                  type="text"
                  className="form-control"
                  placeholder="John@example.com"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  id="email"
                />
              </div>
              <div className="cv-error-message mt-0 px-2">
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className="input-group mt-3">
                <label className="input-group-text label-width" htmlFor="stack">
                  Stack
                </label>
                <select
                  {...register("stack")}
                  className="form-select"
                  id="stack"
                  defaultValue=""
                >
                  <option value="">Choose...</option>
                  {stacksList.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="cv-error-message mt-0 px-2">
                {errors.stack && <p>{errors.stack.message}</p>}
              </div>
              <div className="input-group mt-3">
                <label
                  className="input-group-text label-width"
                  htmlFor="position"
                >
                  Position
                </label>
                <select
                  {...register("position")}
                  className="form-select"
                  id="position"
                  defaultValue=""
                >
                  <option value="">Choose...</option>
                  {positionList.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="cv-error-message mt-0 px-2">
                {errors.position && <p>{errors.position.message}</p>}
              </div>
              <div className="input-group mt-3">
                <label className="input-group-text label-width" htmlFor="cv">
                  Upload CV
                </label>
                <input
                  accept="application/pdf"
                  type="file"
                  className="form-control"
                  id="cv"
                  {...register("file")}
                />
              </div>
              <div className="cv-error-message mt-0 px-2 pb-0 mb-0">
                {errors.file && <p>{errors.file.message}</p>}
              </div>
              <div className="input-group justify-content-center mt-3">
                <button className="btn btn-outline-secondary" type="submit">
                  Create Candidate
                </button>
              </div>
            </form>
            <div className="d-flex justify-content-center cv-error-message mt-2">
              {isCreatingCandidate ? <RotatingLines strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="50"
                  visible={true} /> : <h3 className="text-center">{candidateCreateErrorMessage}</h3>}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AddCandidatePage;
