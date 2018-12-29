import React, { Component } from 'react'

class ObjectSvg extends Component {

    render() {
        return (
            <object
                id="svgClarifier"
                type="image/svg+xml"
                data={this.props.path}
                aria-labelledby="wtp"
            />
        )
    }
}

export default ObjectSvg;

