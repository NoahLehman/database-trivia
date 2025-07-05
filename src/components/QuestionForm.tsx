import { FormEvent, useState } from 'react';
import { decodeHtml } from '../utils/decodeHtml';

export interface TriviaQuestion {
  question: string;
  correct: string;
  answers: string[];
}

interface Props {
  q: TriviaQuestion;
  selected: string;
  onSelect: (val: string) => void;
  onSubmit: () => void;
  apiError: string | null;
}

/** ❓ Question + answer radio-group */
export default function QuestionForm({
  q,
  selected,
  onSelect,
  onSubmit,
  apiError,
}: Props) {
  const [formErr, setFormErr] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selected) {
      setFormErr('Choose an answer.');
      return;
    }
    setFormErr('');
    onSubmit();
  };

  return (
    <form className="card shadow-sm p-4" onSubmit={handleSubmit}>
      <h2 className="h4 mb-4">Question</h2>
      <p className="fw-semibold">{q.question}</p>

      {q.answers.map((ans) => (
        <div className="form-check" key={ans}>
          <input
            className="form-check-input"
            type="radio"
            id={ans}
            value={ans}
            checked={selected === ans}
            onChange={() => onSelect(ans)}
          />
          <label className="form-check-label" htmlFor={ans}>
            {decodeHtml(ans)}
          </label>
        </div>
      ))}

      {formErr && <div className="text-danger mt-2">{formErr}</div>}
      {apiError && <div className="alert alert-danger mt-2">{apiError}</div>}

      <button className="btn btn-success mt-3">Submit Answer</button>
    </form>
  );
}
