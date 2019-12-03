import React from "react";
import "./MainPanel.css";

import positiveGraphImage from "../../../public/images/positive-graph.png";
import positiveCloudImage from "../../../public/images/positive-cloud.png";
import negativeGraphImage from "../../../public/images/negative-graph.png";
import negativeCloudImage from "../../../public/images/negative-cloud.png";

import shortLineStatsBGImage from "../../../public/images/short-line-stats.png";
import shortBarStatsBGImage from "../../../public/images/short-bar-stats.png";
import longStatsBGImage from "../../../public/images/long-stats.png";

import ToggleablePanel from "./ToggleablePanel";
import TextPanel from "./TextPanel";
import FilterPanel from "./FilterPanel";
import MyFilterPanel from "./MyFilterPanel";
import JustReviewsPanel from "./JustReviewsPanel";
import TablePanel from "./TablePanel";
import BarChart from "./BarChart";
import UpdatePasswordPanel from "./UpdatePasswordPanel";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}

function renderGeneralInsights(selectedAirline) {
  selectedAirline = capitalize(selectedAirline);

  const options = {
    on: {
      name: "Positive Reviews",
      render: () => (
        <React.Fragment>
          <img
            style={{ width: "100%", marginBottom: "20px" }}
            src={positiveGraphImage}></img>
          <div style={{ width: "75%", margin: "auto" }}>
            <img style={{ width: "100%" }} src={positiveCloudImage}></img>
          </div>
        </React.Fragment>
      )
    },
    off: {
      name: "Negative Reviews",
      render: () => (
        <React.Fragment>
          <img
            style={{ width: "100%", marginBottom: "20px" }}
            src={negativeGraphImage}></img>
          <div style={{ width: "75%", margin: "auto" }}>
            <img style={{ width: "100%" }} src={negativeCloudImage}></img>
          </div>
        </React.Fragment>
      )
    }
  };

  return (
    <React.Fragment>
      {renderTitle(`General Insights for ${selectedAirline}`)}
      {renderTitleText(
        `View the most current trending words our customers are saying across social media about ${selectedAirline}’s customer and in-flight service.`
      )}
      <ToggleablePanel on={options.on} off={options.off} />
    </React.Fragment>
  );
}

function renderFacebookInsights(selectedAirline) {
  selectedAirline = capitalize(selectedAirline);
  
  return (
    <React.Fragment>
      {renderTitle(`${selectedAirline} Reviews on Facebook`)}
      {renderTitleText(`View the most current trending words our customers are saying on Facebook about ${selectedAirline}'s customer and in-flight service.`)}
      {/* <BarChart
        key={"alaska airlines", "facebook", "positive"}
        review_site={"facebook"}
        company={"alaska airlines"}
        sentiment={"positive"}
      /> */}
      <FilterPanel
        title={"Search Facebook comments"}
        titleText={
          `Search or filter for a keyword to see what customers are saying on ${selectedAirline}’s Facebook posts for 2019.`
        }
        review_site={"facebook"}
        key={'facebook'}
        tags={["flight", "bag", "customer service", "class", "smiles"]}
      />
    </React.Fragment>
  );
}

function renderTwitterInsights(selectedAirline) {
  // console.log("twitter")
  selectedAirline = capitalize(selectedAirline);

  return (
    <React.Fragment>
      {renderTitle(`${selectedAirline} Insights from Twitter`)}
      {renderTitleText(`View the most current trending words our customers are saying on Twitter about ${selectedAirline}'s customer and in-flight service.`)}
      <FilterPanel
        title={"Filter Twitter Comments"}
        titleText={
          `Search or filter for a keyword to see what customers are saying on ${selectedAirline}’s Twitter posts for 2019.`
        }
        review_site={"twitter"}
        key={'twitter'}
        tags={["entertainment", "aircraft", "baggage", "wi-fi", "flights"]}
      />
    </React.Fragment>
  );
}

function renderTripAdvisorInsights(selectedAirline) {
  console.log("trip")
  selectedAirline = capitalize(selectedAirline);

  return (
    <React.Fragment>
      {renderTitle(`${selectedAirline} Insights from Trip Advisor`)}
      {renderTitleText(`View the most current trending words our customers are saying on Trip Advisor about ${selectedAirline}'s customer and in-flight service.`)}
      <FilterPanel
        title={"Filter Trip Advisor Reviews"}
        titleText={
          `Search or filter for a keyword to see what customers are saying on ${selectedAirline}’s Trip Advisor page.`
        }
        review_site={"tripadvisor"}
        key={'tripadvisor'}
        tags={["entertainment", "aircraft", "baggage", "wi-fi", "flights"]}
      />
    </React.Fragment>
  );
}


function renderMyAccount() {
  return (
    <React.Fragment>
      {renderTitle("Welcome back, <username>")}
      {renderTitleText("change this TEXT.")}
      <MyFilterPanel
        title={"My Saved Reviews"}
        titleText={
          "Search or filter a specific airline to find specific reviews you've saved. You can also remove saved reviews from your list."
        }
        sourceFilter={"facebook"} //uh what
        tags={["JetBlue Airways", "Alaska Airlines", "Delta Air Lines"]}
      />

      <JustReviewsPanel
        title={"My Written Reviews"}
        titleText={
          "These are reviews you have contributed to this site with your account."
        }
      />
    </React.Fragment>
  );
}

function renderAccountSettings() {
  return (
    <React.Fragment>
      {renderTitle("My Account Settings")}
      {renderTitleText("Modify any settings related to your personal account.")}
      <UpdatePasswordPanel
        title={"Update my password"}
        titleText={
          "Change the password to your account here."
        }

      />
    </React.Fragment>
  );
}

function renderTitle(title) {
  return <div className='bigTitle'>{title}</div>;
}

function renderTitleText(titleText) {
  return <div className='bigTitleText'>{titleText}</div>;
}

function renderCorrectPanel(selectedPanel, selectedAirline) {
  if (selectedPanel === "general") {
    return renderGeneralInsights(selectedAirline);
  } else if (selectedPanel === "facebook") {
    return renderFacebookInsights(selectedAirline);
  } else if (selectedPanel === "twitter") {
    return renderTwitterInsights(selectedAirline);
  } else if (selectedPanel === "tripadvisor") {
    return renderTripAdvisorInsights(selectedAirline);
  } else if (selectedPanel === "account") {
    return renderMyAccount();
  } else if (selectedPanel === "accountsettings") {
    return renderAccountSettings();
  } else {
    return <div>Still In Progress ... Come back another time</div>;
  }
}

function MainPanel(props) {
  return <div className='mainPanel'>{renderCorrectPanel(props.selected, props.selectedAirline)}</div>;
}

export default MainPanel;
