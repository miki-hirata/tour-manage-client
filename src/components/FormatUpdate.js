import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'
import styled from "styled-components";

export function FormatUpdate({ updateAt }) {
  const targetDate = new Date(updateAt)
  return (
    <UpdateStyle>
      <p>最終更新: {formatDistanceToNow(targetDate, {locale: ja})}前</p>
    </UpdateStyle>
  );
}


const UpdateStyle = styled.div`
position: absolute;
right: 70px;
bottom: 30px;
p{
  font-size: 14px;;
}
`;