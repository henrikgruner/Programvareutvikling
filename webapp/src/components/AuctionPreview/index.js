import React, { Component } from "react";
import { Test } from "./styles.js";
import { Text } from "./styles.js";
import { Link } from 'react-router-dom';
import { StyledLink } from "./styles.js";


class AuctionPreview extends Component {
    render() {
        return (
            <div>
                <Test>
                    <Text>
                        Auksjonstittel
                    </Text>
                    <StyledLink to="/auction" >
                        Legg inn bud
                    </StyledLink>
                </Test>


            </div>
        );
    }

}
export default AuctionPreview;