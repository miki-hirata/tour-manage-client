import { request } from "./index";

//各パスへGETリクエストを行う関数
export async function getTours(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/tours?${params.toString()}`);
}

export async function getTour(tourId) {
  return request(`/tours?id=${tourId}`);
}

export async function getTourEvents(tourId) {
  return request(`/tours/events?id=${tourId}`);
}

//POSTリクエストをまとめる　typeに文字列で挿入する
async function postTour(tour, type){
  return request(`/tours/${type}`, {
    body: JSON.stringify(tour),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export async function handleAddTour(content) {
  const tour = {
    "name": content.target.elements.name.value,
    "date": content.target.elements.date.value,
    "placeId": content.target.elements.placeId.value,
    "memo": content.target.elements.memo.value
  };
  await postTour(tour, 'add');
}

export async function handleEditTour(content) {
  const tour = {
    "id": content.target.elements.id.value,
    "name": content.target.elements.name.value,
    "date": content.target.elements.date.value,
    "placeId": content.target.elements.placeId.value,
    "memo": content.target.elements.memo.value
  };
  await postTour(tour, 'edit');
}

export async function handleDeleteTour(content) {
  const tour = {
    "id": content.target.elements.id.value,
  };
  await postTour(tour, 'delete');
}
