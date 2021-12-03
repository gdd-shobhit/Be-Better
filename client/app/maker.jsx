let cartItemsId =[];

const ItemList = function(props) {
    if(props.items.length === 0) {
        return (
            <div className="itemList">
                <h3 className="emptyItemList">No Items Yet</h3>
            </div>
        );
    }

    const itemNodes = props.items.map(function(item) {
        let imageSource = `/retrieve?fileName=${item.name}`;
        return (
            <div key={item._id} className="item-container">
                <div className="itemImg">
                <img  src={imageSource} alt="item preview" className="itemFace" />
                </div>
                <div className="itemInfo">
                <h2>{item.name}</h2>
                <h3 className="price">${item.price}</h3>
                </div>
                <div data-value={item._id} csrf={props.csrf}>
                <button className="item-button" onClick={addToCart} > Add To Cart </button>
                </div>
            </div>
        );
    });
    return(
        <div className="itemList">
            {itemNodes}
        </div>
    );
};

const addToCart = ()=>{
    cartItemsId.push(event.target.parentNode.getAttribute("data-value"));

    sendAjax('POST','/addToCart', {cartItemsId:cartItemsId, csrf:event.target.parentNode.getAttribute("csrf")}, (result)=>{
        cartItemsId = result.itemsInCart;
    })
    document.querySelector("#cartButton").innerHTML = `Cart: ${cartItemsId.length}`;
}

const loadItemsFromServer = (csrf) =>{
    sendAjax('GET', '/getItems', null ,(data) => {
        ReactDOM.render(
            <ShopPage 
                left={
                    <ItemList items={data.items} csrf={csrf} />
                }
            /> ,document.querySelector("#container")
        )
    });

    return false;
};


const ShopPage = (props)=> {
    return(
        <div className="shopWrapper">
            {props.left}
        </div>
    )
};

const setup = function(csrf) {
    ReactDOM.render(
        <ShopPage 
            left={
                <ItemList items={[]} csrf={csrf} />
            }
        />,document.querySelector("#container")
    )
    loadItemsFromServer(csrf);
    document.querySelector("#cartButton").innerHTML = `Cart: ${cartItemsId.length}`
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=> {
        console.log(result.csrfToken);
        setup(result.csrfToken);
        sendAjax('GET', '/getCart',null,(result)=>{
            cartItemsId=result.itemsInCart;
            document.querySelector("#cartButton").innerHTML = `Cart: ${cartItemsId.length}`;
        });
    });
   
};

$(document).ready(function() {
    getToken();
});