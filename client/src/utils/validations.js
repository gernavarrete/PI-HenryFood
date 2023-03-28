const validations = (input) => {
    switch (input) {
      case 'name':
        setError({...error, msgName : 'debe ser un string'})
        return { 

        }
      case 'summary':
        setError({...error, msgSummary : 'excedio el limite de caracteres'});
        return {
          
      } 
      case 'healthScore':
          setError({...error, msgHealthscore : 'deber ser un numero'})
        return {
            
      }
      default: return setError({...error, msgHealthscore : ''});
    }
  };
  
  export default validations;