import React, { useState, useMemo } from 'react';
import { PlaceList } from "../components";

export function SearchPlace ({ places }) {
  // 検索条件
  const [filterQuery, setFilterQuery] = useState({});

  //検索並び替え機能
  const filteredPlace = useMemo(() => {
    let tmpPlaces = places;

    // 入力した文字は小文字にする
    const filterName = filterQuery.name && filterQuery.name.toLowerCase();

    // 絞り込み検索
    tmpPlaces = tmpPlaces.filter(row => {
      // 名前で絞り込み
      if (
          filterQuery.name &&
          String(row.name).toLowerCase().indexOf(filterName) === -1
      ) {
          return false;
      }
      // カテゴリーで絞り込み
      /* if (
          filterQuery.category_id &&
          row.category !== parseInt(filterQuery.category_id)
      ) {
          return false;
      } */
      return row;
    });

    return tmpPlaces;
  }, [filterQuery, places]);//useMemo

  // 入力した情報をfilterQueryに入れる
  const handleFilter = e => {
    const { name, value } = e.target;
    setFilterQuery({ ...filterQuery, [name]: value });  
  };

  return (
    <>
      <div className="search_area">
        <input type="text" name="name" className="form-input card" placeholder="会場名で検索"
          value={filterQuery.name || ''}
          onChange={handleFilter}
        />
      </div>
      {filteredPlace.map((place) => {
        return <PlaceList key={place.id} place={place} />;
      })}
    </>
  );
};
