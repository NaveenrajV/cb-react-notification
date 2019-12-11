import React, { Component, Fragment } from "react";
import Card from "./Card/Card";
import PropTypes from "prop-types";
import classes from "./styles.scss";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      style: {},
      loading: false,
      data: props.data,
      dataType: typeof props.data
    };
    this.scrollRef = React.createRef();
    this.notificationRef = React.createRef();
  }

  componentDidMount() {
    const notificationRef = this.notificationRef.current;
    const scrollRef = this.scrollRef.current;

    if (this.state.dataType === "string") {
      fetch(this.state.data)
        .then(response => response.json())
        .then(data => this.setState({ data }))
        .catch(err => console.log(err));
    }

    if (notificationRef.offsetLeft > notificationRef.offsetWidth) {
      this.setState({
        style: {
          transform: `translateX(-${notificationRef.offsetWidth}px)`
        }
      });
    }
    scrollRef.addEventListener("scroll", () => {
      if (
        scrollRef.scrollTop + scrollRef.clientHeight >=
        scrollRef.scrollHeight
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
    const { style, show } = this.state;
    const { markAllAsRead, displaySeeAll, iconClass } = this.props;
    const CustomComponent = this.props.renderItem;
    const { seeAll, settings } = this.props.links;

    const cardList = this.props.renderItem
      ? Object.keys(this.state.data).map(key => (
          <CustomComponent
            key={key}
            {...this.props}
            {...this.state.data[key]}
          />
        ))
      : Object.keys(this.state.data).map(key => (
          <Card key={key} {...this.props} {...this.state.data[key]} />
        ));

    return (
      <Fragment>
        <i
          className={iconClass}
          style={{
            fontSize: "2rem",
            color: show ? "grey" : "#142545"
          }}
          onClick={() => this.setState({ show: !show })}
        ></i>

        <div
          className={classes.notifications}
          ref={this.notificationRef}
          style={
            this.props.style ? { ...this.props.style, ...style } : { ...style }
          }
          style={{ visibility: show ? "visible" : "hidden" }}
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

          {displaySeeAll && (
            <footer>
              <a href={seeAll}>
                <span className={classes.see_all}>see all</span>
              </a>
            </footer>
          )}
        </div>
      </Fragment>
    );
  }
}

Notifications.defaultProps = {
  displaySeeAll: true,
  CustomComponent: null,
  iconClass: "fas fa-bell"
};

Notifications.propTypes = {
  markAllAsRead: PropTypes.func.isRequired,
  links: PropTypes.objectOf(PropTypes.string)
};

export default Notifications;
