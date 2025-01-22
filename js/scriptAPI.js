const NEWS_P = [...document.querySelectorAll('#news-p')]
const NEWS_TITLE = [...document.querySelectorAll('#news-title')]
const NEWS_AUTHOR = [...document.querySelectorAll('#news-author')]
const NEWS_DATETIME = [...document.querySelectorAll('#news-datetime')]
const NEWS_READ_MORE = [...document.querySelectorAll('#news-read-more')]
const NEWS_THUMB_IMAGE = [...document.querySelectorAll('#news-thumb-image')]

const baseURL = 'https://newsapi.org/v2'
const params = new URLSearchParams({
    category: "technology",
    country: "us",
    apiKey: "01592e9ed78f449892d618c97de3de53"
})

async function getContent() {
    const response = await fetch(`${baseURL}/top-headlines?${params.toString()}`)
    if(response.status === 200){
        const dataOBJ = await response.json()
        NEWS_TITLE.forEach((ele, index)=>{
            if(dataOBJ.articles[index]){
                if(dataOBJ.articles[index].title){
                    ele.innerHTML = dataOBJ.articles[index].title
                } else {
                    ele.innerHTML = 'Title unavailable'
                }
            }
        })
        NEWS_P.forEach((ele, index)=>{
            if(dataOBJ.articles[index]){
                if(dataOBJ.articles[index].description){
                    ele.innerHTML = dataOBJ.articles[index].description
                } else {
                    ele.innerHTML = 'Text unavailable'
                }
            }
        })
        NEWS_AUTHOR.forEach((ele, index)=>{
            ele.parentNode.setAttribute('href', `${dataOBJ.articles[index].url}`)
            
            if(dataOBJ.articles[index]){
                const span = document.createElement('span')
                ele.innerHTML = 'By '
                if(dataOBJ.articles[index].author){
                    span.innerHTML = dataOBJ.articles[index].author
                } else {
                    span.innerHTML = 'Unknown'
                }
    
                ele.appendChild(span)
            }
        })
        NEWS_DATETIME.forEach((ele, index)=>{
            if(dataOBJ.articles[index]){
                if(dataOBJ.articles[index].publishedAt){
                    ele.setAttribute('datetime', `${dataOBJ.articles[index].publishedAt.substr(0, 10)}`)
                    ele.innerHTML = dataOBJ.articles[index].publishedAt.substr(0, 10)
                } else {
                    ele.innerHTML = 'Unknown'
                }
            }
        })
        NEWS_READ_MORE.forEach((ele, index)=>{
            if(dataOBJ.articles[index]){
                if(dataOBJ.articles[index].url){
                    ele.setAttribute('href', `${dataOBJ.articles[index].url}`)
                } else {
                    ele.setAttribute('href', '#')
                }
            }
        })
        NEWS_THUMB_IMAGE.forEach((ele, index)=>{
            ele.parentNode.setAttribute('href', `${dataOBJ.articles[index].url}`)
            if(dataOBJ.articles[index]){
                if(dataOBJ.articles[index].urlToImage){
                    ele.setAttribute('src', `${dataOBJ.articles[index].urlToImage}`)
                    ele.setAttribute('alt', 'news image')
                } else {
                    ele.setAttribute('href', '#')
                }
            }
        })
        console.log(dataOBJ.articles)
    }
}

getContent()
