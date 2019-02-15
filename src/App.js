import React, { Component } from 'react';
import { ReactSVGPanZoom, TOOL_NONE, fitSelection, zoomOnViewerCenter, fitToViewer } from 'react-svg-pan-zoom';
import SvgComponent from './components/SvgComponent';
import attachEventListeners from './attachListner';


class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			value: null,
			tool: TOOL_NONE,
			status: '',
			zoomVal:0,
			selectedCurrentElement:null,
			elementConfig:[{
				id:"infw_phase3-phase4_recycledWaterESR1_ReadingGroup",
				zoomLevel:2,
				eventName:'dblclick',
				type:'readingGroup'
			},
			{
				id:"infw_phase1-phase2_recycledWaterESR1_ReadingGroup",
				zoomLevel:3,
				eventName:'dblclick',
				type:'readingGroup'
			},{
				id:"infw_phase3-phase4_recycledWaterESR1",
				zoomLevel:2,
				eventName:'dblclick',
				type:'Device'
			},
			{
				id:"infw_phase1-phase2_recycledWaterESR1",
				zoomLevel:3,
				eventName:'dblclick',
				type:'Device'
			},
			{
				id:"infw_aerator1",
				zoomLevel:4,
				eventName:'dblclick',
				type:'readingGroup'
			},
			{
				id:"infw_phase1_clarifier1_ReadingGroup",
				zoomLevel:4,
				eventName:'dblclick',
				type:'readingGroup'
			},
			{
				id:"infw_phase1_clarifier2_ReadingGroup",
				zoomLevel:4,
				eventName:'dblclick',
				type:'readingGroup'
			},
			{
				id:"infw_phase2_clarifier1_ReadingGroup",
				zoomLevel:2,
				eventName:'dblclick',
				type:'readingGroup'
			},
			{
				id:"infw_phase2_clarifier2_ReadingGroup",
				zoomLevel:3,
				eventName:'dblclick',
				type:'readingGroup'
			},
			{
				id:"infw_phase3_clarifier1_ReadingGroup",
				zoomLevel:2,
				eventName:'dblclick',
				type:'readingGroup'
			},
			{
				id:"infw_phase4_clarifier1_ReadingGroup",
				zoomLevel:3,
				eventName:'dblclick',
				type:'readingGroup'
			}]

			//infw_phase2_clarifier2_ReadingGroup
		};
	}

	componentDidMount() {
		// document.domain = 'http://localhost:7008'
		//	this.Viewer.fitToViewer(0,20);
		var a = document.getElementById('getSVG');
		a.addEventListener(
			'load',
			(e) => {
				var svgDoc = e.target.getSVGDocument();

				let SVGFile = svgDoc.getElementById('Layer_1');
				
				var gg = document.getElementById('addSvg');
				gg.appendChild(SVGFile);
				document.getElementById('removeElement').remove()//style.display = "none";
				this.setState({ status: 'ok' });
			},
			false
		);
		setTimeout(() => {
			//var svgElement = document.getElementsByTagName('svg')
			//svgElement.setAttribute('viewBox',"0 0 4000 4460");
			var idList = []
		for (var k=0; k < this.state.elementConfig.length;k++) {
			if(this.state.elementConfig[k].type=="Device"){
				idList.push({ id: this.state.elementConfig[k].id, eventName: this.state.elementConfig[k].eventName });
			}
			
		}

		attachEventListeners(idList, this.listner);
		}, 11000);
		//this.Viewer.setPointOnViewerCenter(50,300,1)
		
	}

checkToolPan=(tool)=>{
	if(this.state.tool=="tools pan"){
		this.setState({value:null})
	}
}
	listner=(e)=>{
		console.log("Click",e)
		console.log("iddd",e.currentTarget.id)
		this.state.elementConfig.forEach((ids)=>{
			if(e.currentTarget.id == ids.id){
					this.setState({selectedCurrentElement:ids})
			}
		})
		
	}
	elementHandler=(value)=>{
		this.setState({zoomVal:value})
		console.log("val=="+value.a)
		if(this.state.selectedCurrentElement&&(value.a > this.state.selectedCurrentElement.zoomLevel)){
			alert("zoom limit exeded")

		}
		
	}

	displayReadingByReactangle=()=>{

	}

	

	render() {
		console.log("tools",this.state.tool)
		return (
			<div>
				<ReactSVGPanZoom
					height={window.innerHeight}
					preventPanOutside={false}
					width={window.innerWidth-20}
					style={{ border: '1px solid black' }}
					ref={(Viewer) => (this.Viewer = Viewer)}
			/*		 onClick={(event) => console.log('click1', event.currentTarget.id)}
					 onDoubleClick={(event) => console.log('click1', event.currentTarget.id)}
					onMouseUp={(event) => console.log('up', event.x, event.y)}
					onMouseMove={(event) => console.log('move', event.x, event.y)}
					onMouseDown={(event) => console.log('down', event.x, event.y)} */
					onZoom={(value) => {
						console.log(value);
						this.elementHandler(value)
					}}
					value={this.state.value}
					onChangeValue={(value) => this.setState({ value })}
					tool={this.state.tool}
					onChangeTool={(tool) => {this.setState({ tool })
					
				}}
				>
				 	<svg width={200} height={200} id="mainSVG">
						<g id="addSvg" />
						<foreignObject id="removeElement">
							<object data="-test-New_Digram_7feb_ef.svgz" id="getSVG" type="image/svg+xml" />
						</foreignObject>
          </svg> 

				</ReactSVGPanZoom>
{/*           <object data="-test-New_Digram_7 feb_ef.svgz" id="getSVG" type="image/svg+xml" />
 */}   
			</div>
		);
	}
}

export default App;
