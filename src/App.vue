<template>
  <div class="bg-white">


    <!-- AVALIBLE... -->
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">title</h2>
      <div class="
      tracking-tight text-gray-900">
        {{ filterRange }} Hojas
        <input class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3" type="range" :min="minPagesOfBooks"
          :max="maxPagesOfBooks" step="1" v-model="filterRange" @change="cambiarRango" />
        <span class="pl-4">Genero: </span>
        <select name="genres" id="genres" class="rounded-md border h-6 w-48" @change="changeGenre">
          <option value="">Todos</option>
          <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
        </select>
        <span class="pl-4 ">
          <button @click="sliderOver" 
            class="py-0 px-4 bg-transparent font-semibold border border-gray-400 rounded text-gray-400 hover:bg-gray-400 hover:text-white hover:border-transparent ">
            Mi lista
          </button>
        </span>
      </div>
      <div class="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8">
        <div class="group relative" v-for="item in books" :key="item.title">
          <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-400 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img :src="item.cover" alt="Front of men&#039;s Basic Tee in black."
              class="h-full w-full object-cover object-center lg:h-full lg:w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a href="#">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  {{ item.title }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">{{ item.author.name }}</p>

              <div class="mt-1 text-sm text-gray-500">
                <button @click="read(item)"
                  class="py-2 px-4 bg-transparent text-green-400 font-semibold border border-green-400 rounded hover:bg-green-400 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
                  Add to read
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" id="slide-over" aria-modal="true"
    style="display: none;">
    <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        -->
          <div class="pointer-events-auto relative w-screen max-w-md">
            <!--
            Close button, show/hide based on slide-over state.

            Entering: "ease-in-out duration-500"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in-out duration-500"
              From: "opacity-100"
              To: "opacity-0"
          -->
            <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
              <button type="button" @click="sliderOver"
                class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                <span class="absolute -inset-2.5"></span>
                <span class="sr-only">Close panel</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
              <div class="px-4 sm:px-6">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900" id="slide-over-title">Leidos</h2>
              </div>
              <div class="relative mt-6 flex-1 px-4 sm:px-6">
                <!-- Your content -->



                <!-- READ... -->
                <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                  <div class="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2  xl:gap-x-8">
                    <div class="group relative" v-for="item in booksRead" :key="item.title">
                      <div
                        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img :src="item.cover" alt="Front of men&#039;s Basic Tee in black."
                          class="h-full w-full object-cover object-center lg:h-full lg:w-full">
                      </div>
                      <div class="mt-4 flex justify-between">
                        <div>
                          <h3 class="text-sm text-gray-700">
                            <a href="#">
                              <span aria-hidden="true" class="absolute inset-0"></span>
                              {{ item.title }}
                            </a>
                          </h3>
                          <p class="mt-1 text-sm text-gray-500">{{ item.author.name }}</p>

                          <div class="mt-1 text-sm text-gray-500">
                            <button @click="removeToRead(item)"
                              class="py-2 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                              Remove to read
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <!-- End of your content -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@media screen and (-webkit-min-device-pixel-ratio: 0) {

  input[type="range"]::-webkit-slider-thumb {
    width: 15px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    cursor: ew-resize;
    background: #FFF;
    box-shadow: -405px 0 0 400px #0c830c;
    border-radius: 50%;

  }
}
</style>

<script lang="ts">
import { store } from '@/store/books'
import { Book } from '@/types/book'
import i18n  from './i18n'

export default {
  i18n,
  name: 'App',
  data() {
    return {
      title: 'Vue 3 + Typescript + Tailwind',
      filterRange: 0
    }
  },
  mounted() {
    store.dispatch('fetchBooks')
  },
  methods: {
    read(book: Book) {
      store.dispatch('addBookToRead', book)
    },
    removeToRead(book: Book) {
      store.dispatch('removeBookToRead', book)
    },
    cambiarRango(event: Event) {
      store.dispatch('addFilterPages', (event.target as HTMLInputElement).value)
    },
    changeGenre(event: Event) {
      store.dispatch('addFilterGenre', (event.target as HTMLInputElement).value)
    },
    sliderOver() {
      console.log('sliderOver');
      const slideOver = document.querySelector('#slide-over');
      if (slideOver === null) return;
      //si tiene el style display none lo pongo en block y viceversa
      if ((slideOver as HTMLElement).style.display === 'none') {
        (slideOver as HTMLElement).style.display = 'block';
      } else {
        (slideOver as HTMLElement).style.display = 'none';
      }
    }
  },
  computed: {
    books() {
      return store.getters.getBooksAvailable;
    },
    booksRead() {
      return store.getters.getBooksRead
    },
    maxPagesOfBooks() {
      return Math.max(...store.getters.getAllBooks.map((item: Book) => item.pages));
    },
    minPagesOfBooks() {
      return Math.min(...store.getters.getAllBooks.map((item: Book) => item.pages));
    },
    genres() {
      return store.getters.getGenres
    }

  }
};
</script>