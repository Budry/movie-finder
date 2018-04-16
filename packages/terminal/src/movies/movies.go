package movies

import (
	"sort"
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

type MoviesSorter struct {
	Movies *Movies
	Key    string
	Method string
}

func (moviesSorter *MoviesSorter) Len() int {
	return len(moviesSorter.Movies.Data)
}

func (moviesSorter *MoviesSorter) Swap(i, j int) {
	moviesSorter.Movies.Data[i], moviesSorter.Movies.Data[j] = moviesSorter.Movies.Data[j], moviesSorter.Movies.Data[i]
}

func (moviesSorter *MoviesSorter) Less(i, j int) bool {
	movie1 := moviesSorter.Movies.Data[i]
	movie2 := moviesSorter.Movies.Data[j]

	compare := func(value1, value2 string) bool {
		if moviesSorter.Method == "ASC" {
			return len(value1) < len(value2)
		} else if moviesSorter.Method == "DESC" {
			return len(value1) > len(value2)
		} else {
			panic("Invalid sort method")
		}
	}

	if moviesSorter.Key == "Name" {
		return compare(movie1.Name, movie2.Name)
	} else if moviesSorter.Key == "LastChange" {
		return compare(movie1.LastChange.String(), movie2.LastChange.String())
	} else {
		panic("Invalid sort key")
	}
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

func (movies *Movies) Limit(limit int, offset int) {
	movies.Data = movies.Data[offset : offset+limit]
}

func (movies *Movies) Sort(key string, method string) {
	sort.Sort(&MoviesSorter{movies, key, method})
}

func (movies Movies) GetMovies() []*Movie {
	return movies.Data
}
