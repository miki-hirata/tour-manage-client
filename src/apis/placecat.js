import { request } from "./index";

//各パスへGETリクエストを行う関数
export async function getPlaceCats(arg = {}) {
  const params = new URLSearchParams(arg);
  return request(`/placecats?${params.toString()}`);
}

export async function getPlaceCat(placeCatId) {
  return request(`/placecats?id=${placeCatId}`);
}


//POSTリクエストをまとめる　typeに文字列で挿入する
//リダイレクト処理が上手くいっていない
export async function postPlaceCat(placeCat, type){
  return request(`/placecats/${type}`, {
    body: JSON.stringify(placeCat),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

/* 
export async function handleDeleteEvent(content) {
  const event = {
    "id": content.target.elements.id.value,
  };
  await postEvent(event, 'delete');
}
 */