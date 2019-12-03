import React, { Component } from "react";
import SelectablePanel from "./SelectablePanel";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import "./SidePanel.css"; 

class SidePanel extends Component {
  constructor(props) {
    super(props);
  }

  renderSelectablePanel(title, selections, props) {
    const { onPanelSelect, selected } = props;
    const selectors = selections.map(({ name, label }) => {
      return { name, label, onSelect: () => onPanelSelect(name) };
    });

    return (
      <SelectablePanel
        title={title}
        selectors={selectors}
        selected={selected}
      />
    );
  }

  render() {
    const reviewsTitle = "JetBlue Reviews";
    const reviewsSelections = [
      { name: "general", label: "General"},
      { name: "facebook", label: "Facebook" },
      { name: "twitter", label: "Twitter" },
      { name: "tripadvisor", label: "Trip Advisor" }
    ];

    const accountTitle = "";
    const accountSelections = [
      { name: "account", label: "Account" }
    ];

    return (
      <div className='sidePanel'>
        <div className='staticSidePanel'>
          <div className='title'>AirVisuals</div>
          <div>
            {this.renderSelectablePanel(
              reviewsTitle,
              reviewsSelections,
              this.props
            )}
          </div>
          <div>
            {this.renderSelectablePanel(
              accountTitle,
              accountSelections,
              this.props
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SidePanel;
