/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import * as Promise from 'bluebird'
import MenuBar from "./MenuBar";
import LoadingBox from "./LoadingBox";
import ResultsBox from "./ResultsBox";
import ActualDirectoryBox from "./ActualDirectoryBox";
import {connect} from "react-redux";
import loadLastMovies from "../actions/loadLastMovies";
import SearchForm from "./SearchForm";

interface AppProps {
    loadLastMovies: () => Promise<void>
}

class App extends React.Component<AppProps, void> {

    componentDidMount() {
        this.props.loadLastMovies()
    }

    render() {
        return (
            <div>
                <LoadingBox />
                <MenuBar />
                <ActualDirectoryBox />
                <SearchForm />
                <ResultsBox />
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        loadLastMovies: () => {
            return dispatch(loadLastMovies())
        }
    }
};

export default connect(null, mapDispatchToProps)(App);