import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import reduxStore, { history } from './stores/index'
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Paths } from './enums';
import DayCalendar from './components/dayCalendar/DayCalendar';
import FullScreenSpinner from './components/common/FullScreenSpinner';
import Login from './components/login/Login';


export const store = reduxStore();

class App extends Component {

  render() {
    return (
      // <StyleRoot>
      <MuiThemeProvider
      // muiTheme={ubpBaseTheme}
      >
        <Provider store={store}>
          <div>
            <FullScreenSpinner />
            <ConnectedRouter history={history}>
              <Switch>
                <Redirect from="/" to={Paths.DAY_CALENDAR} exact component={Login} />
                <Redirect from="/mc" to={Paths.DAY_CALENDAR} exact component={Login} />
                <Route path={Paths.LOGIN} exact component={Login} />
                <Route path={Paths.DAY_CALENDAR} exact component={DayCalendar} />
              </Switch>
            </ConnectedRouter>
          </div>
        </Provider>
      </MuiThemeProvider >
      // </StyleRoot>
    );
  }

}

export default App;