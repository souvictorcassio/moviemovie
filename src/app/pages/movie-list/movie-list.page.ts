import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage {
  movies: any[] = [];
  genres: any[] = [];
  searchQuery: string = '';
  selectedGenre: number | null = null;
  isSearching: boolean = false;

  constructor(private movieService: MovieService, private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.loadMovies();
    this.movieService.loadGenres();
    this.movieService.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
    });
  }

  getImageUrl(path: string) {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  loadMovies() {
    this.isSearching = false;
    this.movieService.getPopularMovies().subscribe((data: any) => {
      this.movies = data.results;
    });
  }

  getGenresMap(genreIds: number[]): string {
    return this.movieService.getGenresMap(genreIds);
  }

  filterByGenre(genreId: number) {
    this.movieService.getMoviesByGenre(genreId).subscribe((data: any) => {
      this.movies = data.results;
    });
  }
  
  onSearch(event: any) {
    this.searchQuery = event.target.value;
    this.searchMovies();
  }

  onGenreChange(event: any) {
    this.selectedGenre = event.detail.value || null;

    if (this.selectedGenre) {
      this.movieService.getMoviesByGenre(this.selectedGenre).subscribe((data: any) => {
        this.movies = data.results;
      });
    } else {
      this.loadMovies();
    }
  }

  searchMovies() {
    if (!this.searchQuery && !this.selectedGenre) {
      this.loadMovies();
    } else {
      this.movieService.searchMovies(this.searchQuery, this.selectedGenre).subscribe((data: any) => {
        this.movies = data.results;
      });
    }
  }

  clearGenreFilter() {
    this.selectedGenre = null;
    this.searchMovies();
  }

  toggleFavorite(movie: any) {
    if (this.isFavorited(movie.id)) {
      this.favoritesService.removeFavorite(movie.id);
    } else {
      this.favoritesService.addFavorite(movie);
    }
  }

  isFavorited(movieId: number): boolean {
    return this.favoritesService.isFavorite(movieId);
  }
}