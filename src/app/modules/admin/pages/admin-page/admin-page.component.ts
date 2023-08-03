import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { AdminService } from '@modules/admin/services/admin.service';
import { SearchService } from '@modules/history/services/search.service';
import { TrackService } from '@modules/tracks/services/track.service';
import { Observable, of } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  nombre:string="";
  album:string="";
  artista:string="";
  cover:string="";
  uid:string="";
  loading:boolean=false;
  nuevoTrack:boolean=true;
  modificarTrack:boolean=false;
  formAdmin: UntypedFormGroup = new UntypedFormGroup({});
  
  tracksTrending: Array<TrackModel> = []
  //trackVivo: any;
  optionSort: { property: string | null, order: string } = { property: null, order: 'asc' }
  constructor(private trackService: TrackService,private adminService: AdminService) { }
  
  ngOnInit(): void {
    this.loadDataAll();
    this.formAdmin = new UntypedFormGroup(
      {
        nombre: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        album: new UntypedFormControl('',
        [
          Validators.required,
          Validators.minLength(3)
        ]),
        artista: new UntypedFormControl('',
        [
          Validators.required,
          Validators.minLength(3)
        ]),
        cover: new UntypedFormControl('',
        [
          Validators.required,
          Validators.minLength(3)
        ])
      }
    )
  }

  async loadDataAll(): Promise<any> {
    this.tracksTrending = await this.trackService.getAllTracks$().toPromise()

  }

  editarTrack(track:any){
    console.log('editar',track);
    this.nombre=track.name;
    this.album=track.album;
    this.artista=track.artist;
    this.cover=track.cover;
    this.uid=track.uid;
    this.modificarTrack=true;
    this.nuevoTrack=false;
    //this.trackVivo=track;
    //console.log('editarTrack',this.trackVivo);
  }


  limpiarCampos(){
    this.nombre="";
    this.album="";
    this.artista="";
    this.cover="";
    this.uid="";
    this.modificarTrack=false;
    this.nuevoTrack=true;
  }

  borrarTrack(track:any){
    this.loading=true;
    this.adminService.deleteTrack$(track).subscribe(Pepe => {this.loadDataAll();
      this.loading=false;
      this.limpiarCampos();
    });
  }

  impactarPut(){
    //console.log('front-component',track);
    const track = {
      name:this.nombre,
      album:this.album,
      artist:this.artista,
      cover:this.cover
    }
    this.loading=true;
    this.adminService.editTrack$(track,this.uid).subscribe(Pepe => {this.loadDataAll();
      this.loading=false;
      this.limpiarCampos();
    });
  }

  impactarAdd(){
    //console.log('front-component',track);
    const track = {
      name:this.nombre,
      album:this.album,
      artist:this.artista,
      cover:this.cover
    }
    this.loading=true;
    this.adminService.addTrack$(track).subscribe(Pepe => {this.loadDataAll();
      this.loading=false;
      this.limpiarCampos();
    });
  }


  changeSort(property: string): void {
    const { order } = this.optionSort
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    }
    console.log(this.optionSort);

  }

  

}
