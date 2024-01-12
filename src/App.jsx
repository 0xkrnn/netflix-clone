import { Route, Routes } from "react-router-dom"
import Netflix from "./pages/Netflix"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./index.css"
import Player from "./pages/Player"
import { Provider } from "react-redux"
import { getGenres, store } from "./store/store"
import Movies from "./pages/Movies"
import TVShows from "./pages/TVShows"
import MyList from "./pages/MyList"
import Info from "./pages/Info"

function App() {

  store.dispatch(getGenres())

  return (
    <Provider store={store}>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/" element={<Netflix />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/mylist" element={<MyList />} />
        <Route exact path="/infos/:id" element={<Info />} />
      </Routes>
    </Provider>
  )
}

export default App
