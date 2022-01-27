import styled from "styled-components";
import { MainArea, StyledCard, CardInner} from "../components";


export function AboutPage() {

  return (
    <MainArea>
      <StyledCard
        variant="outlined"
      >
        <CardInner>
          <AboutStyle>
            <h2>このアプリについて</h2>
            <ul>
              <li>
                <h3>目的・経緯</h3>
                <p></p>

              </li>
              <li>
                <h3>使用言語</h3>
                <ul>
                  <li></li>
                </ul>
              </li>
            </ul>
            <p>4年間</p>
          </AboutStyle>
        </CardInner>
      </StyledCard>
      
      <StyledCard
        variant="outlined"
      >
        <CardInner>
          <AboutStyle>
            <h2>製作者について</h2>
            <h3>柳澤美希</h3>
            <p>略歴つらつら</p>
            <h3>特技</h3>
            <p>たらい船・合氣道</p>
          </AboutStyle>
        </CardInner>
      </StyledCard>
    </MainArea>
  )
}



const AboutStyle = styled.div`
  h2{

  }
`;

