import { XCircleIcon } from "@heroicons/react/solid";
import { useAuth } from "../../contexts/AuthContext";

export default function ErrorMessage() {
  // Accessing error state and setError function from AuthContext
  const { error, setError } = useAuth();

  // Render error message component if error exists
  return (
    error && (
      <div className="flex justify-center">
        <div className="rounded-md max-w-md w-full bg-red-50 p-4 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {/* Close icon to dismiss error */}
              <XCircleIcon
                onClick={() => setError("")}
                className="h-5 w-5 text-red-400 cursor-pointer"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              {/* Display error message */}
              <h3 className="text-sm font-medium text-red-800">
                Error: {error}
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
