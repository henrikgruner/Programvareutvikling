import React, { Component } from "react";
import { Title } from "../../components/Title";
import ContentWrapper from "../../components/ContentWrapper";

class NotFoundPage extends Component {
  render() {
    return (
      <ContentWrapper>
        <Title>404 - Page not found</Title>
      </ContentWrapper>
    );
  }
}

export default NotFoundPage;
