import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movieSections: { year: number, movies: Movie[] }[] = [];
  currentYear: number = 2012;  
  loading: boolean = false;
  selectedGenres: number[] = [];
  apiKey: string = '419e8247228433b47161f6fb127fbddc';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMovies(this.currentYear);
  }

  loadMovies(year: number): void {
    this.loading = true;
    let genreFilter = '';
    if (this.selectedGenres.length > 0) {
      genreFilter = `&with_genres=${this.selectedGenres.join(',')}`;
    }

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&primary_release_year=${year}&vote_count.gte=100${genreFilter}`;

    this.http.get<any>(url).subscribe(data => {
      const yearSection = this.movieSections.find(section => section.year === year);
      
      if (yearSection) {
        yearSection.movies = [...yearSection.movies, ...data.results];
      } else {
        this.movieSections.push({ year, movies: data.results });
      }

      this.loading = false;
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !this.loading) {
      this.onScrollDown();
    } else if (window.scrollY === 0 && !this.loading) {
      this.onScrollUp();
    }
  }

  onScrollDown(): void {
    if (this.currentYear < new Date().getFullYear()) {
      this.currentYear++;
      this.loadMovies(this.currentYear);
    }
  }

  onScrollUp(): void {
    if (this.currentYear > 2012) {
      this.currentYear--;
      this.loadMovies(this.currentYear);
    }
  }

  onGenreChange(selectedGenres: number[]): void {
    this.selectedGenres = selectedGenres;
    this.movieSections = []; 
    this.currentYear = 2012;  
    this.loadMovies(this.currentYear);  
  }

  scrollLeft(): void {
    const container = document.querySelector('.movie-list');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    const container = document.querySelector('.movie-list');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }
}
