import { useEffect } from "react";

function Filter({popular, setFiltered, activeGenre, setActiveGenre}) {

    useEffect(()=>{
        if(activeGenre===0){
            setFiltered(popular);
            return;
        }
        const filtered =popular.filter((movie)=>
        movie.genre_ids.includes(activeGenre)
        );
        setFiltered(filtered);
    },[activeGenre])

    return (
        <div className="filter-container">
            <button onClick={()=>setActiveGenre(0)} className={activeGenre===0 ? 'active':''}>
                All
            </button>
            <button onClick={()=>setActiveGenre(35)} className={activeGenre===35 ? 'active':''}>
                Comedy
            </button>
            <button onClick={()=>setActiveGenre(28)} className={activeGenre===28 ? 'active':''}>
                Action
            </button>
            <button onClick={()=>setActiveGenre(14)} className={activeGenre===14 ? 'active':''}>
                Fantasy
            </button>
            <button onClick={()=>setActiveGenre(27)} className={activeGenre===27 ? 'active':''}>
                Horror
            </button>
        </div>
    )
}

export default Filter;