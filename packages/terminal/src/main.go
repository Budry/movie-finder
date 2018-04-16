package main

import (
	"log"
	"os"

	"github.com/budry/movie-finder/packages/terminal/src/cmd"
	"github.com/urfave/cli"
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
			Action: cmd.HandleListCommand,
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
