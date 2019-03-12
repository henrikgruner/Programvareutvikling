import React, { Component, } from "react";
import { StyledButton, WrapperDiv } from "./styles";
import { connect } from "react-redux";


class DeleteProfilePage extends Component {


    deleteUser = (e) => {
        //Her skal brukeren deaktiveres, og senere anonymiseres. 


    }

    submit = () => {

        if (window.confirm("Er du helt sikker?")) {

            this.deleteUser(() => {
                this.props.data.history.push("/");
            });

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
                    <span> I tråd med GDPR vil vi anonymisere all informasjon om deg vi besitter. Dette inkluderer personlig informasjon, men tidligere auksjoner vil fremdeles være synlige. Dette er for å forhindre svindel.</span>

                    <StyledButton
                        onClick={this.submit}
                    >
                        Slett bruker
                       </StyledButton>

                </WrapperDiv>



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