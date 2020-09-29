import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Seguro } from '../models/seguro';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  url = 'http://localhost:3000/seguros'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os seguros
  getSegs(): Observable<Seguro[]> {
    return this.httpClient.get<Seguro[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um seguro pelo código
  getSegById(codigo: number): Observable<Seguro> {
    return this.httpClient.get<Seguro>(this.url + '/' + codigo)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um seguro
  saveSeg(seg: Seguro): Observable<Seguro> {
    return this.httpClient.post<Seguro>(this.url, JSON.stringify(seg), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um carro
  updateSeg(seg: Seguro): Observable<Seguro> {
    return this.httpClient.put<Seguro>(this.url + '/' + seg.codigo, JSON.stringify(seg), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um carro
  deleteSeg(seg: Seguro) {
    return this.httpClient.delete<Seguro>(this.url + '/' + seg.codigo, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}