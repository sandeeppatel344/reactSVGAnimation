import React, { Component } from 'react';
import '../../App.css';

class ObjectSvg extends Component {
	componentDidMount() {
/* 		setTimeout(() => {
			var a = document.getElementById('svgObject');
			var svgDoc = a.contentDocument;
			 this.props.handler(svgDoc)
		}, 500); */

		
	}

	render() {
		return <object id="svgObject" type="image/svg+xml" data='./WTP_2.svg' aria-labelledby="wtp" />;
	}
}

export default ObjectSvg;
