import React, { Component } from "react";
import RecycledWaterESRDetailSchematicComponent from "../DetailsComponent/RecycledWaterESRDetailSchematicComponent";

export default class DeviceDetails extends Component {
  render() {

    if(this.props.location.state.deviceElementId.indexOf('recycledWaterESR')>-1){
      return <RecycledWaterESRDetailSchematicComponent/>
    }

    console.log("DeviceDetails", this.props.location.state.deviceElementId);
    return <div>this is window {this.props.location.state.deviceElementId}</div>;
  }
}

 