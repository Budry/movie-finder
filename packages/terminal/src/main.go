package main

import (
	"encoding/json"
	"fmt"
	"os"
	"sync"

	"github.com/budry/movie-finder/packages/terminal/src/fs"
	"github.com/budry/movie-finder/packages/terminal/src/movies"
)

func main() {

	if len(os.Args) != 2 {
		panic("Invalid arguments")
	}

	path := os.Args[1]

	movieRecords := &movies.Movies{}
	movieRecords.Init()

	wg := &sync.WaitGroup{}

	wg.Add(1)
	fs.ProcessDirectory(path, wg, movieRecords)
	wg.Wait()

	parsedMovies, err := json.Marshal(movieRecords.GetMovies())
	if err != nil {
		panic(err)
	}

	fmt.Println(string(parsedMovies))
}
