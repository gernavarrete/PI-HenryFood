import React, { useEffect, useState } from "react";
import RecipeCard from '../RecipeCard/RecipeCard.jsx';
import './Home.css';
import {useDispatch, useSelector} from "react-redux";
import {getRecipes, getDiets} from "../../redux/actions/index.js";
import Paginations from '../Paginations/Paginations.jsx'
import Navbar from "../NavBar/NavBar.jsx";


export default function Home() {
    let dispatch = useDispatch(); // hooks para conectar con la actions
    const allRecipes =  useSelector((state) => state.recipes);
    const allDiets = useSelector((state) => state.diets);
    
    // componentDidMount para hacer la solicitud a la api/db al iniciar el componente Home una sola vez.
    
     useEffect(() =>{                    
     dispatch(getRecipes());
     //dispatch(getDiets());
    },[])
    
    //                Filtro por DIET                  //---------------

    const [recipesByDiet, setRecipesForDiet] = useState(allRecipes);

    const filter = useSelector((state) => state.filterByDiet);

    useEffect(() => {
    
        filter === "All Diets" 
        ? setRecipesForDiet(allRecipes)
        : setRecipesForDiet(allRecipes.filter(recipe => recipe.diets.some(diet => diet.toLowerCase() === filter.toLowerCase())))
        
      }, [filter, allRecipes]);

    //                 Filtro por Name                   //----------------


    const [recipesByName, setRecipesByName] = useState(recipesByDiet)

    const nameValue = useSelector(state => state.searchValue)

    const filterByName = () => {
        let arrayCache = [...recipesByDiet];
        
        
        arrayCache = arrayCache.filter(recipe => recipe.name.toLowerCase().includes(nameValue.toLowerCase()))

        setRecipesByName(arrayCache);
    }

    useEffect(() => {
        filterByName()
    }, [nameValue, recipesByDiet])


    //                 Filtro por Orden de Healthscore      //----------------------------

    
  const orderBy = useSelector((state) => state.orderBy);

  const orderByProp = () => {
    
    const { order , type } = orderBy;

    let cache = [ ...recipesByName ];
    
    if(order === '') return setRecipesByName(recipesByName);
    // El metodo sort ordena segun el valor mayor igual o menor que cero dependiendo la funciona comparadora
    cache.sort((a, b) => {
      if(a[type] < b[type]) return (order === "A-Z" || order === 'Menor a Mayor') ? -1 : 1;
      if(a[type] > b[type]) return (order === "A-Z" || order === 'Menor a Mayor') ? 1 : -1;
      return 0;
    })
    
    setRecipesByName(cache);
  }

    useEffect(() => {
      orderByProp();
    }, [orderBy])


    //                 Paginacion del contenido             //-----------------------------


    const [currentPage, setCurrentPage] = useState(1);    //Pagina Actual seteada en 1
    const [numberOfPage, setNumberOfPage] = useState(0);    //Numero de Paginas seteado en 0
    const [totalRecipes, setTotalRecipes] = useState([]);   //Recetas Totales Seteada en Array Vacio

    const indexFirstPageRecipe = () => (currentPage - 1) * 9;  // Indice del primer Elemento
    const indexLastPageRecipe = () => indexFirstPageRecipe() + 9;  //Indice del segundo elemento

    const handlePageNumber = (number) => {   //Manejo del numero de pagina
        setCurrentPage(number);
    };

    useEffect(() => { //Cambio de estado local de Total Recipes indicando los indices que tiene que renderizar en cada pagina
        setTotalRecipes(recipesByName.slice(indexFirstPageRecipe(), indexLastPageRecipe())); 
        setNumberOfPage(Math.ceil(recipesByName.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
    }, [recipesByName, currentPage]);

    useEffect(() => {
        setCurrentPage(1) //setea el numero de pagina actual a 1 cuando recipesName Cambia 
    },[recipesByName])

    
    return (
        <div className="container-main">
            <div className="container-lateralBar">
                <Navbar diets={allDiets}/>
            </div>

            <div className="container-Recipes">
                <div className="divH2"><h2 className="h2">Recipes Store</h2></div>
                
                <div className='container-Cards'>
                {totalRecipes?.map((recipe) =>
                        (<div key={recipe.id} className='divCard'>
                        <RecipeCard
                        id={recipe.id}
                        name={recipe.name}
                        healthScore={recipe.healthScore}
                        image={recipe.image}
                        diets={recipe.diets}/>
                        </div>))}
                </div>

                <hr/>
                    <Paginations currentPage={currentPage} numberOfPage={numberOfPage} handlePageNumber={handlePageNumber}/>
            </div>
        </div>
    );
}