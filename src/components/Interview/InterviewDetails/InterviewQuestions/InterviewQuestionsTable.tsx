import { ReactElement } from "react";
import Row from "./Row";
interface Props {
  questionsList: {
    id: number;
    question: string;
    answer: string;
    candidateAnswers: string;
    isCorrect: string;
  }[];
  startingIndex:number,
  endingIndex:number
}
function InterviewQuestionsTable({ questionsList, startingIndex, endingIndex }: Props) {
  let items:ReactElement[] = []

  questionsList.forEach((item, index)=>{
    if(index >= startingIndex && index <=endingIndex){
      items.push(<Row question={item} key={index} index={index} />)
    }
  })
  
  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="row justify-content-center">
            <h1 className="mt-5 pb-1 text-center display-2">
              Interview Questions
            </h1>
          </div>
          <div className="row justify-content-center pb-4">
            <div className="col-7">
              <div className="cv-divider"></div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="table">
                <thead>
                  <tr>
                    <th>Question No.</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Candidate's Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {items}
                  {/* {questions.map((item, index) => (
                    <Row question={item} key={index} />
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewQuestionsTable;
