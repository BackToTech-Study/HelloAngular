import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { invalidValuesValidatorFactory } from '../shared/validators/invalid-values.validator';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  newHeroName: FormControl = new FormControl();
  minNameLength = 3;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => { 
      this.heroes = heroes;
      this.newHeroName.addValidators([invalidValuesValidatorFactory(this.heroes.map(hero => hero.name))]);
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      this.newHeroName.markAsDirty();
      this.newHeroName.markAsTouched();
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
