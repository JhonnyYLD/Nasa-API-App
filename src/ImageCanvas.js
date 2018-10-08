import React, { Component } from 'react';
class ImageCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pixels: null,

        }

    }
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        let image = this.props.image;
        const ctx = this.refs.canvas.getContext('2d');
        let imageData =this.filterImage(this.grayScale, image, null);
        imageData ? ctx.putImageData(imageData,0,0) : ctx.drawImage(image, 0, 0);
    }
    grayScale(pixels,args){
        for(let i = 0; i< pixels.length; i+=4 ){
            const r = pixels[i];
            const g = pixels[i+1];
            const b = pixels[i+2];
            const v = 0.2126*r + 0.7152*g + 0.0722*b;
            pixels[i]= pixels[i+1]= pixels[i+2]= v;
        }
        return pixels;
    }
    filterImage(filter, image, var_args) {
        const imageData = this.getPixels(image);
        if(imageData!==0) filter(imageData.data, var_args);
        return imageData;
    }

    getPixels(image) {
        let canvas = this.newCanvas(image.width, image.height);
        let ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        if (!this.isContextTainted(ctx))
            return ctx.getImageData(0, 0, canvas.width, canvas.height);
        else
            return 0

    }
    isContextTainted(ctx) {
        try {
            ctx.getImageData(0, 0, 1, 1);
            return false;
        } catch (err) {
            return (err.code === 18);
        }
    }
    newCanvas(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
    render() {
        return (
            <canvas className='image' width={this.props.image.width} height={this.props.image.height} ref='canvas'></canvas>
        )
    }
}

export default ImageCanvas;