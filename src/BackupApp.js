import React, { Component } from 'react';
import './App.css';
import SvgComponent from './components/SvgComponent';
import * as d3 from "d3";
import ObjectSvg from "./components/ObjectSvg/ObjectSvg"


// Set start mouse position for drag animation
let startMousePosition = null;
let firstLayer = "Layer_8"
let secondLayer = "Layer_13";
let currentLayer = firstLayer ;
let layers = [firstLayer, secondLayer];
let layerNumber = 0;
let mainSvgLayer = "Layer_8"
let svgContainer = "App"

class App extends Component {


  componentDidMount() {
    // Get height and width of layer to be displayed in window
    var width = document.getElementById('Layer_13').getBoundingClientRect().width;

    var height = document.getElementById("Layer_7").getBoundingClientRect().height;

    // Set height and width of layer to "App" div
    var contianer = document.getElementById(svgContainer)
    // height -30 adjusted for reset button
    contianer.style.height = height - 30 + "px";
    contianer.style.width = width+30 + "px";

    //Detect layer on component mount
    this.detectHandler(layers[layerNumber])


    //Keyboard scroll
    document.addEventListener('keydown', (event) => {
      //left
      if (event.keyCode == 37) {
        this.previousHandler()
      }
      //right
      else if (event.keyCode == 39) {
        this.nextHandler()
      }
    });


    //Detect element on double click
    document.getElementById("clarifier").addEventListener("dblclick", (e) => {
      console.log(e.currentTarget.id);
      document.getElementById("currentElement").innerText = `${e.currentTarget.id}`

    })



    // Zoom 
    var zoom = d3.zoom()
      .scaleExtent([0.2, 20])
      .on("zoom", zoomed)



    function zoomed() {
      //If zoom is greater than 8 then redirect to child svg
      if (d3.event.transform.k >= 8) {
        console.log("removed");
        setTimeout(() => {
          document.getElementById("App").style.display = "none"
          document.getElementById("clarifierSvg").style.display = "initial"
        }, 720)
      }


      // zoom effect transition
      var toModify = d3.select(`#svg`).transition().duration(750)
        .attr("transform", d3.event.transform).attr("scale",d3.event.scale);
    }

    // D3.js adding events on svg
    var svg = d3.select("#App")
      .call(zoom)
      // Disable Panning
/*     .on("mousedown.zoom", null)
      .on("touchstart.zoom", null)
      .on("touchmove.zoom", null)
      .on("touchend.zoom", null)
      .on("wheel.zoom", null) */ 

    // Set svg and zoom as global for use in reset button handler
    this.svg = svg;
    this.zoom = zoom

  }

  resetHandler = () => {
    this.svg.call(this.zoom.transform, d3.zoomIdentity.scale(1));
    // If child svg is present then zoom out to parent svg
    if (document.getElementById(svgContainer).style.display == "none") {
      document.getElementById(svgContainer).style.display = "initial"
      document.getElementById("clarifierSvg").style.display = "none"
    }

  }

  detectHandler = (currentLayer) => {
    // Get layer's x axis
    var firstLayerBounding = document.getElementById(firstLayer).getBoundingClientRect();
    var secondLayerBounding = document.getElementById(secondLayer).getBoundingClientRect();
    // Check array boundary condition
    if(layerNumber >= layers.length)
    {
      layerNumber = layerNumber - 1
      return;
    }
    if(layerNumber < 0)
    {
      layerNumber = 0
      return;
    }

    // Get currentLayerBounding and compare it with first and second layer bounding
    var currentLayerBounding = document.getElementById(currentLayer).getBoundingClientRect();

    // x axis of layer is negative if it is not present in screen
    if (currentLayerBounding.x == firstLayerBounding.x) {
      currentLayer = firstLayer;
      alert(currentLayer)
    }
    else if (currentLayerBounding.x == secondLayerBounding.x) {
      currentLayer = secondLayer
      alert(currentLayer)
    }

  }

  nextHandler = () => {
    var contianer = document.getElementById("App")
    var translate = -100;

    contianer.style.transform = "translateX(" + translate + "vw";
    setTimeout(() => {
      layerNumber += 1
      currentLayer = layers[layerNumber];
      this.detectHandler(currentLayer);
    }, 2000)
  }

  previousHandler = () => {
    var contianer = document.getElementById("App")
    var translate = 0;

    contianer.style.transform = "translateX(" + translate + "vw";
    setTimeout(() => {
      layerNumber -= 1
      currentLayer = layers[layerNumber];
      this.detectHandler(currentLayer);
    }, 2000)

  }

  dragStart = (e) => {
    console.log("start");
    startMousePosition = e.pageX
  }


  dragOver = (e) => {
    console.log("over");
    if (e.pageX > startMousePosition) {
      this.previousHandler()
    }
    if (e.pageX < startMousePosition) {
      this.nextHandler()
    }
    startMousePosition = null;
  }



  render() {
    return (
      <div style={{ overflow: "hidden", display: "flex", flexDirection: "column" }} id="main">
        {/* <button onClick={this.nextHandler}>next</button>
        <button onClick={this.previousHandler}>previous</button>
        <button onClick={this.detectHandler}>Id detect</button> */}
        <div style={{ height: "10%", width: "100%" }}>
          <button style={{ float: "left", display: "inline-block" }} id="reset" onClick={this.resetHandler}>Reset</button>
          <button style={{ float: "left", display: "inline-block" }} id="previous" onClick={this.previousHandler}>Previuos</button>
          <button style={{ float: "left", display: "inline-block" }} id="next" onClick={this.nextHandler}>Next</button>


          <span style={{ float: "left", }} id="currentElement"></span>
        </div>



        <div onDoubleClick={this.zoomHandler} id="App" className="App" draggable={true} onDrag={this.dragHandler} onDragEnd={this.dragOver} onDragStart={this.dragStart} style={{ height: "100%", width: "100%" }} >

          <SvgComponent id="svg" />
        </div>

        <div id="clarifierSvg" className="App" draggable={true} onDrag={this.dragHandler} onDragEnd={this.dragOver} onDragStart={this.dragStart} style={{ height: "50%", width: "50%", display: "none" }} >
      {/*     <div style={{ position: "absolute", top: 20, right: "50%", float: "left" }}>
            <button id="reset" onClick={this.resetHandler}>Go Back</button>
          </div> */}
          <ObjectSvg path="./clarifier.svg" />
        </div>
      </div>
    );
  }
}

export default App;
