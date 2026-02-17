
 
const searchInput = document.querySelector(".search-input");
const animes = {
    
    jujutsu: "https://playerflixapi.com/serie/95479",
    firefox: "https://playerflixapi.com/serie/88046",
    dinastia_da_espada: "https://playerflixapi.com/serie/79594",
    tales_of_herding_god: "https://playerflixapi.com/serie/236534",
    tomb_raider: "https://playerflixapi.com/serie/117830",
    chainsaw_man: "https://playerflixapi.com/serie/114410",
    baki_hanma: "https://playerflixapi.com/serie/129600",
    castlevania: "https://playerflixapi.com/serie/71024",
    kaiju_no8: "https://playerflixapi.com/serie/207468",
    claymore: "https://playerflixapi.com/serie/34791",
    demon_slayer: "https://playerflixapi.com/serie/85937",
    o_exterminador_do_futuro: "https://playerflixapi.com/serie/239287",
    ajin: "https://playerflixapi.com/serie/65292",
    noblesse: "https://playerflixapi.com/serie/122870",
    rakshasa: "https://playerflixapi.com/serie/122870",
    wan_jie_xian_zong: "https://playerflixapi.com/serie/122870",
    solo_leveling: "https://playerflixapi.com/serie/122870",
    devil_may_cry: "https://playerflixapi.com/serie/122870",
    super_cubo: "https://playerflixapi.com/serie/122870",
    jujutsu_kaisen: "https://playerflixapi.com/serie/122870",   
    dragon_raja: "https://playerflixapi.com/serie/122870",
    one_piece: "https://playerflixapi.com/serie/37854",
    rurouni_kenshin: "https://playerflixapi.com/serie/210879",
    sakamoto_days: "https://playerflixapi.com/serie/210879",
    dr_stone: "https://playerflixapi.com/serie/86031",
    bleach: "https://playerflixapi.com/serie/30984",
    my_hero_academia: "https://playerflixapi.com/serie/65930",
    teogonia: "https://playerflixapi.com/serie/256109",
    afro_samurai: "https://playerflixapi.com/serie/19544",
    tougen_anki: "https://playerflixapi.com/serie/253811",
    nija_kamui: "https://playerflixapi.com/serie/202284",
    mashle_magia_musculo: "https://playerflixapi.com/serie/204832",
    mushoku_tensei: "https://playerflixapi.com/serie/94664",
    one_punch_man: "https://playerflixapi.com/serie/63926",
    dota_dragons_blood: "https://playerflixapi.com/serie/118956",
    the_king_avatar: "https://playerflixapi.com/serie/60833",
    attack_on_titan: "https://playerflixapi.com/serie/1429",
    cyberpunk: "https://playerflixapi.com/serie/105248",
    arifureta: "https://playerflixapi.com/serie/125794"
};

const isPagesDir = window.location.pathname.replace(/\\/g, "/").includes("/pages/");
const videoPage = isPagesDir ? "vidio.html" : "pages/vidio.html";

function abrirAnime(anime) {
    if (anime && animes[anime]) {
        window.location.href = `${videoPage}?anime=${encodeURIComponent(anime)}`;
    }
}

function carregarAnimeDoUrl() {
    const params = new URLSearchParams(window.location.search);
    const anime = params.get("anime");

    if (anime && animes[anime]) {
        document.getElementById("player").src = animes[anime];
    }
}

document.addEventListener("DOMContentLoaded", carregarAnimeDoUrl);

function pesquisarAnime() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (animes[query]) {
    window.location.href = `${videoPage}?anime=${encodeURIComponent(query)}`;
    return;
}

if (animes[queryNormalizado]) {
    window.location.href = `${videoPage}?anime=${encodeURIComponent(queryNormalizado)}`;
    return;
}

if (chaveEncontrada) {
    window.location.href = `${videoPage}?anime=${encodeURIComponent(chaveEncontrada)}`;
    return;
}
    // Busca com normalização de espaços e underscores
    const queryNormalizado = query.replace(/\s+/g, '_');
    if (animes[queryNormalizado]) {
        window.location.href = `${videoPage}?anime=${encodeURIComponent(queryNormalizado)}`;
        return;
    }
    
    // Busca parcial - encontra animes que contêm a palavra-chave
    const chaveEncontrada = Object.keys(animes).find(chave => 
        chave.includes(queryNormalizado) || queryNormalizado.includes(chave)
    );
    
    if (chaveEncontrada) {
        window.location.href = `${videoPage}?anime=${encodeURIComponent(chaveEncontrada)}`;
        return;
    }
    
    // Se nada foi encontrado
    const animesDisponiveis = Object.keys(animes).join(", ");
    alert(`Anime não encontrado!\n\nAnimes disponíveis:\n${animesDisponiveis}`);
}

// Permitir pesquisa ao pressionar Enter
if (searchInput) {
    searchInput.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            pesquisarAnime();
        }
    });
}

const form = document.getElementById('formComentario');
const sucessoMsg = document.getElementById('sucessoMsg');
const comentariosSection = document.getElementById('comentarios');

if (form && sucessoMsg && comentariosSection) {
    let comentariosList = document.getElementById('comentarios-list');
    if (!comentariosList) {
        comentariosList = document.createElement('div');
        comentariosList.id = 'comentarios-list';
        comentariosSection.appendChild(comentariosList);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

    // Simples validação
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const msg = form.mensagem.value.trim();

    if (!nome || !email || !msg) {
      alert('Por favor preencha todos os campos obrigatórios.');
      return;
    }

    // Aqui você enviaria o comentário para o servidor
    // Por enquanto mostramos mensagem de sucesso:
        const comentario = document.createElement('div');
        comentario.classList.add('comentario');

        const data = new Date().toLocaleString("pt-BR");
        const inicial = nome.charAt(0).toUpperCase() || "?";

        comentario.innerHTML = `
            <div class="comentario-avatar" aria-hidden="true">${inicial}</div>
            <div class="comentario-body">
                <p class="comentario-meta"><strong>${nome}</strong> (${email}) - ${data}</p>
                <p>${msg}</p>
            </div>
        `;

        comentariosList.prepend(comentario);
        sucessoMsg.style.display = 'block';
        form.reset();
        setTimeout(() => {
            sucessoMsg.style.display = 'none';
        }, 3000);
    });
}




