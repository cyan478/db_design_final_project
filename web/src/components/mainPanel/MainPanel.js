import React, { Component } from "react";
import "./MainPanel.css";

import positiveGraphImage from "../../../public/images/positive-graph.png";
import positiveCloudImage from "../../../public/images/positive-cloud.png";
import negativeGraphImage from "../../../public/images/negative-graph.png";
import negativeCloudImage from "../../../public/images/negative-cloud.png";

import ToggleablePanel from "./ToggleablePanel";
import TextPanel from "./TextPanel";
import FilterPanel from "./FilterPanel";
import TablePanel from "./TablePanel";
import longStatsBGImage from "../../../public/images/long-stats.png";
import MyFilterPanel from "./MyFilterPanel";
import JustReviewsPanel from "./JustReviewsPanel";
import UpdatePasswordPanel from "./UpdatePasswordPanel";
import AddReviewPanel from "./AddReviewPanel";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}

async function getPercentage(selectedAirline, company){
  console.log("Trying to get stats from " + selectedAirline + " and " + company)
  let url = "/reviews/statistics?company=" + encodeURIComponent(selectedAirline.trim())
  let response = await fetch(url);
  let data = await response.json();
  let total = data.count.count;
  if (total < 1) {
    total = 1;
  }
  
  url += `&site=${company}`
  response = await fetch(url);
  data = await response.json();
  let specific = data.count.count;

  return `${specific / total}%`;
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

function renderAirVisualsInsights(selectedAirline, percentage, username) {
  selectedAirline = capitalize(selectedAirline);

  return (
    <React.Fragment>
      {renderTitle(`${selectedAirline} Insights From This Site`)}
      {renderTitleText(`View the reviews our users have written about ${selectedAirline}'s customer and in-flight service, or contribute your own review! You can also view more insights compiled from other review sites (Facebook, Twitter, and TripAdvisor) in the side bar to the right.`)}
      <TextPanel
        style={{
          flex: 1,
          backgroundImage: `url(${longStatsBGImage})`,
          backgroundSize: "110%",
          height: "240px"
        }}
        boldedText={percentage}
        bodyText={`of the ${selectedAirline} reviews on this site is comprised of AirVisuals reviews.`}
      />
      <AddReviewPanel
        title={"Write your own review"}
        titleText={
          `Have an experience to share with other users? Write your own review about ${selectedAirline} here! Any reviews you have written can be removed under My Account in the side panel to the right.`
        }
        review_site={"twitter"}
        username={username}
        key={'twitter'}
        tags={["entertainment", "aircraft", "baggage", "wi-fi", "flights"]}
      />
      <FilterPanel
        title={"Search Reviews Written by Other AirVisuals Users"}
        titleText={
          `Search or filter for a keyword to see what other users have written about ${selectedAirline} 2019.`
        }
        selectedAirline={selectedAirline}
        review_site={"airvisuals"}
        key={'airvisuals'}
        tags={["flight", "bag", "customer service", "class", "smiles"]}
      />
    </React.Fragment>
  );
}


function renderFacebookInsights(selectedAirline, percentage) {
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
      <TextPanel
        style={{
          flex: 1,
          backgroundImage: `url(${longStatsBGImage})`,
          backgroundSize: "110%",
          height: "240px"
        }}
        boldedText={percentage}
        bodyText={`of the ${selectedAirline} reviews on this site is comprised of AirVisuals reviews.`}
      />
      <FilterPanel
        title={"Search Facebook comments"}
        titleText={
          `Search or filter for a keyword to see what customers are saying on ${selectedAirline}’s Facebook posts for 2019.`
        }
        selectedAirline={selectedAirline}
        review_site={"facebook"}
        key={'facebook'}
        tags={["flight", "bag", "customer service", "class", "smiles"]}
      />
    </React.Fragment>
  );
}

function renderTwitterInsights(selectedAirline, percentage) {
  // console.log("twitter")
  selectedAirline = capitalize(selectedAirline);

  return (
    <React.Fragment>
      {renderTitle(`${selectedAirline} Insights from Twitter`)}
      {renderTitleText(`View the most current trending words our customers are saying on Twitter about ${selectedAirline}'s customer and in-flight service.`)}
      <TextPanel
        style={{
          flex: 1,
          backgroundImage: `url(${longStatsBGImage})`,
          backgroundSize: "110%",
          height: "240px"
        }}
        boldedText={percentage}
        bodyText={`of the ${selectedAirline} reviews on this site is comprised of AirVisuals reviews.`}
      />
      <FilterPanel
        title={"Filter Twitter Comments"}
        titleText={
          `Search or filter for a keyword to see what customers are saying on ${selectedAirline}’s Twitter posts for 2019.`
        }
        selectedAirline={selectedAirline}
        review_site={"twitter"}
        key={'twitter'}
        tags={["entertainment", "aircraft", "baggage", "wi-fi", "flights"]}
      />
    </React.Fragment>
  );
}

function renderTripAdvisorInsights(selectedAirline, percentage) {
  console.log("trip")
  selectedAirline = capitalize(selectedAirline);

  return (
    <React.Fragment>
      {renderTitle(`${selectedAirline} Insights from Trip Advisor`)}
      {renderTitleText(`View the most current trending words our customers are saying on Trip Advisor about ${selectedAirline}'s customer and in-flight service.`)}
      <TextPanel
        style={{
          flex: 1,
          backgroundImage: `url(${longStatsBGImage})`,
          backgroundSize: "110%",
          height: "240px"
        }}
        boldedText={percentage}
        bodyText={`of the ${selectedAirline} reviews on this site is comprised of AirVisuals reviews.`}
      />
      <FilterPanel
        title={"Filter Trip Advisor Reviews"}
        titleText={
          `Search or filter for a keyword to see what customers are saying on ${selectedAirline}’s Trip Advisor page.`
        }
        review_site={"tripadvisor"}
        selectedAirline={selectedAirline}
        key={'tripadvisor'}
        tags={["entertainment", "aircraft", "baggage", "wi-fi", "flights"]}
      />
    </React.Fragment>
  );
}


function renderMyAccount(username) {
  return (
    <React.Fragment>
      {renderTitle(`Welcome back, ${username}`)}
      {renderTitleText("View your written reviews on AirVisuals here.")}
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

function renderAccountSettings(username) {
  return (
    <React.Fragment>
      {renderTitle("My Account Settings")}
      {renderTitleText("Modify any settings related to your personal account.")}
      <UpdatePasswordPanel
        title={"Update my password"}
        titleText={"Change the password to your account here."}
        username={username}
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

function renderCorrectPanel(props) {
  const { selected: selectedPanel, selectedAirline, username, percentage } = props;
  if (selectedPanel === "general") {
    return renderGeneralInsights(selectedAirline);
  } else if (selectedPanel === "airvisuals") {
    return renderAirVisualsInsights(selectedAirline, percentage, username);
  } else if (selectedPanel === "facebook") {
    return renderFacebookInsights(selectedAirline, percentage);
  } else if (selectedPanel === "twitter") {
    return renderTwitterInsights(selectedAirline, percentage);
  } else if (selectedPanel === "tripadvisor") {
    return renderTripAdvisorInsights(selectedAirline, percentage);
  } else if (selectedPanel === "account") {
    return renderMyAccount(username);
  } else if (selectedPanel === "accountsettings") {
    return renderAccountSettings(username);
  } else {
    return <div>Still In Progress ... Come back another time</div>;
  }
}

class MainPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: 0,
      lastSelected: undefined,
      lastSelectedAirline: undefined
    }
  }

  async componentDidUpdate() {
    const { selectedAirline, selected } = this.props;
    const companies = ["airvisuals", "facebook", "twitter", "tripadvisor"];
    if (companies.includes(selected)) {
      if (this.state.lastSelected !== selected || this.state.lastSelectedAirline !== selectedAirline) {
        console.log(this.state.lastSelected);
        console.log(this.state.lastSelectedAirline);
        const percentage = await getPercentage(selectedAirline, selected);    
        this.setState({ percentage, lastSelected: selected, lastSelectedAirline: selectedAirline });        
      }
    }
  }

  render() {
    return (
      <div className='mainPanel'>
        {renderCorrectPanel({...this.props, percentage: this.state.percentage})}
      </div>
    );
  }
}

export default MainPanel;