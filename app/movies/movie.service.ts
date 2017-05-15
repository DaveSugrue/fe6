import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IMovie } from './movie'
import { IGenre } from './genre'
import { IStatus } from './status'
import { IMovieResponse } from './movie.response'

@Injectable()
export class MovieService {

	private _hostUrl = 'http://192.168.0.9:8090/';
	private _movieUrl = this._hostUrl + 'movie/all';
	private _genreUrl = this._hostUrl +'genre';
	
	status: IStatus;
	//dotsProducts: IDotsProduct[] = [];

	constructor( private _http: Http){}

	getMovies(): Observable<IMovie[]> {
		return this._http.get(this._movieUrl)
			.map((response: Response) => { 
				console.log('Intial Response = ' + JSON.stringify(response.json()))

				let resp = <IMovieResponse>response.json();

				console.log('resp = ' + JSON.stringify(resp));

				let status = resp.status;

				console.log('Status = ' + JSON.stringify(status));

				let movies = <IMovie[]>resp.object;

				console.log('Movies = ' + JSON.stringify(movies));
				
				return movies;
			})
			.do(data => console.log(' DOING :: Movies = ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	getGenres(): Observable<IGenre[]> {
		return this._http.get(this._genreUrl)
			.map((response: Response) => { 
				console.log('Intial Response = ' + JSON.stringify(response.json()))

				let resp = <IMovieResponse>response.json();

				console.log('resp = ' + JSON.stringify(resp));

				let status = resp.status;

				console.log('Status = ' + JSON.stringify(status));

				let genres = <IGenre[]>resp.object;

				console.log('Genres = ' + JSON.stringify(genres));
				
				return genres;
			})
			.do(data => console.log(' DOING :: Genres = ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	private handleError(error: Response){
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}