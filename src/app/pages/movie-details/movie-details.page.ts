import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  trailerUrl: string | null = null;
  isExpanded: boolean = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadMovieDetails(id);
  }

  loadMovieDetails(id: string) {
    this.movieService.getMovieDetails(id).subscribe((movie) => {
      this.movie = movie;
      this.loadMovieTrailer(id);
    });
  }

  loadMovieTrailer(id: string) {
    this.movieService.getMovieTrailer(id).subscribe((data) => {
      const trailer = data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
      }
    });
  }

  getImageUrl(path: string) {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  isFavorite(movieId: number): boolean {
    return this.favoritesService.isFavorite(movieId);
  }

  toggleFavorite(movie: any) {
    if (this.isFavorite(movie.id)) {
      this.favoritesService.removeFavorite(movie.id);
    } else {
      this.favoritesService.addFavorite(movie);
    }
  }
}