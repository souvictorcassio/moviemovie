import { Injectable } from '@angular/core';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Movie[] = [];

  constructor() {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  addFavorite(movie: Movie): void {
    if (!this.isFavorite(movie.id)) {
      this.favorites.push(movie);
      this.saveFavorites();
    }
  }

  removeFavorite(movieId: number): void {
    this.favorites = this.favorites.filter(movie => movie.id !== movieId);
    this.saveFavorites();
  }

  isFavorite(movieId: number): boolean {
    return this.favorites.some(movie => movie.id === movieId);
  }

  getFavorites(): Movie[] {
    return this.favorites;
  }
}