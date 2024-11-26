// Navegação suave ao clicar nos links do menu
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 50, // Ajusta para deixar um pouco abaixo do cabeçalho
            behavior: 'smooth'
        });
    });
});

// Botão "Voltar ao topo"
const backToTopButton = document.createElement('button');
backToTopButton.textContent = '↑';
backToTopButton.setAttribute('id', 'back-to-top');
document.body.appendChild(backToTopButton);

// Estilo para o botão (você pode transferir para o CSS se preferir)
backToTopButton.style.position = 'fixed';
backToTopButton.style.bottom = '20px';
backToTopButton.style.right = '20px';
backToTopButton.style.padding = '10px';
backToTopButton.style.border = 'none';
backToTopButton.style.borderRadius = '50%';
backToTopButton.style.background = '#2575fc';
backToTopButton.style.color = 'white';
backToTopButton.style.cursor = 'pointer';
backToTopButton.style.display = 'none';
backToTopButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

// Mostrar/esconder botão de "Voltar ao topo"
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Evento de clique no botão "Voltar ao topo"
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animação de fade-in para as seções ao rolar a página
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    section.classList.add('hidden'); // Adicione a classe inicial escondida
    observer.observe(section);
});

// Função para buscar repositórios do GitHub
async function fetchGitHubProjects() {
    try {
        const username = 'antoniilucas'; // Substitua pelo seu nome de usuário no GitHub
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar repositórios.');
        }

        const repos = await response.json();

        const portfolioGrid = document.querySelector('.portfolio-grid');
        repos.forEach(repo => {
            // Cria o elemento para cada repositório
            const repoItem = document.createElement('div');
            repoItem.classList.add('portfolio-item');

            repoItem.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "Sem descrição disponível."}</p>
                <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
            `;
            portfolioGrid.appendChild(repoItem);
        });
    } catch (error) {
        console.error(error);
        alert("Não foi possível carregar os projetos do GitHub.");
    }
}

// Chama a função ao carregar a página
fetchGitHubProjects();
