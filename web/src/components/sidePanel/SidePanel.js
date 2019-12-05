import React, { Component } from "react";
import SelectablePanel from "./SelectablePanel";
import DropdownPanel from "./DropdownPanel";
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

  renderDropdownPanel(title, options, selected) {
    const { onDropdownSelect } = this.props;

    return (
      <DropdownPanel
        title={title}
        options={options}
        selected={selected}
        onDropdownSelect={onDropdownSelect}
      />
    )
  }

  render() {
    const reviewsTitle = "";
    const reviewsSelections = [
      { name: "airvisuals", label: "AirVisuals" },
      { name: "facebook", label: "Facebook" },
      { name: "twitter", label: "Twitter" },
      { name: "tripadvisor", label: "Trip Advisor" }
    ];

    const accountTitle = "";
    const accountSelections = [
      { name: "account", label: "My Account" },
      { name: "accountsettings", label: "Account Settings" }
    ];

    const dropdownTitle = "Choose an Airline";
    const dropdownOptions = [
      { name: "jetblue", label: "Jetblue Airways"},
      { name: "alaska airlines", label: "Alaska Airlines"},
      { name: "delta", label: "Delta Air Lines"}
    ];

    return (
      <div className='sidePanel'>
        <div className='staticSidePanel'>
          <div className='title'>AirVisuals</div>
          <div>
            {this.renderDropdownPanel(
              dropdownTitle,
              dropdownOptions,
              this.props.selectedAirline
              )}
          </div>
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
