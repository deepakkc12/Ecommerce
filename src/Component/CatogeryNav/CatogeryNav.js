import { Container,Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {  useDispatch,useSelector } from "react-redux";
function CatgeryNav(){
    const allProducts=useSelector(data=>data.allProducts)
    const dispatch = useDispatch()
    const [category, setCategory] = useState();

    const getCatogeryId=(id)=>{
        dispatch({
            type:'update_selected_category_id',
            value:id
        })
      }

      function filterCategory(arr) {
        const temp={}
        arr.forEach(element => {
            const {id,name,image}=element;
            if(!temp[name] || !temp[image]){
              temp[id]={id,name,image}
            }
        });
        var result=Object.values(temp)
        return result
    }

      useEffect(()=>{
        var cat=allProducts.map((element) => element.category);
      setCategory(filterCategory(cat))
      },[allProducts])

      

    return(
        <>
        <Container>
        <Row>
          <Col md={12} className="bg-light mb-1 d-flex p-3 justify-content-center flex-wrap">
            <h3>Category</h3>
            <div className="d-flex flex-wrap" style={{ marginLeft: "auto" }}>
              {category && category.length > 0 ? (
                category.map((element, id) => (
                  <div key={id} className="d-flex flex-column  mx-3 justify-content-center align-items-center">
                    <Link to='/catogery_page'>
                    <img
                    onClick={()=>getCatogeryId(element.id)}
                    key={id}
                    src={element.image}
                    className="img"
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                  />
                    </Link>
                  <span>{element.name}</span>
                  </div>
                ))
              ):""
            }
            </div>
          </Col>
        </Row>
      </Container>
        </>
    )
}
export default CatgeryNav