import { Component, OnInit } from '@angular/core';
import {Imdb, Movie} from "../../common/movie";
import {MovieService} from "../../services/movie.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit
{
  formMovie: FormGroup = this.formBuilder.group(
    {
      _id: [''],
      imdb: this.formBuilder.group(
        {
          rating: [0],
          votes: [0]
        }),
      title: '',
      year: [2023],
      director: [''],
      plot: [''],
      poster: [''],
      genres: [],
      __v: ['']
    });
  movies: Movie[] = [];

  myNewGenres = new FormGroup({newGenres: new FormGroup('')});

  genres: string[] = [];
  editar = false;
  constructor(private movieService: MovieService, private formBuilder: FormBuilder) { }

  ngOnInit(): void
  {
    this.loadMovies();
  }

  get title(): any
  {
    return this.formMovie.get('title') ?.value;
  }

  get year(): any
  {
    return this.formMovie.get('year') ?.value;
  }

  get director(): any
  {
    return this.formMovie.get('director') ?.value;
  }

  get plot(): any
  {
    return this.formMovie.get('plot') ?.value;
  }

  get poster(): any
  {
    return this.formMovie.get('poster') ?.value;
  }

  get genresF(): any
  {
    return this.formMovie.get('genres') ?.value;
  }

  get rating(): any
  {
    return this.formMovie.get('rating') ?.value;
  }

  get votes(): any
  {
    return this.formMovie.get('votes') ?.value;
  }

  get newGenre(): any
  {
    return this.formMovie.get('newGenre') ?.value;
  }

  private loadMovies()
  {
      this.movieService.getMoviesList().subscribe((data: Movie[]) =>
      {
        this.movies = data;
      });

      this.movieService.getGenres().subscribe(data => this.genres = data);
  }

  newMovie()
  {
    this.formMovie.reset();
    this.editar = false;
  }

  loadMovie(movie: Movie)
  {
    this.formMovie.setValue(movie);
    this.editar = true;
  }

  removeMovie(movie: Movie)
  {
    if (confirm('Desea borrar' + movie.title + '?'))
    {
      this.movieService.deleteMovie(movie._id).subscribe(data => this.loadMovies());
    }
  }

  addNewGenre(newGenre: any)
  {
    let newGenres;
    if (!this.editar)
    {
      this.genres.push(newGenre);
    }
    else
    {
      newGenres = this.formMovie.getRawValue().genres;
      newGenres.push(newGenre);
      this.formMovie.setControl('genres', new FormControl(newGenres));
    }
    this.myNewGenres.reset();
  }

  onSubmit()
  {
    if (this.editar)
    {
      const id = this.formMovie.getRawValue()._id;
      this.movieService.updateMovie(id, this.formMovie.getRawValue()).subscribe(data => this.loadMovies());
    }
    else
    {
      this.movieService.addMovie(this.formMovie.getRawValue()).subscribe(data => this.loadMovies())
    }
  }
}
