import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '7e41ef52b5b3afbe4dea73bf869505a9';
  private apiUrl = 'https://api.themoviedb.org/3';
  private genres: any[] = [];

  constructor(private http: HttpClient) {}


  getMovies(searchQuery: string) {
    return this.http.get(`${this.apiUrl}/search/movie?query=${searchQuery}&api_key=${this.apiKey}&language=pt-BR`);
  }

  searchMovies(query: string, genreId: number | null = null) {
    let url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&language=pt-BR&query=${query}`;
    
    if (genreId) {
      url += `&with_genres=${genreId}`;
    }
  
    return this.http.get(url);
  }

  getMovieDetails(id: string) {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=pt-BR`);
  }

  getMovieTrailer(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`);
  }

  getPopularMovies() {
    return this.http.get(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=pt-BR`);
  }
  
  getHighlightMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}&language=pt-BR&page=1`);
  }

  getMoviesByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${category}?api_key=${this.apiKey}&language=pt-BR&page=1`);
  }

  loadGenres() {
    this.http.get(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}&language=pt-BR`)
      .subscribe((response: any) => {
        this.genres = response.genres;
      });
  }

  getGenres() {
    return this.http.get(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}&language=pt-BR`);
  }
  
  getMoviesByGenre(genreId: number) {
    return this.http.get(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&language=pt-BR`);
  }

  getGenresMap(genreIds: number[]): string {
    return genreIds.map(id => {
      const genre = this.genres.find(g => g.id === id);
      return genre ? genre.name : 'Desconhecido';
    }).join(', ');
  }
}