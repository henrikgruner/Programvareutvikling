import React, { Component } from "react";
import { CompanyLogo } from "./styles.js";
import { CompanyHeader } from "./styles.js"
import { Title } from "./styles.js";
import { Link } from 'react-router-dom';



class Header extends Component {
    render() {
        return (
            <div>
                <CompanyHeader>
                    <CompanyLogo to="/">Budbua</CompanyLogo>
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