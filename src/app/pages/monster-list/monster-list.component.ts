import { Component } from '@angular/core';
import { inject, signal, computed, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    PlayingCardComponent,
    MatButtonModule,
  ],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css',
})
export class MonsterListComponent {
  monsterService = inject(MonsterService);
  router = inject(Router);

  monsters = signal<Monster[]>([]);
  search = model('');

  filteredMonsters = computed(() => {
    return this.monsters().filter((monster) =>
      monster.name.includes(this.search())
    );
  });

  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster() {
    this.router.navigate(['monster']);
  }

  openMonster(monster: Monster) {
    console.log(monster.id);

    this.router.navigate(['monster', monster.id]);
  }
}
