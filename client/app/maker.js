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
            <div key={item._id} className="item">
                <img  src={imageSource} alt="item preview" className="itemFace" />
                <h3 className="itemName"> Name: {item.name} </h3>
                <h3 className="itemPrice"> Price: {item.price} </h3>
                <button className="addButton"> Add To Cart </button>
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



const handleUpload = (e) =>{
    e.preventDefault();

    sendAjax('POST', $("#uploadForm").attr("action"), $("#uploadForm").serialize(), function() {
        // loadItemsFromServer();
    });

    return false;
}

const UploadItemForm = (props) => {
    return (
        <form 
      id='uploadForm' 
      onSubmit={handleUpload}
      action='/upload' 
      method='POST' 
      encType="multipart/form-data">
        <label htmlFor="productName">Product Name: </label>
        <input id="productName" type="text" name="productName" placeholder="Product Name"/>
        <label htmlFor="price">Price: </label>
        <input id="price" type="text" name="price" placeholder="Price"/>
        <label htmlFor="productImage">Product Image</label>
        <input type="file" name="sampleFile" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input type='submit' value='Upload!' />
    </form> 
    );
};

const setupItemUpload = function(csrf) {
    ReactDOM.render(
        <UploadItemForm csrf={csrf} />, document.querySelector("#uploadFormSection")
    );
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
        // setupItemUpload(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});