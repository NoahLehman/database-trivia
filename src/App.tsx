import { useState } from 'react';
import HomeForm, { UserConfig } from './components/HomeForm';
import QuestionForm, { TriviaQuestion } from './components/QuestionForm';
import Results from './components/Results';
import { decodeHtml } from './utils/decodeHtml';

type Stage = 'home' | 'question' | 'result';

export default function App() {
  const [stage, setStage] = useState<Stage>('home');
  const [user, setUser] = useState<UserConfig | null>(null);
  const [q, setQ] = useState<TriviaQuestion | null>(null);
  const [apiErr, setApiErr] = useState<string | null>(null);
  const [selected, setSelected] = useState('');
  const [correct, setCorrect] = useState<boolean | null>(null);

  /** fetches a single MCQ from Open Trivia DB */
  const loadQuestion = async (cfg: UserConfig) => {
    setApiErr(null);
    const url = `https://opentdb.com/api.php?amount=1&type=multiple&category=${cfg.category}&difficulty=${cfg.difficulty}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.response_code !== 0 || !data.results?.length)
        throw new Error('No question found.');
      const r = data.results[0];
      const answers = [...r.incorrect_answers, r.correct_answer].sort(
        () => Math.random() - 0.5,
      );
      setQ({
        question: decodeHtml(r.question),
        correct: decodeHtml(r.correct_answer),
        answers,
      });
      setStage('question');
    } catch (err: unknown) {
      setApiErr((err as Error).message);
    }
  };

  /** HOME → QUESTION */
  const handleHomeSubmit = (cfg: UserConfig) => {
    setUser(cfg);
    loadQuestion(cfg);
  };

  /** QUESTION → RESULT */
  const handleQuestionSubmit = () => {
    if (!q) return;
    setCorrect(selected === q.correct);
    setStage('result');
  };

  /** restart flow */
  const restart = () => {
    setStage('home');
    setQ(null);
    setSelected('');
    setCorrect(null);
    setApiErr(null);
  };

  return (
    <div className="container py-4">
      {stage === 'home' && <HomeForm onSubmit={handleHomeSubmit} />}

      {stage === 'question' && q && (
        <QuestionForm
          q={q}
          selected={selected}
          onSelect={setSelected}
          onSubmit={handleQuestionSubmit}
          apiError={apiErr}
        />
      )}

      {stage === 'result' && correct !== null && q && user && (
        <Results
          name={user.name}
          correct={correct}
          correctAnswer={q.correct}
          onRestart={restart}
        />
      )}
    </div>
  );
}
