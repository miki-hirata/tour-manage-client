import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'

export function FormatUpdate({ updateAt }) {
  const targetDate = new Date(updateAt)
  return (
    <div>
      <div>最終更新: {formatDistanceToNow(targetDate, {locale: ja})}前</div>
    </div>
  );
}
