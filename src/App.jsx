import { useState } from 'react'
import './App.css'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../config/firebaseConfig'
import { addDoc, collection, deleteDoc, doc, orderBy, query, updateDoc } from 'firebase/firestore'
import CommentBox from './components/CommentBox'
import { Button, Card, CircularProgress, Input } from '@mui/material'

function App() {
  const [comment, setComment] = useState("")
  
  // TODO: Read Comments from Firestore, and store them in the comments variable

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: create comment
    setComment('')
  }

  const handleDelete = (id) => {
    // TODO: delete comment
  }

  const handleInput = (e) => {
    setComment(e.target.value)
  }

  const handleLike = (event, id) => {
    // TODO: update comment
  }
  
  return (
    <div className="App">
      <Card style={{ padding: 5, borderRadius: 5, margin: 5 }}>
        <h2 style={{ color: 'black' }}>Comments</h2>
        <form style={{ display: 'flex', justifyContent: 'center' }}>
          <Input type="text" onChange={handleInput} placeholder="Enter your comment here" value={comment}/>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </form>
      </Card>
      <div>
        {loading && <CircularProgress />}
        {comments && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
              comments.docs.map((doc, idx) => {
                const { comment, score, liked } = doc.data();
                return (
                  <CommentBox
                    score={score}
                    key={idx}
                    comment={comment}
                    liked={liked}
                    handleDelete={() => handleDelete(doc.id)}
                    handleLike={(e) => handleLike(e, doc.id)} />
                )
              })
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default App
