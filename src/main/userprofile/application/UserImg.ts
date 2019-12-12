import React, {Component} from 'react';
import axios from 'axios';

class App extends Component{
state ={
    selectedFile:null
}
    fileSelectedHandler=event=>{
       this.setState({
           selectedFile: event.target.files[0]
       })
    }
    
    fileUploadHandler = () => {
        const formData = new FormData()
        formData.append(
          'myFile',
          this.state.selectedFile,
          this.state.selectedFile.name
        )
        axios.post('Coders-Camp.com/user-img', formData)
      }


render(){
    return(
        <div className="UserImg">
        <input type="file" onChange={this.fileSelectedHandler}/>
        <button onClick={this.fileUploadHandler}>Upload</button>

        </div>
    );
    }
}

export default App;