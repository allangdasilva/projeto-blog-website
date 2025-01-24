const baseURL = 'https://newsapi.org/v2'

const TITLE_LIMIT = 44
const TEXT_LIMIT = 88
let currentPage = 1

const NEXT_BTN = document.querySelector('#article-next-btn')
const PREV_BTN = document.querySelector('#article-prev-btn')

async function getContent(page) {
    showLoading()
    try {
        const params1 = new URLSearchParams({
            category: "technology",
            country: "us",
            apiKey: "01592e9ed78f449892d618c97de3de53",
            page: 1
        })
        const params2 = new URLSearchParams({
            category: "entertainment",
            country: "us",
            apiKey: "01592e9ed78f449892d618c97de3de53",
            page: 2
        })
        const params3 = new URLSearchParams({
            category: "business",
            country: "us",
            apiKey: "01592e9ed78f449892d618c97de3de53",
            page: 2
        })
        const params4 = new URLSearchParams({
            category: "technology",
            country: "us",
            apiKey: "01592e9ed78f449892d618c97de3de53",
            page: page
        })
    
        const [responseTech, responseEnter, responseBusi, responseTechPage] = await Promise.all([
            fetch(`${baseURL}/top-headlines?${params1.toString()}`),
            fetch(`${baseURL}/top-headlines?${params2.toString()}`),
            fetch(`${baseURL}/top-headlines?${params3.toString()}`),
            fetch(`${baseURL}/top-headlines?${params4.toString()}`),
        ])
    
        if(responseTech.status === 200){
            const dataOBJ = await responseTech.json()
    
            const NEWS_P = [...document.querySelectorAll('#news-p')]
            const NEWS_TITLE = [...document.querySelectorAll('#news-title')]
            const NEWS_AUTHOR = [...document.querySelectorAll('#news-author')]
            const NEWS_DATETIME = [...document.querySelectorAll('#news-datetime')]
            const NEWS_THUMB_IMAGE = [...document.querySelectorAll('#news-thumb-image')]
    
            handleMainContent(NEWS_P, NEWS_TITLE, NEWS_AUTHOR, NEWS_DATETIME, NEWS_THUMB_IMAGE, dataOBJ)
            
            
            console.log(dataOBJ.articles)
        } else {
            console.error('Erro ao carregar os dados da API')
        }
        if(responseEnter.status === 200){
            const dataOBJ = await responseEnter.json()
    
            const ASIDE_NEWS_TITLE = [...document.querySelectorAll('#aside-news-title')]
            const ASIDE_NEWS_DATETIME = [...document.querySelectorAll('#aside-news-datetime')]
            const ASIDE_NEWS_THUMB_IMAGE = [...document.querySelectorAll('#aside-news-thumb-image')]
    
            handleAsideContent(ASIDE_NEWS_TITLE, ASIDE_NEWS_DATETIME, ASIDE_NEWS_THUMB_IMAGE, dataOBJ)
        } else {
            console.error('Erro ao carregar os dados da API')
        }
        if(responseBusi.status === 200){
            const dataOBJ = await responseBusi.json()
    
            const FOOTER_NEWS_TITLE = [...document.querySelectorAll('#footer-news-title')]
            const FOOTER_NEWS_DATETIME = [...document.querySelectorAll('#footer-news-datetime')]
            const FOOTER_NEWS_THUMB_IMAGE = [...document.querySelectorAll('#footer-news-thumb-image')]
    
            handleAsideContent(FOOTER_NEWS_TITLE, FOOTER_NEWS_DATETIME, FOOTER_NEWS_THUMB_IMAGE, dataOBJ)
        } else {
            console.error('Erro ao carregar os dados da API')
        }
        if(responseTechPage.status === 200){
            const dataOBJ = await responseTechPage.json()
    
            const ARTICLE_NEWS_P = [...document.querySelectorAll('#article-news-p')]
            const ARTICLE_NEWS_TITLE = [...document.querySelectorAll('#article-news-title')]
            const ARTICLE_NEWS_AUTHOR = [...document.querySelectorAll('#article-news-author')]
            const ARTICLE_NEWS_DATETIME = [...document.querySelectorAll('#article-news-datetime')]
            const ARTICLE_NEWS_READ_MORE = [...document.querySelectorAll('#article-news-read-more')]
            const ARTICLE_NEWS_THUMB_IMAGE = [...document.querySelectorAll('#article-news-thumb-image')]
    
            handleMainContent(ARTICLE_NEWS_P, ARTICLE_NEWS_TITLE, ARTICLE_NEWS_AUTHOR, ARTICLE_NEWS_DATETIME, ARTICLE_NEWS_THUMB_IMAGE, dataOBJ)
    
            ARTICLE_NEWS_READ_MORE.forEach((ele, index)=>{
                if(dataOBJ.articles[index]){
                    if(dataOBJ.articles[index].url){
                        ele.setAttribute('href', `${dataOBJ.articles[index].url}`)
                    } else {
                        ele.setAttribute('href', '#')
                    }
                }
            })
        } else {
            console.error('Erro ao carregar os dados da API')
        }
    } catch(error) {
        console.error('Erro ao realizar a requisição:', error);
    } finally {
        hiddenLoading()
    }
    
}

function handleMainContent(p, title, author, datetime, image, dataOBJ){
    p.forEach((ele, index)=>{
        if(dataOBJ.articles[index]){
            const fullText = dataOBJ.articles[index].description || 'Text unavailable'
            const truncatedText = fullText.length > TEXT_LIMIT ? fullText.substr(0, TEXT_LIMIT) + '...' : fullText
            ele.innerHTML = truncatedText
        }
    })
    title.forEach((ele, index)=>{
        if(dataOBJ.articles[index]){
            const fullTitle = dataOBJ.articles[index].title || 'Title unavailable'
            const truncatedTitle = fullTitle.length > TITLE_LIMIT ? fullTitle.substr(0, TITLE_LIMIT) + '...' : fullTitle
            ele.innerHTML = truncatedTitle
        }
    })
    author.forEach((ele, index)=>{
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
    datetime.forEach((ele, index)=>{
        if(dataOBJ.articles[index]){
            if(dataOBJ.articles[index].publishedAt){
                ele.setAttribute('datetime', `${dataOBJ.articles[index].publishedAt.substr(0, 10)}`)
                ele.innerHTML = dataOBJ.articles[index].publishedAt.substr(0, 10)
            } else {
                ele.innerHTML = 'Unknown'
            }
        }
    })
    image.forEach((ele, index)=>{
        ele.parentNode.setAttribute('href', `${dataOBJ.articles[index].url}`)
        if(dataOBJ.articles[index]){
            if(dataOBJ.articles[index].urlToImage){
                ele.setAttribute('src', dataOBJ.articles[index].urlToImage)
                ele.setAttribute('alt', 'news image')
            } else {
                ele.setAttribute('src', `https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg`)
            }
        }
    })
}
function handleAsideContent(title, datetime, image, dataOBJ){

    title.forEach((ele, index)=>{
        if(dataOBJ.articles[index]){
            const fullTitle = dataOBJ.articles[index].title || 'Title unavailable'
            const truncatedTitle = fullTitle.length > TITLE_LIMIT ? fullTitle.substr(0, TITLE_LIMIT) + '...' : fullTitle
            ele.innerHTML = truncatedTitle
        }
    })
    datetime.forEach((ele, index)=>{
        if(dataOBJ.articles[index]){
            if(dataOBJ.articles[index].publishedAt){
                ele.setAttribute('datetime', `${dataOBJ.articles[index].publishedAt.substr(0, 10)}`)
                ele.innerHTML = dataOBJ.articles[index].publishedAt.substr(0, 10)
            } else {
                ele.innerHTML = 'Unknown'
            }
        }
    })
    image.forEach((ele, index)=>{
        ele.parentNode.setAttribute('href', dataOBJ.articles[index].url)
        if(dataOBJ.articles[index]){
            if(dataOBJ.articles[index].urlToImage){
                ele.setAttribute('src', dataOBJ.articles[index].urlToImage)
                ele.setAttribute('alt', 'news image')
            } else {
                ele.setAttribute('src', `https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg`)
            }
        }
    })
}

NEXT_BTN.addEventListener('click', ()=>{
    showLoading()
    if(currentPage === 1 ){
        currentPage++
        PREV_BTN.classList.remove('button-disabled')
        NEXT_BTN.classList.add('button-disabled')
        document.querySelector('.article-page').innerHTML = 'Page 2 of 2'
    }
    getContent(currentPage)
})
PREV_BTN.addEventListener('click', ()=>{
    showLoading()
    if(currentPage === 2){
        currentPage--
        NEXT_BTN.classList.remove('button-disabled')
        PREV_BTN.classList.add('button-disabled')
        document.querySelector('.article-page').innerHTML = 'Page 1 of 2'
    }
    getContent(currentPage)
})
function showLoading(){
   document.querySelector('.loading-api-container').classList.remove('loading-api-container-hidden')
}
function hiddenLoading(){
   document.querySelector('.loading-api-container').classList.add('loading-api-container-hidden')
}
getContent(currentPage)
