import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  hideMessage,
  showAuthLoader,
  userGoogleSignIn,
  userSignIn
} from 'actions/Auth';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: 'demo@example.com',
      password: 'demo#123'
    }
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    if (this.props.authUser !== null) {
      this.props.history.push('/');
    }
  }

  render() {
    const {
      email,
      password
    } = this.state;
    const {showMessage, loader, alertMessage} = this.props;
    return (
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">

          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="TravixToDo">
              <img src={require("assets/images/logo.png")} alt="TravixToDo" title="TravixToDo"/>
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <h1><IntlMessages id="appModule.email"/></h1>
            </div>

            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    label={<IntlMessages id="appModule.email"/>}
                    fullWidth
                    onChange={(event) => this.setState({email: event.target.value})}
                    defaultValue={email}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />
                  <TextField
                    type="password"
                    label={<IntlMessages id="appModule.password"/>}
                    fullWidth
                    onChange={(event) => this.setState({password: event.target.value})}
                    defaultValue={password}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button onClick={() => {
                      this.props.showAuthLoader();
                      this.props.userSignIn({email, password});
                    }} variant="contained" color="primary">
                      <IntlMessages id="appModule.signIn"/>
                    </Button>
                  </div>

                  <div className="app-social-block my-1 my-sm-3">
                    <IntlMessages
                      id="signIn.connectWith"/>
                    <ul className="social-link">
                      <li>
                        <IconButton className="icon"
                                    onClick={() => {
                                      this.props.showAuthLoader();
                                      this.props.userGoogleSignIn();

                                    }}>
                          <i className="zmdi zmdi-google-plus"/>
                        </IconButton>
                      </li>
                    </ul>
                  </div>

                </fieldset>
              </form>
            </div>
          </div>

        </div>
        {
          loader &&
          <div className="loader-view">
            <CircularProgress/>
          </div>
        }
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer/>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser}
};

export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,
  userGoogleSignIn
})(SignIn);
