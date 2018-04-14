package main

import (
	"encoding/json"
	"fmt"
	"os"
	"sync"

	"github.com/budry/movie-finder/packages/host/file_system"
	"github.com/budry/movie-finder/packages/host/movies"
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
	file_system.ProcessDirectory(path, wg, movieRecords)
	wg.Wait()

	parsedMovies, err := json.Marshal(movieRecords.GetMovies())
	if err != nil {
		panic(err)
	}

	fmt.Println(string(parsedMovies))
}