let cartItemsId = [];
let items = [];
let totalPrice = 0;
const ItemsInCart = function(props){

    if(props.itemsInCart.length === 0) {
        return (
            <div className="cartItemList">
                <h3 className="emptyCart">No Items Yet</h3>
            </div>
        );
    }
    const cartItemNodes = items.map(function(item) {
        totalPrice += (item.price*item.qty);
        let imageSource = `/retrieve?fileName=${item.name}`;
        return(
            <div key={item._id} className="cart-item-container">
                <img src={imageSource}>
                </img>
                <div className="about">
                    <h1 className="title">{item.name}</h1>
                    <h3 className="subtitle">Qty: {item.qty}</h3>
                </div>
                <div className="prices">
                    <div className="amount">${item.price}</div>
                </div>
            </div>
        );
    })
    return(
        <div className="CartItemsList">
            {cartItemNodes}
        </div>
    )  
};

const emptyCart = () =>{

    let csrf = event.target.parentNode.getAttribute("csrf");
    sendAjax('POST','/addToCart', {cartItemsId:[], csrf:event.target.parentNode.getAttribute("csrf")}, (result)=>{
        cartItemsId = [];
        totalPrice=0;
        document.querySelector("#cartButton").innerHTML = `Cart: ${cartItemsId.length}`;
        ReactDOM.render(
            <CartPage 
                right={
                    <ItemsInCart itemsInCart={[]} csrf={csrf} />
                }
            />,document.querySelector("#container")
        )
    })
   
}

const CheckoutPage = (props) =>{
    return(
        <div csrf={props.csrf}>
            <h5 className="Action" onClick={setupCartPage}>Go back to Cart</h5>
        </div>
    )
}

const CreateCheckoutPage = () =>{
    let csrf = event.target.parentNode.getAttribute("csrf");
    ReactDOM.render(
        <CheckoutPage csrf={csrf} />, document.querySelector("#container")
    )
}
    
const CartPage = (props)=> {
    return(
            <div className="CheckoutPanel">
                <div className="headings">
                    <div className="Header">
                        <h3 className="Heading">Shopping Cart</h3>
                        <div csrf={props.right.props.csrf}>
                        <h5 className="Action" onClick={emptyCart}>Remove all</h5>
                        </div>
                    </div>
                    {props.right}
                </div>
                <div className="footerCart" csrf={props.right.props.csrf}>
                <a href="/checkoutPage"><button className="checkoutButton">Checkout</button></a>
                <h2>Total: ${totalPrice}</h2>
                </div>
            </div>
    )
}

const setupCartPage = function() {
    
    let csrf = event.target.parentNode.getAttribute("csrf");
        getCart(csrf);
    };

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=> {
        getCart(result.csrfToken);
    }); 
};

const getCart = (csrf) =>{
    sendAjax('GET', '/getCart',null,(result)=>{
        cartItemsId=result.itemsInCart;
        items = result.items;
        totalPrice = 0;
        for(const item of items)
        {
            totalPrice +=(item.price*item.qty);
        }
        document.querySelector("#cartButton").innerHTML = `Cart: ${cartItemsId.length}`;

        ReactDOM.render(
            <CartPage 
                right={
                    <ItemsInCart itemsInCart={cartItemsId} csrf={csrf} />
                }
            />,document.querySelector("#container")
        )
    });
};

$(document).ready(function() {
   getToken();
});

