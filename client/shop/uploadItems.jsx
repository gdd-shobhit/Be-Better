import {useState} from 'react';

const handleUpload = (e) =>{
    e.preventDefault();

    sendAjax('POST', $("#uploadForm").attr("action"), $("#uploadForm").serialize(), function() {
        //loadItemsFromServer();
    });

    return false;
}


const handleDeleteItem = (e) =>{
    e.preventDefault();

    sendAjax('DELETE', $("#deleteForm").attr("action"), $("#deleteForm").serialize(), function() {
        console.log("here");
    });

    return false;
}

const DeleteItemForm = (props) => {
    return(
    <form 
    id='deleteForm' 
    onSubmit={handleDeleteItem}
    action='/deleteItem' 
    method='DELETE'>
    <label htmlFor='fileName'>Delete Product By Name: </label>
    <input name='fileName' type='text' />
    <input type="hidden" name="_csrf" value={props.csrf} />
    <input type='submit' value='Delete!' />
    </form>
    );
};

let state = {
 
    // Initially, no file is selected
    selectedFile: null
  };
  
  // On file select (from the pop up)
  onFileChange = event => {
  
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  
  };

const onFileChange = (e) => {
    e.preventDefault();


}

const UploadItemForm = (props) => {
    return (
        <div>
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
        <input type="file" onChange={onFileChange} name="sampleFile" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input type='submit' value='Upload!' />
    </form> 

</div>
    );
};
const setupItemUpload = function(csrf) {
    ReactDOM.render(
        <UploadItemForm csrf={csrf} />, document.querySelector("#uploadFormSection")
    );

    ReactDOM.render(
        <DeleteItemForm csrf={csrf} />, document.querySelector("#deleteFormSection")
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=> {
        console.log(result.csrfToken);
        setupItemUpload(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});