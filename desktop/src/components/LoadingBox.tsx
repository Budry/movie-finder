/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import {connect} from "react-redux";

interface LoadingBoxState {
    progress: number
}

interface LoadingBoxProps {
    loading: boolean
}

class LoadingBox extends React.Component<LoadingBoxProps, LoadingBoxState> {

    state = {
        progress: 0
    };
    private timer = null;

    componentWillReceiveProps(nextProps: LoadingBoxProps) {
        if (nextProps.loading) {
            this.timer = setInterval(this.tick.bind(this), 1000);
        } else {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    tick() {
        console.log('tick');
        this.setState({progress: (this.state.progress + 1) % 4});
    }

    render() {

        if (!this.props.loading) {
            return null;
        }

        return (
            <div className="loading-box">
                <div className="loading-text-box">
                    <i className="fa fa-spinner" /> Načítám {Array(this.state.progress + 1).join('.')}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loading: state.loading.isLoading
    }
};

export default connect(mapStateToProps)(LoadingBox)