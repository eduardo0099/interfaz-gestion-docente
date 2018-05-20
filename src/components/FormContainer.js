import React, {Component} from 'react';

class FormContainer extends Component {

  render() {
    return (
      <section>
        <section className="hbox stretch">
              <section className="vbox">
                <section className="scrollable wrapper-lg base-container">
                  <div className="panel wrapper-md col-md-offset-1 col-md-10">
                    {this.props.children}
                  </div>
                </section>
              </section>
        </section>
      </section>

    );
  }

}

export default FormContainer;