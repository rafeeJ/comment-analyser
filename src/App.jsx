import { useState } from 'react'
import './App.css'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../config/firebaseConfig'
import { addDoc, collection, deleteDoc, doc, orderBy, query, updateDoc } from 'firebase/firestore'
import CommentBox from './components/CommentBox'
import { Button, Card, CircularProgress, Input } from '@mui/material'

function App() {
  const [comment, setComment] = useState("")

  const [comments, loading, error] = useCollection(
    query(
    collection(
      db, 'comments'), orderBy('timestamp', 'desc'))
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    addDoc(collection(db, 'comments'), { comment, timestamp: new Date().getTime() })
    setComment('')
  }

  const handleDelete = (id) => {
    console.log('delete')
    deleteDoc(doc(db, `comments/${id}`))
  }

  const handleInput = (e) => {
    setComment(e.target.value)
  }

  const handleLike = (event, id) => {
    console.log(event.target.checked, id)
    updateDoc(doc(db, `comments/${id}`), { liked: event.target.checked })
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
