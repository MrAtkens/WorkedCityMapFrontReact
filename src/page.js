import React, {Component} from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { Route, Switch, Redirect } from 'react-router-dom'

import routes from './routes'

const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
        <Redirect from="/" to="/main" />
    </Switch>
  );

class Main extends Component{


    render(){
      return(
        <div>
              <div>{switchRoutes}</div>
          <ToastContainer
              position={'top-left'}
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover/>
        </div>
      );
    }
}

const mapDispatchToProps = {

}

export default connect(null, mapDispatchToProps)(Main)
