import styled from "styled-components";
import { MainArea, StyledCard, CardInner} from "../components";

import { blueGrey, red, yellow, green, blue } from '@mui/material/colors';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ListAltIcon from '@mui/icons-material/ListAlt';

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';

function LanguageList() {
  const [openFront, setOpenFront] = React.useState(false);
  const [openBack, setOpenBack] = React.useState(false);
  const handleClickFront = () => {
    setOpenFront(!openFront);
  };
  const handleClickBack = () => {
    setOpenBack(!openBack);
  };


  return (
    <List
      sx={{ width: '100%', maxWidth: 360 }}
    >
      <Divider component="li" />
      <ListItemButton onClick={handleClickFront}>
        <ListItemText primary="React v17.0.2" />
        {openFront ? <ExpandMore /> : <ExpandLess /> }
      </ListItemButton>
      <Divider component="li" />
      <Collapse in={openFront} timeout="auto" unmountOnExit>
        <List component="li" sx={{ pl: 3 }}>react-router-dom v5.3.0</List>
        <List component="li" sx={{ pl: 3 }}>react-hook-form v7.25.0</List>
        <List component="li" sx={{ pl: 3 }}>mui v5</List>
        <List component="li" sx={{ pl: 3 }}>styled-components v9.0.0-beta.6</List>
        <List component="li" sx={{ pl: 3 }}>react-responsive v5.3.3</List>
        <List component="li" sx={{ pl: 3 }}>react-swipeable v6.2.0</List>
        <Divider component="li" />
      </Collapse>
      <ListItemButton onClick={handleClickBack}>
        <ListItemText primary="Node v16.13.1" />
        {openBack ? <ExpandMore /> : <ExpandLess /> }
      </ListItemButton>
      <Divider component="li" />
      <Collapse in={openBack} timeout="auto" unmountOnExit>
        <List component="li" sx={{ pl: 3 }}>express v4.16.1</List>
        <List component="li" sx={{ pl: 3 }}>sequelize v6.13.0</List>
        <List component="li" sx={{ pl: 3 }}>pg v8.7.1</List>
        <Divider component="li" />
      </Collapse>
      <ListItemButton>
        <ListItemText primary="PostgreSQL v14.1" />
      </ListItemButton>
      <Divider component="li" />
    </List>
  );
}


export function AboutPage() {

  return (
    <MainArea>
      
      <AboutStyle>
        
        {/* <StyledCard
          variant="outlined"
        >
          <CardInner>
            <div className="title">
              <AccessibilityIcon sx={{ color: blue[500] }} size="large"/>
              <h2>製作者</h2>
              <p>柳澤 美希 (やなぎさわ みき)</p>
            </div>
            <h3>略歴</h3>
            <p>新潟県出身。国際基督教大学臨床心理学専攻。卒業後、佐渡島へ移住。
              <br/>4年間プロ芸能集団のツアーマネージャーを務める。
              <br/>サンノゼのFacebook本社を訪れた時、その独立国家さながらの規模間に感動し、ITの道に進むことを決意。
              <br/>島内のWeb制作会社へ転職。HTML,Scss,JS,jQuery,PHPを使用したホームページ制作を行う。
              <br/>モダン技術を使用したWeb開発への強い興味が芽生え、業務の区切りを見て退職。
              <br/>現在は勉強と当アプリの製作を行いながら、フルリモートで働くことができるの企業への転職活動を行っている。
            </p>
            <h3>特技・趣味</h3>
            <p>合氣道・茶道・たらい船</p>
          </CardInner>
        </StyledCard> */}
        <StyledCard
          variant="outlined"
        >
          <CardInner>
            <div className="title">
              <PhoneIphoneIcon sx={{ color: blue[500] }} size="large"/>
              <h2>このアプリについて</h2>
            </div>
            <ul>
              <li>
                <h3>目的・経緯</h3>
                <p></p>
              </li>
              <li>
                <h3>機能</h3>
                <p></p>
              </li>
              <li>
                <h3>主な使用言語・ライブラリ</h3>
                <LanguageList />
              </li>
              <li>
                <h3>開発環境</h3>
                <dl>
                  <dt>OS</dt>
                  <dd>Windows10 → WSL2 → Ubuntu(v14.1-2)</dd>
                </dl>
                <Divider component="div" />
                <dl>
                  <dt>ターミナル</dt>
                  <dd>Windows Terminal</dd>
                </dl>
                <Divider component="div" />
                <dl>
                  <dt>エディタ</dt>
                  <dd>Visual Studio Code v1.63.2</dd>
                </dl>
              </li>
            </ul>
          </CardInner>
        </StyledCard>
        
        <StyledCard
          variant="outlined"
        >
          <CardInner>
            <div className="title">
            <ListAltIcon sx={{ color: blue[500] }} size="large"/>
              <h2>これから実装予定の機能</h2>
            </div>
          </CardInner>
        </StyledCard>
      
      </AboutStyle>
    </MainArea>
  )
}



const AboutStyle = styled.div`
  .title{
    display: flex;
    p{
      font-size: 14px;
      margin-left: 1em;
      line-height: 2;
    }
  }
  
  h2{
    font-size: 18px;
    font-weight: bold;
    margin-left: 0.6em;
  }
  h3{
    font-size: 14px;
    font-weight: bold;
    line-height: 3;
  }
`;

