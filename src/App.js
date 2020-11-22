import React from "react";
import Routes from "./routes";
import useWindowSize from 'src/utils/windowSize'
import Image from "./components/Image";
import $ from 'jquery'
import store from './redux'
import actionsWeb from './redux/actions/web'

$(() => {
  setTimeout(() => {
    store.dispatch(actionsWeb({ documentReady: true }))
  }, 1500)
})

const App = () => {
  const [, , isMobile] = useWindowSize()
  return isMobile ? <div className="p-5 flex flex-col ta-c jc-c h-full">
    <Image className="w-3/4 mb-5 as-c" alt="" src={require('src/assets/images/logo-tau.png')} />
    Halaman ini tidak compatible dengan tampilan mobile, harap menggunakan PC atau mode desktop pada chrome mobile Anda.
  </div> : <Routes />
}

export default App