'use client';
export interface ErrorProps {
  error: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  reset: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>Что-то пошло не так!</h2>
      <strong style={{ color: 'white' }}>
        Ошибка {error.status ? `: ${error.status}` : ''}!
      </strong>
      {error.data && (
        <div style={{ color: 'white' }}>
          <p>Сообщение: {error.data.message || 'Неизвестная ошибка'}</p>
        </div>
      )}
      <button onClick={() => reset()}>Попробовать снова</button>
    </div>
  );
}
