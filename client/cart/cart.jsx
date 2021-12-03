let cartItemsId = [];
let items = [];
const ItemsInCart = function(props){

    console.log(props.itemsInCart);
    if(props.itemsInCart.length === 0) {
        return (
            <div className="cartItemList">
                <h3 className="emptyCart">No Items Yet</h3>
            </div>
        );
    }
    const cartItemNodes = items.map(function(item) {
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

const CartPage = (props)=> {
    return(
            <div className="CheckoutPanel">
                <div className="headings">
                    <div className="Header">
                        <h3 className="Heading">Shopping Cart</h3>
                        <h5 className="Action">Remove all</h5>
                    </div>
                    {props.right}
                </div>
            </div>
    )
}

const loadCart = () =>{
    sendAjax('GET', '/getItems', null ,(data) => {
    })
}

const setupCartPage = function(csrf) {
    getCart(csrf);
    ReactDOM.render(
        <CartPage 
            right={
                <ItemsInCart itemsInCart={[]} csrf={csrf} />
            }
        />,document.querySelector("#container")
    )

};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=> {
        setupCartPage(result.csrfToken);
    }); 

    console.log(cartItemsId);
};

const getCart = (csrf) =>{
    sendAjax('GET', '/getCart',null,(result)=>{
        cartItemsId=result.itemsInCart;
        items = result.items;
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

let promise = new Promise((resolve,reject)=>{
    setTimeout(()=> resolve(),1000);
})

$(document).ready(function() {
   getToken();
});

