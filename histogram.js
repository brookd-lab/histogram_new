var canvas = document.getElementById("histogram");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 500;
const length = 9; //number of vertical bars

function drawLine(ctx, x1, y1, x2, y2, stroke = "black", width = 3) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = width;
  ctx.stroke();
}

// obtain random number between inclusive range
function randomNumberFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawVerticalBars(arr) {
    let x = 10;
    arr.forEach((value,key) => {
        x+=50;
        color = key % 2 == 0 ? 'salmon' : 'lightgreen'
        drawLine(ctx, x, 450, x, value, color, 50)
        // console.log(450-value)
      })
}

function clearVerticalBars() {
    for (let x = 60; x<=525; x+=50) {
        drawLine(ctx, x, 450, x, 0, 'white', 50)
        // console.log(450-value)
      }
}

function drawCustomVerticalBars(arr) {
    let x = 10;
    arr.forEach((value,key) => {
        x+=50;
        color = key % 2 == 0 ? 'salmon' : 'lightgreen'
        drawLine(ctx, x, 450, x, 450-value, color, 50)
      })
}

function drawAxis() {
    //vertical
    let x = 35
    drawLine(ctx, x, 25, x, 450, 'black', 1)
    //horizontal
    drawLine(ctx, x, 450, 500, 450, 'black', 1)
}

function labelAxis() {
    ctx.font = "normal normal 14px Helvetica"; // set font weight, size, etc
    ctx.textAlign = "end"; // how to align the text horizontally
    //vertical
    for (let i = 50; i <= 400; i+= 50)
        ctx.fillText(i.toString(), 25, 450-i); // text, x, y
    //horizontal
    for (let i = 0; i <= 450; i+= 50)
        ctx.fillText(i.toString(), i+40, 475);
    ctx.fillText("Time (seconds)", 600, 475);
    ctx.fillText("Volume (ml)", 75, 15);
}

function drawGraph() {
    var values = document.getElementById("values");
    
    //validate empty list
    if (values.value.length === 0)
    {
        alert("List must not be empty")
        return
    }
  
    //validate range of values
    var arr = values.value.split(",");
    if (arr.length <= 0 || arr.length > 9) 
    {
        alert("Please enter from one to nine values")
        return
    }

    //validate numeric comma delimited list
    var status = true;
    arr.forEach(number => {
        if (isNaN(number) || number > 400) {
            status = false;
            return;
        }
    })
    if (!status) {
        alert('Please input comma delimited list (maximum height 400)')
        return;
    }

    console.log(status)

    clearVerticalBars(arr);
    drawCustomVerticalBars(arr);
}

function drawLegend() {
    let legend = document.querySelector("#legend");
    console.log(legend);
    let ul = document.createElement("ul");
    legend.append(ul);
    for (let i = 0; i <=1; i++) {
      let li = document.createElement("li");
      li.style.listStyle = "none";
      var color = i % 2 == 0 ? 'salmon' : 'lightgreen'
      li.style.borderLeft =
        "20px solid " + color;
      li.style.padding = "5px";
      li.textContent = i % 2 == 0 ? "lead" : "iron";
      ul.append(li);
    }
    legend.append(ul);
  }




drawAxis();
labelAxis();
//length number of vertical bars
let arr = Array.from({length}, () => randomNumberFromInterval(50, 300));
drawVerticalBars(arr);
drawLegend();


 
