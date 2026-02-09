
 

const animes = {
    naruto: "https://playerflixapi.com/serie/289422",
    onepiece: "https://playerflixapi.com/serie/97582CE",
    bleach: "https://playerflixapi.com/serie/BLEACH_LINK",
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
    ajin: "khttps://playerflixapi.com/serie/65292",
    noblesse: "https://playerflixapi.com/serie/122870" 
};

function abrirAnime(anime) {
    if (anime && animes[anime]) {
        window.location.href = `pages/vidio.html?anime=${encodeURIComponent(anime)}`;
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
