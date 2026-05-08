/* ===== BLOG.JS — Article Management ===== */
(function () {
  'use strict';

  // ── Storage helpers ──
  const STORAGE_KEY = 'bytefixer_blog_posts';
  function loadPosts() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function savePosts(posts) { localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); }

  // ── Seed articles (pre-loaded content) ──
  const SEED_VERSION = 'bytefixer_seed_v3';
  function seedIfEmpty() {
    const existing = loadPosts();
    const alreadySeeded = localStorage.getItem(SEED_VERSION);
    if (existing.length > 0 && alreadySeeded) return;
    if (alreadySeeded && existing.length > 0) return;

    const now = Date.now();
    const DAY = 86400000;

    const seedPosts = [
      {
        id: 'seed_001',
        title: 'Πώς να Επιλέξετε τον Σωστό SSD για τον Υπολογιστή σας',
        excerpt: 'Οδηγός αγοράς SSD: SATA vs NVMe, χωρητικότητα, ταχύτητες ανάγνωσης/εγγραφής και ποιο ταιριάζει στις ανάγκες σας.',
        tags: ['Hardware', 'Οδηγός', 'SSD'],
        cover: 'images/blog/ssd-guide.png',
        createdAt: now - DAY * 2,
        updatedAt: now - DAY * 2,
        content: `
          <h2>Γιατί να αναβαθμίσετε σε SSD;</h2>
          <p>Αν ο υπολογιστής σας χρησιμοποιεί ακόμα παραδοσιακό σκληρό δίσκο (HDD), η αναβάθμιση σε SSD είναι η <strong>πιο αισθητή βελτίωση</strong> που μπορείτε να κάνετε. Οι χρόνοι εκκίνησης μειώνονται δραματικά, τα προγράμματα ανοίγουν στιγμιαία και η συνολική εμπειρία χρήσης αλλάζει ριζικά.</p>

          <h2>SATA vs NVMe: Ποιο να διαλέξω;</h2>
          <p>Υπάρχουν δύο βασικοί τύποι SSD:</p>
          <ul>
            <li><strong>SATA SSD (2.5"):</strong> Ταχύτητες έως 550 MB/s. Ιδανικό για παλαιότερα laptop και desktop. Συμβατό με σχεδόν κάθε υπολογιστή.</li>
            <li><strong>NVMe SSD (M.2):</strong> Ταχύτητες 3.500–7.000 MB/s. Χρειάζεται θύρα M.2. Ιδανικό για gaming, video editing και επαγγελματική χρήση.</li>
          </ul>

          <h3>Ποια χωρητικότητα χρειάζομαι;</h3>
          <p>Η ελάχιστη προτεινόμενη χωρητικότητα είναι <strong>256 GB</strong> για βασική χρήση. Για gaming ή αποθήκευση πολυμέσων, προτείνουμε <strong>512 GB ή 1 TB</strong>.</p>

          <blockquote>💡 Tip: Μην γεμίζετε τον SSD πάνω από 80%. Η απόδοση μειώνεται σημαντικά όταν γεμίζει η χωρητικότητα.</blockquote>

          <h2>Προτεινόμενα μοντέλα (2025)</h2>
          <ul>
            <li><strong>Samsung 870 EVO</strong> — Κορυφαίος SATA SSD</li>
            <li><strong>Kingston NV2</strong> — Εξαιρετική σχέση ποιότητας/τιμής σε NVMe</li>
            <li><strong>Samsung 990 PRO</strong> — Κορυφαίες επιδόσεις NVMe Gen 4</li>
            <li><strong>WD Black SN850X</strong> — Ιδανικός για PS5 και gaming PC</li>
          </ul>

          <h2>Εγκατάσταση</h2>
          <p>Η εγκατάσταση ενός SSD είναι σχετικά εύκολη, αλλά αν δεν νιώθετε σίγουροι, <strong>φέρτε τον υπολογιστή σας στο Bytefixer</strong> — η αναβάθμιση γίνεται εντός 30 λεπτών, με μεταφορά όλων των δεδομένων σας.</p>
        `
      },
      {
        id: 'seed_002',
        title: 'Mesh WiFi: Πώς να Καλύψετε Κάθε Γωνιά του Σπιτιού σας',
        excerpt: 'Τέλος στα «νεκρά σημεία»! Μάθετε πώς λειτουργεί το Mesh WiFi και γιατί είναι η καλύτερη λύση για μεγάλους χώρους.',
        tags: ['Δίκτυα', 'WiFi', 'Οδηγός'],
        cover: 'images/blog/wifi-mesh.png',
        createdAt: now - DAY * 5,
        updatedAt: now - DAY * 5,
        content: `
          <h2>Τι είναι το Mesh WiFi;</h2>
          <p>Ένα σύστημα <strong>Mesh WiFi</strong> αποτελείται από 2 ή περισσότερες μονάδες που δημιουργούν ένα ενιαίο ασύρματο δίκτυο. Σε αντίθεση με τα range extenders, το Mesh εξασφαλίζει αδιάκοπη σύνδεση καθώς μετακινείστε στον χώρο.</p>

          <h2>Πότε χρειάζεστε Mesh;</h2>
          <ul>
            <li>Σπίτι πάνω από <strong>80 τ.μ.</strong></li>
            <li>Πολλοί τοίχοι ή ορόφοι</li>
            <li>Συχνές αποσυνδέσεις σε μακρινά δωμάτια</li>
            <li>Πολλές συσκευές (smartphones, tablets, smart TV, IoT)</li>
          </ul>

          <h3>Πώς να τοποθετήσετε τις μονάδες</h3>
          <p>Η σωστή τοποθέτηση είναι κλειδί:</p>
          <ol>
            <li>Ξεκινήστε με τον <strong>κύριο κόμβο</strong> κοντά στο router/modem</li>
            <li>Τοποθετήστε τους δευτερεύοντες κόμβους σε <strong>ίσες αποστάσεις</strong></li>
            <li>Αποφύγετε τη τοποθέτηση κοντά σε μεταλλικά αντικείμενα ή μικροκυματικούς φούρνους</li>
            <li>Κρατήστε τις μονάδες <strong>ψηλά</strong> (ράφι ή τοίχος)</li>
          </ol>

          <blockquote>💡 Στο Bytefixer αναλαμβάνουμε πλήρη εγκατάσταση Mesh WiFi με ρύθμιση, testing και βελτιστοποίηση του δικτύου σας.</blockquote>

          <h2>Προτεινόμενα συστήματα</h2>
          <ul>
            <li><strong>TP-Link Deco X50</strong> — WiFi 6, εξαιρετική τιμή</li>
            <li><strong>ASUS ZenWiFi AX</strong> — Κορυφαία κάλυψη</li>
            <li><strong>Google Nest WiFi Pro</strong> — Εύκολη εγκατάσταση, WiFi 6E</li>
          </ul>
        `
      },
      {
        id: 'seed_003',
        title: '5 Σημάδια ότι η Οθόνη του Κινητού σας Χρειάζεται Αντικατάσταση',
        excerpt: 'Μικρές ρωγμές, ghost touch ή αλλαγές χρωμάτων; Μάθετε πότε πρέπει πραγματικά να αντικαταστήσετε την οθόνη.',
        tags: ['Κινητά', 'Επισκευή'],
        cover: 'images/blog/phone-repair.png',
        createdAt: now - DAY * 8,
        updatedAt: now - DAY * 8,
        content: `
          <h2>Πρέπει να αντικαταστήσω την οθόνη;</h2>
          <p>Δεν χρειάζεται κάθε γρατζουνιά αντικατάσταση, αλλά ορισμένα σημάδια δείχνουν ότι η οθόνη σας χρειάζεται προσοχή <strong>άμεσα</strong>.</p>

          <h3>1. Ghost Touch — Η οθόνη «πατάει μόνη της»</h3>
          <p>Αν η οθόνη αντιδρά σε αγγίγματα που δεν κάνατε, πιθανώς ο digitizer έχει υποστεί βλάβη. Αυτό μπορεί να γίνει επικίνδυνο αν στείλει μηνύματα ή κάνει κλήσεις χωρίς τη θέλησή σας.</p>

          <h3>2. Μαύρα σημεία ή γραμμές στην οθόνη</h3>
          <p>Μαύρες κηλίδες ή κάθετες/οριζόντιες γραμμές δείχνουν <strong>βλάβη στο AMOLED/LCD panel</strong>. Συνήθως επεκτείνονται με τον καιρό.</p>

          <h3>3. Η αφή δεν αντιδρά σε κάποιες περιοχές</h3>
          <p>Αν κάποια τμήματα της οθόνης δεν ανταποκρίνονται στο άγγιγμα, ο digitizer έχει πρόβλημα σε εκείνο το σημείο.</p>

          <h3>4. Ρωγμές που εξαπλώνονται</h3>
          <p>Μια μικρή ρωγμή μπορεί να μεγαλώσει ξαφνικά, ειδικά με θερμοκρασιακές αλλαγές. Επίσης, μπορεί να μπαίνει σκόνη ή υγρασία μέσα από τη ρωγμή.</p>

          <h3>5. Αλλαγές στα χρώματα ή flickering</h3>
          <p>Αν η οθόνη τρεμοπαίζει ή τα χρώματα φαίνονται «ξεπλυμένα», μπορεί να υπάρχει πρόβλημα στην καλωδιοταινία ή στο panel.</p>

          <blockquote>⚠️ Η χρήση κινητού με σπασμένη οθόνη μπορεί να προκαλέσει τραυματισμό στα δάχτυλα. Μην το αναβάλλετε!</blockquote>

          <h2>Τιμές αντικατάστασης</h2>
          <p>Στο <strong>Bytefixer</strong> η αντικατάσταση οθόνης κινητού ξεκινά από <strong>40€</strong> (ανάλογα μοντέλο). Οι περισσότερες επισκευές ολοκληρώνονται <strong>εντός 1 ώρας</strong>.</p>
        `
      },
      {
        id: 'seed_004',
        title: 'Καθαρή Εγκατάσταση Windows 11: Βήμα προς Βήμα',
        excerpt: 'Πλήρης οδηγός για clean install Windows 11 με USB. Από τη δημιουργία bootable USB μέχρι τις πρώτες ρυθμίσεις.',
        tags: ['Windows', 'Οδηγός', 'Software'],
        cover: 'images/blog/windows-install.png',
        createdAt: now - DAY * 12,
        updatedAt: now - DAY * 10,
        content: `
          <h2>Γιατί καθαρή εγκατάσταση;</h2>
          <p>Μια καθαρή εγκατάσταση (clean install) εξαλείφει όλα τα προβλήματα του παλιού συστήματος: αργή εκκίνηση, ιούς, bloatware και σφάλματα μητρώου. Ο υπολογιστής σας θα λειτουργεί <strong>σαν καινούριος</strong>.</p>

          <h2>Τι θα χρειαστείτε</h2>
          <ul>
            <li>USB stick <strong>8 GB ή μεγαλύτερο</strong></li>
            <li>Σύνδεση internet (για λήψη του εργαλείου)</li>
            <li>Backup των αρχείων σας (σημαντικό!)</li>
            <li>Product key Windows (αν έχετε)</li>
          </ul>

          <h2>Βήμα 1: Δημιουργία Bootable USB</h2>
          <ol>
            <li>Κατεβάστε το <strong>Media Creation Tool</strong> από τη Microsoft</li>
            <li>Εκτελέστε το και επιλέξτε «Δημιουργία μέσου εγκατάστασης»</li>
            <li>Επιλέξτε γλώσσα, έκδοση και αρχιτεκτονική (64-bit)</li>
            <li>Επιλέξτε USB flash drive και περιμένετε τη λήψη</li>
          </ol>

          <h2>Βήμα 2: Boot από USB</h2>
          <p>Κάντε restart τον υπολογιστή και πατήστε <strong>F12, F2 ή Del</strong> (ανάλογα μητρική) για να μπείτε στο Boot Menu. Επιλέξτε το USB.</p>

          <h2>Βήμα 3: Εγκατάσταση</h2>
          <ol>
            <li>Επιλέξτε γλώσσα → Εγκατάσταση τώρα</li>
            <li>Εισάγετε product key (ή «Δεν έχω κλειδί»)</li>
            <li>Επιλέξτε «Προσαρμοσμένη εγκατάσταση»</li>
            <li>Μορφοποιήστε τον δίσκο και επιλέξτε τον χώρο</li>
            <li>Περιμένετε την ολοκλήρωση</li>
          </ol>

          <h2>Μετά την εγκατάσταση</h2>
          <ul>
            <li>Εγκαταστήστε τα <strong>drivers</strong> (chipset, κάρτα γραφικών, δίκτυο)</li>
            <li>Κάντε <strong>Windows Update</strong></li>
            <li>Εγκαταστήστε <strong>antivirus</strong></li>
            <li>Επαναφέρετε τα αρχεία σας από backup</li>
          </ul>

          <blockquote>💡 Θέλετε να το κάνουμε εμείς; Στο Bytefixer η εγκατάσταση Windows ξεκινά από 30€, με εγκατάσταση drivers και βασικών προγραμμάτων.</blockquote>
        `
      },
      {
        id: 'seed_005',
        title: '10 Συμβουλές Ασφαλείας για να Προστατεύσετε τα Δεδομένα σας',
        excerpt: 'Ενισχύστε την ψηφιακή σας ασφάλεια με απλές αλλά αποτελεσματικές πρακτικές. Από κωδικούς πρόσβασης μέχρι phishing.',
        tags: ['Ασφάλεια', 'Tips'],
        cover: 'images/blog/cybersecurity.png',
        createdAt: now - DAY * 16,
        updatedAt: now - DAY * 16,
        content: `
          <h2>Η ψηφιακή ασφάλεια είναι υπόθεση όλων</h2>
          <p>Δεν χρειάζεται να είστε ειδικός στην πληροφορική για να προστατεύσετε τα δεδομένα σας. Ακολουθήστε αυτές τις <strong>10 βασικές συμβουλές</strong>:</p>

          <h3>1. Χρησιμοποιήστε μοναδικούς κωδικούς</h3>
          <p>Μην χρησιμοποιείτε τον ίδιο κωδικό σε πολλές υπηρεσίες. Χρησιμοποιήστε <strong>password manager</strong> (π.χ. Bitwarden, 1Password).</p>

          <h3>2. Ενεργοποιήστε 2FA (Two-Factor Authentication)</h3>
          <p>Ακόμα κι αν κάποιος μάθει τον κωδικό σας, χωρίς τον δεύτερο παράγοντα δεν μπαίνει.</p>

          <h3>3. Ενημερώστε τα πάντα</h3>
          <p>Windows updates, browser updates, εφαρμογές κινητού — κάθε ενημέρωση κλείνει κενά ασφαλείας.</p>

          <h3>4. Προσοχή στα phishing emails</h3>
          <p>Μην κλικάρετε links σε ύποπτα emails. Ελέγξτε πάντα τη <strong>διεύθυνση αποστολέα</strong>.</p>

          <h3>5. Χρησιμοποιήστε antivirus</h3>
          <p>Ακόμα και το <strong>Windows Defender</strong> είναι αρκετά καλό — φροντίστε μόνο να είναι ενεργοποιημένο.</p>

          <h3>6. Backup, backup, backup!</h3>
          <p>Κρατήστε αντίγραφα ασφαλείας σε εξωτερικό δίσκο <strong>και</strong> cloud.</p>

          <h3>7. Ασφαλές WiFi</h3>
          <p>Αλλάξτε τον default κωδικό του router σας. Χρησιμοποιήστε <strong>WPA3</strong> αν υποστηρίζεται.</p>

          <h3>8. Μην κατεβάζετε από άγνωστες πηγές</h3>
          <p>Cracks, keygens και torrents είναι οι πιο συνηθισμένοι φορείς malware.</p>

          <h3>9. VPN σε δημόσια δίκτυα</h3>
          <p>Σε καφετέριες, αεροδρόμια και ξενοδοχεία, χρησιμοποιήστε <strong>VPN</strong> πάντα.</p>

          <h3>10. Κλείστε ό,τι δεν χρησιμοποιείτε</h3>
          <p>Απενεργοποιήστε Bluetooth, κάμερα και μικρόφωνο όταν δεν τα χρειάζεστε.</p>

          <blockquote>🔒 Χρειάζεστε βοήθεια με virus ή ασφάλεια δικτύου; Στο Bytefixer προσφέρουμε πλήρη έλεγχο ασφαλείας και καθαρισμό malware.</blockquote>
        `
      },
      {
        id: 'seed_006',
        title: 'Backup: Γιατί το Χρειάζεστε και Πώς να το Κάνετε Σωστά',
        excerpt: 'Η στρατηγική backup 3-2-1 εξηγημένη απλά. Προστατέψτε τις φωτογραφίες, τα αρχεία και τα δεδομένα σας πριν είναι αργά.',
        tags: ['Backup', 'Ασφάλεια', 'Οδηγός'],
        cover: 'images/blog/backup-guide.png',
        createdAt: now - DAY * 21,
        updatedAt: now - DAY * 20,
        content: `
          <h2>Ο κανόνας 3-2-1</h2>
          <p>Η πιο αξιόπιστη στρατηγική backup:</p>
          <ul>
            <li><strong>3</strong> αντίγραφα των δεδομένων σας</li>
            <li><strong>2</strong> διαφορετικά μέσα αποθήκευσης (π.χ. SSD + Cloud)</li>
            <li><strong>1</strong> αντίγραφο εκτός χώρου (off-site / cloud)</li>
          </ul>

          <h2>Τι πρέπει να κρατάτε backup</h2>
          <ul>
            <li>Φωτογραφίες και βίντεο</li>
            <li>Έγγραφα εργασίας</li>
            <li>Passwords (encrypted)</li>
            <li>Ρυθμίσεις εφαρμογών</li>
            <li>Email archives</li>
          </ul>

          <h2>Μέθοδοι Backup</h2>

          <h3>1. Εξωτερικός σκληρός δίσκος</h3>
          <p>Η πιο απλή μέθοδος. Συνδέστε ένα USB HDD/SSD και αντιγράψτε τα αρχεία σας. Χρησιμοποιήστε λογισμικό αυτοματοποίησης (π.χ. <strong>Windows File History</strong>).</p>

          <h3>2. Cloud Backup</h3>
          <p>Υπηρεσίες όπως <strong>Google Drive, OneDrive, Dropbox</strong> προσφέρουν αυτόματο συγχρονισμό. Ιδανικό για πρόσβαση από παντού.</p>

          <h3>3. NAS (Network Attached Storage)</h3>
          <p>Για επιχειρήσεις ή power users. Ένας NAS server στο σπίτι σας προσφέρει RAID protection και remote access.</p>

          <h2>Πόσο συχνά;</h2>
          <p>Ο ιδανικός ρυθμός εξαρτάται από τη χρήση:</p>
          <ul>
            <li><strong>Καθημερινά:</strong> Κρίσιμα αρχεία εργασίας</li>
            <li><strong>Εβδομαδιαία:</strong> Προσωπικά αρχεία</li>
            <li><strong>Μηνιαία:</strong> Πλήρες system backup (image)</li>
          </ul>

          <blockquote>💾 Στο Bytefixer αναλαμβάνουμε ρύθμιση αυτόματου backup και ανάκτηση δεδομένων. Μη χάσετε τίποτα — επικοινωνήστε μαζί μας.</blockquote>
        `
      },
      {
        id: 'seed_007',
        title: 'Οδηγός: Πώς να Φτιάξετε το Ιδανικό Gaming PC το 2025',
        excerpt: 'Από τον επεξεργαστή μέχρι το τροφοδοτικό — τι να προσέξετε στο custom build gaming υπολογιστή σας.',
        tags: ['Gaming', 'Hardware', 'Οδηγός'],
        cover: 'images/blog/gaming-pc.png',
        createdAt: now - DAY * 25,
        updatedAt: now - DAY * 24,
        content: `
          <h2>Γιατί custom build;</h2>
          <p>Ένας custom gaming υπολογιστής σας δίνει <strong>καλύτερη απόδοση ανά ευρώ</strong> σε σχέση με τα έτοιμα συστήματα. Επιπλέον, επιλέγετε ακριβώς τα εξαρτήματα που χρειάζεστε.</p>

          <h2>Τα βασικά εξαρτήματα</h2>

          <h3>Επεξεργαστής (CPU)</h3>
          <p>Για gaming, ο <strong>AMD Ryzen 5 7600X</strong> ή ο <strong>Intel Core i5-14600K</strong> προσφέρουν εξαιρετική απόδοση χωρίς να σπάσετε τον κουμπαρά.</p>

          <h3>Κάρτα Γραφικών (GPU)</h3>
          <p>Η GPU είναι το πιο σημαντικό εξάρτημα για gaming:</p>
          <ul>
            <li><strong>1080p Gaming:</strong> NVIDIA RTX 4060 ή AMD RX 7600</li>
            <li><strong>1440p Gaming:</strong> NVIDIA RTX 4070 Super ή AMD RX 7800 XT</li>
            <li><strong>4K Gaming:</strong> NVIDIA RTX 4080 Super ή AMD RX 7900 XTX</li>
          </ul>

          <h3>RAM</h3>
          <p>Τουλάχιστον <strong>16 GB DDR5</strong> για σύγχρονα παιχνίδια. Για streaming ή multitasking, 32 GB.</p>

          <h3>Αποθήκευση</h3>
          <p><strong>NVMe SSD 1 TB</strong> ως ελάχιστο — τα σύγχρονα games καταλαμβάνουν 50–150 GB το καθένα.</p>

          <h3>Τροφοδοτικό (PSU)</h3>
          <p>Μη κάνετε οικονομία εδώ! Επιλέξτε <strong>80+ Gold certified</strong> PSU με αρκετά Watt για τα εξαρτήματά σας (συνήθως 650W–850W).</p>

          <h3>Κουτί (Case)</h3>
          <p>Καλή ροή αέρα (airflow) > RGB. Προτείνουμε mesh front panel για βέλτιστη ψύξη.</p>

          <blockquote>🎮 Θέλετε να σας φτιάξουμε ένα custom gaming PC; Στο Bytefixer αναλαμβάνουμε συναρμολόγηση, ρύθμιση BIOS, εγκατάσταση OS και stress testing.</blockquote>
        `
      },
      {
        id: 'seed_008',
        title: 'Πώς να Διατηρήσετε την Μπαταρία του Κινητού σας σε Άριστη Κατάσταση',
        excerpt: 'Πρακτικές συμβουλές για να μεγιστοποιήσετε τη διάρκεια ζωής της μπαταρίας smartphone και tablet.',
        tags: ['Κινητά', 'Tips', 'Μπαταρία'],
        cover: 'images/blog/battery-health.png',
        createdAt: now - DAY * 30,
        updatedAt: now - DAY * 30,
        content: `
          <h2>Γιατί χαλάνε οι μπαταρίες;</h2>
          <p>Οι μπαταρίες λιθίου (Li-Ion) έχουν <strong>περιορισμένους κύκλους φόρτισης</strong> — συνήθως 500-800 πλήρεις κύκλους πριν η χωρητικότητα πέσει κάτω από 80%. Ωστόσο, με σωστή χρήση μπορείτε να τις κρατήσετε πολύ περισσότερο.</p>

          <h2>Οι χρυσοί κανόνες</h2>

          <h3>1. Αποφύγετε τις ακραίες φορτίσεις</h3>
          <p>Μη φορτίζετε στο <strong>100%</strong> και μην αφήνετε να πέσει στο <strong>0%</strong>. Το ιδανικό εύρος είναι <strong>20%–80%</strong>.</p>

          <h3>2. Μην χρησιμοποιείτε το κινητό ενώ φορτίζει</h3>
          <p>Η θερμότητα που παράγεται από τη χρήση + τη φόρτιση ταυτόχρονα <strong>επιταχύνει τη φθορά</strong> της μπαταρίας.</p>

          <h3>3. Αποφύγετε τη ζέστη</h3>
          <p>Η θερμοκρασία είναι ο <strong>χειρότερος εχθρός</strong> της μπαταρίας. Μην αφήνετε το κινητό στον ήλιο ή στο αυτοκίνητο το καλοκαίρι.</p>

          <h3>4. Χρησιμοποιήστε τον αρχικό φορτιστή</h3>
          <p>Οι φτηνοί φορτιστές μπορεί να μην ρυθμίζουν σωστά την τάση και να βλάψουν την μπαταρία.</p>

          <h3>5. Ενεργοποιήστε Optimized Charging</h3>
          <p>Τόσο iOS όσο και Android έχουν λειτουργία <strong>βελτιστοποιημένης φόρτισης</strong> — ενεργοποιήστε την!</p>

          <h2>Πότε να αντικαταστήσετε την μπαταρία;</h2>
          <ul>
            <li>Η μπαταρία δεν κρατάει ούτε <strong>μισή μέρα</strong></li>
            <li>Το κινητό <strong>κλείνει μόνο του</strong> σε ποσοστά 15-20%</li>
            <li>Η μπαταρία έχει <strong>φουσκώσει</strong> (επείγον!)</li>
            <li>Battery Health κάτω από <strong>80%</strong></li>
          </ul>

          <blockquote>🔋 Στο Bytefixer η αντικατάσταση μπαταρίας κινητού ξεκινά από 20€. Χρησιμοποιούμε μπαταρίες υψηλής ποιότητας με εγγύηση.</blockquote>
        `
      },
      {
        id: 'seed_009',
        title: 'Ο Εκτυπωτής δεν Δουλεύει; 7 Λύσεις που Μπορείτε να Δοκιμάσετε Μόνοι σας',
        excerpt: 'Από offline status μέχρι paper jam — οι πιο συνηθισμένες βλάβες εκτυπωτών και πώς να τις λύσετε.',
        tags: ['Εκτυπωτές', 'Troubleshooting'],
        cover: 'images/blog/printer-guide.png',
        createdAt: now - DAY * 35,
        updatedAt: now - DAY * 34,
        content: `
          <h2>Πριν καλέσετε τεχνικό...</h2>
          <p>Οι περισσότερες βλάβες εκτυπωτών λύνονται εύκολα. Δοκιμάστε αυτά τα βήματα πριν ζητήσετε βοήθεια:</p>

          <h3>1. Ο εκτυπωτής εμφανίζεται Offline</h3>
          <p>Πηγαίνετε σε <strong>Settings → Printers</strong>, κάντε δεξί κλικ στον εκτυπωτή σας και βεβαιωθείτε ότι το «Use Printer Offline» <strong>δεν</strong> είναι επιλεγμένο. Αν είναι δικτυακός, ελέγξτε τη σύνδεση WiFi.</p>

          <h3>2. Paper Jam (μπλοκαρισμένο χαρτί)</h3>
          <p>Σβήστε τον εκτυπωτή, ανοίξτε τα καπάκια και <strong>τραβήξτε το χαρτί αργά και σταθερά</strong>. Μη σκίζετε το χαρτί — αν κολλήσει, χρησιμοποιήστε τσιμπίδα.</p>

          <h3>3. Θαμπή ή ξεθωριασμένη εκτύπωση</h3>
          <p>Εκτελέστε <strong>Head Cleaning</strong> από τις ρυθμίσεις του εκτυπωτή. Σε inkjet, τα κεφάλια ξηραίνονται αν δεν χρησιμοποιείτε τον εκτυπωτή τακτικά.</p>

          <h3>4. Ο εκτυπωτής «τρώει» πολλά φύλλα</h3>
          <p>Αερίστε τα χαρτιά πριν τα βάλετε στο tray. Ελέγξτε ότι οι <strong>rubber rollers</strong> δεν είναι γυαλισμένοι — αν είναι, καθαρίστε τους με ελαφρώς υγρό πανί.</p>

          <h3>5. Γραμμές στην εκτύπωση</h3>
          <p>Σε laser: ελέγξτε/αντικαταστήστε το <strong>toner</strong>. Σε inkjet: κάντε <strong>nozzle check</strong> και alignment.</p>

          <h3>6. Πολύ αργή εκτύπωση</h3>
          <p>Αλλάξτε την ποιότητα εκτύπωσης σε <strong>Draft</strong> αντί για Best. Ελέγξτε ότι εκτυπώνετε μέσω <strong>USB</strong> αντί WiFi αν η ταχύτητα είναι κρίσιμη.</p>

          <h3>7. Σφάλμα driver</h3>
          <p>Απεγκαταστήστε τον εκτυπωτή, κατεβάστε τα <strong>τελευταία drivers</strong> από τον κατασκευαστή και εγκαταστήστε ξανά.</p>

          <blockquote>🖨️ Αν τίποτα δεν δουλεύει, φέρτε τον εκτυπωτή στο Bytefixer. Κάνουμε επισκευή, καθαρισμό κεφαλών και αντικατάσταση ανταλλακτικών.</blockquote>
        `
      },
      {
        id: 'seed_010',
        title: 'Laptop Overheating: Αιτίες, Συμπτώματα και Λύσεις',
        excerpt: 'Γιατί ζεσταίνεται υπερβολικά το laptop σας και πώς να το αντιμετωπίσετε πριν προκληθεί μόνιμη βλάβη.',
        tags: ['Laptop', 'Επισκευή', 'Hardware'],
        cover: 'images/blog/overheating.png',
        createdAt: now - DAY * 40,
        updatedAt: now - DAY * 38,
        content: `
          <h2>Πόσο ζεστό είναι «πολύ ζεστό»;</h2>
          <p>Ένα laptop υπό φορτίο μπορεί να φτάσει <strong>70-85°C</strong> — αυτό είναι φυσιολογικό. Πάνω από <strong>90°C</strong> σημαίνει πρόβλημα. Πάνω από <strong>100°C</strong> κινδυνεύει η CPU/GPU.</p>

          <h2>Συμπτώματα υπερθέρμανσης</h2>
          <ul>
            <li>Ο <strong>ανεμιστήρας δουλεύει συνεχώς</strong> στο φουλ</li>
            <li>Το laptop γίνεται <strong>πολύ ζεστό</strong> στο κάτω μέρος ή κοντά στο αρθρωτό</li>
            <li><strong>Κολλήματα</strong> (freezes) κατά τη χρήση</li>
            <li>Ξαφνικά <strong>σβησίματα</strong> (thermal shutdown)</li>
            <li><strong>Πτώση απόδοσης</strong> — thermal throttling</li>
          </ul>

          <h2>Αιτίες</h2>

          <h3>1. Σκόνη στον ανεμιστήρα</h3>
          <p>Η πιο συχνή αιτία. Η σκόνη φράζει τα πτερύγια του heatsink και εμποδίζει τη ροή αέρα.</p>

          <h3>2. Ξηραμένη θερμοαγωγική πάστα</h3>
          <p>Η θερμόπαστα μεταξύ CPU/GPU και heatsink ξεραίνεται μετά από <strong>2-4 χρόνια</strong>, μειώνοντας δραματικά τη μεταφορά θερμότητας.</p>

          <h3>3. Χρήση σε μαλακές επιφάνειες</h3>
          <p>Κρεβάτι, καναπές, μαξιλάρι — αυτά <strong>φράζουν τα ανοίγματα</strong> εξαερισμού στο κάτω μέρος.</p>

          <h3>4. Βαριά χρήση χωρίς επαρκή ψύξη</h3>
          <p>Gaming ή rendering σε ultrabook = πρόβλημα. Χρησιμοποιήστε <strong>laptop cooler pad</strong>.</p>

          <h2>Λύσεις</h2>
          <ul>
            <li><strong>Καθαρισμός σκόνης</strong> — ιδανικά με αποσυναρμολόγηση</li>
            <li><strong>Αντικατάσταση θερμόπαστας</strong> — με ποιοτική (π.χ. Arctic MX-4, Noctua NT-H1)</li>
            <li>Χρήση σε <strong>σκληρή, επίπεδη επιφάνεια</strong></li>
            <li><strong>Cooling pad</strong> με ανεμιστήρες</li>
            <li>Μείωση φόρτου — κλείστε αχρείαστα background processes</li>
          </ul>

          <blockquote>🌡️ Στο Bytefixer ο καθαρισμός laptop + θερμόπαστα ξεκινά από 25€. Ρίξτε τη θερμοκρασία 15-25°C!</blockquote>
        `
      }
    ];

    savePosts(seedPosts);
    localStorage.setItem(SEED_VERSION, '1');
  }

  // Run seed on load
  seedIfEmpty();

  // ── DOM refs ──
  const grid = document.getElementById('blogGrid');
  const emptyState = document.getElementById('blogEmpty');
  const postCount = document.getElementById('postCount');
  const searchInput = document.getElementById('blogSearch');

  // Editor modal
  const editorModal = document.getElementById('editorModal');
  const editorTitle = document.getElementById('editorModalTitle');
  const closeEditor = document.getElementById('closeEditor');
  const openNewPost = document.getElementById('openNewPost');
  const postForm = document.getElementById('postForm');
  const inputTitle = document.getElementById('postTitle');
  const inputExcerpt = document.getElementById('postExcerpt');
  const editorArea = document.getElementById('editorArea');
  const tagsWrap = document.getElementById('tagsWrap');
  const tagInput = document.getElementById('tagInput');
  const coverInput = document.getElementById('coverInput');
  const coverDrop = document.getElementById('coverDrop');
  const coverPreviewWrap = document.getElementById('coverPreviewWrap');

  // View modal
  const viewOverlay = document.getElementById('viewOverlay');
  const viewClose = document.getElementById('viewClose');

  // State
  let editingId = null;
  let coverDataUrl = null;
  let currentTags = [];

  // ── Nav toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  // ── Toast ──
  function showToast(msg) {
    let t = document.querySelector('.blog-toast');
    if (!t) { t = document.createElement('div'); t.className = 'blog-toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2600);
  }

  // ── Tag colors ──
  const tagColors = ['', 'tag-orange', 'tag-green'];
  function tagColor(i) { return tagColors[i % tagColors.length]; }

  // ── Date formatting ──
  function formatDate(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString('el-GR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // ── Render all posts ──
  function render(filter = '') {
    let posts = loadPosts();
    // Sort newest first
    posts.sort((a, b) => b.createdAt - a.createdAt);
    // Filter
    const q = filter.toLowerCase().trim();
    if (q) {
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    postCount.textContent = posts.length;
    grid.innerHTML = '';

    if (!posts.length) {
      emptyState.style.display = 'block';
      grid.style.display = 'none';
      return;
    }
    emptyState.style.display = 'none';
    grid.style.display = 'grid';

    posts.forEach((post, idx) => {
      const card = document.createElement('div');
      card.className = 'article-card';
      card.style.animationDelay = `${idx * 0.06}s`;

      const coverHtml = post.cover
        ? `<div class="article-cover"><img src="${post.cover}" alt="${esc(post.title)}" loading="lazy"></div>`
        : `<div class="article-cover"><div class="cover-placeholder"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div></div>`;

      const tagsHtml = (post.tags || []).map((t, i) => `<span class="article-tag ${tagColor(i)}">${esc(t)}</span>`).join('');

      card.innerHTML = `
        ${coverHtml}
        <div class="article-body">
          <div class="article-tags">${tagsHtml}</div>
          <div class="article-title" data-id="${post.id}">${esc(post.title)}</div>
          <div class="article-excerpt">${esc(post.excerpt)}</div>
          <div class="article-footer">
            <span class="article-date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              ${formatDate(post.createdAt)}
            </span>
            <div class="article-actions">
              <button class="btn-read" data-id="${post.id}">Ανάγνωση</button>
              <button class="btn-edit-post" data-id="${post.id}" title="Επεξεργασία">✎</button>
              <button class="btn-delete-post" data-id="${post.id}" title="Διαγραφή">✕</button>
            </div>
          </div>
        </div>`;
      grid.appendChild(card);
    });

    // Event delegation
    grid.querySelectorAll('.btn-read, .article-title').forEach(el => {
      el.addEventListener('click', () => openView(el.dataset.id));
    });
    grid.querySelectorAll('.btn-edit-post').forEach(el => {
      el.addEventListener('click', () => openEdit(el.dataset.id));
    });
    grid.querySelectorAll('.btn-delete-post').forEach(el => {
      el.addEventListener('click', () => deletePost(el.dataset.id));
    });
  }

  function esc(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

  // ── Open / Close Editor ──
  function openModal() {
    editorModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    editorModal.classList.remove('open');
    document.body.style.overflow = '';
    resetForm();
  }
  function resetForm() {
    editingId = null;
    coverDataUrl = null;
    currentTags = [];
    inputTitle.value = '';
    inputExcerpt.value = '';
    editorArea.innerHTML = '';
    renderTags();
    coverPreviewWrap.innerHTML = '';
    coverPreviewWrap.style.display = 'none';
    coverDrop.style.display = 'flex';
    editorTitle.textContent = 'Νέο Άρθρο';
  }

  openNewPost.addEventListener('click', () => { resetForm(); openModal(); });
  closeEditor.addEventListener('click', closeModal);
  editorModal.addEventListener('click', e => { if (e.target === editorModal) closeModal(); });

  // ── Tags ──
  function renderTags() {
    tagsWrap.querySelectorAll('.tag-pill').forEach(p => p.remove());
    currentTags.forEach((t, i) => {
      const pill = document.createElement('span');
      pill.className = 'tag-pill';
      pill.innerHTML = `${esc(t)}<button type="button" data-i="${i}">×</button>`;
      tagsWrap.insertBefore(pill, tagInput);
    });
    tagsWrap.querySelectorAll('.tag-pill button').forEach(b => {
      b.addEventListener('click', () => {
        currentTags.splice(parseInt(b.dataset.i), 1);
        renderTags();
      });
    });
  }
  tagInput.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.value.trim()) {
      e.preventDefault();
      const v = tagInput.value.trim().replace(/,/g, '');
      if (v && currentTags.length < 5 && !currentTags.includes(v)) {
        currentTags.push(v);
        renderTags();
      }
      tagInput.value = '';
    }
    if (e.key === 'Backspace' && !tagInput.value && currentTags.length) {
      currentTags.pop();
      renderTags();
    }
  });
  tagsWrap.addEventListener('click', () => tagInput.focus());

  // ── Cover image ──
  coverDrop.addEventListener('click', () => coverInput.click());
  coverInput.addEventListener('change', () => {
    if (coverInput.files && coverInput.files[0]) handleCoverFile(coverInput.files[0]);
  });
  coverDrop.addEventListener('dragover', e => { e.preventDefault(); coverDrop.classList.add('dragover'); });
  coverDrop.addEventListener('dragleave', () => coverDrop.classList.remove('dragover'));
  coverDrop.addEventListener('drop', e => {
    e.preventDefault();
    coverDrop.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleCoverFile(e.dataTransfer.files[0]);
  });

  function handleCoverFile(file) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = ev => {
      coverDataUrl = ev.target.result;
      showCoverPreview(coverDataUrl);
    };
    reader.readAsDataURL(file);
  }
  function showCoverPreview(src) {
    coverDrop.style.display = 'none';
    coverPreviewWrap.style.display = 'block';
    coverPreviewWrap.innerHTML = `
      <div class="cover-preview">
        <img src="${src}" alt="Cover">
        <button type="button" class="remove-cover">✕</button>
      </div>`;
    coverPreviewWrap.querySelector('.remove-cover').addEventListener('click', () => {
      coverDataUrl = null;
      coverPreviewWrap.innerHTML = '';
      coverPreviewWrap.style.display = 'none';
      coverDrop.style.display = 'flex';
      coverInput.value = '';
    });
  }

  // ── Rich text toolbar ──
  document.querySelectorAll('.editor-toolbar button[data-cmd]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const cmd = btn.dataset.cmd;
      const val = btn.dataset.val || null;
      if (cmd === 'createLink') {
        const url = prompt('URL:', 'https://');
        if (url) document.execCommand(cmd, false, url);
      } else {
        document.execCommand(cmd, false, val);
      }
      editorArea.focus();
    });
  });

  // ── Save post ──
  postForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = inputTitle.value.trim();
    const excerpt = inputExcerpt.value.trim();
    const content = editorArea.innerHTML.trim();
    if (!title || !content) {
      showToast('Συμπληρώστε τουλάχιστον τίτλο και περιεχόμενο.');
      return;
    }

    const posts = loadPosts();
    if (editingId) {
      const idx = posts.findIndex(p => p.id === editingId);
      if (idx > -1) {
        posts[idx].title = title;
        posts[idx].excerpt = excerpt || title.substring(0, 160);
        posts[idx].content = content;
        posts[idx].tags = [...currentTags];
        if (coverDataUrl !== null || coverDataUrl === null) posts[idx].cover = coverDataUrl || posts[idx].cover;
        if (coverDataUrl === null && !coverPreviewWrap.querySelector('img')) posts[idx].cover = '';
        posts[idx].updatedAt = Date.now();
      }
      showToast('Το άρθρο ενημερώθηκε!');
    } else {
      posts.push({
        id: 'post_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        title,
        excerpt: excerpt || title.substring(0, 160),
        content,
        tags: [...currentTags],
        cover: coverDataUrl || '',
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      showToast('Το άρθρο δημοσιεύτηκε!');
    }
    savePosts(posts);
    closeModal();
    render(searchInput.value);
  });

  // ── Edit post ──
  function openEdit(id) {
    const posts = loadPosts();
    const post = posts.find(p => p.id === id);
    if (!post) return;
    editingId = id;
    editorTitle.textContent = 'Επεξεργασία Άρθρου';
    inputTitle.value = post.title;
    inputExcerpt.value = post.excerpt || '';
    editorArea.innerHTML = post.content || '';
    currentTags = [...(post.tags || [])];
    renderTags();
    if (post.cover) {
      coverDataUrl = post.cover;
      showCoverPreview(post.cover);
    } else {
      coverDataUrl = null;
      coverPreviewWrap.innerHTML = '';
      coverPreviewWrap.style.display = 'none';
      coverDrop.style.display = 'flex';
    }
    openModal();
  }

  // ── Delete post ──
  function deletePost(id) {
    if (!confirm('Σίγουρα θέλετε να διαγράψετε αυτό το άρθρο;')) return;
    let posts = loadPosts();
    posts = posts.filter(p => p.id !== id);
    savePosts(posts);
    showToast('Το άρθρο διαγράφηκε.');
    render(searchInput.value);
  }

  // ── View article ──
  function openView(id) {
    const posts = loadPosts();
    const post = posts.find(p => p.id === id);
    if (!post) return;

    const tagsHtml = (post.tags || []).map((t, i) => `<span class="article-tag ${tagColor(i)}">${esc(t)}</span>`).join('');
    const coverHtml = post.cover ? `<div class="view-cover"><img src="${post.cover}" alt="${esc(post.title)}"></div>` : '';

    document.getElementById('viewArticle').innerHTML = `
      ${coverHtml}
      <div class="view-body">
        <div class="view-tags">${tagsHtml}</div>
        <h1>${esc(post.title)}</h1>
        <div class="view-meta">${formatDate(post.createdAt)}${post.updatedAt > post.createdAt ? ' · Τροποποίηση: ' + formatDate(post.updatedAt) : ''}</div>
        <div class="view-content">${post.content}</div>
      </div>`;

    viewOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeView() {
    viewOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  viewClose.addEventListener('click', closeView);
  viewOverlay.addEventListener('click', e => { if (e.target === viewOverlay) closeView(); });

  // ── Search ──
  searchInput.addEventListener('input', () => render(searchInput.value));

  // ── Keyboard ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (viewOverlay.classList.contains('open')) closeView();
      else if (editorModal.classList.contains('open')) closeModal();
    }
  });

  // ── Init ──
  render();
})();
