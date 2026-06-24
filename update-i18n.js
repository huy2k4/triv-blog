const fs = require('fs');

const path = 'd:/myblog/triv-blog/public/i18n.js';
let content = fs.readFileSync(path, 'utf-8');

// We can just extract the JSON object, parse it, update it, and write it back.
// But it's easier to just match the window.translations = ... and replace it.
const jsonStr = content.match(/const translations = (\{[\s\S]*?\});\s*window\.translations/)[1];
const translations = eval('(' + jsonStr + ')');

const viExtras = {
    "post.ngay-dung-lai.title": "Ngày mà tôi quyết định ngừng chạy theo và bắt đầu đứng lại",
    "post.ngay-dung-lai.excerpt": "Có những khoảnh khắc trong đời, bạn nhận ra mình đã chạy quá lâu mà không biết mình đang chạy đến đâu.",
    "post.doc-100-cuon-sach.title": "5 điều tôi học được sau khi đọc 100 cuốn sách trong 2 năm",
    "post.doc-100-cuon-sach.excerpt": "Không phải về số lượng, mà về cách đọc sách đã thay đổi cách tôi suy nghĩ và lắng nghe.",
    "post.co-gang-la-bay.title": "Tại sao tôi nghĩ \"cố gắng\" đôi khi là cái bẫy lớn nhất",
    "post.co-gang-la-bay.excerpt": "Xã hội dạy ta rằng phải nỗ lực không ngừng. Nhưng nếu chính sự nỗ lực ấy đang che mờ đi điều thực sự quan trọng thì sao?",
    "cat.my-days": "My Days",
    "cat.goc-nhin": "Góc nhìn",
    "cat.kien-thuc": "Kiến thức",
    "cat.tam-su": "Tâm sự"
};

const enExtras = {
    "post.ngay-dung-lai.title": "The day I decided to stop running and start standing still",
    "post.ngay-dung-lai.excerpt": "There are moments in life when you realize you've been running for too long without knowing where you're going.",
    "post.doc-100-cuon-sach.title": "5 things I learned after reading 100 books in 2 years",
    "post.doc-100-cuon-sach.excerpt": "It's not about the quantity, but how reading changed the way I think and listen.",
    "post.co-gang-la-bay.title": "Why I think \"trying\" is sometimes the biggest trap",
    "post.co-gang-la-bay.excerpt": "Society teaches us to strive endlessly. But what if that effort is obscuring what's truly important?",
    "cat.my-days": "My Days",
    "cat.goc-nhin": "Perspectives",
    "cat.kien-thuc": "Knowledge",
    "cat.tam-su": "Confide"
};

const jaExtras = {
    "post.ngay-dung-lai.title": "走り続けるのをやめ、立ち止まることにした日",
    "post.ngay-dung-lai.excerpt": "人生には、自分がどこに向かっているのかわからないまま、長く走りすぎたことに気づく瞬間があります。",
    "post.doc-100-cuon-sach.title": "2年間で100冊の本を読んで学んだ5つのこと",
    "post.doc-100-cuon-sach.excerpt": "量ではなく、読書が私の考え方と聞き方をどのように変えたかについてです。",
    "post.co-gang-la-bay.title": "なぜ「努力する」ことが最大の罠になることがあるのか",
    "post.co-gang-la-bay.excerpt": "社会は絶え間なく努力することを教えます。しかし、その努力が本当に重要なものを覆い隠しているとしたらどうでしょうか？",
    "cat.my-days": "マイ・デイズ",
    "cat.goc-nhin": "視点",
    "cat.kien-thuc": "知識",
    "cat.tam-su": "打ち明ける"
};

Object.assign(translations.vi, viExtras);
Object.assign(translations.en, enExtras);
Object.assign(translations.ja, jaExtras);

let newContent = content.replace(/const translations = \{[\s\S]*?\};\s*window\.translations/, 'const translations = ' + JSON.stringify(translations, null, 2) + ';\n\nwindow.translations');

// Also update setLanguage to support data-i18n-html
if (!newContent.includes('data-i18n-html')) {
    const htmlLogic = 
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
;
    newContent = newContent.replace('// Update document language', htmlLogic + '\n  // Update document language');
}

fs.writeFileSync(path, newContent, 'utf-8');
console.log('Updated i18n.js');
