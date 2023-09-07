import { InjectionKey } from 'vue'

import { createStore, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { type Book } from '@/types/book';
import { State } from '@/types/state';


export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
    state: {
        //books
        books: [] as Book[],
        //books read
        booksRead: [] as Book[],

    },
    mutations: {
        SET_BOOKS(state: State, books: Book[]) {
            if (state.books.length > 0 && state.booksRead.length > 0) {
                return;
            }
            state.books = books;
        },
        ADD_BOOK(state: State, item: Book) {
            state.books.push(item);
        },
        REMOVE_BOOK(state: State, item: Book) {
            state.books = state.books.filter(book => book.title !== item.title);
        },
        ADD_BOOK_READ(state: State, item: Book) {
            state.booksRead.push(item);
        },
        REMOVE_BOOK_READ(state: State, item: Book) {
            state.booksRead = state.booksRead.filter(book => book.title !== item.title);
        }
    },
    
    getters: {
        getBooksAvailable(state: State) {
            return state.books;
        },
        getBooksRead(state: State) {
            return state.booksRead;
        },
        countBooksRead(state: State) {
            return state.booksRead.length;
        },
        countBooksAvailable(state: State) {
            return state.books.length - state.booksRead.length;
        },
        listPagesBooks(state: State) {
            return state.books.map(book => book.pages);
        }

    },
    actions: {
        async fetchBooks({ commit, state }: { commit: any, state: State }) {
            try {
                const response = await fetch('/books.json')
                const books = await response.json()

                for (const item of books.library) {

                    const result = state.books.some(function(book: Book) {
                        //si el titulo es el mismo o esta en la lista de libros leidos
                        return book.title === item.book.title || state.booksRead.some(function(book: Book) {
                            return book.title === item.book.title;
                        })
                    })
                    if (result) {
                        return;
                    }

                    commit('ADD_BOOK', item.book)
                }
            } catch (error) {
                console.log(error)
            }
        },
        addBookToRead({ commit, state }: { commit: any, state: State }, payload: Book) {

            const result = state.booksRead.some(function(book: Book) {
                return book.title === payload.title;
            })

            if (result) {
                return;
            }
            commit('ADD_BOOK_READ', payload);
            commit('REMOVE_BOOK', payload);
        },
        removeBookToRead({ commit }: { commit: any }, payload: Book) {
            commit('REMOVE_BOOK_READ', payload);
            commit('ADD_BOOK', payload);
        }
    },
    plugins: [createPersistedState()]
})