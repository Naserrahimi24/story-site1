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
,
  {"id":31,"title_en":"The Case of the Missing Abode","title_fa":"ماجرای خانه گمشده","summary_en":"Mulla Nasruddin claims his house is missing, saying it simply got tired of him and left.","summary_fa":"ملا نصرالدین می‌گوید خانه‌اش گم شده و توضیح می‌دهد که «از من خسته شد و رفت!»","image":"images/story31.jpg","theme":"humor"},
  {"id":32,"title_en":"The Clever Mullah","title_fa":"ملای باهوش","summary_en":"Mulla solves a village problem with an unexpected witty answer.","summary_fa":"ملا با پاسخی هوشمندانه مشکلی بزرگ را در روستا حل می‌کند.","image":"images/story32.jpg","theme":"wit"},
  {"id":33,"title_en":"The Muddy Prayer","title_fa":"نماز گِلی","summary_en":"Mulla prays in mud, teaching that sincerity matters more than appearance.","summary_fa":"ملا در گل نماز می‌خواند و می‌آموزد که خلوص از ظاهر مهم‌تر است.","image":"images/story33.jpg","theme":"faith"},
  {"id":34,"title_en":"The Night of Repentance","title_fa":"شب توبه","summary_en":"On a quiet night, Mulla inspires others to repent sincerely.","summary_fa":"در شبی آرام، ملا دیگران را به توبه خالصانه تشویق می‌کند.","image":"images/story34.jpg","theme":"faith"},
  {"id":35,"title_en":"The Consistent Sage","title_fa":"حکیم استوار","summary_en":"A wise man’s unchanging principles earn him deep respect.","summary_fa":"اصول تغییرناپذیر یک حکیم، احترام عمیقی برایش به ارمغان می‌آورد.","image":"images/story35.jpg","theme":"wisdom"},
  {"id":36,"title_en":"The Donkey and the Judge","title_fa":"خر و قاضی","summary_en":"Mulla brings his donkey to court to prove a humorous point about justice.","summary_fa":"ملا خرش را به دادگاه می‌برد تا نکته‌ای طنزآمیز درباره عدالت را ثابت کند.","image":"images/story36.jpg","theme":"justice"},
  {"id":37,"title_en":"The Donkey's Dilemma","title_fa":"دوراهی خر","summary_en":"A donkey stands between two piles of hay, unsure which to eat first.","summary_fa":"خری بین دو توده کاه می‌ایستد و نمی‌داند کدام را اول بخورد.","image":"images/story37.jpg","theme":"choice"},
  {"id":38,"title_en":"The Egg-cellent Wisdom of Mullah Nasruddin","title_fa":"حکمت تخم‌مرغی ملا نصرالدین","summary_en":"Mulla uses an egg to teach a life lesson about patience.","summary_fa":"ملا با یک تخم‌مرغ درسی درباره صبر می‌آموزد.","image":"images/story38.jpg","theme":"wisdom"},
  {"id":39,"title_en":"The Lentil Lesson","title_fa":"درس عدس","summary_en":"Mulla explains why he prefers lentils over gold—less trouble, more peace.","summary_fa":"ملا توضیح می‌دهد که چرا عدس را به طلا ترجیح می‌دهد؛ دردسر کمتر، آرامش بیشتر.","image":"images/story39.jpg","theme":"humor"},
  {"id":40,"title_en":"The Spilled Oil","title_fa":"روغن ریخته","summary_en":"A merchant laments spilled oil, but Mulla turns it into a lesson on letting go.","summary_fa":"بازرگانی از ریختن روغن ناراحت است اما ملا آن را به درسی درباره رها کردن تبدیل می‌کند.","image":"images/story40.jpg","theme":"wisdom"},
  {"id":41,"title_en":"The True Taste of Eggs","title_fa":"طعم واقعی تخم‌مرغ","summary_en":"Mulla claims you can taste eggs by smelling the chicken’s breath.","summary_fa":"ملا ادعا می‌کند با بوی نفس مرغ می‌توان طعم تخم‌مرغ را فهمید.","image":"images/story41.jpg","theme":"absurdity"},
  {"id":42,"title_en":"Mulla Nasruddin's Lucky Loss","title_fa":"باخت خوش‌شانس ملا نصرالدین","summary_en":"Mulla loses a bet but gains a friend for life.","summary_fa":"ملا شرطی را می‌بازد اما دوستی برای تمام عمر به دست می‌آورد.","image":"images/story42.jpg","theme":"friendship"},
  {"id":43,"title_en":"The Clothes Make the Man","title_fa":"لباس شخصیت می‌آورد","summary_en":"Mulla proves people treat you based on clothes, not character.","summary_fa":"ملا ثابت می‌کند که مردم بر اساس لباس قضاوت می‌کنند، نه شخصیت.","image":"images/story43.jpg","theme":"truth"},
  {"id":44,"title_en":"The Thief Who Got Stolen From","title_fa":"دزدی که خودش دزدیده شد","summary_en":"A thief tries to rob Mulla but ends up losing his own belongings.","summary_fa":"دزدی قصد سرقت از ملا را دارد اما خودش دارایی‌هایش را از دست می‌دهد.","image":"images/story44.jpg","theme":"humor"},
  {"id":45,"title_en":"The Guest at His Own House","title_fa":"مهمان در خانه خودش","summary_en":"Mulla is treated like a guest in his own home after being away too long.","summary_fa":"ملا پس از غیبت طولانی در خانه خودش مانند مهمان پذیرایی می‌شود.","image":"images/story45.jpg","theme":"humor"},
  {"id":46,"title_en":"Mullah and the Feline Felon","title_fa":"ملا و گربه دزد","summary_en":"Mulla catches a cat stealing fish and delivers a witty verdict.","summary_fa":"ملا گربه‌ای را که ماهی می‌دزدد می‌گیرد و حکم طنزآمیزی صادر می‌کند.","image":"images/story46.jpg","theme":"wit"}
,
  {"id": 47, "title_en": "Mullah and the Lost Shadow", "title_fa": "ملا و سایه گمشده", "summary_en": "Mullah searches everywhere for his shadow, not realizing it follows him only in the light.", "summary_fa": "ملا همه جا دنبال سایه‌اش می‌گردد، بی‌آنکه بداند فقط در روشنایی همراهش است.", "image": "images/story47.jpg", "theme": "humor"},
  {"id": 48, "title_en": "Behlul and the Pierced Coin", "title_fa": "بهلول و سکه سوراخ", "summary_en": "Behlul tricks a merchant by showing that even a pierced coin can teach value.", "summary_fa": "بهلول با نشان دادن اینکه حتی یک سکه سوراخ نیز ارزش می‌آفریند، تاجری را فریب می‌دهد.", "image": "images/story48.jpg", "theme": "wit"},
  {"id": 49, "title_en": "Mullah and the Bottomless Pot", "title_fa": "ملا و دیگ بی‌ته", "summary_en": "Mullah borrows a pot and returns it claiming it gave birth—until he says it died.", "summary_fa": "ملا دیگی را قرض می‌گیرد و با ادعای زاییدن آن را پس می‌دهد—تا روزی بگوید که مرده است.", "image": "images/story49.jpg", "theme": "humor"},
  {"id": 50, "title_en": "The Man Who Sold Shadows", "title_fa": "مردی که سایه‌ها را فروخت", "summary_en": "A man sells 'shadows' to fools, teaching that greed blinds reason.", "summary_fa": "مردی سایه‌ها را به نادانان می‌فروشد و می‌آموزد که طمع، عقل را کور می‌کند.", "image": "images/story50.jpg", "theme": "wisdom"},
  {"id": 51, "title_en": "The Wise Elder and the Hasty Student", "title_fa": "پیر دانا و شاگرد شتاب‌زده", "summary_en": "A hasty student learns from the elder that wisdom needs time to grow.", "summary_fa": "شاگردی شتاب‌زده از پیر می‌آموزد که خرد به زمان نیاز دارد.", "image": "images/story51.jpg", "theme": "wisdom"},
  {"id": 52, "title_en": "The Sheep That Went to the Mosque", "title_fa": "گوسفندی که به مسجد رفت", "summary_en": "A sheep wanders into a mosque, reminding people that appearance does not define devotion.", "summary_fa": "گوسفندی وارد مسجد می‌شود و یادآوری می‌کند که ظاهر، نشانه ایمان نیست.", "image": "images/story52.jpg", "theme": "truth"},
  {"id": 53, "title_en": "The Judge and the Pigeon Witness", "title_fa": "قاضی و شاهد کبوتر", "summary_en": "A pigeon accidentally reveals the truth in court.", "summary_fa": "کبوتر بی‌آنکه بداند حقیقت را در دادگاه آشکار می‌کند.", "image": "images/story53.jpg", "theme": "justice"},
  {"id": 54, "title_en": "Mullah and the Broken Rope", "title_fa": "ملا و طناب پاره", "summary_en": "Mullah uses a broken rope to teach about knowing limits.", "summary_fa": "ملا با طناب پاره به دیگران می‌آموزد که باید حد و مرز را شناخت.", "image": "images/story54.jpg", "theme": "wisdom"},
  {"id": 55, "title_en": "Behlul and the Unwritten Notebook", "title_fa": "بهلول و دفتر ننوشته", "summary_en": "Behlul presents a blank notebook as the best record of lies never told.", "summary_fa": "بهلول دفتری سفید را به‌عنوان بهترین ثبت دروغ‌های ناگفته معرفی می‌کند.", "image": "images/story55.jpg", "theme": "wit"},
  {"id": 56, "title_en": "The Tale of the Man Who Ate a Mirror", "title_fa": "حکایت مردی که آینه خورد", "summary_en": "A man eats a mirror to 'shine inside', proving foolishness has no limit.", "summary_fa": "مردی برای «درخشش درون» آینه می‌خورد و نشان می‌دهد که حماقت حدی ندارد.", "image": "images/story56.jpg", "theme": "humor"},
  {"id": 57, "title_en": "The Three Pieces of Advice from the Wise Elder", "title_fa": "سه نصیحت پیر دانا", "summary_en": "A traveler follows three wise advices that change his fate.", "summary_fa": "مسافری سه نصیحت پیر دانا را به‌کار می‌بندد و سرنوشتش دگرگون می‌شود.", "image": "images/story57.jpg", "theme": "wisdom"},
  {"id": 58, "title_en": "Mullah and the Flying Cow", "title_fa": "ملا و گاو پرنده", "summary_en": "Mullah claims his cow can fly—if you throw it hard enough.", "summary_fa": "ملا می‌گوید گاوش می‌تواند پرواز کند—اگر آن را به اندازه کافی پرتاب کنید.", "image": "images/story58.jpg", "theme": "absurdity"},
  {"id": 59, "title_en": "Behlul and the Heavenly Carpet", "title_fa": "بهلول و فرش آسمانی", "summary_en": "Behlul offers a king an invisible carpet that 'flies' in imagination.", "summary_fa": "بهلول به شاه فرشی نامرئی می‌دهد که در خیال پرواز می‌کند.", "image": "images/story59.jpg", "theme": "illusion"},
  {"id": 60, "title_en": "The Well That Spoke", "title_fa": "چاهی که سخن گفت", "summary_en": "A well's echo teaches a boy that the world returns what you give.", "summary_fa": "پژواک چاه به پسری می‌آموزد که جهان همان را بازمی‌گرداند که تو می‌دهی.", "image": "images/story60.jpg", "theme": "truth"},
  {"id": 61, "title_en": "The Fisherman and the Talking Pearl", "title_fa": "ماهیگیر و مروارید سخنگو", "summary_en": "A pearl warns a fisherman that greed will sink him.", "summary_fa": "مرواریدی سخنگو به ماهیگیر هشدار می‌دهد که طمع غرقش خواهد کرد.", "image": "images/story61.jpg", "theme": "wisdom"},
  {"id": 62, "title_en": "The King and the Man Who Never Dreamed", "title_fa": "شاه و مردی که هرگز خواب ندید", "summary_en": "A king learns that a life without dreams is a life without vision.", "summary_fa": "شاه درمی‌یابد که زندگی بدون رویا، زندگی بی‌چشم‌انداز است.", "image": "images/story62.jpg", "theme": "wisdom"},
  {"id": 63, "title_en": "Mullah and the Sweetened Bowl", "title_fa": "ملا و کاسه شیرین", "summary_en": "Mullah sweetens a bitter dish to prove kindness can change the taste of life.", "summary_fa": "ملا غذای تلخی را شیرین می‌کند تا نشان دهد مهربانی طعم زندگی را عوض می‌کند.", "image": "images/story63.jpg", "theme": "kindness"},
  {"id": 64, "title_en": "The Gardener and the Fruitless Tree", "title_fa": "باغبان و درخت بی‌ثمر", "summary_en": "A gardener keeps watering a barren tree, teaching faith in unseen growth.", "summary_fa": "باغبانی به درخت بی‌ثمر آب می‌دهد و ایمان به رشد نادیدنی را می‌آموزد.", "image": "images/story64.jpg", "theme": "faith"},
  {"id": 65, "title_en": "Behlul and the Bridge to Nowhere", "title_fa": "بهلول و پل بی‌انتها", "summary_en": "Behlul mocks a bridge that leads nowhere, warning against aimless work.", "summary_fa": "بهلول پلی را که به جایی نمی‌رسد مسخره می‌کند و از کار بی‌هدف برحذر می‌دارد.", "image": "images/story65.jpg", "theme": "purpose"},
  {"id": 66, "title_en": "The Uninvited Guest at the Mill", "title_fa": "مهمان ناخوانده در آسیاب", "summary_en": "A stranger at the mill learns that patience earns you bread.", "summary_fa": "غریبه‌ای در آسیاب می‌آموزد که صبر، نان می‌آورد.", "image": "images/story66.jpg", "theme": "wisdom"},
  {"id": 67, "title_en": "Mullah and the Shoemaker’s Cat", "title_fa": "ملا و گربه کفاش", "summary_en": "Mullah catches the shoemaker’s cat stealing shoes for its kittens.", "summary_fa": "ملا گربه کفاش را می‌گیرد که کفش‌ها را برای بچه‌هایش می‌برد.", "image": "images/story67.jpg", "theme": "humor"},
  {"id": 68, "title_en": "The Old Woman and the Needle Lost in the Desert", "title_fa": "پیرزن و سوزن گمشده در بیابان", "summary_en": "An old woman searches for a needle in the desert, showing misdirected effort.", "summary_fa": "پیرزنی در بیابان دنبال سوزن می‌گردد و تلاش بی‌هدف را نشان می‌دهد.", "image": "images/story68.jpg", "theme": "wisdom"},
  {"id": 69, "title_en": "The Ruler and the Colorless Painter", "title_fa": "حاکم و نقاش بی‌رنگ", "summary_en": "A painter refuses colors to teach the ruler about imagination.", "summary_fa": "نقاشی از رنگ استفاده نمی‌کند تا به حاکم درباره خیال بیاموزد.", "image": "images/story69.jpg", "theme": "creativity"},
  {"id": 70, "title_en": "Behlul and the Wall with Ears", "title_fa": "بهلول و دیوار گوش‌دار", "summary_en": "Behlul warns a gossiping man that even walls have ears.", "summary_fa": "بهلول به مردی خبرچین هشدار می‌دهد که حتی دیوارها گوش دارند.", "image": "images/story70.jpg", "theme": "truth"},
  {"id": 71, "title_en": "The Man Who Lost His Own Shadow", "title_fa": "مردی که سایه خودش را گم کرد", "summary_en": "A man chases his shadow until night teaches him some things can't be caught.", "summary_fa": "مردی سایه‌اش را دنبال می‌کند تا شب بیاموزد که بعضی چیزها دست‌نیافتنی‌اند.", "image": "images/story71.jpg", "theme": "wisdom"},
  {"id": 72, "title_en": "The Judge and the Watermelon Dispute", "title_fa": "قاضی و دعوای هندوانه", "summary_en": "A judge settles a fight over a watermelon with a fair split.", "summary_fa": "قاضی دعوای هندوانه را با تقسیم عادلانه حل می‌کند.", "image": "images/story72.jpg", "theme": "justice"},
  {"id": 73, "title_en": "Mullah and the Bitter Tea", "title_fa": "ملا و چای تلخ", "summary_en": "Mullah turns bitter tea into a lesson on gratitude.", "summary_fa": "ملا چای تلخ را به درسی درباره شکرگزاری تبدیل می‌کند.", "image": "images/story73.jpg", "theme": "gratitude"},
  {"id": 74, "title_en": "The Child and the Unlit Lantern", "title_fa": "کودک و فانوس خاموش", "summary_en": "A child learns that a lantern without light is just a burden.", "summary_fa": "کودکی می‌آموزد فانوس بدون نور، فقط باری اضافی است.", "image": "images/story74.jpg", "theme": "wisdom"},
  {"id": 75, "title_en": "Behlul and the Empty Chest", "title_fa": "بهلول و صندوق خالی", "summary_en": "Behlul gives a rich man an empty chest as a mirror to his greed.", "summary_fa": "بهلول به مردی ثروتمند صندوقی خالی می‌دهد تا آینه طمعش باشد.", "image": "images/story75.jpg", "theme": "truth"},
  {"id": 76, "title_en": "The Thief and the Bag Full of Sounds", "title_fa": "دزد و کیسه پر از صدا", "summary_en": "A thief steals a bag, only to find it full of noisy bells.", "summary_fa": "دزدی کیسه‌ای را می‌دزدد و می‌بیند پر از زنگ‌های پرصداست.", "image": "images/story76.jpg", "theme": "humor"},
  {"id": 77, "title_en": "The Traveler and the Ownerless Shoes", "title_fa": "مسافر و کفش‌های بی‌صاحب", "summary_en": "A traveler finds shoes no one owns, learning some gifts are traps.", "summary_fa": "مسافری کفش‌های بی‌صاحبی پیدا می‌کند و می‌آموزد که بعضی هدایا دام‌اند.", "image": "images/story77.jpg", "theme": "wisdom"},
  {"id": 78, "title_en": "Mullah and the Cart Without Wheels", "title_fa": "ملا و گاری بی‌چرخ", "summary_en": "Mullah buys a cart without wheels, saying it won't run away.", "summary_fa": "ملا گاری بی‌چرخ می‌خرد و می‌گوید این‌طور فرار نمی‌کند.", "image": "images/story78.jpg", "theme": "humor"},
  {"id": 79, "title_en": "The Shepherd and the Fasting Wolf", "title_fa": "چوپان و گرگ روزه‌دار", "summary_en": "A wolf claims to fast while eyeing the sheep.", "summary_fa": "گرگی ادعای روزه‌داری می‌کند و همزمان به گوسفندها چشم دارد.", "image": "images/story79.jpg", "theme": "hypocrisy"},
  {"id": 80, "title_en": "Behlul and the Golden Dove", "title_fa": "بهلول و کبوتر طلایی", "summary_en": "Behlul releases a golden dove, teaching freedom is priceless.", "summary_fa": "بهلول کبوتری طلایی را آزاد می‌کند و می‌آموزد که آزادی بی‌قیمت است.", "image": "images/story80.jpg", "theme": "freedom"},
  {"id": 81, "title_en": "The Judge and the Twisted Cane", "title_fa": "قاضی و عصای کج", "summary_en": "A twisted cane helps a judge uncover the truth.", "summary_fa": "قاضی با عصای کج حقیقت را آشکار می‌کند.", "image": "images/story81.jpg", "theme": "justice"},
  {"id": 82, "title_en": "The Man Who Traded with the Wind", "title_fa": "مردی که با باد معامله کرد", "summary_en": "A merchant loses all trading with the wind, learning some deals are empty.", "summary_fa": "بازرگانی با باد معامله می‌کند و می‌بازد، می‌آموزد که بعضی معاملات پوچ‌اند.", "image": "images/story82.jpg", "theme": "wisdom"},
  {"id": 83, "title_en": "Mullah and the Book Without Letters", "title_fa": "ملا و کتاب بی‌حروف", "summary_en": "Mullah presents a blank book as the purest knowledge.", "summary_fa": "ملا کتابی بی‌حروف را به‌عنوان پاک‌ترین دانش معرفی می‌کند.", "image": "images/story83.jpg", "theme": "wisdom"},
  {"id": 84, "title_en": "Behlul and the Stone Lantern", "title_fa": "بهلول و فانوس سنگی", "summary_en": "Behlul gifts a stone lantern, saying it lights only the wise.", "summary_fa": "بهلول فانوسی سنگی می‌بخشد و می‌گوید فقط خردمندان را روشن می‌کند.", "image": "images/story84.jpg", "theme": "wit"},
  {"id": 85, "title_en": "The Girl and the Invisible Necklace", "title_fa": "دختر و گردنبند نامرئی", "summary_en": "A girl wears an invisible necklace to feel rich, showing wealth is in the mind.", "summary_fa": "دختری گردنبند نامرئی می‌پوشد و نشان می‌دهد ثروت در ذهن است.", "image": "images/story85.jpg", "theme": "truth"},
  {"id": 86, "title_en": "Mullah and the Fake Leopard", "title_fa": "ملا و پلنگ قلابی", "summary_en": "Mullah paints a donkey like a leopard to scare thieves.", "summary_fa": "ملا خری را مثل پلنگ رنگ می‌کند تا دزدها را بترساند.", "image": "images/story86.jpg", "theme": "humor"},
  {"id": 87, "title_en": "The Poor Man and the Golden Tree", "title_fa": "فقیر و درخت طلایی", "summary_en": "A poor man waters a golden tree that bears kindness instead of coins.", "summary_fa": "فقیری درخت طلایی را آب می‌دهد که به جای سکه، مهربانی می‌دهد.", "image": "images/story87.jpg", "theme": "kindness"},
  {"id": 88, "title_en": "Behlul and the Silent Market", "title_fa": "بهلول و بازار خاموش", "summary_en": "Behlul visits a silent market where truth is traded without words.", "summary_fa": "بهلول به بازاری خاموش می‌رود که در آن حقیقت بی‌کلام معامله می‌شود.", "image": "images/story88.jpg", "theme": "truth"},
  {"id": 89, "title_en": "The Judge and the Unnamed Letter", "title_fa": "قاضی و نامه بی‌نام", "summary_en": "A letter without a name solves a mystery in court.", "summary_fa": "نامه‌ای بی‌نام معمایی را در دادگاه حل می‌کند.", "image": "images/story89.jpg", "theme": "justice"},
  {"id": 90, "title_en": "The Ruler and the Soundless Drum", "title_fa": "حاکم و طبل بی‌صدا", "summary_en": "A soundless drum teaches the ruler about empty show.", "summary_fa": "طبل بی‌صدا به حاکم درباره نمایش توخالی می‌آموزد.", "image": "images/story90.jpg", "theme": "wisdom"},
  {"id": 91, "title_en": "Mullah and the Glass Egg", "title_fa": "ملا و تخم شیشه‌ای", "summary_en": "Mullah presents a glass egg as proof of impossible promises.", "summary_fa": "ملا تخم شیشه‌ای را به‌عنوان شاهد وعده‌های غیرممکن نشان می‌دهد.", "image": "images/story91.jpg", "theme": "wit"},
  {"id": 92, "title_en": "The Devout Man and the Featherless Bird", "title_fa": "مرد مؤمن و پرنده بی‌پر", "summary_en": "A featherless bird teaches a devout man that faith needs more than words.", "summary_fa": "پرنده‌ای بی‌پر به مرد مؤمن می‌آموزد که ایمان فقط به گفتار نیست.", "image": "images/story92.jpg", "theme": "faith"},
  {"id": 93, "title_en": "Behlul and the Upside-Down Bowl", "title_fa": "بهلول و کاسه وارونه", "summary_en": "Behlul places a bowl upside-down to show some truths are hidden.", "summary_fa": "بهلول کاسه‌ای را وارونه می‌گذارد تا نشان دهد برخی حقیقت‌ها پنهان‌اند.", "image": "images/story93.jpg", "theme": "truth"},
  {"id": 94, "title_en": "The Old Man and the Reverse Well", "title_fa": "پیرمرد و چاه وارونه", "summary_en": "A reverse well draws water from the sky in a tale of hope.", "summary_fa": "چاهی وارونه آب را از آسمان می‌گیرد، حکایتی از امید.", "image": "images/story94.jpg", "theme": "hope"},
  {"id": 95, "title_en": "Mullah and the Lost Bell", "title_fa": "ملا و زنگ گمشده", "summary_en": "Mullah finds the village bell but keeps it silent to teach peace.", "summary_fa": "ملا زنگ روستا را پیدا می‌کند اما برای آموزش آرامش، آن را به صدا درنمی‌آورد.", "image": "images/story95.jpg", "theme": "wisdom"},
  {"id": 96, "title_en": "The King and the Sleepy Guard", "title_fa": "شاه و نگهبان خواب‌آلود", "summary_en": "A sleepy guard accidentally saves the king.", "summary_fa": "نگهبان خواب‌آلود ناخواسته جان شاه را نجات می‌دهد.", "image": "images/story96.jpg", "theme": "luck"},
  {"id": 97, "title_en": "The Man Who Lent to the Moon", "title_fa": "مردی که به ماه قرض داد", "summary_en": "A man lends to the moon, knowing he'll never be repaid.", "summary_fa": "مردی به ماه قرض می‌دهد و می‌داند هرگز پس نخواهد گرفت.", "image": "images/story97.jpg", "theme": "generosity"},
  {"id": 98, "title_en": "Behlul and the Upside-Down River", "title_fa": "بهلول و رود وارونه", "summary_en": "Behlul claims a river flows upward to challenge blind belief.", "summary_fa": "بهلول می‌گوید رودی به سمت بالا می‌رود تا ایمان کورکورانه را به چالش بکشد.", "image": "images/story98.jpg", "theme": "wisdom"},
  {"id": 99, "title_en": "The Judge and the Broken Mirror", "title_fa": "قاضی و آینه شکسته", "summary_en": "A broken mirror in court reflects hidden guilt.", "summary_fa": "آینه‌ای شکسته در دادگاه، گناه پنهان را آشکار می‌کند.", "image": "images/story99.jpg", "theme": "justice"},
  {"id": 100, "title_en": "Mullah and the Ladder to the Sky", "title_fa": "ملا و نردبان به آسمان", "summary_en": "Mullah sells a ladder to the sky to dreamers.", "summary_fa": "ملا نردبانی به آسمان را به خیال‌پردازان می‌فروشد.", "image": "images/story100.jpg", "theme": "illusion"}
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

