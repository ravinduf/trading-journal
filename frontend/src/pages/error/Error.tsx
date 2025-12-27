
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const Error = () => {
  const error: unknown = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  }

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{(error instanceof Error && (error as Error).message) || "Unknown error"}</p>
    </div>

  );
};

export default Error;
