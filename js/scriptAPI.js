const baseURL = 'https://newsapi.org/v2'

const TITLE_LIMIT = 44
const TEXT_LIMIT = 88
let currentPage = 1

const NEXT_BTN = document.querySelector('#article-next-btn')

async function getContent(page) {
    const params1 = new URLSearchParams({
        category: "technology",
        country: "us",
        apiKey: "01592e9ed78f449892d618c97de3de53",
        page: page
    })
    const params2 = new URLSearchParams({
        category: "entertainment",
        country: "us",
        apiKey: "01592e9ed78f449892d618c97de3de53"
    })
    const params3 = new URLSearchParams({
        category: "business",
        country: "us",
        apiKey: "01592e9ed78f449892d618c97de3de53"
    })

    const [responseTech, responseEnter, responseBusi] = await Promise.all([
        fetch(`${baseURL}/top-headlines?${params1.toString()}`),
        fetch(`${baseURL}/top-headlines?${params2.toString()}`),
        fetch(`${baseURL}/top-headlines?${params3.toString()}`)
    ])
    if(responseTech.status === 200){
        const dataOBJ = await responseTech.json()

        const NEWS_P = [...document.querySelectorAll('#news-p')]
        const NEWS_TITLE = [...document.querySelectorAll('#news-title')]
        const NEWS_AUTHOR = [...document.querySelectorAll('#news-author')]
        const NEWS_DATETIME = [...document.querySelectorAll('#news-datetime')]
        const NEWS_READ_MORE = [...document.querySelectorAll('#news-read-more')]
        const NEWS_THUMB_IMAGE = [...document.querySelectorAll('#news-thumb-image')]

        NEWS_TITLE.forEach((ele, index)=>{
            if(dataOBJ.articles[index]){
                const fullTitle = dataOBJ.articles[index].title || 'Title unavailable'
                const truncatedTitle = fullTitle.length > TITLE_LIMIT ? fullTitle.substr(0, TITLE_LIMIT) + '...' : fullTitle
                ele.innerHTML = truncatedTitle
            }
        })
        NEWS_P.forEach((ele, index)=>{
            if(dataOBJ.articles[index]){
                const fullText = dataOBJ.articles[index].description || 'Text unavailable'
                const truncatedText = fullText.length > TEXT_LIMIT ? fullText.substr(0, TEXT_LIMIT) + '...' : fullText
                ele.innerHTML = truncatedText
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
                    ele.setAttribute('src', dataOBJ.articles[index].urlToImage)
                    ele.setAttribute('alt', 'news image')
                } else {
                    ele.setAttribute('src', `https://static.vecteezy.com/ti/vetor-gratis/p1/13149674-icone-de-imagem-indisponivel-em-moderno-estilo-plano-isolado-no-fundo-branco-simbolo-da-galeria-de-fotos-para-aplicativos-web-e-moveis-gratis-vetor.jpg`)
                }
            }
        })
        console.log(dataOBJ.articles)
    }
    if(responseEnter.status === 200){
        const dataOBJ = await responseEnter.json()

        const ASIDE_NEWS_TITLE = [...document.querySelectorAll('#aside-news-title')]
        const ASIDE_NEWS_DATETIME = [...document.querySelectorAll('#aside-news-datetime')]
        const ASIDE_NEWS_THUMB_IMAGE = [...document.querySelectorAll('#aside-news-thumb-image')]

        handleAsideContent(ASIDE_NEWS_TITLE, ASIDE_NEWS_DATETIME, ASIDE_NEWS_THUMB_IMAGE, dataOBJ)
    }
    if(responseBusi.status === 200){
        const dataOBJ = await responseBusi.json()

        const FOOTER_NEWS_TITLE = [...document.querySelectorAll('#footer-news-title')]
        const FOOTER_NEWS_DATETIME = [...document.querySelectorAll('#footer-news-datetime')]
        const FOOTER_NEWS_THUMB_IMAGE = [...document.querySelectorAll('#footer-news-thumb-image')]

        handleAsideContent(FOOTER_NEWS_TITLE, FOOTER_NEWS_DATETIME, FOOTER_NEWS_THUMB_IMAGE, dataOBJ)
    }
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
            } else {
                ele.setAttribute('src', `https://static.vecteezy.com/ti/vetor-gratis/p1/13149674-icone-de-imagem-indisponivel-em-moderno-estilo-plano-isolado-no-fundo-branco-simbolo-da-galeria-de-fotos-para-aplicativos-web-e-moveis-gratis-vetor.jpg`)
            }
        }
    })
}

NEXT_BTN.addEventListener('click', ()=>{
    currentPage++
    getContent(currentPage)
})

getContent(currentPage)
