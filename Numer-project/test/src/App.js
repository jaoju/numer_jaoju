import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Bisec from './Component/Root/Bisec'
import False from './Component/Root/False'
import Fix from './Component/Root/Fix'
import Newton from './Component/Root/Newton'
import Secant from './Component/Root/Secant'

import Trapezoidal from './Component/integation/Trapezoidal'
import Comptrap from './Component/integation/Comptrap'
import Sim13 from './Component/integation/Sim13'
import Compsim13 from './Component/integation/Compsim13'
import Sim38 from './Component/integation/Sim38'
import GaussQuarature from './Component/integation/GaussQuarature'

import FirstFW from './Component/derivative/FirstFW'
import FirstBw from './Component/derivative/FirstBw'
import Central from './Component/derivative/Central'
import AccFw from './Component/derivative/AccFw'
import AccBw from './Component/derivative/AccBw'
import AccC from './Component/derivative/AccC'

import Odeeuler from './Component/Ode/Odeeuler'
import Odeheun from './Component/Ode/Odeheun'
import Odemodified from './Component/Ode/Odemodified'

import { Menu } from 'antd';

const { SubMenu } = Menu;
class App extends Component {
  render() {

    return (
      <Router>
        <div>
          <Menu mode="horizontal">
            <SubMenu title="Root of Equation">
              <Menu.Item>
                <Link to='/bisec'>Bisection Method</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/false'>False Position Method</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/fix'>Fixpoint (One-point Iteration Method)</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/newton'>Newton Rapson</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/secant'>Secant Method</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu title="Integation">
              <Menu.Item>
                <Link to='/trapezoidal'>Trapezoidal Rule(Single)</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/comptrap'>Composite Trapezoidal Rule</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/sim13'>Simpson's Rule(1/3)</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/compsim13'>Composite Simpson's Rule(1/3)</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/sim38'>Simpson's Rule(3/8)</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/GaussQuarature'>Gauss Quarature</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu title="Derivative">
              <Menu.Item>
                <Link to='/firstFw'>First Forward : Fw o(h)</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/firstBw'>First Backward : Bw o(h)</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/central'>Central : o(h^2)</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/accFw'>Forward : Fw o(h^2)</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/accBw'>Backward : Bw o(h^2)</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/accc'>Central : o(h^4)</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu title="ODE">
              <Menu.Item>
                <Link to='/odeeuler'>ODE - Euler's Method</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/odeheun'>ODE - Heun's Method</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/odemodified'>ODE - Modified Euler's Method</Link>
              </Menu.Item>
            </SubMenu>


          </Menu>


          <Switch>
            <Route path='/bisec'>
              <Bisec />
            </Route>
            <Route path='/false'>
              <False />
            </Route>
            <Route path='/fix'>
              <Fix />
            </Route>
            <Route path='/newton'>
              <Newton />
            </Route>
            <Route path='/secant'>
              <Secant />
            </Route>


            <Route path='/trapezoidal'>
              <Trapezoidal />
            </Route>
            <Route path='/comptrap'>
              <Comptrap />
            </Route>
            <Route path='/sim13'>
              <Sim13 />
            </Route>
            <Route path='/compsim13'>
              
              <Compsim13 />
            </Route>
            <Route path='/sim38'>
              <Sim38 />
            </Route>
            <Route path='/GaussQuarature'>
              <GaussQuarature/>
            </Route>

            <Route path='/firstFw'>
              <FirstFW />
            </Route>
            <Route path='/firstBw'>
              <FirstBw />
            </Route>
            <Route path='/central'>
              <Central />
            </Route>
            <Route path='/accFw'>
              <AccFw />
            </Route>
            <Route path='/accBw'>
              <AccBw />
            </Route>
            <Route path='/accc'>
              <AccC />
            </Route>

            <Route path='/odeeuler'>
              <Odeeuler />
            </Route>
            <Route path='/odeheun'>
              <Odeheun />
            </Route>
            <Route path='/odemodified'>
              <Odemodified />
            </Route>

          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;
