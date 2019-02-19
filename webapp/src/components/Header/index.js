import React, { Component } from "react";
import { CompanyLogo } from "./styles.js";
import { CompanyHeader } from "./styles.js"
import { Title } from "./styles.js";



class Header extends Component {
    render() {
        return (
            <div>
                <CompanyHeader>
                    <CompanyLogo>Budbua</CompanyLogo>
                    <Title> Velkommen til norges største og eldste auksjonsmarked</Title>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {this.props.children}
                    </div>

                </CompanyHeader>
            </div >
        );
    }
}

export default Header;