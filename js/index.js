function getSearchResults(event){
    event.preventDefault()
    let searchedUser = document.getElementById('search').value
    let userList = document.querySelector('#user-list')
    let repoList = document.querySelector('#repos-list')
    fetch(`https://api.github.com/search/users?q=${searchedUser}`)
    .then(res => res.json())
    .then(data => {
        let results = data.items
        results.forEach( result => {
            let userResult = document.createElement('li')
            userResult.innerHTML = `
                <img height="200px" alt='${result.login}' src='${result.avatar_url}'>
                <p>${result.login}</p>
                <a href='${result.html_url}'>View profile</a>
                <br><br>
                `
            userResult.style.fontFamily = 'arial'
            userResult.style.fontSize = '18px'
            userResult.style.marginLeft = '30px'
            userResult.style.cursor = 'pointer'
            userList.appendChild(userResult)
            let repoButton = document.createElement('button')
            userResult.appendChild(repoButton)
            repoButton.innerHTML = 'View repos'
            repoButton.onclick = () => {
                fetch(`https://api.github.com/users/${result.login}/repos`)
                .then(res=>res.json())
                .then(repos => {
                    repos.map(repo => {
                        let repoResult = document.createElement('li')
                        repoResult.innerHTML = `
                            <p>${repo.name}</p>
                            <p>Created on ${repo.created_at}</p>
                            <p>${repo.visibility}</p>
                            <br><br>
                            `
                        repoResult.style.fontFamily = 'arial'
                        repoResult.style.fontSize = '18px'
                        repoResult.style.marginLeft = '30px'
                        repoResult.style.cursor = 'pointer'
                        repoList.appendChild(repoResult) 
                    }) 
                })
            }
        })
    })
}

let form = document.querySelector('form')
form.addEventListener('submit', getSearchResults)