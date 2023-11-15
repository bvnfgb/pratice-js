// import Login from './15/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './16/Login';

import Signup from './16/Signup';
import './App.css';
import Comment from './16/Comment';

import Notice from './16/Notice';
// import Clock from './01/Clock';
// import Lotto from './02/Lotto';
// import MyCom from './03/MyCom';
// import MyDiv from './03/MyDiv';
// import Box from './04/Box';
// import Frcst from './05/Frcst';
// import Taccident from './06/Taccident';
// import MyRef from './07/MyRef';
// import Gallery from './08/Gallery';
// import Busan from './09/Busan copy';
// import RoutMain from './10/RoutMain';
// import Fcst from './11/Fcst';
// import Fcst from './12/Fcst';
// import DivMain from './13/DivMain';
// import DivMain from './14/DivMain';

// import { RecoilRoot } from 'recoil';
function App() {
  return (
      // <></>
    // <Clock></Clock>
    // <Lotto/>
    // <MyCom/>
    // <MyDiv/>
    // <Box></Box>
    // <Frcst></Frcst>
    // <Taccident/>
    // <MyRef/>
    // <Gallery></Gallery>
    // <Busan/>
    // <RoutMain/>
    // <Fcst/>
    // <Fcst/>
    // <RecoilRoot>
    // <DivMain/>
    // </RecoilRoot>
    // <Login/>
    <BrowserRouter>
    <Routes>
        <Route path='Signup' element={<Signup/>}/>
        <Route path='Login' element={<Login/>}></Route>
          <Route path='Notice' element={<Notice/>}/>  
        <Route path='Comment/:item' element={<Comment/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
