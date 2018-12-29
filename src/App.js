import React, { Component } from 'react';
import './App.css';
import SvgComponent from './components/SvgComponent';
import * as d3 from "d3";
import ObjectSvg from "./components/ObjectSvg/ObjectSvg"


// Set start mouse position for drag animation
let startMousePosition = null;

class App extends Component {


  componentDidMount() {
    document.getElementById("ladder").remove()
    // Get height and width of layer to be displayed in window
    var width = document.getElementById("Layer_8").getBoundingClientRect().width;

    var height = document.getElementById("Layer_7").getBoundingClientRect().height;

    // Set height and width of layer to "App" div
    var contianer = document.getElementById("App")
    contianer.style.height = height + "px";
    contianer.style.width = width + "px";



    //Keyboard scroll
    document.addEventListener('keydown', (event) =>{
      //left
      if(event.keyCode == 37) {
         // object.x -= 1;
         this.previousHandler()
      }
     
      //right
      else if(event.keyCode == 39) {
         this.nextHandler()
      }
     
    });



    // Zoom 
    var zoom = d3.zoom()
      .scaleExtent([0.2, 20])
      .on("zoom", zoomed);


    function zoomed() {
      console.log((d3.event.transform.k));

      if (d3.event.transform.k >= 2) {
        console.log("removed");

        svg.select("#ladder").attr("opacity",0.5)
      }

      if (d3.event.transform.k >= 4) {
        console.log("removed");

        svg.select("#ladder").attr("opacity",0.2)
      }

      if (d3.event.transform.k >= 8) {
        console.log("removed");

        document.getElementById("App").style.display="none"
        document.getElementById("clarifierSvg").style.display="initial"


        // document.getElementById("App").appendChild()
     
      }

      var toModify = d3.select('#Layer_8').transition().duration(750)
        .attr("transform", d3.event.transform);
      // .attr("transform", `translate(${differenceX},${differenceY})scale(2)`);
    }

    var svg = d3.select("#svg")
      .call(zoom);

  }


  detectHandler = () => {

    // Get layer's x axis
    var bounding = document.getElementById("Layer_8").getBoundingClientRect();

    console.log(bounding, "bounding");
    // x axis of layer is negative if it is not present in screen
    if (bounding.x < 0) {
      alert("Layer 2")
    }
    if (bounding.x > 0) {
      alert("Layer 1")
    }
  }

  nextHandler = () => {

    var contianer = document.getElementById("App")
    var translate = -100;
    contianer.style.transform = "translateX(" + translate + "vw";
  }

  previousHandler = () => {
    var contianer = document.getElementById("App")
    var translate = 0;
    contianer.style.transform = "translateX(" + translate + "vw";
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

        <div onDoubleClick={this.zoomHandler} id="App" className="App" draggable={true} onDrag={this.dragHandler} onDragEnd={this.dragOver} onDragStart={this.dragStart} style={{ height: "100%", width: "100%" }} >
          <SvgComponent id="svg" />
        </div>

        <div onDoubleClick={this.zoomHandler} id="clarifierSvg" className="App" draggable={true} onDrag={this.dragHandler} onDragEnd={this.dragOver} onDragStart={this.dragStart} style={{ height: "50%", width: "50%",display:"none" }} >
          <ObjectSvg path="./clarifier.svg"/>
        </div>
      </div>
    );
  }
}

export default App;
