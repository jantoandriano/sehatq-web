type ErrorWithStatus = {
  status: number;
};

function isErrorWithStatus(error: unknown): error is ErrorWithStatus {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as Record<string, unknown>).status === "number"
  );
}

function toErrorWithStatus(maybeError: unknown): ErrorWithStatus {
  if (isErrorWithStatus(maybeError)) return maybeError;
  return { status: 500 };
}

export function getErrorStatus(error: unknown) {
  return toErrorWithStatus(error).status;
}
