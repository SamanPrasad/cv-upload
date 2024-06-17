import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleView from "../components/SingleView";
import PageNotFound from "../components/PageNotFound";

function Candidate() {
  const { userId } = useParams();
  const [component, setComponent] = useState<ReactElement>();
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_TEST_API + "/candidate/" + userId)
      .then((res) => {
        const element = (
          <SingleView
            userDetails={res.data.success.data.userDetails}
            interviewDetails={res.data.success.data.interviewDetails}
            questions={res.data.success.data.questions}
          />
        );
        setComponent(element);
        console.log(res.data.success.message);
      })
      .catch((err) => {
        if (err.response?.status) {
          const element = <PageNotFound />;
          setComponent(element);
        }
      });
  }, []);

  return <div>{component}</div>;
}

export default Candidate;
