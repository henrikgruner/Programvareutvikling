import React, { Component, } from "react";
import { StyledButton, WrapperDiv } from "./styles";
import { connect } from "react-redux";







class DeleteProfilePage extends Component {


    submit = (e) => {

        if (window.confirm("Er du helt sikker?")) {
            this.props.history.push("/profile")
        }
        else {
            this.props.history.push("/delete")
        }

    }
   


    render() {
        return (
            <div>
                <header>Ønsker du virkelig å slette brukeren din?</header>
                <WrapperDiv>
                    <span> I tråd med GDPR vil vi slette all informasjon om deg vi besitter. Dette inkluderer personlig informasjon og tidligere auksjoner</span>

                </WrapperDiv>


                <StyledButton
                    onClick={this.submit}
                >res
                    Slett bruker
                </StyledButton>



            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    };
};
export default connect(mapStateToProps)(DeleteProfilePage);