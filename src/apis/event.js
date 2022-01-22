import { request } from "./index";

//各パスへGETリクエストを行う関数
export async function getEvents(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/events?${params.toString()}`);
}

export async function getEvent(eventId) {
  return request(`/events?id=${eventId}`);
}


//POSTリクエストをまとめる　typeに文字列で挿入する
//リダイレクト処理が上手くいっていない
async function postEvent(event, type){
  return request(`/events/${type}`, {
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export async function handleAddEvent(content) {
  const event = {
    "name": content.target.elements.name.value,
    "date": content.target.elements.date.value,
    "placeId": content.target.elements.placeId.value,
    "memo": content.target.elements.memo.value
  };
  await postEvent(event, 'add');
}

export async function handleEditEvent(content) {
  const event = {
    "id": content.target.elements.id.value,
    "name": content.target.elements.name.value,
    "date": content.target.elements.date.value,
    "placeId": content.target.elements.placeId.value,
    "memo": content.target.elements.memo.value
  };
  await postEvent(event, 'edit');
}

export async function handleDeleteEvent(content) {
  const event = {
    "id": content.target.elements.id.value,
  };
  await postEvent(event, 'delete');
}
