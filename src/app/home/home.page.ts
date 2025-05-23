import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class HomePage implements OnInit {
  characters: any[] = [];
  page = 1;
  searchTerm: string = '';
  searchedCharacter: any = null;
  searchError: string | null = null;
  filteredCharacters: any[] = [];
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(event?: any) {
    this.loading = true;
    this.http
      .get<any>(`https://rickandmortyapi.com/api/character?page=${this.page}`)
      .subscribe((response) => {
        this.characters = [...this.characters, ...response.results];
        this.loading = false;

        if (event) {
          event.target.complete();
          if (!response.info.next) {
            event.target.disabled = true;
          }
        }

        this.page++;
      });
  }

  // Imagen directamente disponible
  getImageUrl(character: any): string {
    return character.image;
  }

  // Búsqueda exacta por nombre con API
  searchCharacter() {
    if (!this.searchTerm.trim()) return;

    const name = this.searchTerm.toLowerCase().trim();

    this.http.get<any>(`https://rickandmortyapi.com/api/character/?name=${name}`).subscribe({
      next: (res) => {
        this.searchedCharacter = res.results[0]; // Solo mostramos el primero
        this.searchError = null;
        this.filteredCharacters = [];
      },
      error: () => {
        this.searchedCharacter = null;
        this.searchError = `Personaje "${name}" no encontrado.`;
      },
    });
  }

  // Búsqueda parcial en los personajes ya cargados
  filterCharacters() {
    const term = this.searchTerm.toLowerCase().trim();

    if (term.length < 3) {
      this.filteredCharacters = [];
      return;
    }

    // Llamar a API para búsqueda parcial
    this.http.get<any>(`https://rickandmortyapi.com/api/character/?name=${term}`).subscribe({
      next: (res) => {
        this.filteredCharacters = res.results;
        this.searchError = null;
        this.searchedCharacter = null;
      },
      error: () => {
        this.filteredCharacters = [];
        this.searchError = null;
      }
    });
  }



  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
    this.searchTerm = '';
    this.searchedCharacter = null;
    this.filteredCharacters = [];
    this.searchError = null;
  }
}
