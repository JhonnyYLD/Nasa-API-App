import React, { Component, Fragment } from 'react';
import { ClipLoader } from 'react-spinners';
import ImageCanvas from './ImageCanvas';



class POADContent extends Component {
    render() {
        return <Fragment>
            {
                this.props.loading && <div className='container'>
                    <ClipLoader
                        sizeUnit={'px'}
                        size={150}
                    />
                </div>
            }
            {!this.props.loading &&
                <div className='container'>
                    <h1 className='title'>{this.props.data.title}</h1>
                    {
                        this.props.data.media_type === 'image' &&
                        <ImageCanvas image={this.props.image} />
                    }
                    {
                        this.props.data.media_type === 'video' &&
                        <iframe className='image'
                            title={this.props.data.title}
                            src={`${this.props.data.url}`}>
                        </iframe>
                    }
                    <p className='text'>{this.props.data.date}</p>
                    <p className='text'>{this.props.data.explanation}</p>
                </div>
            }
        </Fragment>
    }
}

export default POADContent;