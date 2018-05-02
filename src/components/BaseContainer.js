import React, {Component} from 'react';

class BaseContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <section className="hbox stretch">
              <section className="vbox">
                <section className="scrollable wrapper-lg base-container">
                  <div className="panel wrapper-md">
                    {this.props.children}
                  </div>
                </section>
              </section>
        </section>
      </section>

    );
  }

}

export default BaseContainer;