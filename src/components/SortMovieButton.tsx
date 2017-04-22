/**
 * This file is part of the movie-finder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import * as cx from 'classnames'
import {MoviesSort} from "../reducers/moviesReducer";
import updateMoviesSort, {UpdateMoviesSort} from "../actions/updateMoviesSort";
import {connect, Dispatch} from "react-redux";

interface SortMovieButtonProps {
    actualSort: MoviesSort,
    id: string,
}

interface SortMovieButtonDispatchProps {
    updateMoviesSort: UpdateMoviesSort
}

class SortMovieButton extends React.Component<SortMovieButtonProps & SortMovieButtonDispatchProps, void> {

    handleSort(e) {
        e.preventDefault();
        let newReverse = false;
        if (this.props.actualSort.column === this.props.id) {
            newReverse = !this.props.actualSort.reverse;
        }
        this.props.updateMoviesSort(this.props.id, newReverse);
    }

    render() {

        const {id, actualSort, children} = this.props;

        return (
            <a href="" onClick={this.handleSort.bind(this)}>{children} {id === actualSort.column
                ? (<i className={cx('fa', {'fa-caret-up': !actualSort.reverse, 'fa-caret-down': actualSort.reverse})}/>)
                : null
            }</a>
        )
    }

}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        updateMoviesSort: (column: string, reverse: boolean) => {
            return dispatch(updateMoviesSort(column, reverse));
        }
    }
};

export default connect<void, SortMovieButtonDispatchProps, SortMovieButtonProps>(null, mapDispatchToProps)(SortMovieButton);