import { Component, computed, EnvironmentInjector, inject, OnInit, resource, runInInjectionContext, signal } from '@angular/core';
import { GetAllMovies } from './services/get-all-movies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    GetAllMovies
  ]
})
export class AppComponent implements OnInit {
  private readonly service = inject(GetAllMovies)
  private readonly environmentInjector = inject(EnvironmentInjector)

  searching = signal<string>('')

  opacityStyle = computed(() => ({ opacity: this.loadMovies.isLoading() ? 0.2 : 1 }))
  displayNoneStyle = computed(() => ({ display: this.loadMovies.value().length > 0 ? 'block': 'none' }))

  loadMovies = resource({
    defaultValue: [],
    // loader: () => {
    //   return this.service.getAll()
    // }
    request: () => ({ filter: this.searching() }),
    loader: ({ request, previous }) => this.service.getAll(request.filter)
  })

  reload(): void {
    this.loadMovies.reload()
  }

  fakeSearch(): void {
    this.searching.set('1')
  }

  ngOnInit(): void {
    console.info('ngOnInit')

    // runInInjectionContext(this.environmentInjector, () => {
    //   const loadMovies = resource({
    //     defaultValue: [],
    //     // loader: () => {
    //     //   return this.service.getAll()
    //     // }
    //     loader: () => this.service.getAll()
    //   })
    // })


  }

}
