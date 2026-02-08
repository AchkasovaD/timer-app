import React, { useState } from "react";

interface QuestionScreenProps {
  onStateChange: (state: string) => void;
  onSetDuration: (minutes: number) => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  onStateChange,
  onSetDuration,
}) => {
  const [minutes, setMinutes] = useState<number>(25);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (minutes < 1 || minutes > 120) {
      setError("Введите число от 1 до 120");
      return;
    }

    if (minutes > 60) {
      if (!window.confirm(`${minutes} минут - это долго! Ты уверена?`)) {
        return;
      }
    }

    onSetDuration(minutes);
    onStateChange("timer");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinutes(value || 0);
    setError("");
  };

  return (
    <div className="Question">
      <div className="Question-content">
        <p>
          Сколько нужно времени <br></br> (в минутках)?
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="minutes"
            min="1"
            max="120"
            value={minutes}
            onChange={handleChange}
            placeholder="25"
            autoFocus
          />

          {error && (
            <div
              className="error-message"
              style={{ color: "#ffcccc", margin: "10px 0" }}
            >
              {error}
            </div>
          )}

          <div
            className="quick-buttons"
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <button
              type="button"
              onClick={() => setMinutes(5)}
              className="quick-btn"
            >
              5 мин
            </button>
            <button
              type="button"
              onClick={() => setMinutes(15)}
              className="quick-btn"
            >
              15 мин
            </button>
            <button
              type="button"
              onClick={() => setMinutes(25)}
              className="quick-btn"
            >
              25 мин
            </button>
            <button
              type="button"
              onClick={() => setMinutes(45)}
              className="quick-btn"
            >
              45 мин
            </button>
          </div>

          <button type="submit">🌸 Начать 🌸</button>
        </form>
      </div>
    </div>
  );
};
