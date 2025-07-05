import { FormEvent, useState } from 'react';

export interface UserConfig {
  name: string;
  category: string;
  difficulty: string;
}
interface Props {
  onSubmit: (cfg: UserConfig) => void;
}

/** 🏠 Landing form (single state object) */
export default function HomeForm({ onSubmit }: Props) {
  const [form, setForm] = useState<UserConfig>({
    name: '',
    category: '',
    difficulty: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  /** basic required-field validation */
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.category) e.category = 'Required';
    if (!form.difficulty) e.difficulty = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form className="card shadow-sm p-4" onSubmit={handleSubmit}>
      <h1 className="h3 mb-2">Weekly Knowledge Check</h1>
      <p className="text-muted mb-4">
        Enter your details, choose a category & difficulty, then test yourself!
      </p>

      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          name="name"
          className={`form-control ${errors.name && 'is-invalid'}`}
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          name="category"
          className={`form-select ${errors.category && 'is-invalid'}`}
          value={form.category}
          onChange={handleChange}
        >
          <option value="">-- select --</option>
          <option value="9">General Knowledge</option>
          <option value="17">Science & Nature</option>
          <option value="23">History</option>
          <option value="21">Sports</option>
        </select>
        {errors.category && (
          <div className="invalid-feedback">{errors.category}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Difficulty</label>
        <select
          name="difficulty"
          className={`form-select ${errors.difficulty && 'is-invalid'}`}
          value={form.difficulty}
          onChange={handleChange}
        >
          <option value="">-- select --</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        {errors.difficulty && (
          <div className="invalid-feedback">{errors.difficulty}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Get Question
      </button>
    </form>
  );
}
