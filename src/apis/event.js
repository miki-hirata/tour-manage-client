import { request } from "./index";

//各パスへGETリクエストを行う関数
export async function getEvents(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/events?${params.toString()}`);
}

export async function getEvent(eventId) {
  return request(`/events?id=${eventId}`);
}

export async function getEventSches(eventId) {
  return request(`/events/sches?id=${eventId}`);
}

//POSTリクエストをまとめる　typeに文字列で挿入する
//リダイレクト処理が上手くいっていない
export async function postEvent(event, type){
  return request(`/events/${type}`, {
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export async function postEventSches(event, type){
  return request(`/eventSches/${type}`, {
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export async function handleDeleteEvent(content) {
  const event = {
    "id": content.target.elements.id.value,
  };
  await postEvent(event, 'delete');
}
