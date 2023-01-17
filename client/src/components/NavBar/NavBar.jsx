import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";
import Select from 'react-select';

import { filterByDiet, setOrderBy, setSearchValue } from "../../redux/actions/index.js";


export default function Navbar({ diets }) {
  const dispatch = useDispatch();
  const orderBy = useSelector((state) => state.orderBy);

  const orderSelectByAlphabetical = [
    {label: '', value: ''},
    {label: 'A-Z', value: 'A-Z'},
    {label: 'Z-A', value: 'Z-A'},
  ]

  const orderSelectByhealthScore = [
    {label: '', value: ''},
    {label: 'Mayor a Menor', value: 'Mayor a Menor'},
    {label: 'Menor a Mayor', value: 'Menor a Mayor'},
  ]

  const handleSearch = (event) => {
    dispatch(setSearchValue(event.target.value));
  };

  const handleFilterbyDiet = (event) => {
    dispatch(filterByDiet(event.target.value));
  };

  const handleOrder = (e, { type }) => {
    let cache = {...orderBy};
    
    if(orderBy.type !== type) cache.type = type;
    
    cache.order = e.value;
    
    dispatch(setOrderBy(cache))
  };

  return (
    <nav className="navbar">
      <h1>Filters</h1>

      <input className="searchbar" type="text" placeholder="Search by name" onChange={handleSearch}/><br></br>

      <hr></hr>
      
      <h2>Order By:</h2>

      <select defaultValue={"All Diets"} onChange={handleFilterbyDiet}>
        <option value="All Diets">All Diets</option>

        {diets && diets.map(({ name }, indexkey) => {
          name = name[0].toUpperCase() + name.slice(1);

          return (
            <option key={indexkey} value={name}>
              {name}
            </option>
          );
        })}
      </select> <br></br>

      <hr />

      <span>Alphabetical </span>

      <Select className="selectOrder"
        options={orderSelectByAlphabetical}
        onChange={(e) => handleOrder(e, {type: 'name'})}
      /><br></br>

      <span>healthScore </span>
      <Select className="selectOrder"
        options={orderSelectByhealthScore}
        onChange={(e) => handleOrder(e, {type: 'healthScore'})}
      />

      <hr />

      <NavLink className="Navlink" to={"/createRecipe"}>
        <button className="createButton">Create New Recipe</button>
      </NavLink>
    </nav>
  );
}