import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import { useHistory } from 'react-router-dom';

export function TestPage() {
 
  const history = useHistory();
  const move = () => {
    history.push('/events'); // 画面遷移
  };

  return (
  <SwipeableList>
    <SwipeableListItem
      swipeLeft={{
        content: <div>Revealed content during swipe</div>,
        action: move
      }}
      swipeRight={{
        content: <div>Revealed content during swipe</div>,
        action: () => console.info('右にスワイプしたよ')
      }}
      //onSwipeProgress={progress => console.info(`Swipe progress: ${progress}%`)}
    >
      <div>Item name</div>
    </SwipeableListItem>
  </SwipeableList>
  )
}