export default function getOffset(el) { 
    let rect = el.getBoundingClientRect(); // get the svg element boundaries 
    return { 
      top: rect.top, //returns top 
      bottom: rect.bottom, //returns bottom 
      left: rect.left,  //returns left 
      right:rect.right, // returns right 
      height:rect.height, //returns height 
      width:rect.width, //returns width       
    }; 
} 