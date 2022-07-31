let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

let parametercount=0;
const url=document.getElementById("url");
const paramsRadio=document.getElementById("paramsRadio");
const jsonRadio=document.getElementById("jsonRadio");

paramsRadio.addEventListener("click",function(){
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});
jsonRadio.addEventListener("click",function(){
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
});

let addParam=document.getElementById("addParam");
addParam.addEventListener("click",function(){
    let params=document.getElementById("params");
    let string = `<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${parametercount + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${parametercount + 2}" placeholder="Enter Parameter ${parametercount + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${parametercount + 2}" placeholder="Enter Parameter ${parametercount + 2} Value">
    </div>
    <button class="btn btn-primary deleteParam"> - </button>
    </div>`;
    params.innerHTML+=string;

    let deletebtn=Array.from(document.getElementsByClassName("deleteParam"));
    console.log(deletebtn);
    deletebtn.forEach(function(btn){
        btn.addEventListener("click",function(e){
           e.target.parentElement.remove();
        })
    })
    parametercount++;
})

let submit=document.querySelector("#submit");
submit.addEventListener("click",function(){

    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";

    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    if(requestType=='GET'){
        async function gettingget(){
            const response=await fetch(url,{
                method:'GET',
            })
            const data=await response.text();
            document.getElementById('responsePrism').innerHTML = text;
            
        }
    }
    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }


    
})