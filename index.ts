
// Interfacce 
interface IProfessionistaMedia {
    nome: string;
    cognome: string;
    specializzazione: string;
    esperienza: number;
    interessi: string[];

    partecipaProgramma(programma: IProgrammaFormazione): void;
}

interface IProgrammaFormazione {
    titolo: string;
    descrizione: string;
    specializzazione: string;
    durata: number; 
    elencoPartecipanti: IProfessionistaMedia[];

    aggiungiPartecipante(professionista: IProfessionistaMedia): void;   
}

interface IPiattaforma {
    nome: string;
    tipo: string; 
    descrizione: string;
    categorieContenuto: string[];

    pubblicaContenuto(professionista: IProfessionistaMedia, categorieContenuto: string): void;
}

// Classi
class ProfessionistaMedia implements IProfessionistaMedia {

    nome: string;
    cognome: string;
    specializzazione: string;
    esperienza: number;
    interessi: string[];

    constructor(nome: string, cognome: string, specializzazione: string, esperienza: number, interessi: string[]) {
        this.nome = nome;
        this.cognome = cognome;
        this.specializzazione = specializzazione;
        this.esperienza = esperienza;
        this.interessi = interessi;
    }

    partecipaProgramma(programma: IProgrammaFormazione): void {
        programma.aggiungiPartecipante(this);
    }   
}

class ProgrammaFormazione implements IProgrammaFormazione {
    titolo: string;
    descrizione: string;
    specializzazione: string;
    durata: number; 
    elencoPartecipanti: IProfessionistaMedia[];

    constructor(titolo: string, descrizione: string, specializzazione: string, durata: number) {
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.specializzazione = specializzazione;
        this.durata = durata;
        this.elencoPartecipanti = [];
    }

    aggiungiPartecipante(professionista: IProfessionistaMedia): void {
        this.elencoPartecipanti.push(professionista);
    }
}

class Piattaforma implements IPiattaforma {
    nome: string;
    tipo: string; 
    descrizione: string;
    categorieContenuto: string[];
    pubblicazioni: string[];

    constructor(nome: string, tipo: string, descrizione: string, categorieContenuto: string[]) {
        this.nome = nome;
        this.tipo = tipo;
        this.descrizione = descrizione;
        this.categorieContenuto = categorieContenuto;
        this.pubblicazioni = [];
    }

    pubblicaContenuto(professionista: IProfessionistaMedia, contenuto: string): void {
        const messaggio = `${professionista.nome} ${professionista.cognome}: ${contenuto}`;
        this.pubblicazioni.push(messaggio); 
        console.log(`Pubblicato su ${this.nome}: ${messaggio}`);
    }
}   

// Istanziazione
const professionista1 = new ProfessionistaMedia('Joan', 'Didion', 'Giornalismo', 3, ['scrittura', 'politica']);
const professionista2 = new ProfessionistaMedia('Agnès', 'Varda', 'Regia', 5, ['fotografia', 'arte']);
const professionista3 = new ProfessionistaMedia('Anna', 'Karina', 'Attrice', 7, ['canto', 'moda']);


const programma1 = new ProgrammaFormazione('Scrittura giornalistica', 'Lezioni di scrittura', 'Giornalismo', 15);
const programma2 = new ProgrammaFormazione('Nouvelle Vague', "Programma volto all'analisi dei media, in particolare della filmografia francese degli anni 50 ", 'Regia', 20);
const programma3 = new ProgrammaFormazione('Recitazione', 'Corso di recitazione per donne', 'recitazione', 25);


professionista1.partecipaProgramma(programma1);
professionista2.partecipaProgramma(programma1);
professionista1.partecipaProgramma(programma2);
professionista2.partecipaProgramma(programma2);
professionista3.partecipaProgramma(programma2);
professionista3.partecipaProgramma(programma3);


const piattaforma1 = new Piattaforma('Rivolta femminile', 'gruppo separatista romano', "Gruppo per promuovere lo sviluppo dell'autocoscienza femminile", ['pubblicazione', 'articoli giornalistici']);
const piattaforma2 = new Piattaforma('Herstory', 'online', 'Sito per la diffusione di storie riguardanti il ruolo che le donne hanno ricoperto nella storia ', ['storia', 'politica']);
const piattaforma3 = new Piattaforma('Scrittrici', 'podcast', 'conversazioni sulle opere di scrittrici donne', ['libri']);

// Pubblicazione dei contenuti
piattaforma1.pubblicaContenuto(professionista1, 'Articolo sul separatismo');
piattaforma1.pubblicaContenuto(professionista2, "Analisi del male gaze");
piattaforma2.pubblicaContenuto(professionista1, "Intervista sul ruolo delle donne durante le guerre");
piattaforma2.pubblicaContenuto(professionista3, "Reel sulle attrici più influenti");
piattaforma3.pubblicaContenuto(professionista1, 'Conversazioni sulle sorelle Brontë');



// DOM 
function render() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <h1>Voci</h1>

    <h2>Professioniste</h2>
    <ul>
  ${[professionista1, professionista2, professionista3]
    .map(p => `
      <li>
        <strong>${p.nome} ${p.cognome}</strong> 
        <br>
        ${p.specializzazione} (${p.esperienza} anni di esperienza) 
        <br>
        Interessi: ${p.interessi.join(", ")}
      </li>
    `)
    .join("")}
</ul>


    <h2>Programmi di Formazione</h2>
    <ul>
      ${[programma1, programma2, programma3]
        .map(p => `
          <li>
            <strong>${p.titolo}</strong>: ${p.descrizione} 
            <br>
            (durata: ${p.durata} giorni, partecipanti: ${p.elencoPartecipanti.length})
          </li>
        `)
        .join("")}
    </ul>

    <h2>Piattaforme</h2>
    <ul>
      ${[piattaforma1, piattaforma2, piattaforma3]
        .map(p => `
          <li>
            <strong>${p.nome}</strong>. Tipo: ${p.tipo}; categorie: ${p.categorieContenuto.join(", ")}
            ${p.pubblicazioni.length > 0 ? `
              <h3 style="font-size:1rem; margin-top:0.5rem;">Pubblicazioni sulle piattaforme:</h3>
              <ul>
                ${p.pubblicazioni.map(pub => `<li>${pub}</li>`).join("")}
              </ul>
            ` : ""}
          </li>
        `)
        .join("")}
    </ul>
  `;
}

render();

