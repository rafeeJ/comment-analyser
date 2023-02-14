import { useState } from 'react'
import './App.css'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../config/firebaseConfig'
import { addDoc, collection, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [comment, setComment] = useState(0)

  const [comments, loading, error] = useCollection(
    collection(
      db, 'comments')
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
    updateDoc(doc(db, `comments/${id}`), { liked: event.target.checked})
  }

  const getColor = (score) => {
    if (!score) {
      return 'black'
    }
    return score > 0 ? 'green' : 'red'
  }

  return (
    <div className="App">
      <form>
        <input type="text" onChange={handleInput} />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      <div>
        {loading && <span>Collection: Loading...</span>}
        {comments && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {comments.docs.map((doc, idx) => {
              const { comment, score, liked } = doc.data();
              const color = getColor(score)
              return (
              <div key={idx} style={{ margin: 10, backgroundColor: color, borderRadius: 5, padding: 2 }}>
                <div style={{ color: 'white' }}>{comment}</div>
                { score && <div style={{ color: 'white' }}>{score}</div>}
                <IconButton aria-label="delete" color="white" onClick={() => handleDelete(doc.id)}>
        <DeleteIcon />
      </IconButton>
                <Checkbox checked={liked} onChange={(e) => handleLike(e, doc.id)} icon={<FavoriteBorder />} checkedIcon={<Favorite />}/>
              </div>
              )
              })}
          </div>
        )}
      </div>

    </div>
  )
}

export default App
