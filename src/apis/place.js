import { request } from "./index";

export async function getPlaces(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/places?${params.toString()}`);
}

export async function getPlace(placeId) {
  return request(`/places?id=${placeId}`);
}

export async function getPlaceEvents(placeId) {
  return request(`/places/events?id=${placeId}`);
}

export async function getPlaceMemos(placeId) {
  return request(`/places/memos?id=${placeId}`);
}

//POSTリクエストをまとめる　typeに文字列で挿入する
export async function postPlace(place, type){
  return request(`/places/${type}`, {
    body: JSON.stringify(place),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export async function handleDeletePlace(content) {
  const place = {
    "id": content.target.elements.id.value,
  };
  await postPlace(place, 'delete');
}