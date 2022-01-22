import { handleAddEvent } from "../../apis";

export function EventAddPage({ setHdTitle }) {
  setHdTitle('イベント新規登録')
  return (
    <>
      <form onSubmit={handleAddEvent} className="card">
        <input type="date" name="date" placeholder="日付"/>
        <input type="text" name="name" placeholder="イベント名" className="name_large"/>
        <input type="number" name="placeId" placeholder="会場ID" className="name_large"/>
        <textarea type="text" name="memo" placeholder="メモ" />
        <button type="submit">追加</button>
      </form>
    </>
  );
}
