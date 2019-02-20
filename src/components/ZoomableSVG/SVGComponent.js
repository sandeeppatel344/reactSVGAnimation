import React, { Component } from 'react';
import { ReactSVGPanZoom, TOOL_NONE, fitSelection, zoomOnViewerCenter, fitToViewer } from 'react-svg-pan-zoom';
import attachEventListeners from '../../attachListner';
import Loader from 'react-loader-spinner';

export default class SVGComponent extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			value: null,
			tool: TOOL_NONE,
			status: '',
			zoomVal: 0,
			selectedCurrentElement: null,
			loading: true,
			loadingDivStyle: 'hidden',
			enablePanZoom: false,
			elementConfig: [
				{
					id: 'infw_phase3-phase4_recycledWaterESR1_ReadingGroup',
					zoomLevel: 2,
					eventName: 'click',
					type: 'readingGroup'
				},
				{
					id: 'infw_phase1-phase2_recycledWaterESR1_ReadingGroup',
					zoomLevel: 3,
					eventName: 'click',
					type: 'readingGroup'
				},
				{
					id: 'infw_phase3-phase4_recycledWaterESR1',
					zoomLevel: 2.3,
					eventName: 'click',
					type: 'Device'
				},
				{
					id: 'infw_phase1-phase2_recycledWaterESR1',
					zoomLevel: 2.3,
					eventName: 'click',
					type: 'Device'
				},
				{
					id: 'infw_aerator1',
					zoomLevel: 4,
					eventName: 'click',
					type: 'readingGroup'
				},
				{
					id: 'infw_phase1_clarifier1_ReadingGroup',
					zoomLevel: 4,
					eventName: 'click',
					type: 'readingGroup'
				},
				{
					id: 'infw_phase1_clarifier2_ReadingGroup',
					zoomLevel: 4,
					eventName: 'click',
					type: 'readingGroup'
				},
				{
					id: 'infw_phase2_clarifier1_ReadingGroup',
					zoomLevel: 2,
					eventName: 'click',
					type: 'readingGroup'
				},
				{
					id: 'infw_phase2_clarifier2_ReadingGroup',
					zoomLevel: 3,
					eventName: 'click',
					type: 'readingGroup'
				},
				{
					id: 'infw_phase3_clarifier1_ReadingGroup',
					zoomLevel: 2,
					eventName: 'click',
					type: 'readingGroup'
				},
				{
					id: 'infw_phase4_clarifier1_ReadingGroup',
					zoomLevel: 3,
					eventName: 'click',
					type: 'readingGroup'
				}
			]

			//infw_phase2_clarifier2_ReadingGroup
		};
	}

	componentDidMount() {
		// document.domain = 'http://localhost:7008'

		var a = document.getElementById('getSVG');
		a.addEventListener(
			'load',
			(e) => {
				var svgDoc = e.target.getSVGDocument();

				let SVGFile = svgDoc.getElementById('Layer_1');

				var gg = document.getElementById('addSvg');
				gg.appendChild(SVGFile);
				document.getElementById('removeElement').remove(); //style.display = "none";
			//	this.setState({ status: 'ok' });
			},
			false
		);
		a.ondblclick = function() { return false; }
		setTimeout(() => {
			//var svgElement = document.getElementsByTagName('svg')
			//svgElement.setAttribute('viewBox',"0 0 4000 4460");
			var idList = [];
			for (var k = 0; k < this.state.elementConfig.length; k++) {
				if (this.state.elementConfig[k].type == 'Device') {
					idList.push({
						id: this.state.elementConfig[k].id,
						eventName: this.state.elementConfig[k].eventName
					});
				} else {
					console.log(this.state.elementConfig[k]);
					if (document.getElementById(this.state.elementConfig[k].id)) {
						document.getElementById(this.state.elementConfig[k].id).classList.add('testHideShow');
					}
				}
			}

			attachEventListeners(idList, this.listner);
			this.setState({ loading: false, loadingDivStyle: 'initial' });
		}, 11000);
		//this.Viewer.setPointOnViewerCenter(50,300,1)
		window.addEventListener(
			'resize',
			() => {
				//this.setState({loading:true})
				this.Viewer.reset();
				//	this.setState({loading:false})
			},
			true
		);
		window.addEventListener('zoomByRectangle', this.zoomByReactangleListner);
	}

	componentWillUpdate(nextProps,nextState){
		
			/* (value) => this.setState((prevState,props)=>({
				previousZoomVal:prevState,value:props
			})) */

			console.log("nextState"+JSON.stringify(nextState))
	setTimeout(()=>{
		this.state.elementConfig.forEach((element)=>{
			if(nextState.value.a<element.zoomLevel&&element.type=="Device"){
				console.log("Inside Loop...")
				if(document.getElementById(element.id+'_ReadingGroup')){
					document.getElementById(element.id+'_ReadingGroup').classList.remove('display')

					document.getElementById(element.id+'_ReadingGroup').classList.add('testHideShow')
				}
			}
		})
	},500)
			
		
	}

	checkToolPan = (tool) => {
		if (this.state.tool == 'pan') {
			//this.setState({ value: null });
		}
	};

	zoomByReactangleListner = (e) => {
		setTimeout(() => {
			this.state.elementConfig.forEach((eleId) => {
				if (eleId.zoomLevel < this.state.value.a && eleId.type == 'Device') {
					document.getElementById(eleId.id + '_ReadingGroup').classList.add('display');
				}
			});
		}, 1000);
	};
	listner = (e) => {
		if (this.state.tool == 'zoom-in') {
			console.log('Click', e);
			console.log('iddd', e.currentTarget.id);
			this.state.elementConfig.forEach((ids) => {
				if (e.currentTarget.id == ids.id) {
					if (this.state.value.a <= ids.zoomLevel) {
						this.Viewer.zoom(e.clientX - 50, e.clientY - 20, ids.zoomLevel);
					} else {
						this.props.history.push('/deviceDetails', {
							deviceElementId: e.currentTarget.id
						});
					}
					this.setState({ selectedCurrentElement: ids });
				}
			});
		}
	};

	elementHandler = (value) => {
		//this.Viewer.setPointOnViewerCenter()
		//this.setState({zoomVal:value})

		var timeOut = setTimeout(() => {
			if (this.state.selectedCurrentElement && value.a <= this.state.selectedCurrentElement.zoomLevel) {
				console.log('insideee>>>');
				clearTimeout(timeOut);
				if (document.getElementById(this.state.selectedCurrentElement.id + '_ReadingGroup')) {
					document
						.getElementById(this.state.selectedCurrentElement.id + '_ReadingGroup')
						.classList.remove('testHideShow');
					document
						.getElementById(this.state.selectedCurrentElement.id + '_ReadingGroup')
						.classList.add('display');
					console.log(value);
				}
			}
		}, 1000);
	};

	displayReadingByReactangle = () => {};

	changeTool = (tool) => {
		//if()
		console.log(tool);
		this.setState({ tool });
	};

	render() {
		console.log('tools', this.state.tool);
		return (
			<div>
				{this.state.loading ? (
					<div style={{ zIndex: 9999000, position: 'absolute', left: '43%', top: '35%' }}>
						<Loader type="Puff" color="#00BFFF" height="100" width="100" />{' '}
					</div>
				) : null}
				<div style={{ visibility: this.state.loadingDivStyle }}>
					<ReactSVGPanZoom
						height={window.innerHeight}
						width={window.innerWidth - 20}
						preventPanOutside={true}
						detectAutoPan={false}
						scaleFactorMin={1}
						scaleFactorMax={10}
						disableDoubleClickZoomWithToolAuto={false}
						style={{ border: '1px solid black' }}
						ref={(Viewer) => (this.Viewer = Viewer)}
						/*		 onClick={(event) => console.log('click1', event.currentTarget.id)}
					 onDoubleClick={(event) => console.log('click1', event.currentTarget.id)}
					onMouseUp={(event) => console.log('up', event.x, event.y)}
					onMouseMove={(event) => console.log('move', event.x, event.y)}
					onMouseDown={(event) => console.log('down', event.x, event.y)} */
				
						onZoom={(value) => {
							console.log(value);
							this.elementHandler(value);
						}}
						SVGBackground={'#478E4B'}
						value={this.state.value}
						onChangeValue={(value) => this.setState({ value })}
						tool={this.state.tool}
						onChangeTool={this.changeTool}
					>
						<svg width={window.innerWidth - 20} height={window.innerHeight} id="mainSVG">
							<g id="addSvg" />
							<foreignObject id="removeElement">
								<object data="-test-New_Digram_7feb_ef.1.svgz" id="getSVG" type="image/svg+xml" />
							</foreignObject>
						</svg>
					</ReactSVGPanZoom>
					{/*           <object data="-test-New_Digram_7 feb_ef.svgz" id="getSVG" type="image/svg+xml" />
 */}{' '}
				</div>
			</div>
		);
	}
}
