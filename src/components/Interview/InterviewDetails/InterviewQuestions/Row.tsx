interface Props {
  question: Question;
}

interface Question {
  id: number;
  question: string;
  answer: string;
  candidateAnswer: string;
}

function Row({ question }: Props) {
  return (
    <tr key={question.id}>
      <td>{question.id}</td>
      <td>{question.question}</td>
      <td>{question.answer}</td>
      <td>{question.candidateAnswer}</td>
    </tr>
  );
}

export default Row;
