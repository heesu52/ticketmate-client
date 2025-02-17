export async function fetchWithErrorHandling<T = unknown>(
  fetchPromise: Promise<Response>,
): Promise<T> {
  const response = await fetchPromise;

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorText}`);
  }

  return response.json() as Promise<T>;
}
