import React,{Fragment, useState} from "react";

const InputProduct = () => {

    const [url, seturl] = useState ("");

    const onSubmitForm = async(e)=>{
        e.preventDefault();
        console.log("Received user submitted data", e )
        try {
            const body = {url};
            const response = await fetch("http://localhost:5000/products",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
    <Fragment>
        <h1 className="text-center mt-5">Enter a Link and Let's SCRAPE!</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input 
            type="url"
            className = "form-control"
            value={url}
            onChange={e=>seturl(e.target.value)}/>
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment>
    );
};

export default InputProduct;