import React, { Component } from "react";
import { navItems } from "../constants/navItems";
import { AppBar, Tabs, Tab } from "@material-ui/core";

export default class Header extends Component {
  state = {
    activeTabIndex: 1
  };

  handleChange = (event, value) => {
    const { navigateParent } = this.props;
    this.setState({ activeTabIndex: value });
    navigateParent(value);
  };

  render() {
    const { activeTabIndex } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Tabs
            value={activeTabIndex}
            indicatorColor="secondary"
            onChange={this.handleChange}
            centered
          >
            {navItems.map(item => (
              <Tab label={item} key={item.toLowerCase()}></Tab>
            ))}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}
