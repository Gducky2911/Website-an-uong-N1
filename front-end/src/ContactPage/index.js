import React,{useContext} from "react";

import "./index.css";

const Index = () => {
  return (
    <React.Fragment>
      <section id="contact">
        <div class="title">
          <h2 class="titleText">
            <span>C</span>ontact Us
          </h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <div class="contactForm">
          <h3>Send Message</h3>
          <div class="inputBx">
            <input type="text" name="" placeholder="Name" />
          </div>
          <div class="inputBx">
            <input type="text" name="" placeholder="Email" />
          </div>
          <div class="inputBx">
            <textarea placeholder="Message"></textarea>
          </div>
          <div class="inputBx">
            <input type="submit" value="Send"/>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Index;
