/**
 * This file is part of the desktop package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

interface Config {
    limitPerPage: number
}

export const getConfig = (): Config => {
    return {
        limitPerPage: 10
    }
};