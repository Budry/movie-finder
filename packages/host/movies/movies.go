package movies

import (
	"sync"
	"time"
)

type Movie struct {
	Name       string    `json:"name"`
	LastChange time.Time `json:"last_change"`
}

type Movies struct {
	Data  []*Movie
	Mutex *sync.Mutex
}

func (movies *Movies) Init() {
	movies.Data = make([]*Movie, 0)
	movies.Mutex = &sync.Mutex{}
}

func (movies *Movies) InsertMovie(name string, lastChange time.Time) {
	movies.Mutex.Lock()
	movie := &Movie{name, lastChange}
	movies.Data = append(movies.Data, movie)
	movies.Mutex.Unlock()
}

func (movies Movies) GetMovies() []*Movie {
	return movies.Data
}
