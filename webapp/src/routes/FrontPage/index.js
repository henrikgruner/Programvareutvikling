import React, { Component } from "react";
import Header from "../../components/Header";
import { Link } from 'react-router-dom';
import AuctionPreview from "../../components/AuctionPreview";
import Footer from "../../components/Footer";
import { StyledLink } from "./styles.js";




class FrontPage extends Component {
  render() {
    return (
      <div style={{ overflow: 'hidden', paddingBottom: '60px', position: 'relative', minHeight: '110vh', display: 'block' }}>

        <Header>
          <StyledLink to="/login">  Logg inn</StyledLink>
          <text>|</text>
          <StyledLink to="/signup">Ny bruker</StyledLink>
        </Header>

        <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '10px' }}>

        </div>

        <div style={{ display: 'flex', flexdirection: 'column', justifyContent: 'center' }}  >
          <AuctionPreview>
          </AuctionPreview>
          <AuctionPreview>
          </AuctionPreview>
          <AuctionPreview>
          </AuctionPreview>

        </div>
        <div style={{ display: 'flex', flexdirection: 'column', justifyContent: 'center' }} >
          <AuctionPreview>
          </AuctionPreview>
          <AuctionPreview>
          </AuctionPreview>
          <AuctionPreview>
          </AuctionPreview>
        </div >

        <Footer></Footer>
      </div>



    );
  }
}

export default FrontPage;
