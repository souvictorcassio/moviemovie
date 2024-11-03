import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitMovies'
})
export class LimitMoviesPipe implements PipeTransform {
  transform(movies: any[], limit: number): any[] {
    return movies.slice(0, limit);
  }
}
