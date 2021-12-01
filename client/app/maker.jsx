const ItemInCart = function(props){

    let imageSource = `/retrieve?fileName=${props.item.name}`;
    return(
        <div className="cart-item-container">
            <img src={imageSource}>

            </img>
            <div className="about">
                <h1 className="title">{props.item.name}</h1>
                <h3 className="subtitle">Qty: 1</h3>
            </div>
            <div className="prices">
                <div className="amount">${props.item.price}</div>
            </div>
        </div>
    );
};
const handleAddToCart = (item) =>{
    

    ReactDOM.render(
        <ItemInCart item={item} />,document.querySelector("#CartItems")
    )
} 

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
                <div>
                <button className="item-button" onClick={handleAddToCart}> Add To Cart </button>
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

const loadItemsFromServer = () =>{
    sendAjax('GET', '/getItems', null ,(data) => {
        ReactDOM.render(
            <ItemList items={data.items} />,document.querySelector("#itemsDiv")
        );
    });

    return false;
};

const setup = function(csrf) {

    ReactDOM.render(
        <ItemList items={[]} csrf={csrf} />, document.querySelector("#itemsDiv")
    );
    
    loadItemsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=> {
        console.log(result.csrfToken);
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});