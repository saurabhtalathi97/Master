import React from 'react';
import io from 'socket.io-client';

import './style.css';

class Board extends React.Component {

    timeout;
    socket = io.connect("http://localhost:4000");

    ctx;
    isDrawing = false;

    constructor(props) {
        super(props);

        this.socket.on("canvas-data", function(data){
            let root = this;
            let interval = setInterval(function(){
                if(root.isDrawing) return;
                root.isDrawing = true;
                clearInterval(interval);
                let image = new Image();
                let canvas = document.querySelector('#canvas');
                let ctx = canvas.getContext('2d');
                image.onload = function() {
                    ctx.drawImage(image, 0, 0);
                    root.isDrawing = false;
                };
                image.src = data;
            }, 50)
        })
    }


    componentDidMount() {
        this.drawOnCanvas();
        this.writeOnCanvas();
        const img = this.refs.image
    }

    componentWillReceiveProps(newProps) {
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
    }

    drawOnCanvas() {
        let canvas = document.querySelector('#canvas');
        this.ctx = canvas.getContext('2d');
        let ctx = this.ctx;
        ctx.save();
        let drawing = document.querySelector('#drawing');
        let sketch_style = getComputedStyle(drawing);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        let mouse = {x: 0, y: 0};
        let last_mouse = {x: 0, y: 0};
        let recentWords = [];
        let undoList = [];

        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        let root = this;
        let onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            if(root.timeout !== undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(function(){
                let base64ImageData = canvas.toDataURL("image/png");
                root.socket.emit("canvas-data", base64ImageData);
            }, 50)
        };
    }

    writeOnCanvas() {
        let canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        let ctx = this.ctx;

        let startX = 0;
        let mouse = {x: 0, y: 0};


        canvas.addEventListener("click",function(e){
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            startX = mouse.x
            return false;
        }, false)

        document.addEventListener("keydown",function(e){
            ctx.font = "25px Arial"
            if(e.keyCode === 13){
                mouse.x = startX;
                mouse.y += 20;
            } else {
                console.log(e.key);
                ctx.fillText(e.key, mouse.x, mouse.y);
                mouse.x += ctx.measureText(e.key).width;
                onWrite()
            }
        }, false)

        let root = this;
        let onWrite = function() {
            ctx.stroke();
            if(root.timeout !== undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(function(){
                let base64ImageData = canvas.toDataURL("image/png");
                root.socket.emit("canvas-data", base64ImageData);
            }, 50)
        };
    }

    render() {
        return (
            <div className="drawing" id="drawing">
                <canvas className="canvas" id="canvas"/>
                {/*<img ref="image" src={} style={{display:'none'}}/>*/}
            </div>
        )
    }
}

export default Board