// var product = [];
// function Reducer(state = product, action) {
//   if (action.type == "update") {
//     let dup = [...state, action.value];
//     state = checkSimilar(dup);
//   }
//   return state;
// }


//.......................................................................
var data={
    cart:[],
    allProducts:[],
    selectedProductId:undefined,
    selectedCategoryId:undefined,
    test:0
}
function Reducer(state = data, action) {
    console.log(state)
    switch (action.type) {
        case 'update':
            let dupCart = [...state.cart, action.value];
            return {
                ...state,
                cart: checkSimilar(dupCart)
            };
            
            case 'update_all_products':
                return {
                    ...state,
                    allProducts: action.value
                };

            case 'update_selected_product_id':
                return{
                    ...state,
                    selectedProductId: action.value
                }
            
            case 'update_selected_category_id':
                return{
                    ...state,
                    selectedCategoryId: action.value 
                }
            case 'remove_from_cart':
                return{
                    ...state,
                    cart:action.value
                }
                
            default:
                return state;
            }
}
export default Reducer;


// ..................................................................................

export function checkSimilar(arr) {
  const temp = {};
  arr.forEach((element) => {
    const { id, Qty, price, image } = element;
    if (temp[id]) {
      temp[id].Qty += Qty;
    } else {
      temp[id] = { id, Qty, price, image };
    }
  });
  var result = Object.values(temp);
  return result;
}

