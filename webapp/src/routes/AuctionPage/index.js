import React, { Component } from "react";

class AuctionPage extends Component {
  render() {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div style={{ marginBottom: "50px" }}>
          <span style={{ fontSize: "2em" }}>Øreplugger fra Grundig</span>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "20px" }}>
            <img src="url" alt="Bilde" />
          </div>

          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "auto"
                }}
              >
                <span>Lederbud</span>
                <span>110,-</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "auto"
                }}
              >
                <span>Slutter om</span>
                <span>15 min 13 sek</span>
              </div>
            </div>
            <div style={{ marginTop: "50px" }}>
              <form>
                <input type="text" />
                <input type="submit" value="Gi bud" />
              </form>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span>Budøkning: 15</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuctionPage;
