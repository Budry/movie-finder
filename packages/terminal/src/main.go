package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"sync"

	"github.com/budry/movie-finder/packages/terminal/src/fs"
	"github.com/budry/movie-finder/packages/terminal/src/movies"
	"github.com/urfave/cli"
	"github.com/ryanuber/columnize"
)

func main() {
	app := cli.NewApp()
	app.Name = "movie-finder"
	app.HelpName = "movie-finder"
	app.Commands = []cli.Command{
		{
			Name:    "list",
			Aliases: []string{"l"},
			Usage:   "Print lists",
			Flags: []cli.Flag{
				cli.IntFlag{
					Name:  "limit, l",
					Usage: "Display limits",
				},
				cli.IntFlag{
					Name:  "offset, o",
					Usage: "Offset",
				},
				cli.StringFlag{
					Name:  "format, f",
					Value: "text",
					Usage: "Display format",
				},
				cli.StringFlag{
					Name:  "sortKey, k",
					Value: "Name",
					Usage: "Name of sort key",
				},
				cli.StringFlag{
					Name:  "sortMethod, m",
					Value: "DESC",
					Usage: "Sort by",
				},
			},
			Action: func(c *cli.Context) error {

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
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
