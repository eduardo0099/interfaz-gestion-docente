import React, {Component} from 'react';

class SmallFormContainer extends Component {

  render() {
    return (
      <section>
        <section className="hbox stretch">
              <section className="vbox">
                <section className="scrollable wrapper-sm base-container">
                  <div className="panel wrapper-md col-md-offset-2 col-md-8">
                    {this.props.children}
                  </div>
                </section>
              </section>
        </section>
      </section>

    );
  }

}

export default SmallFormContainer;