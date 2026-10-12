import React from 'react';
import { Routes, Route, useMatch } from 'react-router-dom'
import { useApi } from './useApi'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import PokemonPage from './PokemonPage'
import PokemonList from './PokemonList'

const mapResults = (({ results }) => results.map(({ url, name }) => ({
  url,
  name,
  id: parseInt(url.match(/\/(\d+)\//)[1])
})))

const App = () => {
  const match = useMatch('/pokemon/:name')
  const { data: pokemonList, error, isLoading } = useApi('https://pokeapi.co/api/v2/pokemon/?limit=50', mapResults)

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (error) {
    return <ErrorMessage error={error} />
  }
  const currentIndex = match
    ? pokemonList.findIndex(({ name }) => name === match.params.name)
    : -1

  const remaining =
    currentIndex >= 0 ? pokemonList.length - currentIndex - 1 : 0

  const previous = currentIndex > 0
    ? pokemonList[currentIndex - 1]
    : null

  const next = currentIndex >= 0 && currentIndex < pokemonList.length - 1
    ? pokemonList[currentIndex + 1]
    : null

  return (
    <Routes>
      <Route exact path="/" element={<PokemonList pokemonList={pokemonList} />} />
      <Route exact path="/pokemon/:name" element={
        <PokemonPage
          previous={previous}
          next={next}
          remaining={remaining}
        />
      } />
    </Routes>
  )
}

export default App
