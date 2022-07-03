import { Route, Routes } from "react-router";
import { Header } from "./components";
import { BookPage } from "./pages/Book";
import { HomePage } from "./pages/Home";

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:id' element={<BookPage />} />
      </Routes>
    </div>
  );
}

export default App;
