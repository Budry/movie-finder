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
import {MovieRecord} from "../reducers/moviesReducer";

interface ResultsBoxProps {
    movies: MovieRecord[]
}

class ResultsBox extends React.Component<ResultsBoxProps, void> {

    render() {
        return (
            <ul className="results-box">
                {this.props.movies.map((item: MovieRecord, index: number) => {
                        return <li key={index}>{item.name}</li>
                })}
            </ul>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
};

export default connect(mapStateToProps)(ResultsBox)