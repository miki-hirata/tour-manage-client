import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { RootPage } from "./pages/Root.js";
import { AddPage } from "./pages/Add.js";
import { EventDetailPage } from "./pages/event";
import { PlaceDetailPage } from "./pages/place";
import { TourDetailPage, TourEventDetailPage } from "./pages/tour";
import { pc, sp, tab, shadow, mixinMaxWidth } from './setting';
import styled from "styled-components";
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import LogoPC from './img/tm_logo_pc.svg'

function Header({ title }) {
  return (
    <HeaderStyle>
      <div className="inner">
        <div className="title_area">
          
          <Link
              className="main_title"
              to={`/`}
            ><img src={LogoPC} alt="tour m." />
          </Link>
          <div className="page_title">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="user_area"></div>
      </div>
    </HeaderStyle>
  );
}

function AddButton({ }) {
  return (
    <AddButtonStyle>
      <Link
        to={`/add`}
      >
        <Fab size="medium" color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </AddButtonStyle>
  );
}

function HomeButton({ }) {
  return (
    <HomeButtonStyle>
      <Link
        to={`/`}
      >
        <Fab size="medium" color="primary" aria-label="home">
          <HomeIcon />
        </Fab>
      </Link>
    </HomeButtonStyle>
  );
}

export default function App() {
  const [naviOpen, setNaviOpen] = useState(false);
  const toggleNaviOpen = () => setNaviOpen(!naviOpen);
  const [hdTitle, setHdTitle] = useState('Tour Man');

  return (
    <Wrapper>
      <Router>
        {/* <Navi naviOpen={naviOpen}/> */}
        <Header title={hdTitle}/>
        <Switch>
          <Route path="/" exact>
            <RootPage setHdTitle={setHdTitle} />
          </Route>
          <Route path="/add" exact>
            <AddPage setHdTitle={setHdTitle} />
          </Route>
          <Route path="/tours/events/:tourId" exact>
            <TourEventDetailPage setHdTitle={setHdTitle} />
          </Route>
          <Route path="/tours/:tourId" exact>
            <TourDetailPage setHdTitle={setHdTitle} />
          </Route>
          <Route path="/events/:eventId">
            <EventDetailPage setHdTitle={setHdTitle} />
          </Route>
          <Route path="/places/:placeId" exact>
            <PlaceDetailPage setHdTitle={setHdTitle} />
          </Route>
        </Switch>
        <HomeButton/>
        <AddButton/>
      </Router>
    </Wrapper>
  );
}


const HeaderStyle = styled.header`
background-color: #fff;
position: sticky;
top: 0;
width: 100%;
padding-bottom: 6px;
z-index: 1000;

>.inner{
  ${mixinMaxWidth}
  ${pc`
    height: 60px;
  `}
  ${tab`
    height: 50px;
  `}
  ${sp`
    height: 40px;
  `}
  display: flex;
  align-items: flex-end;
}

.title_area{
  display: flex;
  overflow: hidden;
  ${pc`
    font-size: 24px;
  `}
  ${tab`
    font-size: 20px;
  `}
  ${sp`
    font-size: 16px;
  `}

  .main_title{
    font-weight: bold;
    margin-right: 1.5em;
  }
  .head_title{
    letter-spacing: 0.2em;
  }
}
`;

const Wrapper = styled.div`
  padding-bottom: 80px;
`;


const AddButtonStyle = styled.div`
position: fixed;
right: 80px;
bottom: 20px;
`;

const HomeButtonStyle = styled.div`
position: fixed;
right: 20px;
bottom: 20px;
`;

/* const NaviStyle = styled.div`
.navi_area{
  background-color: navy;
  color: #fff;
  position: fixed;
  height: 100%;
  width: 200px;
  padding: 1em 1em 0;
  z-index: 3000;
  top: 0;
  ${tab`
      transition: 0.5s;
      right: -100%;
      ${props => (props.naviOpen && "right: 0")};
  `}
  ${pc`
      left: 0;
  `}
  
  .navi_list {
    margin-top: 2em;
    li {
      padding-bottom: 1em;
    }
  }
}
.navi_bg{
  ${pc`
      display: none;
  `}
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 2000;
  background-color: rgba(0,0,0,0.7);
}
`; */


/* const FooterStyle = styled.footer`
position: fixed;
left: 0;
bottom: 0;
height: 40px;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
z-index: 9999;
background-color: #fff;
>.navi_button{
  width: 30px;
  height: 30px;
  background-color: red;
}
`;
 */

/* 
function Navi({ naviOpen, toggleNaviOpen }){
  return(
    <NaviStyle naviOpen={ naviOpen }>
      <div className="navi_area">
        <Link
            className="main_title"
            to={`/`}
          ><h1><span>Tour Man</span></h1>
        </Link>
        <ul className="navi_list">        
          <li><Link to={`/`}><span>ツアー</span></Link></li>
          <li><Link to={`/events`}><span>イベント</span></Link></li>
          <li><Link to={`/places`}><span>会場</span></Link></li>
        </ul>
        
        <ul className="navi_list">
          <li><Link to={`/events/add`}><span>イベント追加</span></Link></li>
          <li><Link to={`/places/add`}><span>会場追加</span></Link></li>
        </ul>  
      </div>
      <button className="navi_bg" onClick={toggleNaviOpen}></button> 
    </NaviStyle>
  );
}
 */


/* function Footer({ toggleNaviOpen }){
  return(
  <FooterStyle>
    <Link
      className="home"
      to={`/`}
    >
      <IconButton
        size="large"
        color="inherit"
        aria-label="home"
      >
        <HomeIcon />
      </IconButton>
    </Link>
    
    <IconButton
      size="large"
      color="inherit"
      aria-label="menu"
      onClick={toggleNaviOpen}
    >
      <MenuIcon />
    </IconButton>
  </FooterStyle>
  ); 
} */
