import styled from 'styled-components';

const colors = {
    blue: "#224870",
    green: "#6CC551",
    yellow: "#F9DC5C",
    red: "#E84855",
    white: "#F2FFFC"
}

const fly = ()=>`
    box-shadow: 2px 2px 6px #443;
`

const neon = (color = colors.white, blur = '6px') => `
    text-shadow: 0 0 ${blur} ${color};
`

const lightenDarken=(col, amt)=> {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}


export { neon, colors, lightenDarken, fly};