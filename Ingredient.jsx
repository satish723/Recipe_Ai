import React from "react";
import "./ingredient.css";
import 'font-awesome/css/font-awesome.min.css';
export default function Ingredient(p)
{ 
    const ingredientlistitems =p.ingredients.map((item,index)=> 
        <li key={index}>{item} <div className="task-buttons">
        <button onClick={()=> p.onedit(index)} className="edit-btn"><i className="fa-solid fa-pen"></i></button>
        <button onClick={()=> p.ondelete(index)} className="delete-btn"><i className="fa-solid fa-trash"></i></button>
        </div>
        </li>
    );
    let btnele="Get a Recipe";
    if (p.next === "load") {
        btnele = "wait it is Loading";
    } else if (p.next === "next") {
        btnele = "Get another Recipe";
    }

    return (
        <section>
            <h2>Ingredients on Hand</h2>
            <ul className="ingredient-list" aria-live="polite" >
                {ingredientlistitems}
            </ul>
            { p.ingredients.length>3 && <button onClick={p.getRecipe}>{btnele}</button> }
        </section>
    );
}