/**
 * This file is part of the desktop package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

export interface Movie {
    name: string;
    last_change: Date;
}

export interface Movies {
    limit: number;
    displayed: number;
    data: Movie[];
}