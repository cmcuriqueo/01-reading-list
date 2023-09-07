<template>
  <div class="bg-white">

    
        <!-- AVALIBLE... -->
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Libros</h2>
      <div class="
      tracking-tight text-gray-900">
        <input class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128" type="range"
          :min="minPagesOfBooks" :max="maxPagesOfBooks" step="1" v-model="pageFilter" /> {{ pageFilter }} Hojas
      </div>
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div class="group relative" v-for="item in books" :key="item.title">
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
                <button
                  @click="read(item)"
                  class="py-2 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                  Add to read
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


        <!-- READ... -->
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Leidos</h2>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
                <button
                  @click="removeToRead(item)"
                  class="py-2 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                  Remove to read
                </button>
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

export default {
  name: 'App',
  data() {
    return {
      title: 'Vue 3 + Typescript + Tailwind',
      pageFilter: 1,
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
    }
  },
  computed: {
    books() {
      return store.getters.getBooksAvailable
    },
    booksRead() {
      return store.getters.getBooksRead
    },
    maxPagesOfBooks() {
      return Math.max(...store.getters.getBooksAvailable.map((item: Book) => item.pages));
    },
    minPagesOfBooks() {
      return Math.min(...store.getters.getBooksAvailable.map((item: Book) => item.pages));
    },
  }
};
</script>