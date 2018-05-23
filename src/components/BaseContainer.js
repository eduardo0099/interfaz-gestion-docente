import React, {Component} from 'react';

class BaseContainer extends Component {

  render() {
    return (
      <section>
        <section className="hbox stretch">
              <section className="vbox">
                <section className="scrollable wrapper-lg base-container">
                    {this.props.children}
                </section>
              </section>
        </section>
      </section>

    );
  }

}

export default BaseContainer;