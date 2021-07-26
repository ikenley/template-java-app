import React from "react";
//import {Button} from "react-bootstrap";
import Navbar from "../shared/Navbar";

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />
      <main role="main" className="container min-height-100-vh pt-3 pb-5">
        <div className="h1">Template Java App</div>
        <div className="h4" id="about-what-is-this">
          What is this?
        </div>
        <p>
          A template Java project to be used to quickly scaffold Spring Boot
          applications.
        </p>
        <div className="h4" id="about-what-is-this">
          Is this commercial?
        </div>
        <p>
          Good lord no. Out of a combination of{" "}
          <a href="https://adtax.paulromer.net/">principle</a> and laziness,
          this app will never have ads or track you.
        </p>
        <div className="h4" id="about-what-is-this">
          Can it support feature XYZ?
        </div>
        <p>
          Probably! If you have a feature request, shoot us an email at{" "}
          <a href="mailto:ikenley6+template-java-app@gmail.com">
            ikenley6+template-java-app@gmail.com
          </a>
          . It's also an Apache-licensed open-source project. Check it out on{" "}
          <a href="https://github.com/ikenley/template-java-app">Github</a>.
          Consider learning to code and filing a pull request (or forking the
          entire project and making a better version).
        </p>
      </main>
    </div>
  );
};

export default AboutPage;
