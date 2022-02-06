
export * from "./event.js";
export * from "./place.js";
export * from "./tour.js";


//共通処理
export async function request(path, options = {}) {
  const url = `${process.env.REACT_APP_API_ORIGIN}${path}`;
  const response = await fetch(url, options);
  return response.json();
}