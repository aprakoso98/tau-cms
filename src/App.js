import React, { useEffect } from "react";
import Routes from "./routes";
import { useDispatch } from "react-redux";
import actionsWeb from "./redux/actions/web";
import { useHistory } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    if (history.location.pathname === '/')
      history.push('/login')
    dispatch(actionsWeb({ loggedIn: Boolean(localStorage.getItem('loggedIn')) }))
  }, [])
  return <Routes />
}

export default App