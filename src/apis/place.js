import { request } from "./index";

//GETリクエスト
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


export async function getPlaceCats(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/placecats?${params.toString()}`);
}

export async function getPlaceCat(placeCatId) {
  return request(`/placecats?id=${placeCatId}`);
}


//POSTリクエスト　typeにadd/deleteなどを文字列で挿入する
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


export async function postPlaceMemo(placeMemo, type){
  return request(`/placememos/${type}`, {
    body: JSON.stringify(placeMemo),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}


export async function postPlaceCat(placeCat, type){
  return request(`/placecats/${type}`, {
    body: JSON.stringify(placeCat),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}