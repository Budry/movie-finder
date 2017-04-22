/**
 * This file is part of the movie-finder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import {connect} from "react-redux";
import {MoviesState} from "../reducers/moviesReducer";

interface ActualDirectoryBoxProps {
    movies: MoviesState
}

class ActualDirectoryBox extends React.Component<ActualDirectoryBoxProps, void> {

    render() {
        return (
            <div className="actual-directory-box">
                <p><strong>Počet souborů: </strong> {this.props.movies.items.length}</p>
                <p><strong>Aktuálně vybraná složka:</strong> {this.props.movies.directory}</p>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
};

export default connect(mapStateToProps)(ActualDirectoryBox)