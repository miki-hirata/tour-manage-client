import {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  tabs: {
    background: '#fff',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};

export function TesPage() {
  const [index, setIndex] = useState(0);

  const handleChange = (ind) => {
    setIndex(ind)
  }
  return (
    <>
      <Tabs
        value={index}
        fullWidth
        onChange={(e,value)=>handleChange(value)}
        style={styles.tabs}
        variant="fullWidth"
        indicatorColor="primary"
      >
        <Tab label="tab n°1" />
        <Tab label="tab n°2" />
        <Tab label="tab n°3" />
      </Tabs>

      <SwipeableViews
        enableMouseEvents
        resistance
        animateHeight
        index={index}
        onChangeIndex={(index) => handleChange(index)}
      >
        <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
        <div style={Object.assign({}, styles.slide, styles.slide2)}>
          slide n°2
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
      </SwipeableViews>
    </>
  );
}