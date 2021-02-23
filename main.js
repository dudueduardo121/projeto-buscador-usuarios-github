// funcão evita o acesso externo manual do usuario
(function(){
    const search = document.getElementById('search');
    const profile = document.getElementById('profile');

    // Pega api github junto com cliente id e o cliente secret da minha conta do git
    const url = "https://api.github.com/users";
    const client_id = "Iv1.7c32d1a29cf178c0";
    const client_secret = "0c65d571cd1578f734b49197ec93ed3377e11a20";
    const count = 7;
    const sort = "created: asc"

    async function getUser(user){
        const profileRresponse = await fetch(
            `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
        );

        const reposRresponse = await fetch(
            `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
        );

        const profile = await profileRresponse.json();
        const repos = await reposRresponse.json();

        return { profile, repos };
    }

    function showProfile(user){
        profile.innerHTML = `
            <div class="row mt-3">
                <div class="col-md-4">
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="${user.avatar_url}" alt="">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Repositórios: <span class="badge badge-success">${user.public_repos}</span></li>
                            <li class="list-group-item">Seguidores: <span class="badge badge-primary">${user.followers}</span></li>
                            <li class="list-group-item">Seguindo: <span class="badge badge-info">${user.following}</span></li>
                        </ul>
                        <div class="card-body">
                            <a href="${user.html_url}" target="_blank" class="btn btn-warning btn-block">Ver perfil</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div id="repos"></div>
                </div>
            </div>`;
    }

    function showRepositorios(repos){
        let output = '';

        repos.forEach(repo =>{
            output += `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-6"><a href="${repo.html_url}" target="_blank">${repo.name}</a></div>
                    <div class="col-md-6  p-2">
                        <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                        <span class="badge badge-success">Watch: ${repo.watchers_count}</span>
                        <span class="badge badge-danger">Forks: ${repo.forks_count}</span>
                    </div>
                </div>
            </div>
            `
        });

        document.getElementById("repos").innerHTML = output;
    }

    search.addEventListener('keyup', (e)=>{
        const user = e.target.value;

        if(user.length > 0){
            getUser(user).then(res => {
                showProfile(res.profile);
                showRepositorios(res.repos);
            });
        }

    });

})();
