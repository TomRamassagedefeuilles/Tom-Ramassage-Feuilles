// FR default, EN toggle. Brand names customized per language.
// Form submission: uses Formspree if endpoint set; else falls back to mailto.

const FORMSPREE_ENDPOINT = ""; // e.g., "https://formspree.io/f/xxxxxx" (add later)

const dict = {
  fr: {
    brandName: "Tom ramassage de feuilles",
    navServices: "Services",
    navPricing: "Tarifs",
    navContact: "Contact",
    heroTitle: "Des feuilles en moins, du temps en plus.",
    heroLead: "Service rapide et soigné à Pincourt. Ramassage, mise en sacs, transport à l’écocentre. Abonnements hebdo / aux deux semaines.",
    ctaCall: "Appeler Tom",
    ctaQuote: "Obtenir un devis",
    point1: "Local et fiable",
    point2: "Tarifs clairs",
    point3: "Réponse sous 24 h",
    badgeAutumn: "Automne 2025",
    cardPitch: "Cour propre, planning flexible et service sans tracas.",
    servicesTitle: "Services",
    svc1: "<strong>Ramassage</strong> des feuilles (avant + arrière)",
    svc2: "<strong>Mise en sacs</strong> (sacs bruns)",
    svc3: "<strong>Transport à l’écocentre</strong> (option)",
    svc4: "<strong>Abonnements</strong> hebdo / bi‑hebdo",
    whyUsTitle: "Pourquoi moi ?",
    whyUsText: "Je suis local, ponctuel et transparent. Mon objectif : garder votre terrain propre tout l’automne.",
    pricingTitle: "Tarifs simples",
    sizeSmall: "Petit (≤ 250 m²)",
    sizeMedium: "Moyen (250–500 m²)",
    sizeLarge: "Grand (500–1000 m²)",
    perVisit: "/ visite",
    subSmall: "Abonnement : $35 / visite",
    subMed: "Abonnement : $50 / visite",
    subLarge: "Abonnement : $65 / visite",
    pricingNote: "Très grands terrains : prix sur devis. Transport à l’écocentre en option (+ selon volume).",
    contactTitle: "Contact",
    labelName: "Nom",
    labelEmail: "Courriel",
    labelMsg: "Message",
    send: "Envoyer",
    phone: "Téléphone",
    email: "Courriel",
    hours: "Disponibilités",
    hoursText: "Lun–Dim, 9h–18h",
    ctaFooter: "Envoyez-moi un message pour réserver votre première visite.",
    thankTitle: "Merci !",
    thankLead: "Votre message a bien été préparé. Vous pouvez revenir à l’accueil pendant que votre application de courriel s’ouvre.",
    backHome: "Revenir à l’accueil",
    mailtoNote: "En cliquant sur « Envoyer », votre application de courriel s’ouvrira avec un message prérempli adressé à <b>tom.ramassagedefeuilles@gmail.com</b>."
  },
  en: {
    brandName: "Tom’s Leaf Removal Service",
    navServices: "Services",
    navPricing: "Pricing",
    navContact: "Contact",
    heroTitle: "Fewer leaves, more free time.",
    heroLead: "Fast, thorough leaf removal in Pincourt. Pickup, bagging, eco‑centre drop‑off. Weekly or bi‑weekly subscriptions.",
    ctaCall: "Call Tom",
    ctaQuote: "Get a quote",
    point1: "Local & reliable",
    point2: "Clear pricing",
    point3: "Reply within 24h",
    badgeAutumn: "Autumn 2025",
    cardPitch: "Clean yard, flexible scheduling, no‑hassle service.",
    servicesTitle: "Services",
    svc1: "<strong>Pickup</strong> of fallen leaves (front & back)",
    svc2: "<strong>Bagging</strong> (brown paper bags)",
    svc3: "<strong>Eco‑centre drop‑off</strong> (optional)",
    svc4: "<strong>Subscriptions</strong> weekly / bi‑weekly",
    whyUsTitle: "Why me?",
    whyUsText: "Local, punctual, and transparent. My goal: keep your yard clean all autumn.",
    pricingTitle: "Simple pricing",
    sizeSmall: "Small (≤ 250 m²)",
    sizeMedium: "Medium (250–500 m²)",
    sizeLarge: "Large (500–1000 m²)",
    perVisit: "/ visit",
    subSmall: "Subscription: $35 / visit",
    subMed: "Subscription: $50 / visit",
    subLarge: "Subscription: $65 / visit",
    pricingNote: "Very large yards: custom quote. Eco‑centre drop‑off optional (+ depending on volume).",
    contactTitle: "Contact",
    labelName: "Name",
    labelEmail: "Email",
    labelMsg: "Message",
    send: "Send",
    phone: "Phone",
    email: "Email",
    hours: "Availability",
    hoursText: "Mon–Sun, 9am–6pm",
    ctaFooter: "Message me to book your first visit.",
    thankTitle: "Thank you!",
    thankLead: "Your message has been prepared. You can return home while your email app opens.",
    backHome: "Back to Home",
    mailtoNote: "When you click “Send”, your email app will open with a prefilled message addressed to <b>tom.ramassagedefeuilles@gmail.com</b>."
  }
};

const langToggle = document.getElementById('langToggle');
let currentLang = 'fr';

function applyLang(lang){
  const nodes = document.querySelectorAll('[data-i18n]');
  const map = dict[lang] || {};
  nodes.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(map[key]) el.innerHTML = map[key];
  });
  document.title = (lang==='fr') ? "Tom ramassage de feuilles – Pincourt" : "Tom’s Leaf Removal Service – Pincourt";
  document.documentElement.lang = lang;
  langToggle.textContent = (lang==='en') ? 'FR' : 'EN';
  currentLang = lang;
  try { localStorage.setItem('lang', lang); } catch(e){}
}

applyLang(localStorage.getItem('lang') || 'fr'); // default French, remember last
langToggle?.addEventListener('click', ()=> applyLang(currentLang==='fr'?'en':'fr'));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form handling
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if(FORMSPREE_ENDPOINT){
      try{
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        if(res.ok){
          status.textContent = (currentLang==='fr') ? "Merci ! Votre message a été envoyé." : "Thanks! Your message was sent.";
          form.reset();
        }else{
          throw new Error('Formspree error');
        }
      }catch(err){
        status.textContent = (currentLang==='fr') ? "Erreur d’envoi. Réessayez ou utilisez l’e‑mail." : "Send error. Please try again or use email.";
      }
    } else {
      // Mailto fallback to Tom's email
      const to = "tom.ramassagedefeuilles@gmail.com";
      const subj = encodeURIComponent((currentLang==='fr' ? "Nouvelle demande – Tom ramassage de feuilles" : "New inquiry – Tom’s Leaf Removal Service"));
      const body = encodeURIComponent((currentLang==='fr'
        ? `Nom: ${name}\nCourriel: ${email}\nMessage:\n${message}`
        : `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`));
      window.location.href = `mailto:${to}?subject=${subj}&body=${body}`;
      // Redirect to thank-you page after triggering mail app
      setTimeout(()=>{ window.location.assign("merci.html"); }, 400);
      status.textContent = (currentLang==='fr')
        ? "Ouverture de votre client e‑mail…"
        : "Opening your email client…";
    }
  });
}
