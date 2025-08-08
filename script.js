// script.js - improved dynamic rendering, language toggle, search, likes, favorites, clock
const STORIES = [
  {"id":1,"title_en":"The Wise Man and the Complainer","title_fa":"مرد دانا و شاکی","summary_en":"A man keeps complaining to a wise elder. The elder shows him the foolishness of repeating the same complaint without action.","summary_fa":"مردی مرتب به یک پیر دانا شکایت می‌کند. پیر به او نشان می‌دهد که تکرار شکایت بدون عمل بی‌فایده است.","image":"images/story1.png","theme":"wisdom"},
  {"id":2,"title_en":"The Donkey in the Lion's Skin","title_fa":"خر در پوست شیر","summary_en":"A donkey wears a lion's skin and fools others until he brays and reveals the truth.","summary_fa":"خر پوست شیر به تن می‌کند و دیگران را فریب می‌دهد تا زمانی که با نعره‌اش حقیقت را آشکار می‌کند.","image":"images/story2.png","theme":"truth"},
  {"id":3,"title_en":"The Farmer and the Golden Eggs","title_fa":"کشاورز و تخم مرغ‌های طلایی","summary_en":"A farmer kills his goose that lays golden eggs hoping to get rich faster, but loses everything.","summary_fa":"کشاورز غاز تخم‌گذار طلایی‌اش را می‌کشد تا سریع‌تر ثروتمند شود اما همه چیز را از دست می‌دهد.","image":"images/story3.png","theme":"greed"},
  {"id":4,"title_en":"The Falcon and the Broken Wing","title_fa":"باز شکسته و شاهین","summary_en":"One falcon soared, the other refused to fly — and no one knew why. Sometimes silence hides strength.","summary_fa":"یکی از شاهین‌ها پرواز می‌کند، دیگری پرواز نمی‌کند — و هیچ‌کس نمی‌داند چرا. گاهی سکوت قدرت پنهان است.","image":"images/story4.png","theme":"silence"},
  {"id":5,"title_en":"The Mountain, the River, and the Two Travelers","title_fa":"کوه، رود و دو مسافر","summary_en":"Two travelers take different paths up a mountain and learn that peace comes from the journey, not the ease of the way.","summary_fa":"دو مسافر مسیرهای مختلفی به کوه می‌روند و می‌آموزند آرامش از سفر است، نه از آسانی راه.","image":"images/story5.png","theme":"journey"},
  {"id":6,"title_en":"Aaron’s Journey","title_fa":"سفر آرون","summary_en":"Aaron took the easy river path but got lost because it never led to the mountain’s peak.","summary_fa":"آرون مسیر آسان رودخانه را رفت اما گم شد چون هرگز به قله کوه نرسید.","image":"images/story6.png","theme":"choice"},
  {"id":7,"title_en":"Elias’s Journey","title_fa":"سفر الیاس","summary_en":"Elias chose the hard path and gained wisdom through his challenges and kindness.","summary_fa":"الیاس مسیر سخت را انتخاب کرد و از طریق چالش‌ها و مهربانی خرد گرفت.","image":"images/story7.png","theme":"growth"},
  {"id":8,"title_en":"The Truth Revealed","title_fa":"حقیقت آشکار شده","summary_en":"The quiet falcon flew when it mattered most — proving that true strength is silent and purposeful.","summary_fa":"شاهین ساکت وقتی که مهم بود پرواز کرد — ثابت کرد که قدرت واقعی سکوت و هدفمندی است.","image":"images/story8.png","theme":"truth"},
  {"id":9,"title_en":"Saadi and the King’s Mirror","title_fa":"سعدی و آینه پادشاه","summary_en":"Saadi told a vain king that mirrors reveal flaws, not just beauty.","summary_fa":"سعدی به پادشاهی خودخواه گفت که آینه‌ها فقط زیبایی را نشان نمی‌دهند بلکه نقص‌ها را نیز آشکار می‌کنند.","image":"images/story9.png","theme":"truth"},
  {"id":10,"title_en":"Behlul and the Marble Palace","title_fa":"بهلول و قصر مرمری","summary_en":"Behlul shatters the pride of the caliph and his marble palace with a bitter phrase about the fleeting nature of life.","summary_fa":"بهلول با یک جمله‌ی تلخ درباره ناپایداری عمر انسان، غرور خلیفه و شکوه قصر مرمری‌اش را در هم می‌شکند.","image":"images/story10.png","theme":"humility"},
  {"id":11,"title_en":"Mulla Nasruddin Buys a Donkey","title_fa":"ملا نصرالدین خر می‌خرد","summary_en":"Mulla Nasruddin buys and sells the same donkey multiple times in one day, returning home rich without ever owning it.","summary_fa":"ملا نصرالدین با خرید و فروش چندباره‌ی یک خر در یک روز، بدون داشتن خر، با جیب پر از طلا به خانه بازمی‌گردد.","image":"images/story11.png","theme":"wit"},
  {"id":12,"title_en":"Behlul and the Man with a Sack of Gold","title_fa":"بهلول و مرد با کیسه طلا","summary_en":"Behlul teaches a merchant who lost his gold that true wealth is what stays with us, not what suddenly disappears.","summary_fa":"بهلول به بازرگانی که طلاهایش را گم کرده می‌فهماند که ثروت واقعی آن چیزی‌ست که با ما می‌ماند.","image":"images/story12.png","theme":"wealth"},
  {"id":13,"title_en":"Mulla Nasruddin and the Judge","title_fa":"ملا نصرالدین و قاضی","summary_en":"Mulla escapes punishment by humorously claiming to \"return a coat mentally\" to the judge.","summary_fa":"ملا با ادعای \"بازگرداندن کت به‌صورت ذهنی\" قاضی را می‌خنداند و از مجازات می‌گریزد.","image":"images/story13.png","theme":"justice"},
  {"id":14,"title_en":"The Fire and the Clay","title_fa":"آتش و گل","summary_en":"Fire mocks clay, but learns clay’s humble service to humanity is lasting and valuable.","summary_fa":"آتش با تمسخر گل شروع می‌کند، اما می‌فهمد که گل ساده، خدمتی بی‌ادعا ولی ماندگار به بشر می‌کند.","image":"images/story14.png","theme":"humility"},
  {"id":15,"title_en":"The Three Doors of Speech","title_fa":"سه دروازه گفتار","summary_en":"Every speech must pass through three gates: truth, necessity, and kindness—or better remain silent.","summary_fa":"هر سخنی باید از سه دروازه عبور کند: حقیقت، ضرورت، و مهربانی—وگرنه بهتر است خاموش ماند.","image":"images/story15.png","theme":"speech"},
  {"id":16,"title_en":"The Silent Sage","title_fa":"حکیم خاموش","summary_en":"A sage teaches that silence sometimes speaks louder than words.","summary_fa":"حکیمی می‌آموزد که سکوت گاهی از کلمات بلندتر سخن می‌گوید.","image":"images/story16.png","theme":"silence"},
  {"id":17,"title_en":"The Uninvited Guest","title_fa":"مهمان ناخوانده","summary_en":"A stranger comes to Mullah's house asking to stay, but receives a clever response.","summary_fa":"غریبه‌ای به خانه ملا می‌آید و درخواست اقامت می‌کند؛ اما پاسخ هوشمندانه ملا شنیدنی است.","image":"images/story17.jpg","theme":"wit"},
  {"id":18,"title_en":"Mullah's Unforgettable Beauty","title_fa":"زیبایی فراموش‌نشدنی ملا","summary_en":"Mullah claims he was once so beautiful that no one could forget him — until they ask for proof.","summary_fa":"ملا نصرالدین می‌گوید زمانی آن‌قدر زیبا بوده که هیچ‌کس او را فراموش نمی‌کرد — تا وقتی که از او مدرک می‌خواهند!","image":"images/story18.jpg","theme":"humor"},
  {"id":19,"title_en":"Mulla's Magical Stone Soup","title_fa":"سوپ سنگ جادویی ملا","summary_en":"Mulla tricks a stingy villager into making delicious soup — starting with just a stone!","summary_fa":"ملا نصرالدین روستایی خسیس را فریب می‌دهد تا با یک سنگ، سوپی خوشمزه درست کند!","image":"images/story19.jpg","theme":"sharing"},
  {"id":20,"title_en":"Mulla's Sweet Dream","title_fa":"رویای شیرین ملا","summary_en":"Mulla wakes angry from a dream where he lost a bag of gold—and blames the dream thief!","summary_fa":"ملا نصرالدین از خواب بیدار می‌شود و عصبانی‌ست چون در خواب کیسه طلایش را دزدیده‌اند—و همچنان دزد خواب را سرزنش می‌کند!","image":"images/story20.jpg","theme":"absurdity"},
  {"id":21,"title_en":"Bahlul's Wisdom: The House on Water","title_fa":"حکمت بهلول: خانه‌ای روی آب","summary_en":"Bahlul tells a greedy man he can build him a house—on water! A lesson on chasing illusions.","summary_fa":"بهلول به مردی طماع قول می‌دهد که برایش خانه‌ای روی آب بسازد! درسی هوشمندانه درباره دنبال کردن خیال‌ها.","image":"images/story21.jpg","theme":"illusion"},
  {"id":22,"title_en":"Behlul and the Bowl Makers","title_fa":"بهلول و کاسه‌سازها","summary_en":"Behlul mocks craftsmen making hundreds of bowls no one needs.","summary_fa":"بهلول به گروهی از صنعت‌گران که صدها کاسه بی‌مصرف می‌سازند طعنه می‌زند.","image":"images/story22.jpg","theme":"purpose"},
  {"id":23,"title_en":"Navigating the Tempest: A King's Lesson","title_fa":"عبور از طوفان: درس پادشاه","summary_en":"During a violent sea storm, a humble sailor teaches the terrified king about faith and surrender.","summary_fa":"در میانه طوفانی سهمگین، یک ملوان فروتن به پادشاه هراسان درسی درباره ایمان و رهایی می‌دهد.","image":"images/story23.jpg","theme":"faith"},
  {"id":24,"title_en":"The Just King","title_fa":"پادشاه عادل","summary_en":"A wise king's fairness wins the hearts of even his enemies.","summary_fa":"پادشاهی دانا می‌گفت: «عدالت پایه فرمانروایی است.» انصاف او دل دشمنانش را هم به‌دست آورد.","image":"images/story24.jpg","theme":"justice"},
  {"id":25,"title_en":"Mulla's Unexpected Gratitude","title_fa":"تشکر غیرمنتظره ملا","summary_en":"When a thief robs Mulla, he thanks him—for reminding him how little he truly needs.","summary_fa":"وقتی دزدی اموال ملا را می‌برد، او شگفت‌انگیزانه از او تشکر می‌کند.","image":"images/story25.jpg","theme":"gratitude"},
  {"id":26,"title_en":"Nasruddin's Shoe","title_fa":"کفش ملا نصرالدین","summary_en":"Mulla loses one shoe in the river and explains why he threw the other in.","summary_fa":"ملا یکی از کفش‌هایش را در رودخانه گم می‌کند. وقتی می‌پرسند چرا دومی را هم انداخت، می‌گوید: «یکی بدون دیگری چه فایده‌ای دارد؟»","image":"images/story26.jpg","theme":"logic"},
  {"id":27,"title_en":"Behlul and the Ephemeral Palace","title_fa":"بهلول و قصر ناپایدار","summary_en":"Behlul laughs at a king's new palace, calling it “a house made of sand in a storm.”","summary_fa":"بهلول به قصر تازه‌ساخته‌شده‌ی شاه می‌خندد و آن را «خانه‌ای از شن در طوفان» می‌نامد.","image":"images/story27.jpg","theme":"detachment"},
  {"id":28,"title_en":"Behlul's Golden Lesson","title_fa":"درس طلایی بهلول","summary_en":"Behlul gives away a gold coin to a beggar, then mocks a rich man who wouldn’t give even a smile.","summary_fa":"بهلول یک سکه طلا به گدایی می‌دهد و سپس ثروتمندی را که حتی لبخندی نمی‌دهد، سرزنش می‌کند.","image":"images/story28.jpg","theme":"generosity"},
  {"id":29,"title_en":"The King's Disguise","title_fa":"لباس مبدل پادشاه","summary_en":"A king dresses as a commoner to learn how his people truly live.","summary_fa":"پادشاهی برای شناخت واقعی مردمش، لباس ساده به تن می‌کند و درمی‌یابد که در میان فقرا، صداقت شگفت‌انگیزی وجود دارد.","image":"images/story29.jpg","theme":"leadership"},
  {"id":30,"title_en":"The King's Wisdom","title_fa":"حکمت پادشاه","summary_en":"When an advisor suggests cruelty, the wise king replies: “Let truth be my mirror, not my enemy.”","summary_fa":"وقتی مشاوری پیشنهاد می‌دهد برای ساکت کردن منتقدان خشونت به کار ببرند، پادشاه حکیم پاسخ می‌دهد.","image":"images/story30.jpg","theme":"truth"}
];

// ---------- Utilities ----------
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const isFarsiDefault = true;
let isFarsi = isFarsiDefault;

// ---------- Clock ----------
function startClock(){
  const clockEl = $('#clock');
  if(!clockEl) return;
  function update(){
    const now = new Date();
    if(isFarsi){
      // Persian locale display if available
      clockEl.textContent = now.toLocaleString('fa-IR', {weekday:'short',year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
    } else {
      clockEl.textContent = now.toLocaleString('en-US', {weekday:'short',year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
    }
  }
  update(); setInterval(update, 1000);
}

// ---------- Persistence ----------
function getLikes(id){ return parseInt(localStorage.getItem('like-'+id)) || 0;}
function setLikes(id,v){ localStorage.setItem('like-'+id, String(v));}
function toggleFav(id){
  const favs = JSON.parse(localStorage.getItem('favs')||'[]');
  const idx = favs.indexOf(id);
  if(idx>=0){ favs.splice(idx,1);} else { favs.push(id); }
  localStorage.setItem('favs', JSON.stringify(favs));
  renderStories();
}
function isFav(id){ const favs = JSON.parse(localStorage.getItem('favs')||'[]'); return favs.indexOf(id) >= 0;}

// ---------- Render ----------
function createCard(story){
  const card = document.createElement('a');
  card.href = `story${story.id}.html`;
  card.className = 'card';
  card.setAttribute('data-id', story.id);
  const img = document.createElement('img');
  img.src = story.image;
  img.alt = isFarsi ? story.title_fa : story.title_en;
  img.loading = 'lazy';
  card.appendChild(img);

  const body = document.createElement('div');
  body.className = 'card-body';
  const title = document.createElement('h3');
  title.textContent = isFarsi ? story.title_fa : story.title_en;
  body.appendChild(title);

  const p = document.createElement('p');
  p.innerHTML = isFarsi ? story.summary_fa : story.summary_en;
  body.appendChild(p);

  const meta = document.createElement('div');
  meta.className = 'meta';

  const badge = document.createElement('div');
  badge.className = 'badge';
  badge.textContent = story.theme;
  meta.appendChild(badge);

  const actions = document.createElement('div');
  actions.className = 'actions';
  // like
  const likeBtn = document.createElement('button');
  likeBtn.className = 'icon-like';
  likeBtn.setAttribute('aria-pressed','false');
  likeBtn.textContent = `👍 ${getLikes(story.id)}`;
  
  const likedKey = 'liked-' + story.id;
  const hasLiked = localStorage.getItem(likedKey) === '1';
  likeBtn.disabled = hasLiked;
  likeBtn.textContent = hasLiked ? `❤️ ${getLikes(story.id)}` : `👍 ${getLikes(story.id)}`;
  likeBtn.addEventListener('click', () => {
    if (!localStorage.getItem(likedKey)) {
      const n = getLikes(story.id) + 1;
      setLikes(story.id, n);
      localStorage.setItem(likedKey, '1');
      likeBtn.textContent = `❤️ ${n}`;
      likeBtn.disabled = true;
    }
  });

  actions.appendChild(likeBtn);

  // fav
  const favBtn = document.createElement('button');
  favBtn.className = 'icon-fav';
  favBtn.title = 'ذخیره';
  favBtn.textContent = isFav(story.id) ? '★ ذخیره‌شده' : '☆ ذخیره';
  favBtn.addEventListener('click',()=>{
    toggleFav(story.id);
  });
  actions.appendChild(favBtn);

  meta.appendChild(actions);
  body.appendChild(meta);

  card.appendChild(body);
  return card;
}

function renderStories(filterText=''){
  const container = $('#stories');
  container.innerHTML = '';
  const list = STORIES.slice();

  // apply search
  const q = filterText.trim().toLowerCase();
  let filtered = list.filter(s=>{
    const t = (isFarsi ? s.title_fa + ' ' + s.summary_fa : s.title_en + ' ' + s.summary_en).toLowerCase();
    return !q || t.includes(q);
  });

  // apply filter select
  const sel = $('#filterSelect').value;
  if(sel === 'popular'){
    filtered.sort((a,b)=> getLikes(b.id)-getLikes(a.id));
  } else if(sel === 'recent'){
    filtered = filtered.slice().reverse();
  } else if(sel === 'theme-wise'){
    filtered = filtered.filter(s=>s.theme === 'wisdom' || s.theme === 'truth');
  }

  // render
  filtered.forEach(s=>{
    const c = createCard(s);
    container.appendChild(c);
  });

  // populate favorites section
  renderFavorites();
}

function renderFavorites(){
  const favContainer = $('#favorites');
  const favs = JSON.parse(localStorage.getItem('favs')||'[]');
  if(!favs.length){ favContainer.classList.add('hidden'); favContainer.setAttribute('aria-hidden','true'); return; }
  favContainer.classList.remove('hidden'); favContainer.setAttribute('aria-hidden','false');
  favContainer.innerHTML = '';
  favs.forEach(id=>{
    const story = STORIES.find(s=>s.id===id);
    if(story) favContainer.appendChild(createCard(story));
  });
}

// ---------- Language toggle ----------
function setLanguage(fa){
  isFarsi = !!fa;
  document.documentElement.lang = isFarsi ? 'fa' : 'en';
  document.documentElement.dir = isFarsi ? 'rtl' : 'ltr';
  // update titles and placeholders
  $('#main-title').textContent = isFarsi ? 'داستان‌های پندآموز' : 'English Moral Stories';
  $('#subtitle').textContent = isFarsi ? 'داستان‌های کوتاه با درس‌های ارزشمند زندگی' : 'Short stories with valuable life lessons';
  $('#searchBox').placeholder = isFarsi ? '🔍 جستجوی داستان...' : '🔍 Search stories...';
  $('#nav-home').textContent = isFarsi ? 'خانه' : 'Home';
  $('#nav-stories').textContent = isFarsi ? 'داستان‌ها' : 'Stories';
  $('#nav-fav').textContent = isFarsi ? 'محبوب‌ها' : 'Favorites';
  $('#nav-contact').textContent = isFarsi ? 'تماس' : 'Contact';
  $('#nav-support').textContent = isFarsi ? 'پشتیبانی' : 'Support';
  startClock();
  $$('.fa').forEach(el=> el.style.display = isFarsi ? 'inline' : 'none');
  $$('.en').forEach(el=> el.style.display = isFarsi ? 'none' : 'inline');

  $$('#filterSelect option').forEach(opt => {
    opt.textContent = isFarsi ? opt.dataset.fa : opt.dataset.en;
  });

  $$('.fa').forEach(el=> el.style.display = isFarsi ? 'inline' : 'none');
  $$('.en').forEach(el=> el.style.display = isFarsi ? 'none' : 'inline');

  renderStories($('#searchBox').value || '');
}

// ---------- Events ----------
window.addEventListener('DOMContentLoaded',()=>{
  // initialize year
  document.getElementById('year').textContent = new Date().getFullYear();

  // clock
  startClock();
  $$('.fa').forEach(el=> el.style.display = isFarsi ? 'inline' : 'none');
  $$('.en').forEach(el=> el.style.display = isFarsi ? 'none' : 'inline');

  $$('#filterSelect option').forEach(opt => {
    opt.textContent = isFarsi ? opt.dataset.fa : opt.dataset.en;
  });

  $$('.fa').forEach(el=> el.style.display = isFarsi ? 'inline' : 'none');
  $$('.en').forEach(el=> el.style.display = isFarsi ? 'none' : 'inline');


  // initial render
  renderStories();

  // search box
  $('#searchBox').addEventListener('input', e=>{
    renderStories(e.target.value);
  });

  // filter
  $('#filterSelect').addEventListener('change', ()=> renderStories($('#searchBox').value));

  // clear
  $('#clearSearch').addEventListener('click', ()=>{ $('#searchBox').value=''; renderStories(); });

  // language toggle
  $('#langToggle').addEventListener('click', ()=>{
    setLanguage(!isFarsi);
    $('#langToggle').setAttribute('aria-pressed', String(isFarsi));
  });

  // theme toggle
  $('#themeToggle').addEventListener('click', ()=>{
    document.body.classList.toggle('dark-mode');
  });

  // mobile nav
  $('#menuBtn').addEventListener('click', ()=>{
    const nav = $('#mainNav');
    const expanded = nav.classList.toggle('open');
    $('#menuBtn').setAttribute('aria-expanded', String(expanded));
  });

  // support form submit (demo)
  $('#supportForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    alert(isFarsi ? 'پیام شما ثبت شد. متشکریم!' : 'Message submitted. Thank you!');
    e.target.reset();
  });

  // restore likes display
  STORIES.forEach(s=>{
    const k = getLikes(s.id);
    if(k>0){
      // nothing required: like counts shown on buttons when created
    }
  });
});
