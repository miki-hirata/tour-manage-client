import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { RootPage } from "./pages/Root.js";
import { EventListPage, EventDetailPage, EventAddPage } from "./pages/event";
import { PlaceListPage } from "./pages/PlaceList.js";
import { PlaceDetailPage } from "./pages/PlaceDetail.js";
import { PlaceAddPage } from "./pages/PlaceAdd.js";
import { TourListPage } from "./pages/TourList.js";
import { TourDetailPage } from "./pages/TourDetail.js";
import { TourEventDetailPage } from "./pages/TourEventDetail.js";
import { TestPage } from "./pages/TestPage.js";
import "./css/style.min.css"
import styled from "styled-components";
import { pc, sp, tab, onlyTab, onlyPC, mixinMaxWidth } from './setting';
import MediaQuery from "react-responsive";


export default function App() {
  const [naviOpen, setNaviOpen] = useState(false);
  const toggleNaviOpen = () => setNaviOpen(!naviOpen);
  const [hdTitle, setHdTitle] = useState('Tour Man');

  return (
    <Router>
      
      <Header title={hdTitle}/>
      <MainArea>
        <Switch>
          <Route path="/" exact>
            {/* <TestPage /> */}
            {/* <RootPage /> */}
            <TourListPage setHdTitle={setHdTitle} />
          </Route>
          {/* <Route path="/tours/add" exact>
            <TourAddPage />
          </Route> */}
          <Route path="/tours/events/:tourId" exact>
            <TourEventDetailPage setHdTitle={setHdTitle} />
          </Route>
          <Route path="/tours/:tourId" exact>
            <TourDetailPage setHdTitle={setHdTitle} />
          </Route>
          <Route path="/events" exact>
            <EventListPage setHdTitle={setHdTitle} />
          </Route>
          <Route path="/events/add" exact>
            <EventAddPage setHdTitle={setHdTitle} />
          </Route>
          <Route path="/events/:eventId">
            <EventDetailPage setHdTitle={setHdTitle} />
          </Route>
          <Route path="/places" exact>
            <PlaceListPage setHdTitle={setHdTitle} />
          </Route>
          <Route path="/places/add" exact>
            <PlaceAddPage setHdTitle={setHdTitle} />
          </Route>
          <Route path="/places/:placeId" exact>
            <PlaceDetailPage setHdTitle={setHdTitle} />
            {/* PlaceEvent */}
            {/* PlaceMemo */}
          </Route>
        </Switch>
      </MainArea>
      
      <Navi naviOpen={naviOpen}/>
      <MediaQuery query={onlyTab}>
        <Footer toggleNaviOpen={toggleNaviOpen}/>
      </MediaQuery>
    </Router>
  );
}

function Header({ title }) {
  return (
    <HeaderStyle>
      <div className="header_area">
        <div className="title">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="header_margin"></div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
background-color: yellow;
position: fixed;
top: 0;
left: 0;
height: 40px;
width: 100%;
display: flex;
align-items: center;
z-index: 1000;
${mixinMaxWidth}

>.title {
  >h1{
    font-size: 14px;
    line-height: 2;
  }
}
`;

function Navi({ naviOpen }){
  return(
    <NaviStyle naviOpen={ naviOpen }>
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
    </NaviStyle>
  );
}

const NaviStyle = styled.div`
background-color: rgba(0,0,0,0.9);
color: #fff;
position: fixed;
height: 100%;
width: 200px;
padding: 1em 1em 0;
z-index: 2000;
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
`;


function Footer({ toggleNaviOpen }){
  return(
    <FooterStyle>
      <Link
        className="home"
        to={`/`}
      ><span>home</span></Link>
      <button className="navi_button" onClick={toggleNaviOpen}></button>
    </FooterStyle>
  ); 
}

const FooterStyle = styled.footer`
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


const MainArea = styled.div`
margin-top: 100px;
${mixinMaxWidth}
`;