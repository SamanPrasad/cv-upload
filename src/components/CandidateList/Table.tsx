import Row from "./Row";

interface Props {
  candidates: {
    _id: string;
    name: string;
    email: string;
    url: string;
    no_of_questions: number;
  }[];
}

function Table({ candidates }: Props) {
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
            <Row candidate={item} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
