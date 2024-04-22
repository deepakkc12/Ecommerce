import { Component } from "react";
import { connect } from "react-redux";
class ClassCounter extends Component {
  constructor(prop) {
    super();
    this.state = {
      quantity: 1,
      data: { id: prop.id, price: prop.price, image: prop.image },
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.getQuantity = this.getQuantity.bind(this);
  }
  increment = () => {
    this.setState((prevState) => ({
      quantity: parseInt(prevState.quantity) + 1,
    }));
  };
  decrement = () => {
    if (this.state.quantity > 1) {
      this.setState((prevState) => ({
        quantity: parseInt(prevState.quantity) - 1,
      }));
    }
  };

  addToCart = () => {
    const { quantity } = this.state;
   if(quantity>0){
    this.props.dispatch({
      type: "update",
      value: { ...this.state.data, Qty: parseInt(quantity) },
    });
   }
   this.setState(prevState=>({
    quantity:1
   }))
  };
  getQuantity=(evenet)=>{
    const qty=evenet.target.value;
    this.setState((prevState)=>({
      quantity:qty
    }))
  }
  render() {
    return (
      <>
        <div
          className="mt-3 mb-2 justify-content-center flex-column"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="d-flex mb-3">
            <button
              style={{
                width: "2em",
                textAlign: "center",
                margin: "0 5px",
              }}
              className="btn btn-secondary"
              onClick={this.decrement}
            >
              -
            </button>
            <input
              type="number"
              className="form-control my-auto text-dark"
              style={{
                width: "80px",
                textAlign: "center",
                margin: "0 5px",
              }}
              onChange={this.getQuantity}
              value={this.state.quantity}
              min={1}
            />
            <button
              style={{
                width: "2em",
                textAlign: "center",
                margin: "0 5px",
              }}
              className="btn btn-secondary"
              onClick={this.increment}
            >
              +
            </button>
          </div>
          <button onClick={this.addToCart} className="btn btn-dark w-100">
            Add to Cart
          </button>
        </div>
      </>
    );
  }
}

export default connect()(ClassCounter);