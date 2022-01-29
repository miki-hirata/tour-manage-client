import { request } from "./index";

//各パスへGETリクエストを行う関数
export async function getEventCats(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/eventcats?${params.toString()}`);
}

export async function getEventCat(eventCatId) {
  return request(`/events?id=${eventCatId}`);
}

//POSTリクエストをまとめる　typeに文字列で挿入する
//リダイレクト処理が上手くいっていない
export async function postEventCat(eventCat, type){
  return request(`/eventcats/${type}`, {
    body: JSON.stringify(eventCat),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}
/* 
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
 */