/**
 * This file is part of the desktop package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from "react";
import {Component, StatelessComponent} from "react";
import SortButton from "./SortButton";
import {SortObject} from "../SortObject";
import Paginator from "./Paginator";

interface State {
    actualSort: SortObject
    page: number
}

class ResultsBox extends Component <{}, State> {

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
                    <tr>
                        <td>Test</td>
                        <td>12.2.2018 15:56</td>
                    </tr>
                    <tr>
                        <td>Test</td>
                        <td>12.2.2018 15:56</td>
                    </tr>
                    </tbody>
                </table>
                <Paginator actualPage={page} totalNumber={10} perPage={1} onChange={this.handleChangePage} />
            </div>
        );
    }
}

export default ResultsBox