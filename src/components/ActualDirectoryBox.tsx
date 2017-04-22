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

interface ActualDirectoryBoxProps {
    directory: string
}

class ActualDirectoryBox extends React.Component<ActualDirectoryBoxProps, void> {

    render() {
        return (
            <div className="actual-directory-box">
                <strong>Aktuálně vybraná složka:</strong> {this.props.directory}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        directory: state.movies.directory
    }
};

export default connect(mapStateToProps)(ActualDirectoryBox)