import { ReactElement } from "react";
import Row from "./Row";

interface Props {
  candidatesList: {
    _id: string;
    name: string;
    email: string;
    cvUrl: string;
    no_of_questions: number;
  }[];
  startingIndex:number;
  endingIndex:number
}

function Table({ candidatesList, startingIndex, endingIndex }: Props) {
  let items:ReactElement[] = [];
  candidatesList.forEach((item, index)=>{
    if(index >=startingIndex && index <= endingIndex){
      items.push(<Row candidate={item} key={index} index={index}/>)
    }
  })

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
          {items}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
