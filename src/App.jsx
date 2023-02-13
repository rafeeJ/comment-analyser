import { useState } from 'react'
import './App.css'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../config/firebaseConfig'
import { addDoc, collection, doc } from 'firebase/firestore'

function App() {
  const [comment, setComment] = useState(0)
  const [comments, loading, error] = useCollection(
    collection(
      db, 'comments')
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    // add comment to firestore using firebase v9
    addDoc(collection(db, 'comments'), { comment: comment })

  }

  const handleInput = (e) => {
    setComment(e.target.value)
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
            {comments.docs.map((doc, idx) => (
              <div key={idx} style={{ margin: 10, backgroundColor: 'olivedrab', borderRadius: 5, padding: 2 }}>
                {doc.data().comment}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default App
