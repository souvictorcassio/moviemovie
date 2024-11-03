import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
Router

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  highlightMovies: any[] = [];
  movies: any[] = [];
  selectedCategory: string = 'now_playing';

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.loadHighlightMovies();
    this.loadMoviesByCategory(this.selectedCategory);
  }

  loadHighlightMovies() {
    this.movieService.getHighlightMovies().subscribe((data: any) => {
      this.highlightMovies = data.results;
    });
  }

  loadMoviesByCategory(category: string) {
    this.movieService.getMoviesByCategory(category).subscribe((data: any) => {
      this.movies = data.results;
    });
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.loadMoviesByCategory(this.selectedCategory);
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  goToMovieDetails(movieId: number) {
    this.router.navigate(['/movie-details', movieId]);
  }
}