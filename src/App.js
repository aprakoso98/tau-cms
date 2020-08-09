import React, { useEffect } from "react";
import Routes from "./routes";
import { useDispatch } from "react-redux";
import actionsWeb from "./redux/actions/web";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionsWeb({ loggedIn: Boolean(localStorage.getItem('loggedIn')) }))
  }, [dispatch])
  return <Routes />
}

export default App