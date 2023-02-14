import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CircularProgress } from '@mui/material';

export default function CommentBox({ handleLike, handleDelete, comment, score, liked, idx }) {
    const [color, setColor] = useState('black')

    useEffect(() => {
        setColor(getColor(score))
    }, [score])


    const getColor = (score) => {
        if (!score && score !== 0) {
            return 'black'
        }

        const roundedScore = Math.round(score)
        if (roundedScore === -1) {
            return 'red'
        }
        if (roundedScore === 0) {
            return 'orange'
        }
        if (roundedScore === 1) {
            return 'green'
        }
    }

    return (
        <Card key={idx} style={{ margin: 10, backgroundColor: color, borderRadius: 5, padding: 2, display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
            <div style={{ color: 'white' }}>{comment}</div>
            {score ? <div style={{ color: 'white' }}>Google Sentiment Score: {score}</div> : <CircularProgress style={{ alignSelf: 'center'}}/>}
            <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', borderRadius: 3 }}>
                <IconButton aria-label="delete" color="white" onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
                <Checkbox checked={liked} onChange={handleLike} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            </div>
        </Card>
    )
}
