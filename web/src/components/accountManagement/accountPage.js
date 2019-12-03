import React from "react";
import "./accountPage.css";


function renderFacebookInsights() {
  return (
    <React.Fragment>
      {renderTitle("Reviews on Facebook")}
      {renderTitleText("View the most current trending words our customers are saying on Facebook about JetBlue's customer and in-flight service.")}
      {/* <TextPanel
        style={{
          flex: 1,
          backgroundImage: `url(${longStatsBGImage})`,
          backgroundSize: "110%",
          height: "240px"
        }}
        boldedText='32%'
        bodyText='of our 2019 social media comments is comprised of Facebook comments.'
      />
      <ImagePanel
        titleText='Trending Words on Facebook Comments'
        url={facebookCloudImage}
      /> */}
      <FilterPanel
        title={"Search Facebook comments"}
        titleText={
          "Search or filter for a keyword to see what customers are saying on JetBlue’s Facebook posts for 2019."
        }
        sourceFilter={"facebook"}
        tags={["flight", "bag", "customer service", "class", "smiles"]}
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