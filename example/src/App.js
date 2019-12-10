import React, { Component } from "react";
import data from "./Data";
import Notifications from "cb-react-notification";

export default class App extends Component {
  markAllAsRead = () => {
    console.log("mark all as read");
  };

  render() {
    return (
      <div>
        <Notifications
          markAllAsRead={this.markAllAsRead}
          links={{ seeAll: "/seeAll", settings: "/settings" }}
          data={data}
        />
      </div>
    );
  }
}
