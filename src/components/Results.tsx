interface Props {
  name: string;
  correct: boolean;
  correctAnswer: string;
  onRestart: () => void;
}

/** ☑️ Result & restart */
export default function Results({
  name,
  correct,
  correctAnswer,
  onRestart,
}: Props) {
  return (
    <div className="card shadow-sm p-4 text-center">
      <h2 className="h4 mb-3">Results</h2>

      {correct ? (
        <p className="fs-5">Great job, {name}! Your answer is correct 🎉</p>
      ) : (
        <>
          <p className="fs-5">Nice try, {name} — that was incorrect.</p>
          <p className="text-muted">
            The correct answer was:&nbsp;
            <strong>{correctAnswer}</strong>
          </p>
        </>
      )}

      <button className="btn btn-primary mt-3" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
}
