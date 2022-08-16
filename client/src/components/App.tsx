import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/layout';

const App: FC = () => {

  return(
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  )
}

export default App
