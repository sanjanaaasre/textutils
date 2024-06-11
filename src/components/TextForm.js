import React, {useState} from 'react'

export default function TextForm(props){
    const handleUpClick = ()=>{
       // console.log("Uppercase was Clicked" + text);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase","success");

    }
    const handleOnChange = (event)=>{
        //console.log("On Change");
        setText(event.target.value);
    }
    const handleLoClick = ()=>{
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase","success");
    }
    const handleClearClick = ()=>{
        let newText = '';
        setText(newText);
        props.showAlert("Text cleared","success");
    }
    const handleSpeakClick = ()=>{
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
    }
    const handleStopClick = ()=>{
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.cancel(msg);
    }
    const handleCopyClick = ()=>{
        var text = document.getElementById("myBox")
        text.select();
        navigator.clipboard.writeText(text.value); //navigator interface used
        props.showAlert("Text copied to clipboard","success");

    }
    const handleExtraSpace = ()=>{
       let newText = text.split(/[ ]+/);  //rejex is used
       setText(newText.join(" ")) ;
       props.showAlert("Extra spaces removed","success");   
    }

    const [text, setText] = useState('');

    return(
        <>
        <div className="container my-3 "style={{color : props.mode==='dark'?'white':'black'}}>
            <h1>{props.heading}</h1>
            <div className="mb-3">
            <label htmlFor="myBox" className="form-label"> Textarea</label>
            <textarea className="form-control"  value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#4c5761':'white', color : props.mode==='dark'?'white':'black'}} id="myBox" rows="8"></textarea>
            </div>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1"onClick = {handleUpClick}> Convert to UpperCase </button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1"onClick = {handleLoClick}> Convert to LowerCase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1"onClick = {handleClearClick}> Clear Text</button>
            <button disabled={text.length===0}className="btn btn-primary mx-1 my-1"onClick = {handleSpeakClick}> Speak Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1"onClick = {handleStopClick}> Stop Speaking</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1"onClick = {handleCopyClick}> Copy Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1"onClick = {handleExtraSpace}> Remove ExtraSpace</button>
        </div>
        <div className="container my-3 "style = {{color :props.mode==='dark'?'white':'black'}}>
            <h2>Your Text Summery</h2>
            <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length}words and {text.length}characters</p>
            <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length}Read in minutes</p>
            <h2>Perview</h2>
            <p>{text.length>0?text:"Nothing to Preview"}</p>
        </div>
        </>
    )
}