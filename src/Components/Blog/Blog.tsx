import { useEffect, useState } from 'react';

const Blog: React.FC = () => {
  const [result, setResult] = useState<{ message: string; } | null>(null);

  useEffect(() => {
    fetch('/api/auth')
      .then(response => response.json())
      .then(response => setResult(response));
  }, [result]);
  return (
    <>
      <h2>
        This is the blog home page
      </h2>
      <p>Api result: {result && result.message || 'None'}</p>
    </>
  );
};

export default Blog;