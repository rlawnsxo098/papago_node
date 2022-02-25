const textAreaArray = document.querySelectorAll('textarea');

console.log(textAreaArray);

const [ sourceTextArea, targetTextArea] = textAreaArray;
console.log(sourceTextArea);
console.log(targetTextArea);

const [ sourceSelect, targetSelect ] = document.querySelectorAll('select');
console.log(sourceSelect, targetSelect);

let targetLanguage = 'en';

console.dir(targetSelect);
console.log(targetSelect.options);


targetSelect.addEventListener('change', () => {

    const selectedIndex = targetSelect.selectedIndex;

    targetLanguage = targetSelect.options[selectedIndex].value;
    //console.log(targetLanguage);

});

let debouncer;

sourceTextArea.addEventListener('input', (event) => {

    if(debouncer){
        clearTimeout(debouncer);
    }

    debouncer = setTimeout(()=>{
        const text = event.target.value;
    
    if(text){
        const xhr = new  XMLHttpRequest();
    
        const url = '/detectLangs'      //node Server URL;
    
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 & xhr.status == 200)
            {
                //console.log(typeof xhr.responseText);
                //console.log(xhr.responseText);
    
                const responseData = xhr.responseText;
                console.log(`responseData : ${responseData}, type : ${typeof responseData}`);
                const parseJsonToObject = JSON.parse(JSON.parse(responseData)); 
                //https://stackoverflow.com/questions/30194562/json-parse-not-working/49460716
                console.log( typeof parseJsonToObject, parseJsonToObject);
    
               const result =  parseJsonToObject['message']['result'];
    
               targetTextArea.value = result['translatedText'];
            }
        };
        xhr.open("POST",url);
        xhr.setRequestHeader("Content-type", "application/json");
    
        const requestData = {
            text,
            targetLanguage
        };
        //string 의 타입은 : string
        jsonToString =JSON.stringify(requestData);
        console.log(typeof jsonToString);       //String 형식.
    
    
    
        //xhr : XML
        xhr.send(jsonToString);

    }else{
        alert('번역할 텍스트가 없습니다.    ');
    }
    }, 3000);


});