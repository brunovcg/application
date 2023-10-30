import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

export default function DebugQueries() {
  const queryClient = useQueryClient();

  const getMappedQueries = () =>
    queryClient
      .getQueryCache()
      .getAll()
      .reduce(
        (acc, current) => {
          if (current.state.status !== 'success') {
            return acc;
          }
          acc.keys.push(current.queryKey as string);
          acc.queries.push({ key: current.queryKey as string, data: current.state.data });

          return acc;
        },
        { keys: [], queries: [] } as { keys: string[]; queries: { key: string; data: unknown }[] }
      );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mappedQueries, setMappedQueries] = useState(getMappedQueries());

  useEffect(() => {
    console.log(
      queryClient
        .getQueryCache()
        .getAll()
        .map((it) => ({ [it.queryKey as string]: it.state.data }))
    );
  }, []);

  return (
    <div className="im-debug-queries">
      <div>
        {mappedQueries.keys.map((key) => (
          <div key={key}>{key}</div>
        ))}
      </div>
    </div>
  );
}
