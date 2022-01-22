import styled from "styled-components";

export function Header({ title }) {
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
  >.header_area{
    position: fixed;
    top: 0;
    left: 0;
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    > .title {
      >h1{
        font-size: 14px;
        line-height: 2;
      }
    } 
  }
  >.header_margin{
    margin-top: 40px;
  }
`;