import { request } from "./index";

//GETリクエスト
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


export async function getEventCats(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/eventcats?${params.toString()}`);
}

export async function getEventCat(eventCatId) {
  return request(`/events?id=${eventCatId}`);
}

//POSTリクエスト　typeに文字列で挿入する
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


export async function postEventCat(eventCat, type){
  return request(`/eventcats/${type}`, {
    body: JSON.stringify(eventCat),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}