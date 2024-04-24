export function request(
  url: string | URL | Request,
  init?: RequestInit | undefined,
) {
  return fetch(url, init);
}
