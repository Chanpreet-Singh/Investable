import { Routes, Route } from "react-router-dom";
import Post from "./components/Post/Post";
import Register from "./components/Registration/Register";
import CreatePost from "./components/Post/CreatePost";
import Feeds from "./components/Feed/Feeds";
import AuthGuard from "./guard/AuthGuard";
import FounderLanding from "./components/ProfilePage/FounderLanding";
import Login from "./components/Login/Login";

import EditPost from "./components/Post/EditPost";

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AuthGuard />}>
        <Route path="/post" element={<Post />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/userprofile" element={<FounderLanding />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/editpost" element={<EditPost />} />
      </Route>
    </Routes>
  );
};

export default Routing;
