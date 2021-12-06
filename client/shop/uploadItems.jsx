const handleDeleteItem = (e) =>{
    e.preventDefault();

    sendAjax('DELETE', $("#deleteForm").attr("action"), $("#deleteForm").serialize(), function() {
    });

    return false;
}

const DeleteItemForm = (props) => {
    return(
    <form 
    id='deleteForm' 
    onSubmit={handleDeleteItem}
    action='/deleteItem' 
    className="mainForm"
    method='DELETE'>
    <label htmlFor='fileName'>Delete Product By Name: </label>
    <input name='fileName' type='text' required />
    <input type="hidden" name="_csrf" value={props.csrf} />
    <input className="generalButtons" type='submit' value='Delete!' />
    </form>
    );
};


const setupItemUpload = function(csrf) {
    ReactDOM.render(
        <DeleteItemForm csrf={csrf} />, document.querySelector("#deleteFormSection")
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=> {
        setupItemUpload(result.csrfToken);
        document.querySelector("#csrf").value = result.csrfToken;
    });
};

$(document).ready(function() {
    getToken();
});