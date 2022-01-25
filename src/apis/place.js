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

export async function handleAddPlace(content) {
  const place = {
    "name": content.target.elements.name.value,
    "memo": content.target.elements.memo.value,
    "country": content.target.elements.country.value,
    "postalCode": content.target.elements.postalCodeH.value + '-' + content.target.elements.postalCodeF.value,
    "prefecture": content.target.elements.prefecture.value,
    "city": content.target.elements.city.value,
    "street": content.target.elements.street.value,
    "tel": content.target.elements.tel.value,
    "fax": content.target.elements.fax.value
  };
  await postPlace(place, 'add')
}

export async function handleEditPlace(content) {
  const place = {
    "id": content.target.elements.id.value,
    "name": content.target.elements.name.value,
    "memo": content.target.elements.memo.value
  };
  await postPlace(place, 'edit');
}

export async function handleDeletePlace(content) {
  const place = {
    "id": content.target.elements.id.value,
  };
  await postPlace(place, 'delete');
}