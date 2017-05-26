import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IMovie } from './movie'
import { IGenre } from './genre'
import { IStatus } from '../shared/status'
import { IMovieResponse } from './movie.response'

@Injectable()
export class MovieService {

	private _hostUrl = 'http://192.168.0.9:8090/';
	private _movieUrl = this._hostUrl + 'movie';
	private _genreUrl = this._hostUrl +'genre';
	
	status: IStatus;
	//dotsProducts: IDotsProduct[] = [];

	constructor( private _http: Http){}

	getMovies(genreId: string): Observable<IMovie[]> {
		let url: string = this._movieUrl + '/all';
		if (genreId != 'all') {
			url = url + '?genreId=' + genreId;
		}
		return this._http.get(url)
			.map((response: Response) => { 
				let resp = <IMovieResponse>response.json();
				let status = resp.status;
				let movies = <IMovie[]>resp.objects;
				return movies;
			})
			.catch(this.handleError);
	}

	getMovie(id: number): Observable<IMovie> {
		let url: string = this._movieUrl + '?id=' + id;
		return this._http.get(url)
			.map((response: Response) => { 
				let resp = <IMovieResponse>response.json();
				let status = resp.status;
				let movies = <IMovie[]>resp.objects;
				return movies[0]
			})
			.catch(this.handleError);
	}

	updateMovie(movie: IMovie): Observable<IMovie> {
    	let body = JSON.stringify(movie);
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	
		return this._http.post(this._movieUrl, body, options)
            .map((response: Response) => {
				let resp = <IMovieResponse>response.json();
				let status = resp.status;
				let movies = <IMovie[]>resp.objects;
				return movies[0]
			})
            .catch(this.handleError);
	}

	getGenres(): Observable<IGenre[]> {
		return this._http.get(this._genreUrl)
			.map((response: Response) => { 
				let resp = <IMovieResponse>response.json();
				let status = resp.status;
				let genres = <IGenre[]>resp.objects;
				return genres;
			})
			.catch(this.handleError);
	}

	private handleError(error: Response){
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}