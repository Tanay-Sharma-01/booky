import React, { useState , useContext , useEffect} from 'react'
import {Link} from "react-router-dom";
import {userContext} from "./App";

function Search() {

  const {userData , setUserData} = useContext(userContext);
  useEffect(() => {
    if(userData == null){
      document.getElementById("btn").click();
    }
  },[userData])

  const myApi = "AIzaSyCeUYY_NIfrVtx58mHRhKh5elskAZOkSjQ";
  const [bookName, setBookName] = useState("react");
  const [data, setData] = useState();

  const fetchData = async () => {
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&key=${myApi}`).then((response) => {
      response.json().then(res => setData(res.items));
    })
  }

  const sendData = async () => {
    await fetch("http://localhost:5000/details", {
      method: "POST",
      body: JSON.stringify({
        bookName: bookName,
        userName: userData.profileObj.givenName,
        userId: userData.profileObj.googleId,
        userEmail: userData.profileObj.email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      console.log("sent successfully");
    })
  }

  const searchBook = () => {
    fetchData();
    sendData();
  }

  return (
    <div className='flex flex-col justify-center h-full w-full items-center'>
      <Link to="/" className='hidden' id="btn"></Link>
      <div className='upperBox flex flex-col justify-center items-center mt-5 mb-5'>
        <input onKeyPress={(e) => {
          if (e.code == "Enter") searchBook()
        }} className='mb-5 text-black font-bold border-black rounded-2xl p-3' placeholder="Enter Book Name" onChange={(e) => setBookName(e.target.value)} />
        <button className='bg-white font-bold text-black w-fit p-2 rounded-xl hover:scale-105 ' onClick={searchBook}>Search</button>
      </div>
      <div className='lowerBox flex flex-wrap max-h-fit overflow-y-auto '>
        {
          data?.map((d, index) => {
            return (
              <a key={index} className='box flex flex-col justify-center items-center m-5 border border-slate-200 hover:scale-105 cursor-pointer' href={data[index].volumeInfo.previewLink} target="_blank">
                <img src={d.volumeInfo.imageLinks?.thumbnail} className="object-fit m-5 " />
                <span className='m-5'>{d.volumeInfo.title} </span>
              </a>
            )
          })
        }

      </div>
    </div>
  )
}

export default Search
