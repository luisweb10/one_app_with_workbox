
const app = document.getElementById('app');

async function getNotices(name = "mexico"){
    let news = await fetch(`https://newsapi.org/v2/everything?q=${name}&apiKey=2df418f8d77c450b92d16850ef71be4c`);
    news = await news.json();
    //console.log(news);
    app.innerHTML = news.articles.map(crearArticulo).join('\n');
}

function crearArticulo(articulo){
    return `
        <div class="box">
            <div class="img">
                <img  src="${articulo.urlToImage}" />
            </div>
            <h1>${articulo.title}<a href="${articulo.url}">Ir</a></h1>
            <p>${articulo.description}</p>
        </div>
    
    `
}




window.onload = function(){
    console.log(location.origin);
    getNotices();
    document.getElementById('search').addEventListener('click',function(){
        const value = document.getElementById('name').value;
        getNotices(value);
    });
    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('sw registered')
        } catch (error) {
            console.log('sw not working' + error)
        }
    }
}

