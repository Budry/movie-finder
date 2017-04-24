/**
 * This file is part of the movie-finder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'
import {connect, Dispatch} from "react-redux";
import updateFilter, {UpdateFilter} from "../actions/updateFilter";

interface SearchFormState {
    value: string
}

interface SearchFormProps {
    updateFilter: UpdateFilter
}

class SearchForm extends React.Component<SearchFormProps, SearchFormState> {

    state = {
        value: ''
    };

    handleChange(e) {
        const filter = e.target.value;
        this.updateFilter(filter);
    }

    handleClear(e) {
        e.preventDefault();
        this.updateFilter('');
    }

    updateFilter(filter: string) {
        this.setState({value: filter});
        this.props.updateFilter(filter);
    }

    render() {

        const {value} = this.state;

        return (
            <form className="search-form">
                <label htmlFor="search">Vyhledat podle názvu:</label>
                <div className="search-input">
                    <input type="text" id="search" value={value} onChange={this.handleChange.bind(this)} />
                    {value !== ''
                        ? (<a href="" onClick={this.handleClear.bind(this)}>&times;</a>)
                        : null
                    }
                </div>
            </form>
        )
    }

}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        updateFilter: (filter: string) => {
            return dispatch(updateFilter(filter));
        }
    }
};

export default connect(null, mapDispatchToProps)(SearchForm)