import React from 'react'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom' 
export default function Markeddata(p)
{
    return (
        <div className="suggested-recipe-container" aria-live="polite">
            <h2>Recipe Ai Recommends:</h2>
            <ReactMarkdown>{p.recipe}</ReactMarkdown>
        </div>
    )
}