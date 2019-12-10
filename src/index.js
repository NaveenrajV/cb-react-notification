import React, { Component } from "react";
import Card from "./Card/Card";
import classes from "./styles.scss";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.scrollRef = React.createRef();
    this.iconRef = React.createRef();
  }

  componentDidMount() {
    this.scrollRef.current.addEventListener("scroll", () => {
      if (
        this.scrollRef.current.scrollTop +
          this.scrollRef.current.clientHeight >=
        this.scrollRef.current.scrollHeight
      ) {
        this.fetchData();
      }
    });
  }

  fetchData = () => {
    //TODO fetch data
    console.log("fetch data");
  };

  render() {
    const { markAllAsRead } = this.props;
    const { seeAll, settings } = this.props.links;

    const CustomComponent = this.props.renderItem
      ? this.props.renderItem
      : null;

    const displaySeeAll = this.props.hasOwnProperty("displaySeeAll")
      ? this.props.displaySeeAll
      : true;

    const cardList = this.props.renderItem
      ? Object.keys(this.props.data).map(key => (
          <CustomComponent
            key={key}
            {...this.props}
            {...this.props.data[key]}
          />
        ))
      : Object.keys(this.props.data).map(key => (
          <Card key={key} {...this.props} {...this.props.data[key]} />
        ));

    return (
      <React.Fragment>
        <i
          className="fas fa-bell"
          style={{
            fontSize: "2rem",
            color: this.state.show ? "grey" : "#142545"
          }}
          onClick={() => this.setState({ show: !this.state.show })}
        ></i>
        {this.state.show ? (
          <div
            className={classes.notifications}
            ref={this.iconRef}
            style={this.props.style ? this.props.style : null}
          >
            <header>
              <div className={classes.title}>Notifications</div>
              <div className={classes.options}>
                <div className={classes.option} onClick={markAllAsRead}>
                  Mark all as read
                </div>

                <div className={classes.option}>
                  <a href={settings}>Settings</a>
                </div>
              </div>
            </header>

            <div className={classes.message} ref={this.scrollRef}>
              {cardList}
            </div>

            {displaySeeAll ? (
              <footer>
                <a href={seeAll}>
                  <span className={classes.see_all}>see all</span>
                </a>
              </footer>
            ) : null}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Notifications;
