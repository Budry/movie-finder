package cmd

import (
	"encoding/json"
	"fmt"
	"sync"

	"github.com/budry/movie-finder/packages/terminal/src/fs"
	"github.com/budry/movie-finder/packages/terminal/src/movies"
	"github.com/ryanuber/columnize"
	"github.com/urfave/cli"
)

func HandleListCommand(c *cli.Context) error {
	if (c.NArg() != 1) {
		panic("Missing path")
	}

	path := c.Args().Get(0)
	limit := c.Int("limit")
	offset := c.Int("offset")
	sortKey := c.String("sortKey")
	sortMethod := c.String("sortMethod")
	format := c.String("format")

	movieRecords := &movies.Movies{}
	movieRecords.Init()

	wg := &sync.WaitGroup{}

	wg.Add(1)
	fs.ProcessDirectory(path, wg, movieRecords)
	wg.Wait()

	if limit != 0 {
		movieRecords.Limit(limit, offset)
	}

	movieRecords.Sort(sortKey, sortMethod)

	moviesList := movieRecords.GetMovies()

	if format == "text" {
		outputs := make([]string, 0)
		for _, movie := range moviesList {
			outputs = append(outputs, fmt.Sprintf("%s|%s", movie.Name, movie.LastChange))
		}
		fmt.Println(columnize.SimpleFormat(outputs))
		return nil
	} else if format == "json" {
		parsedMovies, err := json.Marshal(moviesList)
		fmt.Println(string(parsedMovies))
		return err
	} else {
		return nil
	}
}
