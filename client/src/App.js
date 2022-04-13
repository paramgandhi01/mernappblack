import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [state, setState] = useState({ title: "", body: "", posts: [] });
  useEffect(() => {
    getBlogPost();
  }, []);

  const getBlogPost = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        setState({ posts: data });
        console.log("data has been received");
      })
      .catch(() => {
        alert("error retrieving data");
      });
  };

  const handle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      title: state.title,
      body: state.body,
    };
    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("data has been sent to the server");
        resetInput();
      })
      .catch(() => {
        console.log("internal server error");
      });
  };

  const resetInput = () => {
    setState({
      title: "",
      body: "",
    });
  };

  
  const displayBlogPost = (posts) => {
  if (!posts.length)
   {return null}
  else{
    return state.posts.map((post, index) => {
      return(
      <div key={index}>
        {/* {console.log("hii", post.title)} */}
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
     )})
  }
  };
  console.log(state);
  return (
    <div className="App">
      <h2>welcome</h2>
      <form onSubmit={submit}>
        <div className="form-input">
          <input
            type="text"
            name="title"
            value={state.title}
            placeholder="title"
            onChange={handle}
          />
        </div>
        <div className="form-input">
          <textarea
            name="body"
            cols="30"
            rows="10"
            value={state.body}
            placeholder="body"
            onChange={handle}
          ></textarea>
        </div>
        <button>Submit</button>
      </form>
      <div className="blog">
        {displayBlogPost(state.posts)}
        {/* {state.posts.map(post => {
            return (
              <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            );
          })} */}
        </div>
    </div>
  );
}

export default App;
