import React, { Component } from "react";
import { StyledDiv } from "./styles.js";
import { Text } from "./styles.js";
import { StyledLink } from "../../components/hyperlinkstyling";


class AuctionPreview extends Component {
    render() {
        return (
            <div>
                <StyledDiv>
                    <Text>
                        Auksjonstittel
                    </Text>
                    <StyledLink to="/auction" >
                        Legg inn bud
                    </StyledLink>
                </StyledDiv>


            </div>
        );
    }

}
export default AuctionPreview;