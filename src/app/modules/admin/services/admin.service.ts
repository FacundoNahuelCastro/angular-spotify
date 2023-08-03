import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly URL = environment.api

  constructor(private http: HttpClient)  { }


  
  deleteTrack$(track:any): Observable<any>{
    console.log('borrar',track);
    return this.http.delete(`${this.URL}/tracks/delete/${track.uid}`);
  }

  editTrack$(track:any,id:string): Observable<any>{
    console.log('servicio',track);
    console.log('id',id);
    //console.log('respuesta',this.http.put(`${this.URL}/tracks/edit/${id}`,track));
    return this.http.put(`${this.URL}/tracks/edit/${id}`,track);
  }

  addTrack$(track:any): Observable<any>{
    console.log('agregar',track);
    return this.http.post(`${this.URL}/tracks/add`,track);
  }

}
