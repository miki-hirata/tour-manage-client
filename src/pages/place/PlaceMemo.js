import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainArea, Loading, StyledCard, CardInner, HeadSubFont } from "../../components";
import { getPlaceMemos } from "../../apis";

function PlaceMemoList({ placeMemo }) {
  return (
    <StyledCard
      variant="outlined"
      key={placeMemo.id}
    >
      <CardInner>
        <HeadSubFont>{placeMemo.memo}</HeadSubFont>
        <HeadSubFont>{placeMemo.User.name}</HeadSubFont>
      </CardInner>
    </StyledCard>
  );
}


export function PlaceMemoPage({ }) {
  const [placeMemos, setPlaceMemos] = useState(null);
  const params = useParams();
  
  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getPlaceMemos(params.placeId).then((data) => {
      if (!unmounted) {
        setPlaceMemos(data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);


  return (
    <MainArea>
      {placeMemos == null ? (
        <Loading />
      ) : (
        <>
          {placeMemos[0] == null ? (
            <StyledCard
              variant="outlined"
            >
              <CardInner>
                <p>会場メモが登録されていません</p>
              </CardInner>
            </StyledCard>
          ) : (
            placeMemos.map((placeMemo) => {
              return <PlaceMemoList key={placeMemo.id} placeMemo={placeMemo} />;
          })
          )}
        </>
      )}
    </MainArea>
  );
}

