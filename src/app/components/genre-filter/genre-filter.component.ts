import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Genre {
  id: number;
  name: string;
}

@Component({
  selector: 'app-genre-filter',
  templateUrl: './genre-filter.component.html',
  styleUrls: ['./genre-filter.component.scss']
})
export class GenreFilterComponent implements OnInit {

  genres: Genre[] = [];
  selectedGenres: number[] = [];

  @Output() genreChange = new EventEmitter<number[]>();

  apiKey: string = '419e8247228433b47161f6fb127fbddc';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchGenres();
  }

  fetchGenres(): void {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`;

    this.http.get<any>(url).subscribe(data => {
      this.genres = data.genres;
    });
  }

  toggleGenreSelection(genreId: number): void {
    const index = this.selectedGenres.indexOf(genreId);
    if (index > -1) {
      this.selectedGenres.splice(index, 1);
    } else {
      this.selectedGenres.push(genreId);
    }
    this.genreChange.emit(this.selectedGenres);
  }
}
