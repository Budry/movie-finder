/**
 * This file is part of the desktop package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from "react";
import {Component} from "react";
import SortButton from "./SortButton";
import {SortObject} from "../types/SortObject";
import Paginator from "./Paginator";
import {MoviesState} from "../reducers/moviesReducer";
import {getMovies, GetMovies} from "../actions/getMovies";
import {StoreState} from "../store";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

interface State {
    actualSort: SortObject
    page: number
}

interface StateProps {
    movies: MoviesState
}

interface DispatchProps {
    getMovies: GetMovies
}

type MergedProps = DispatchProps & StateProps

class ResultsBox extends Component <MergedProps, State> {

    constructor(props) {
        super(props);
        this.state = {
            actualSort: null,
            page: 1
        }
    }

    handleSort = (property, method) => {
        if (property !== null && method !== null) {
            this.setState({actualSort: {property: property, method: method}})
        } else {
            this.setState({actualSort: null})
        }
    };

    handleChangePage = (page) => {
        this.setState({page: page})
    };

    render() {
        const {actualSort, page} = this.state;
        const {movies} = this.props;
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <SortButton property={"name"} onChange={this.handleSort} actualSort={actualSort}>
                                File name
                            </SortButton>
                        </th>
                        <th>
                            <SortButton property={"last_change"} onChange={this.handleSort} actualSort={actualSort}>
                                Last change
                            </SortButton>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.data.map((movie, index) => {
                        return (
                            <tr>
                                <td>{movie.name}</td>
                                <td>{movie.last_change}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <Paginator actualPage={page} totalNumber={10} perPage={1} onChange={this.handleChangePage} />
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState) => {
    return {
        movies: state.movies
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators<any>({
        getMovies: getMovies
    }, dispatch);
};

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(ResultsBox)