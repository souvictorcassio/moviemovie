import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoriteMovies: any[] = [];

  constructor(private favoritesService: FavoritesService, private router: Router) { }

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoriteMovies = this.favoritesService.getFavorites();
  }

  getImageUrl(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  isFavorite(movieId: number): boolean {
    return this.favoritesService.isFavorite(movieId);
  }

  toggleFavorite(movie: any, event: Event) {
    event.stopPropagation();
    if (this.isFavorite(movie.id)) {
      this.favoritesService.removeFavorite(movie.id);
    } else {
      this.favoritesService.addFavorite(movie);
    }
    this.loadFavorites();
  }

  goToMovieDetails(movieId: number) {
    this.router.navigate(['/movie-details', movieId]);
  }

}