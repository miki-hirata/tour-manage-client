import styled from "styled-components";
import { MainArea, StyledCard, CardInner} from "../components";

import { blueGrey, red, yellow, green, blue } from '@mui/material/colors';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { pc, sp, tab, theme, mixinMaxWidth } from '../setting';

import MediaQuery from "react-responsive";
import { onlyTab, onlyPC } from "../setting"
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';


import IconGitHub from '../img/github.svg'
import IconHeroku from '../img/heroku.svg'

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
        <StyledCard
          variant="outlined"
        >
          <CardInner>
            <div className="title">
              <AccessibilityIcon sx={{ color: blue[500] }} size="large"/>
              <h2>製作者</h2>
              <p className="name">柳澤 美希 (やなぎさわ みき)</p>
            </div>
            <div>
              <h3>略歴</h3>
              <p>新潟県出身。国際基督教大学 教養学部 アーツ・サイエンス学科 臨床心理学専攻。
                <br/>卒業後、佐渡島へ移住。4年間プロ太鼓芸能集団の制作・ツアーマネージャーを務める。
                <br/>アメリカのFacebook本社を訪れた時、その独立国家さながらの規模間に感動し、ITの道に進むことを決意。
                <br/>佐渡島内のWeb制作会社へ転職。HTML,Scss,JS,jQuery,PHPを使用したホームページ制作を行う。
                <br/>モダン技術を使用したWeb開発への強い興味が芽生え、業務の区切りを見て退職。
                <br/>現在は勉強と当アプリの製作を行いながら、フルリモートで働くことができる企業への転職活動を行っている。
              </p>
              <h3>特技・趣味</h3>
              <p>合氣道・茶道・たらい船</p>
            </div>
          </CardInner>
        </StyledCard>
        <StyledCard
          variant="outlined"
        >
          <CardInner>
            <div className="title">
              <PhoneIphoneIcon sx={{ color: blue[500] }} size="large"/>
              <h2>このアプリについて</h2>
              <span className="link">
                <span>
                  <img src={IconGitHub} alt="GitHub" width="24" height="24" />
                  <a href="https://github.com/tangra-sd/tour-manage-client" target="_blank">フロント
                    <MediaQuery query={onlyPC}>エンド</MediaQuery></a> / 
                  <a href="https://github.com/tangra-sd/tour-manage-server" target="_blank">バック
                  <MediaQuery query={onlyPC}>エンド</MediaQuery></a>
                </span>
                <span>
                  <img src={IconHeroku} alt="Heroku" width="26" height="26" className="heroku"/>
                  <a href="https://tour-manage01.herokuapp.com/" target="_blank">
                    バックエンドサイト</a>
                </span>
              </span>
            </div>
            <h3>想定する使用例</h3>
            <div className="flex">
              <div className="box">
                <p>【対象者1】演奏ツアーに参加しているギタリスト</p>
                <p>【目的】明日の予定を確認する</p>
                <p>【使用方法】</p>
                <ul>
                  <li >1. ツアータブをタップ、または右へスワイプ</li>
                  <li>2. 自分のツアーを選択</li>
                  <li>3. 日付を選択すると、その日の詳細が閲覧可能</li>
                </ul>
              </div>
              <div className="box">
                <p>【対象者2】ツアーマネージャー</p>
                <p>【目的】実施が決定した公演情報を入力</p>
                <p>【使用方法】</p>
                <ul>
                  <li >1. 右下の追加マークをタップ</li>
                  <li>2. イベントを新規登録</li>
                  <li>3. 会場/ツアーが登録されていない場合は追加</li>
                  {/* <li>4. イベント詳細画面で、開演時刻などを入力</li> */}
                </ul>
              </div>
            </div>
            <div>
              <h3>作成の経緯</h3>
              <p>ツアーマネージャーの業務で一番手間がかかるのが、出発直前にツアーのスケジュールを全て入力し、印刷・製本する「ロードスケジュール」作成業務でした。
                <br/>Tour m. はそんな「ロードスケジュール」の代わりとして、ツアーメンバー全員がスケジュールを共有するためのアプリです。
                マネージャーは準備段階で決まったことを順番に入力していくだけなので、出発直前の作成業務は発生せず、ツアー中に変更があった場合も簡単な口頭連絡だけで済みます。忙しいツアー中の使用を想定しているので、レイアウトはスマートフォンをベースに作成しています。
                <br/>またサブ的な機能として、全イベントの一覧・会場ごとのイベント履歴・ユーザーごとの会場メモ機能があります。ツアーメンバーそれぞれでメモを残していくことで、次回の参考にできますし、全イベント歴・会場ごとのイベント歴は営業ツールとして役立ちます。
                </p>
            </div>
            <div className="flex">
              <div className="box">
                <h3>主な使用言語・ライブラリ</h3>
                <LanguageList />
              </div>
              <div className="box">
                <h3>開発環境</h3>
                <div className="env_list">
                  <Divider component="div" />
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
                  <Divider component="div" />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="box">
                  <h3>特記したい機能</h3>
                  <ul>
                    <li>・スワイプによる画面遷移</li>
                    <li>・会場追加時の郵便番号による住所入力</li>
                    <li>・ツアー詳細から各イベントを閲覧したとき、日付順にスワイプできる機能</li>
                  </ul>
              </div>
              <div className="box">
                  <h3>これから実装予定の機能</h3>
                  <ul>
                    <li>・ログイン機能</li>
                    <li>・ホテル/宿泊テーブルの追加</li>
                    <li>・会場/ツアー/イベントのお気に入り機能</li>
                  </ul>
              </div>
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
    flex-wrap: wrap;
    h2{
      font-size: 18px;
      font-weight: bold;
      margin-left: 0.6em;
      margin-right: 1em;
    }
    p{
      font-size: 16px;
      line-height: 1.8;
    }
    span{
      display: flex;
      align-items: center;
    }
    .link{
      flex-wrap: wrap;
      justify-content: flex-end;
      flex: 1;
      
      ${sp`
        width: 100%;
        flex: auto;
        justify-content: flex-start;
      `}
      img{
        margin: 4px 10px 10px 20px;
      }
      a{
        text-decoration: underline;
        color: #333;
        margin: 0 4px;
      }

    }
  }
  
  h3{
    font-size: 14px;
    font-weight: bold;
    line-height: 3;
    margin-top: 1em;
  }

  .flex{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1em;
    
    .box{
      padding: 0 1em;
      width: 50%;
      ${sp`
        width: 100%;
      `}
      +.box{
        ${sp`
          margin-top: 1em;
        `}
      }
      li{
        text-indent: -1em;
        padding-left: 1.5em;
      }
    }
  }
  .env_list{
    max-width: 360px;
    padding-top: 8px;
    padding-bottom: 8px;
    dl{
      display: flex;
      padding: 8px 16px;
      ${sp`
        display: block;
      `}
      dt{
        width: 100px;
        font-weight: bold;
      }
      dd{
        flex: 1;
      }
    }
  }
`;

