/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react'

class ExportButton extends React.Component<void, void> {

    render() {
        return (
            <a href=""><i className="fa fa-download" /> Export</a>
        )
    }

}

export default ExportButton