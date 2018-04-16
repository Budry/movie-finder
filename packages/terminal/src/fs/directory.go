package fs

import (
	"os"
	"path/filepath"
	"sync"

	"github.com/budry/movie-finder/packages/terminal/src/movies"
)

func ProcessDirectory(dir string, wg *sync.WaitGroup, movieRecords *movies.Movies) {
	defer wg.Done()

	visit := func(path string, f os.FileInfo, err error) error {
		if f.IsDir() && path != dir {
			wg.Add(1)
			go ProcessDirectory(path, wg, movieRecords)
			return filepath.SkipDir
		}
		if f.Mode().IsRegular() {
			movieRecords.InsertMovie(f.Name(), f.ModTime())
		}
		return nil
	}

	filepath.Walk(dir, visit)
}
