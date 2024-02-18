import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { Routes, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Notification from "./components/Notification";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Queries from "./components/Queries";
import Users from "./components/Users";
import BirthQuery from "./components/BirthQuery";

import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

import { useUserValue, useUserDispatchValue } from "./UserContext";

import { setToken, getQueries, getUsers } from "./services/queries";

const adminName = import.meta.env.VITE_ADMIN_USERNAME;

const App = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatchValue();
  const setTokenMutation = useMutation(setToken);

  const queriesResult = useQuery("queries", getQueries);
  const queries = queriesResult.data;

  const usersResult = useQuery("users", getUsers);
  const users = usersResult.data;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBirthQueryUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // console.log("useEffect user", user)
      userDispatch({ type: "BEGIN_SESSION", payload: user });
      setTokenMutation.mutate(user.access_token);
      if (!users || !queries) {
        getUsers();
        getQueries();
      }
    }
    // console.log(user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDispatch]);

  return (
    <div className="flex flex-col bg-transparent">
      <NavigationBar user={user} users={users} />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/queries"
          element={
            <Queries user={user} queries={queries} adminName={adminName} />
          }
        />
        <Route
          path="/users"
          element={<Users user={user} users={users} adminName={adminName} />}
        />
        <Route path="/birthquery" element={<BirthQuery user={user} />} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/signup" element={<Signup user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
