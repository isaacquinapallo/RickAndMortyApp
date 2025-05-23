import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
  IonChip,
  IonSpinner,
  IonTextarea,
  ToastController
} from '@ionic/angular/standalone';

import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp
} from '@angular/fire/firestore';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Comentario {
  comentario: string;
  creadoEn: Date;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonNote,
    IonButton,
    IonChip,
    IonSpinner,
    IonTextarea,
  ],
})
export class DetailsPage implements OnInit {
  character: Character | null = null;
  loading = false;
  comment: string = '';
  comentarios: Comentario[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastCtrl: ToastController,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCharacter(id);
    } else {
      this.presentToast('ID de personaje inválido.');
      this.router.navigate(['/home']);
    }
  }

  loadCharacter(id: string) {
    this.loading = true;
    this.http.get<Character>(`https://rickandmortyapi.com/api/character/${id}`).subscribe({
      next: (res) => {
        this.character = res;
        this.loadComentarios(res.id);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.presentToast('Error al cargar el personaje. Intenta nuevamente.');
        this.router.navigate(['/home']);
      }
    });
  }

  async loadComentarios(personajeId: number) {
    try {
      const comentariosRef = collection(this.firestore, 'comentarios');
      const q = query(
        comentariosRef,
        where('personajeId', '==', personajeId),
        orderBy('creadoEn', 'desc')
      );
      const querySnapshot = await getDocs(q);

      console.log('Comentarios encontrados:', querySnapshot.size);

      this.comentarios = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          comentario: data['comentario'],
          creadoEn: (data['creadoEn'] as Timestamp).toDate()
        };
      });
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
      this.presentToast('Error al cargar comentarios.', 'danger');
    }
  }

  async guardarComentario() {
    if (!this.comment.trim() || !this.character) return;

    try {
      await addDoc(collection(this.firestore, 'comentarios'), {
        comentario: this.comment.trim(),
        personajeId: this.character.id,
        nombre: this.character.name,
        estado: this.character.status,
        especie: this.character.species,
        tipo: this.character.type,
        genero: this.character.gender,
        origen: this.character.origin.name,
        ubicacion: this.character.location.name,
        imagen: this.character.image,
        creadoEn: Timestamp.now()  // <-- Corregido aquí
      });

      this.comment = '';
      await this.presentToast('Comentario guardado correctamente.', 'success');
      this.loadComentarios(this.character.id); // Recargar comentarios
    } catch (error) {
      console.error('Error al guardar comentario:', error);
      this.presentToast('Error al guardar el comentario.', 'danger');
    }
  }

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: 'bottom',
    });
    toast.present();
  }

  // Formatear fecha para mostrar en el HTML
  formatFecha(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  volverAlInicio() {
    this.router.navigate(['/home']);
  }
}
