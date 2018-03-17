import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      user: {}
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/data/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message,
          user: xhr.response.user
        });
      }
    });
    xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (
        <Card className="container">
          <CardTitle
            title="Dashboard"
            subtitle="You should get access to this page only after authentication."
          />
          {this.state.secretData && <
            CardText style={{ fontSize: '16px', color: 'green' }}>Hello <strong>{this.state.user.firstname} {this.state.user.lastname}</strong>!<br />{this.state.secretData}</CardText>}
      </Card>
    )
  }

}

export default DashboardPage;