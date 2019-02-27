import React, { Component } from 'react';
import { ReactSVGPanZoom, TOOL_NONE, fitSelection, zoomOnViewerCenter, fitToViewer } from 'react-svg-pan-zoom';
import attachEventListeners from '../../attachListner';
import Loader from 'react-loader-spinner';
import getOffset from '../../utility/getElementOffset';

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
			currentClickLeftOffset: '',
			currentClickBottomOffset: '',
			readingLoader: false,
			elementConfig: [
				{
					"id": "infw_phase1-phase2_recycledWaterESR",
					"zoomLevel": 3.3,
					"systemType": "WTP",
					"type": "Device"
				},
				{
					"id": "infw_phase1-phase2_recycledWaterESR_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_phase1-phase2_recycledWaterESR_status",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "Status"
				},
				{
					"id": "infw_phase1-phase2_recycledWaterESR_in_valve",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase1-phase2_recycledWaterESR_out_valve",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase3-phase4_recycledWaterESR",
					"zoomLevel": 3.3,
					"systemType": "WTP",
					"type": "Device"
				},
				{
					"id": "infw_phase3-phase4_recycledWaterESR_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_phase3-phase4_recycledWaterESR_status",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "Status"
				},
				{
					"id": "infw_phase3-phase4_recycledWaterESR_in_valve",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase3-phase4_recycledWaterESR_out_valve",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase1_clarifier1",
					"zoomLevel": 2.3,
					"systemType": "WTP",
					"type": "Device"
				},
				{
					"id": "infw_phase1_clarifier1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_phase1_clarifier1_status",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "Status"
				},
				{
					"id": "infw_phase1_clarifier1_turbidity_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase1_clarifier1_phvalue_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase1_clarifier1_backwashlevel_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_phase1_clarifier2",
					"zoomLevel": 2.3,
					"systemType": "WTP",
					"type": "Device"
				},
				{
					"id": "infw_phase1_clarifier2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_phase1_clarifier2_status",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "Status"
				},
				{
					"id": "infw_phase1_clarifier2_turbidity_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase1_clarifier2_phvalue_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase1_clarifier2_backwashlevel_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_phase2_clarifier1",
					"zoomLevel": 2.3,
					"systemType": "WTP",
					"type": "Device"
				},
				{
					"id": "infw_phase2_clarifier1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_phase2_clarifier1_status",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "Status"
				},
				{
					"id": "infw_phase2_clarifier1_turbidity_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase2_clarifier1_phvalue_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase2_clarifier1_backwashlevel_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_phase2_clarifier2",
					"zoomLevel": 2.3,
					"systemType": "WTP",
					"type": "Device"
				},
				{
					"id": "infw_phase2_clarifier2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_phase2_clarifier2_status",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "Status"
				},
				{
					"id": "infw_phase2_clarifier2_turbidity_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase2_clarifier2_phvalue_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase2_clarifier2_backwashlevel_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_phase3_clarifier1",
					"zoomLevel": 2.3,
					"systemType": "WTP",
					"type": "Device"
				},
				{
					"id": "infw_phase3_clarifier1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_phase3_clarifier1_status",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "Status"
				},
				{
					"id": "infw_phase3_clarifier1_turbidity_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase3_clarifier1_phvalue_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase3_clarifier1_backwashlevel_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_phase4_clarifier1",
					"zoomLevel": 2.3,
					"systemType": "WTP",
					"type": "Device"
				},
				{
					"id": "infw_phase4_clarifier1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_phase4_clarifier1_status",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "Status"
				},
				{
					"id": "infw_phase4_clarifier1_turbidity_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase4_clarifier1_phvalue_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase4_clarifier1_backwashlevel_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_phase1_sump1",
					"zoomLevel": 3.3,
					"systemType": "WTP",
					"type": "Device"
				},
				{
					"id": "infw_phase1_sump1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_phase1_sump1_status",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "Status"
				},
				{
					"id": "infw_phase1_sump1_turbidity_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase1_sump1_phvalue_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase1_sump1_level_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase1_sump1_residualchlorine_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_phase2_sump1",
					"zoomLevel": 3.3,
					"systemType": "WTP",
					"type": "Device"
				},
				{
					"id": "infw_phase2_sump1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_phase2_sump1_status",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "Status"
				},
				{
					"id": "infw_phase2_sump1_turbidity_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase2_sump1_phvalue_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase2_sump1_level_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase2_sump1_residualchlorine_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_phase3-phase4_sump1",
					"zoomLevel": 3.3,
					"systemType": "WTP",
					"type": "Device"
				},
				{
					"id": "infw_phase3-phase4_sump1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_phase3-phase4_sump1_status",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "Status"
				},
				{
					"id": "infw_phase3-phase4_sump1_turbidity_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase3-phase4_sump1_phvalue_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase3-phase4_sump1_level_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
				{
					"id": "infw_phase3-phase4_sump1_residualchlorine_text",
					"zoomLevel": 0,
					"systemType": "WTP",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_bhosari_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_bhosari_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_bhosari_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_bhosari_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bhosari_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bhosari_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bhosari_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_bhosari_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_bhosari_gaonthan_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_bhosari_gaonthan_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_bhosari_gaonthan_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_bhosari_gaonthan_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bhosari_gaonthan_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bhosari_gaonthan_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bhosari_gaonthan_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_bhosari_gaonthan_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_tukaram_nagar_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_tukaram_nagar_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_tukaram_nagar_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_tukaram_nagar_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_tukaram_nagar_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_tukaram_nagar_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_tukaram_nagar_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_tukaram_nagar_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_dighi_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_dighi_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_dighi_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_dighi_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_dighi_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_dighi_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_dighi_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_dighi_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec6_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_sec6_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_sec6_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_sec6_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec6_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec6_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec6_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec6_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec6_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_sec6_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_sec6_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_sec6_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec6_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec6_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec6_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec6_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec6_esr3",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_sec6_esr3_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_sec6_esr3_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_sec6_esr3_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec6_esr3_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec6_esr3_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec6_esr3_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec6_esr3_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_wadmukhwadi_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_wadmukhwadi_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_wadmukhwadi_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_wadmukhwadi_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_wadmukhwadi_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_wadmukhwadi_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_wadmukhwadi_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_wadmukhwadi_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_boradewadi_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_boradewadi_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_boradewadi_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_boradewadi_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_boradewadi_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_boradewadi_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_boradewadi_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_boradewadi_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec96_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_sec96_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_sec96_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_sec96_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec96_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec96_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec96_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec96_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec96_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_sec96_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_sec96_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_sec96_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec96_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec96_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec96_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec96_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec96_esr3",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_sec96_esr3_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_sec96_esr3_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_sec96_esr3_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec96_esr3_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec96_esr3_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec96_esr3_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec96_esr3_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec96_esr3",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_sec96_esr3_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_sec96_esr3_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_sec96_esr3_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec96_esr3_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec96_esr3_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec96_esr3_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec96_esr3_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_e1__esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_e1__esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_e1__esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_e1__esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_e1__esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_e1__esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_e1__esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_e1__esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_e1__esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_e1__esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_e1__esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_e1__esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_e1__esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_e1__esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_e1__esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_e1__esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_e1__esr3",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_e1__esr3_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_e1__esr3_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_e1__esr3_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_e1__esr3_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_e1__esr3_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_e1__esr3_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_e1__esr3_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_thergaon_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_thergaon_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_thergaon_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_thergaon_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_thergaon_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_thergaon_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_thergaon_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_thergaon_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_thergaon_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_thergaon_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_thergaon_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_thergaon_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_thergaon_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_thergaon_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_thergaon_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_thergaon_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_thergaon_esr3",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_thergaon_esr3_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_thergaon_esr3_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_thergaon_esr3_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_thergaon_esr3_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_thergaon_esr3_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_thergaon_esr3_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_thergaon_esr3_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_shreenagar_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_shreenagar_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_shreenagar_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_shreenagar_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_shreenagar_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_shreenagar_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_shreenagar_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_shreenagar_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_lakshmannagar_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_lakshmannagar_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_lakshmannagar_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_lakshmannagar_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_lakshmannagar_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_lakshmannagar_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_lakshmannagar_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_lakshmannagar_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_lakshmannagar_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_lakshmannagar_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_lakshmannagar_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_lakshmannagar_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_lakshmannagar_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_lakshmannagar_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_lakshmannagar_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_lakshmannagar_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_wakadkalakhadak_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_wakadkalakhadak_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_wakadkalakhadak_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_wakadkalakhadak_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_wakadkalakhadak_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_wakadkalakhadak_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_wakadkalakhadak_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_wakadkalakhadak_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_punavale_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_punavale_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_punavale_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_punavale_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_punavale_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_punavale_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_punavale_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_punavale_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec_29_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_sec_29_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_sec_29_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_sec_29_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec_29_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec_29_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec_29_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec_29_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec_29_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_sec_29_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_sec_29_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_sec_29_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec_29_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec_29_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sec_29_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sec_29_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_bijli_nagar_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_bijli_nagar_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_bijli_nagar_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_bijli_nagar_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bijli_nagar_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bijli_nagar_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bijli_nagar_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_bijli_nagar_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_bijli_nagar_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_bijli_nagar_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_bijli_nagar_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_bijli_nagar_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bijli_nagar_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bijli_nagar_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bijli_nagar_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_bijli_nagar_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_bijli_nagar_esr3",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_bijli_nagar_esr3_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_bijli_nagar_esr3_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_bijli_nagar_esr3_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bijli_nagar_esr3_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bijli_nagar_esr3_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_bijli_nagar_esr3_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_bijli_nagar_esr3_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_midc_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_midc_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_midc_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_midc_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_midc_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_midc_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_midc_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_midc_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimpri_camp_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_pimpri_camp_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_pimpri_camp_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_pimpri_camp_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpri_camp_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpri_camp_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpri_camp_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimpri_camp_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimpri_camp_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_pimpri_camp_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_pimpri_camp_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_pimpri_camp_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpri_camp_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpri_camp_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpri_camp_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimpri_camp_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_esr_kasarwadi",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_esr_kasarwadi_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_esr_kasarwadi_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_esr_kasarwadi_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_esr_kasarwadi_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_esr_kasarwadi_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_esr_kasarwadi_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_esr_kasarwadi_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimpale_nilakh_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_pimpale_nilakh_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_pimpale_nilakh_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_pimpale_nilakh_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpale_nilakh_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpale_nilakh_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpale_nilakh_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimpale_nilakh_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimple_gurav_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_pimple_gurav_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_pimple_gurav_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_pimple_gurav_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_gurav_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_gurav_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_gurav_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimple_gurav_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimple_gurav_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_pimple_gurav_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_pimple_gurav_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_pimple_gurav_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_gurav_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_gurav_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_gurav_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimple_gurav_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimple_gurav_esr3",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_pimple_gurav_esr3_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_pimple_gurav_esr3_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_pimple_gurav_esr3_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_gurav_esr3_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_gurav_esr3_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_gurav_esr3_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimple_gurav_esr3_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimple_gurav_new_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_pimple_gurav_new_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_pimple_gurav_new_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_pimple_gurav_new_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_gurav_new_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_gurav_new_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_gurav_new_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimple_gurav_new_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_dapodi_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_dapodi_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_dapodi_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_dapodi_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_dapodi_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_dapodi_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_dapodi_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_dapodi_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_dapodi_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_dapodi_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_dapodi_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_dapodi_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_dapodi_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_dapodi_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_dapodi_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_dapodi_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_nav_maharashtra_school_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_nav_maharashtra_school_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_nav_maharashtra_school_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_nav_maharashtra_school_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_nav_maharashtra_school_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_nav_maharashtra_school_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_nav_maharashtra_school_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_nav_maharashtra_school_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimpale_saudagar_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_pimpale_saudagar_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_pimpale_saudagar_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_pimpale_saudagar_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpale_saudagar_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpale_saudagar_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpale_saudagar_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimpale_saudagar_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimpale_saudagar_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_pimpale_saudagar_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_pimpale_saudagar_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_pimpale_saudagar_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpale_saudagar_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpale_saudagar_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimpale_saudagar_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimpale_saudagar_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pwd_sec_84_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_pwd_sec_84_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_pwd_sec_84_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_pwd_sec_84_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pwd_sec_84_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pwd_sec_84_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pwd_sec_84_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pwd_sec_84_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_new_sanghavi_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_new_sanghavi_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_new_sanghavi_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_new_sanghavi_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_new_sanghavi_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_new_sanghavi_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_new_sanghavi_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_new_sanghavi_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_old_sanghavi_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_old_sanghavi_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_old_sanghavi_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_old_sanghavi_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_old_sanghavi_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_old_sanghavi_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_old_sanghavi_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_old_sanghavi_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimple_college_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_pimple_college_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_pimple_college_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_pimple_college_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_college_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_college_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_pimple_college_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_pimple_college_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_akurdi_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_akurdi_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_akurdi_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_akurdi_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_akurdi_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_akurdi_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_akurdi_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_akurdi_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_akurdi_khandobamal_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_akurdi_khandobamal_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_akurdi_khandobamal_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_akurdi_khandobamal_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_akurdi_khandobamal_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_akurdi_khandobamal_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_akurdi_khandobamal_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_akurdi_khandobamal_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_jadhavwadi_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_jadhavwadi_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_jadhavwadi_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_jadhavwadi_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_jadhavwadi_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_jadhavwadi_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_jadhavwadi_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_jadhavwadi_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_chikali_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_chikali_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_chikali_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_chikali_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_chikali_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_chikali_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_chikali_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_chikali_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_talwade_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_talwade_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_talwade_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_talwade_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_talwade_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_talwade_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_talwade_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_talwade_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_triveni_nagar_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_triveni_nagar_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_triveni_nagar_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_triveni_nagar_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_triveni_nagar_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_triveni_nagar_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_triveni_nagar_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_triveni_nagar_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_triveni_nagar_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_triveni_nagar_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_triveni_nagar_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_triveni_nagar_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_triveni_nagar_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_triveni_nagar_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_triveni_nagar_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_triveni_nagar_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_krishna_nagar_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_krishna_nagar_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_krishna_nagar_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_krishna_nagar_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_krishna_nagar_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_krishna_nagar_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_krishna_nagar_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_krishna_nagar_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_krishna_nagar_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_krishna_nagar_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_krishna_nagar_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_krishna_nagar_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_krishna_nagar_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_krishna_nagar_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_krishna_nagar_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_krishna_nagar_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_krishna_nagar_esr3",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_krishna_nagar_esr3_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_krishna_nagar_esr3_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_krishna_nagar_esr3_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_krishna_nagar_esr3_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_krishna_nagar_esr3_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_krishna_nagar_esr3_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_krishna_nagar_esr3_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_annasaheb_magar_stadium_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_annasaheb_magar_stadium_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_annasaheb_magar_stadium_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_annasaheb_magar_stadium_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_annasaheb_magar_stadium_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_annasaheb_magar_stadium_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_annasaheb_magar_stadium_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_annasaheb_magar_stadium_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_ajmera_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_ajmera_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_ajmera_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_ajmera_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_ajmera_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_ajmera_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_ajmera_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_ajmera_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_ajmera_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_ajmera_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_ajmera_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_ajmera_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_ajmera_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_ajmera_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_ajmera_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_ajmera_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_nehru_nagar_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_nehru_nagar_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_nehru_nagar_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_nehru_nagar_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_nehru_nagar_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_nehru_nagar_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_nehru_nagar_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_nehru_nagar_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_nehru_nagar_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_nehru_nagar_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_nehru_nagar_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_nehru_nagar_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_nehru_nagar_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_nehru_nagar_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_nehru_nagar_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_nehru_nagar_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_vallabh_nagar_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_vallabh_nagar_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_vallabh_nagar_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_vallabh_nagar_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_vallabh_nagar_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_vallabh_nagar_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_vallabh_nagar_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_vallabh_nagar_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sector10_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_sector10_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_sector10_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_sector10_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sector10_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sector10_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sector10_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sector10_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sector_7_10_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_sector_7_10_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_sector_7_10_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_sector_7_10_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sector_7_10_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sector_7_10_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sector_7_10_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sector_7_10_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sector_7_10_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_sector_7_10_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_sector_7_10_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_sector_7_10_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sector_7_10_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sector_7_10_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_sector_7_10_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_sector_7_10_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_ashram_school_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_ashram_school_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_ashram_school_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_ashram_school_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_ashram_school_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_ashram_school_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_ashram_school_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_ashram_school_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_indrayani_nagar_esr1",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_indrayani_nagar_esr1_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_indrayani_nagar_esr1_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_indrayani_nagar_esr1_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_indrayani_nagar_esr1_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_indrayani_nagar_esr1_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_indrayani_nagar_esr1_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_indrayani_nagar_esr1_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_indrayani_nagar_esr2",
					"zoomLevel": 8.3,
					"systemType": "Distribution",
					"type": "Device"
				},
				{
					"id": "infw_indrayani_nagar_esr2_ReadingGroup",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingGroup"
				},
				{
					"id": "infw_indrayani_nagar_esr2_status",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "Status"
				},
				{
					"id": "infw_indrayani_nagar_esr2_level_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_indrayani_nagar_esr2_dailytotalisedflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_indrayani_nagar_esr2_currentflow_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
				{
					"id": "infw_indrayani_nagar_esr2_flowrate_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
				},
			
				{
					"id": "infw_indrayani_nagar_esr2_pressure_text",
					"zoomLevel": 0,
					"systemType": "Distribution",
					"type": "ReadingVal"
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
		a.ondblclick = function() {
			return false;
		};
		setTimeout(() => {
			//var svgElement = document.getElementsByTagName('svg')
			//svgElement.setAttribute('viewBox',"0 0 4000 4460");
			var idList = [];
			for (var k = 0; k < this.state.elementConfig.length; k++) {
				console.log(this.state.elementConfig[k].id)
				if (this.state.elementConfig[k].type == 'Device') {
					idList.push({
						id: this.state.elementConfig[k].id,
						eventName: 'click'//this.state.elementConfig[k].eventName
					});
				} else if(this.state.elementConfig[k].id.indexOf('_ReadingGroup')>-1){
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
	/* 
	componentWillUpdate(nextProps,nextState){
		


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
			
		
	} */

	checkToolPan = (tool) => {
		if (this.state.tool == 'pan') {
			//this.setState({ value: null });
		}
	};

	zoomByReactangleListner = (e) => {
		/* 	setTimeout(() => {
			this.state.elementConfig.forEach((eleId) => {
				if (eleId.zoomLevel < this.state.value.a && eleId.type == 'Device') {
					document.getElementById(eleId.id + '_ReadingGroup').classList.add('display');
				}
			});
		}, 1000); */
	};
	listner = (e) => {
		if (this.state.tool == 'zoom-in') {
			console.log('Click', e);
			console.log('iddd', e.currentTarget.id);
			this.state.elementConfig.forEach((ids) => {
				if (e.currentTarget.id == ids.id) {
					if (
						this.state.selectedCurrentElement &&
						this.state.selectedCurrentElement.id == e.currentTarget.id
					) {
						/* 		
							this.props.history.push('/deviceDetails', {
								deviceElementId: e.currentTarget.id
							}); */
					} else if (!ids.isVisible) {
						ids.isVisible = true;
						let zoomLvl = this.state.selectedCurrentElement
							? this.state.selectedCurrentElement.zoomLevel - ids.zoomLevel
							: ids.zoomLevel;
						if (this.state.value.a <= ids.zoomLevel) {
							this.Viewer.setPointOnViewerCenter(e.clientX, e.clientY, zoomLvl);
						}

						var currentClickElement = document.getElementById(ids.id + '_ReadingGroup');
						var getleftoffset = getOffset(currentClickElement).left + 5;
						var getbuttomoffset = getOffset(currentClickElement).bottom - 15;

						console.log('&&&&' + getleftoffset);
						this.setState({
							currentClickLeftOffset: getleftoffset,
							currentClickBottomOffset: getbuttomoffset,
							readingLoader: true
						});

						setTimeout(() => {
							this.setState({ readingLoader: false });
						}, 1000);
						setTimeout(() => {
							console.log('Show Reading Group');
							document.getElementById(ids.id + '_ReadingGroup').classList.add('display');
							document.getElementById(ids.id + '_ReadingGroup').classList.remove('testHideShow');
						}, 4000);
					}

					/* 	if (this.state.value.a <= ids.zoomLevel ) {
					
					
					} else {
						if(ids.isVisible){
							//ids.isVisible = false
							this.props.history.push('/deviceDetails', {
								deviceElementId: e.currentTarget.id
							});
						}
						
					} */
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
				{this.state.readingLoader ? (
					<div
						style={{
							top: this.state.currentClickBottomOffset,
							left: this.state.currentClickLeftOffset,
							position: 'absolute',
							zIndex: 999999
						}}
					>
						<Loader type="Puff" color="#fff" height="20" width="20" />
					</div>
				) : null}
				{this.state.loading ? (
					<div style={{ zIndex: 9999000, position: 'absolute', left: '43%', top: '35%' }}>
						<Loader type="Puff" color="#00BFFF" height="100" width="100" />
					</div>
				) : null}
				<div style={{ visibility: this.state.loadingDivStyle }}>
					<ReactSVGPanZoom
						height={window.innerHeight}
						width={window.innerWidth - 20}
						preventPanOutside={true}
						detectAutoPan={false}
						scaleFactorMin={1}
						scaleFactorMax={20}
						disableDoubleClickZoomWithToolAuto={false}
						style={{ border: '1px solid black' }}
						ref={(Viewer) => (this.Viewer = Viewer)}
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
								<object data="-test-New_Digram_27Feb.svgz" id="getSVG" type="image/svg+xml" />
							</foreignObject>
						</svg>
					</ReactSVGPanZoom>
					{/* <object data="-test-New_Digram_7feb_ef.1.svgz" id="getSVG" type="image/svg+xml" />
  */}
				</div>
			</div>
		);
	}
}
