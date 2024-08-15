import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  movies: any[] = [];
  selectedGenres: number[] = [];
  apiKey: string = '419e8247228433b47161f6fb127fbddc';  
  currentYear: number = 2012;
  loading: boolean = false;
  title: string = "movie-list-app"
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMovies();  
  }

  onGenreChange(selectedGenres: number[]) {
    this.selectedGenres = selectedGenres;
    this.movies = [];  
    this.currentYear = 2012;  
    this.loadMovies();  
  }

  loadMovies() {
    if (this.loading) return;  
    this.loading = true;

    let genresQuery = this.selectedGenres.length > 0 ? `&with_genres=${this.selectedGenres.join(',')}` : '';

    this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&primary_release_year=${this.currentYear}&vote_count.gte=100${genresQuery}`)
      .subscribe((response: any) => {
        this.movies = [...this.movies, ...response.results];  
        this.loading = false;
      }, (error) => {
        console.error('Failed to load movies', error);
        this.loading = false;
      });
  }

  onScrollDown() {
    this.currentYear += 1;  
    this.loadMovies();
  }

  onScrollUp() {
    this.currentYear -= 1;  
    this.loadMovies();
  }
}
