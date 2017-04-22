/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import {connect, Dispatch} from "react-redux";
import * as moment from 'moment';
import * as arraySort from 'array-sort'
import * as cx from 'classnames'
import {MovieItem, MoviesState} from "../reducers/moviesReducer";
import updateMoviesSort, {UpdateMoviesSort} from "../actions/updateMoviesSort";
import SortMovieButton from "./SortMovieButton";

interface ResultsBoxProps {
    movies: MoviesState,
    updateMoviesSort: UpdateMoviesSort
}

class ResultsBox extends React.Component<ResultsBoxProps, void> {

    /*handleSort(column, e) {
        e.preventDefault();
        console.log(column);
        let newReverse = false;
        if (this.props.movies.sort.column === column) {
            newReverse = !this.props.movies.sort.reverse;
        }
        this.props.updateMoviesSort(column, newReverse);
    }*/

    render() {

        const {items, sort} = this.props.movies;

        const movies = arraySort(items, sort.column, {
            reverse: sort.reverse
        });



        return (
            <div className="inner">
                <table className="results-box">
                    <thead>
                        <tr>
                            <th className="results-box-name">
                                <SortMovieButton id="name" actualSort={sort}>Jméno</SortMovieButton>
                            </th>
                            <th className="results-box-date">
                                <SortMovieButton id="lastUpdated" actualSort={sort}>Poslední změna</SortMovieButton>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {movies.map((item: MovieItem, index: number) => {
                            return (
                                <tr key={index}>
                                    <td className="results-box-name">{item.name}</td>
                                    <td className="results-box-date">{moment(item.lastUpdated).format('DD.MM.YYYY HH:mm')}</td>
                                </tr>
                            );
                    })}
                    </tbody>
                </table>
            </div>
        )
    }

}
/*
 <a href="" onClick={this.handleSort.bind(this, 'name')}>Jméno {column === 'name'
 ? (<i className={cx('fa', {'fa-caret-up': !reverse, 'fa-caret-down': reverse})}/>)
 : null
 }</a>
 <a href="" onClick={this.handleSort.bind(this, 'lastUpdated')}>Poslední změna {column === 'lastUpdated'
 ? (<i className={cx('fa', {'fa-caret-up': !reverse, 'fa-caret-down': reverse})}/>)
 : null
 }</a>
 */


const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        updateMoviesSort: (column: string, reverse: boolean) => {
            return dispatch(updateMoviesSort(column, reverse));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsBox)