import React, { Component } from "react";
import Header from "../../components/Header";
import AuctionPreview from "../../components/AuctionPreview";
import Footer from "../../components/Footer";
import { StyledLink, styledDivAuction } from "./styles.js";
import { StyledDiv } from "./styles.js";




class FrontPage extends Component {
  render() {
    return (
      <StyledDiv >

        <Header>
          <StyledLink to="/login"> Logg inn</StyledLink>
          <span>|</span>
          <StyledLink to="/signup">Ny bruker</StyledLink>
        </Header>

        <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '10px' }}>

        </div>



        <div style={{ display: 'flex', flexdirection: 'column', justifyContent: 'center' }} >
          <AuctionPreview>
          </AuctionPreview>
          <AuctionPreview>
          </AuctionPreview>
          <AuctionPreview>
          </AuctionPreview>

        </div>
        <div style={{ display: 'flex', flexdirection: 'column', justifyContent: 'center' }}>
          <AuctionPreview>
          </AuctionPreview>
          <AuctionPreview>
          </AuctionPreview>
          <AuctionPreview>
          </AuctionPreview>
        </div >

        <Footer></Footer>
      </StyledDiv>



    );
  }
}

export default FrontPage;
