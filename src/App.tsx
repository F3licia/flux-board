import './App.css';
import { Drawer } from './components/drawer/Drawer';
import MainBoard from './components/MainBoard';
import { Modal } from './components/ui/Modal';

function App() {

  return (
    <>
      <Modal />
      <MainBoard />
      <Drawer />
    </>
  )
}

export default App
