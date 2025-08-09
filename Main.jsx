import React from "react";
import Ingredient from "./ingredient";
import "./main.css";
import {getRecipeFromMistral} from "./ai";
import Markeddata from "./markeddata";
export default function Main()
{
    const [ingredients,setingredients]=React.useState(["tomato", "onion", "garlic"]);
    let [inputValue,setinputValue]=React.useState("");
    let [editIndex,seteditIndex]=React.useState(null);
    const [recipe,setrecipe]=React.useState("");
    let [next,setNext]=React.useState(null);
    async function getRecipe()
    {
        setNext("load");
        const markeddata= await getRecipeFromMistral(ingredients);
        console.log(markeddata);
        setrecipe(markeddata);
        setNext("next");
    }
    // console.log(ingredients);
    function addingredient(e)
    {
        e.preventDefault();
       const trimed=inputValue.trim();
       if(!trimed)
       {
        return 
       }
       if(editIndex==null)
       {
        setingredients((prevele)=>[...prevele,trimed]);
       }
       else
       {
        const updated=[...ingredients];
        updated[editIndex]=trimed;
        setingredients(updated);
        seteditIndex(null);
       }
       setinputValue("");
    }
    function editingredient(index)
    {
        seteditIndex(index);
        setinputValue(ingredients[index]);
    }
    function deleteIngredient(index)
    {
        const updated=ingredients.filter((_,i) => i!==index);
        setingredients(updated);
    }
    const key=import.meta.env.VITE_HF_ACCESS_TOKEN;
    return (
        <div>
        <form onSubmit={addingredient}  className="ingredient-form">
            <input type=" text" placeholder="Tomato" name="ingredient" value={inputValue} onChange={(e)=>setinputValue(e.target.value)}/>
            <button type="submit">
                {editIndex==null? "Add Ingredient" : "Update Ingredient"}
            </button>
            {editIndex !== null && (
                <button type="button" onClick={() => {
                    seteditIndex(null);
                    setinputValue("");
                }}>Cancel</button>
            )}
        </form>
        <Ingredient ingredients={ingredients} onedit={editingredient} next={next} getRecipe={getRecipe} ondelete={deleteIngredient} />
            {recipe!=="" &&<Markeddata recipe={recipe} />}
        </div>
    )
}