interface Props {
  questions: {
    id: number;
    question: string;
    answer: string;
    candidateAnswer: string;
    isCorrect: string;
  }[];
}
function InterviewQuestions({ questions }: Props) {
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
                  {questions.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.question}</td>
                      <td>{item.answer}</td>
                      <td>{item.candidateAnswer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewQuestions;
