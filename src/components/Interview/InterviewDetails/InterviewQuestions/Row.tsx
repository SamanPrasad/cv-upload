interface Props {
  question: Question;
  index:number
}

interface Question {
  id: number;
  question: string;
  answer: string;
  candidateAnswers: string;
}

function Row({ question, index }: Props) {
  return (
    <tr key={question.id}>
      <td>{index + 1}</td>
      <td>{question.question}</td>
      <td>{question.answer}</td>
      <td>{question.candidateAnswers}</td>
    </tr>
  );
}

export default Row;
