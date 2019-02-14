import React,{Component} from 'react'
import { Router, Route, Switch } from 'react-router'

export default class ReactRouter extends Component{

render(){
    return (<Router>
    <Route path="/" component={App}>
      <Route path="details" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>)
}
}