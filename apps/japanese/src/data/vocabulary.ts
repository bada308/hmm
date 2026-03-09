import type { VocabWord, JLPTLevel } from '@/lib/types';

const n5Words: VocabWord[] = [
  // 인사
  { id: 'n5-greet-01', word: 'こんにちは', reading: 'こんにちは', romaji: 'konnichiwa', meaning: '안녕하세요 (낮)', level: 'N5', category: '인사' },
  { id: 'n5-greet-02', word: 'おはようございます', reading: 'おはようございます', romaji: 'ohayou gozaimasu', meaning: '좋은 아침이에요', level: 'N5', category: '인사' },
  { id: 'n5-greet-03', word: 'こんばんは', reading: 'こんばんは', romaji: 'konbanwa', meaning: '안녕하세요 (밤)', level: 'N5', category: '인사' },
  { id: 'n5-greet-04', word: 'ありがとうございます', reading: 'ありがとうございます', romaji: 'arigatou gozaimasu', meaning: '감사합니다', level: 'N5', category: '인사' },
  { id: 'n5-greet-05', word: 'すみません', reading: 'すみません', romaji: 'sumimasen', meaning: '실례합니다 / 죄송합니다', level: 'N5', category: '인사' },
  { id: 'n5-greet-06', word: 'さようなら', reading: 'さようなら', romaji: 'sayounara', meaning: '안녕히 가세요', level: 'N5', category: '인사' },
  { id: 'n5-greet-07', word: 'はじめまして', reading: 'はじめまして', romaji: 'hajimemashite', meaning: '처음 뵙겠습니다', level: 'N5', category: '인사' },
  { id: 'n5-greet-08', word: 'おやすみなさい', reading: 'おやすみなさい', romaji: 'oyasuminasai', meaning: '안녕히 주무세요', level: 'N5', category: '인사' },
  { id: 'n5-greet-09', word: 'いただきます', reading: 'いただきます', romaji: 'itadakimasu', meaning: '잘 먹겠습니다', level: 'N5', category: '인사' },
  { id: 'n5-greet-10', word: 'ごちそうさまでした', reading: 'ごちそうさまでした', romaji: 'gochisousama deshita', meaning: '잘 먹었습니다', level: 'N5', category: '인사' },
  { id: 'n5-greet-11', word: 'おねがいします', reading: 'おねがいします', romaji: 'onegai shimasu', meaning: '부탁합니다', level: 'N5', category: '인사' },
  { id: 'n5-greet-12', word: 'どういたしまして', reading: 'どういたしまして', romaji: 'dou itashimashite', meaning: '천만에요', level: 'N5', category: '인사' },

  // 숫자
  { id: 'n5-num-01', word: '一', reading: 'いち', romaji: 'ichi', meaning: '1 (하나)', level: 'N5', category: '숫자' },
  { id: 'n5-num-02', word: '二', reading: 'に', romaji: 'ni', meaning: '2 (둘)', level: 'N5', category: '숫자' },
  { id: 'n5-num-03', word: '三', reading: 'さん', romaji: 'san', meaning: '3 (셋)', level: 'N5', category: '숫자' },
  { id: 'n5-num-04', word: '四', reading: 'よん / し', romaji: 'yon / shi', meaning: '4 (넷)', level: 'N5', category: '숫자' },
  { id: 'n5-num-05', word: '五', reading: 'ご', romaji: 'go', meaning: '5 (다섯)', level: 'N5', category: '숫자' },
  { id: 'n5-num-06', word: '六', reading: 'ろく', romaji: 'roku', meaning: '6 (여섯)', level: 'N5', category: '숫자' },
  { id: 'n5-num-07', word: '七', reading: 'なな / しち', romaji: 'nana / shichi', meaning: '7 (일곱)', level: 'N5', category: '숫자' },
  { id: 'n5-num-08', word: '八', reading: 'はち', romaji: 'hachi', meaning: '8 (여덟)', level: 'N5', category: '숫자' },
  { id: 'n5-num-09', word: '九', reading: 'きゅう / く', romaji: 'kyuu / ku', meaning: '9 (아홉)', level: 'N5', category: '숫자' },
  { id: 'n5-num-10', word: '十', reading: 'じゅう', romaji: 'juu', meaning: '10 (열)', level: 'N5', category: '숫자' },
  { id: 'n5-num-11', word: '百', reading: 'ひゃく', romaji: 'hyaku', meaning: '100 (백)', level: 'N5', category: '숫자' },
  { id: 'n5-num-12', word: '千', reading: 'せん', romaji: 'sen', meaning: '1000 (천)', level: 'N5', category: '숫자' },
  { id: 'n5-num-13', word: '万', reading: 'まん', romaji: 'man', meaning: '10000 (만)', level: 'N5', category: '숫자' },

  // 요일/시간
  { id: 'n5-time-01', word: '月曜日', reading: 'げつようび', romaji: 'getsuyoubi', meaning: '월요일', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-02', word: '火曜日', reading: 'かようび', romaji: 'kayoubi', meaning: '화요일', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-03', word: '水曜日', reading: 'すいようび', romaji: 'suiyoubi', meaning: '수요일', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-04', word: '木曜日', reading: 'もくようび', romaji: 'mokuyoubi', meaning: '목요일', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-05', word: '金曜日', reading: 'きんようび', romaji: 'kinyoubi', meaning: '금요일', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-06', word: '土曜日', reading: 'どようび', romaji: 'doyoubi', meaning: '토요일', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-07', word: '日曜日', reading: 'にちようび', romaji: 'nichiyoubi', meaning: '일요일', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-08', word: '今日', reading: 'きょう', romaji: 'kyou', meaning: '오늘', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-09', word: '明日', reading: 'あした', romaji: 'ashita', meaning: '내일', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-10', word: '昨日', reading: 'きのう', romaji: 'kinou', meaning: '어제', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-11', word: '朝', reading: 'あさ', romaji: 'asa', meaning: '아침', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-12', word: '昼', reading: 'ひる', romaji: 'hiru', meaning: '낮/점심', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-13', word: '夜', reading: 'よる', romaji: 'yoru', meaning: '밤', level: 'N5', category: '요일/시간' },
  { id: 'n5-time-14', word: '今', reading: 'いま', romaji: 'ima', meaning: '지금', level: 'N5', category: '요일/시간' },

  // 가족
  { id: 'n5-fam-01', word: 'お父さん', reading: 'おとうさん', romaji: 'otousan', meaning: '아버지', level: 'N5', category: '가족' },
  { id: 'n5-fam-02', word: 'お母さん', reading: 'おかあさん', romaji: 'okaasan', meaning: '어머니', level: 'N5', category: '가족' },
  { id: 'n5-fam-03', word: 'お兄さん', reading: 'おにいさん', romaji: 'oniisan', meaning: '형/오빠', level: 'N5', category: '가족' },
  { id: 'n5-fam-04', word: 'お姉さん', reading: 'おねえさん', romaji: 'oneesan', meaning: '누나/언니', level: 'N5', category: '가족' },
  { id: 'n5-fam-05', word: '弟', reading: 'おとうと', romaji: 'otouto', meaning: '남동생', level: 'N5', category: '가족' },
  { id: 'n5-fam-06', word: '妹', reading: 'いもうと', romaji: 'imouto', meaning: '여동생', level: 'N5', category: '가족' },
  { id: 'n5-fam-07', word: '家族', reading: 'かぞく', romaji: 'kazoku', meaning: '가족', level: 'N5', category: '가족' },
  { id: 'n5-fam-08', word: '子供', reading: 'こども', romaji: 'kodomo', meaning: '아이', level: 'N5', category: '가족' },
  { id: 'n5-fam-09', word: '友達', reading: 'ともだち', romaji: 'tomodachi', meaning: '친구', level: 'N5', category: '가족' },
  { id: 'n5-fam-10', word: '先生', reading: 'せんせい', romaji: 'sensei', meaning: '선생님', level: 'N5', category: '가족' },

  // 음식
  { id: 'n5-food-01', word: 'ご飯', reading: 'ごはん', romaji: 'gohan', meaning: '밥/식사', level: 'N5', category: '음식' },
  { id: 'n5-food-02', word: '水', reading: 'みず', romaji: 'mizu', meaning: '물', level: 'N5', category: '음식' },
  { id: 'n5-food-03', word: 'お茶', reading: 'おちゃ', romaji: 'ocha', meaning: '차', level: 'N5', category: '음식' },
  { id: 'n5-food-04', word: '肉', reading: 'にく', romaji: 'niku', meaning: '고기', level: 'N5', category: '음식' },
  { id: 'n5-food-05', word: '魚', reading: 'さかな', romaji: 'sakana', meaning: '생선', level: 'N5', category: '음식' },
  { id: 'n5-food-06', word: '野菜', reading: 'やさい', romaji: 'yasai', meaning: '야채', level: 'N5', category: '음식' },
  { id: 'n5-food-07', word: '果物', reading: 'くだもの', romaji: 'kudamono', meaning: '과일', level: 'N5', category: '음식' },
  { id: 'n5-food-08', word: '卵', reading: 'たまご', romaji: 'tamago', meaning: '계란', level: 'N5', category: '음식' },
  { id: 'n5-food-09', word: 'パン', reading: 'パン', romaji: 'pan', meaning: '빵', level: 'N5', category: '음식' },
  { id: 'n5-food-10', word: '牛乳', reading: 'ぎゅうにゅう', romaji: 'gyuunyuu', meaning: '우유', level: 'N5', category: '음식' },
  { id: 'n5-food-11', word: '料理', reading: 'りょうり', romaji: 'ryouri', meaning: '요리', level: 'N5', category: '음식' },
  { id: 'n5-food-12', word: '弁当', reading: 'べんとう', romaji: 'bentou', meaning: '도시락', level: 'N5', category: '음식' },

  // 장소
  { id: 'n5-place-01', word: '学校', reading: 'がっこう', romaji: 'gakkou', meaning: '학교', level: 'N5', category: '장소' },
  { id: 'n5-place-02', word: '駅', reading: 'えき', romaji: 'eki', meaning: '역', level: 'N5', category: '장소' },
  { id: 'n5-place-03', word: '病院', reading: 'びょういん', romaji: 'byouin', meaning: '병원', level: 'N5', category: '장소' },
  { id: 'n5-place-04', word: '銀行', reading: 'ぎんこう', romaji: 'ginkou', meaning: '은행', level: 'N5', category: '장소' },
  { id: 'n5-place-05', word: '会社', reading: 'かいしゃ', romaji: 'kaisha', meaning: '회사', level: 'N5', category: '장소' },
  { id: 'n5-place-06', word: '図書館', reading: 'としょかん', romaji: 'toshokan', meaning: '도서관', level: 'N5', category: '장소' },
  { id: 'n5-place-07', word: 'デパート', reading: 'デパート', romaji: 'depaato', meaning: '백화점', level: 'N5', category: '장소' },
  { id: 'n5-place-08', word: '郵便局', reading: 'ゆうびんきょく', romaji: 'yuubinkyoku', meaning: '우체국', level: 'N5', category: '장소' },
  { id: 'n5-place-09', word: '家', reading: 'いえ / うち', romaji: 'ie / uchi', meaning: '집', level: 'N5', category: '장소' },
  { id: 'n5-place-10', word: '部屋', reading: 'へや', romaji: 'heya', meaning: '방', level: 'N5', category: '장소' },
  { id: 'n5-place-11', word: 'トイレ', reading: 'トイレ', romaji: 'toire', meaning: '화장실', level: 'N5', category: '장소' },
  { id: 'n5-place-12', word: '店', reading: 'みせ', romaji: 'mise', meaning: '가게', level: 'N5', category: '장소' },

  // 동사
  { id: 'n5-verb-01', word: '食べる', reading: 'たべる', romaji: 'taberu', meaning: '먹다', level: 'N5', category: '동사' },
  { id: 'n5-verb-02', word: '飲む', reading: 'のむ', romaji: 'nomu', meaning: '마시다', level: 'N5', category: '동사' },
  { id: 'n5-verb-03', word: '行く', reading: 'いく', romaji: 'iku', meaning: '가다', level: 'N5', category: '동사' },
  { id: 'n5-verb-04', word: '来る', reading: 'くる', romaji: 'kuru', meaning: '오다', level: 'N5', category: '동사' },
  { id: 'n5-verb-05', word: '見る', reading: 'みる', romaji: 'miru', meaning: '보다', level: 'N5', category: '동사' },
  { id: 'n5-verb-06', word: '聞く', reading: 'きく', romaji: 'kiku', meaning: '듣다/묻다', level: 'N5', category: '동사' },
  { id: 'n5-verb-07', word: '読む', reading: 'よむ', romaji: 'yomu', meaning: '읽다', level: 'N5', category: '동사' },
  { id: 'n5-verb-08', word: '書く', reading: 'かく', romaji: 'kaku', meaning: '쓰다', level: 'N5', category: '동사' },
  { id: 'n5-verb-09', word: '話す', reading: 'はなす', romaji: 'hanasu', meaning: '말하다', level: 'N5', category: '동사' },
  { id: 'n5-verb-10', word: '買う', reading: 'かう', romaji: 'kau', meaning: '사다', level: 'N5', category: '동사' },
  { id: 'n5-verb-11', word: '作る', reading: 'つくる', romaji: 'tsukuru', meaning: '만들다', level: 'N5', category: '동사' },
  { id: 'n5-verb-12', word: '使う', reading: 'つかう', romaji: 'tsukau', meaning: '사용하다', level: 'N5', category: '동사' },
  { id: 'n5-verb-13', word: '待つ', reading: 'まつ', romaji: 'matsu', meaning: '기다리다', level: 'N5', category: '동사' },
  { id: 'n5-verb-14', word: '分かる', reading: 'わかる', romaji: 'wakaru', meaning: '알다/이해하다', level: 'N5', category: '동사' },
  { id: 'n5-verb-15', word: '勉強する', reading: 'べんきょうする', romaji: 'benkyou suru', meaning: '공부하다', level: 'N5', category: '동사' },
  { id: 'n5-verb-16', word: '寝る', reading: 'ねる', romaji: 'neru', meaning: '자다', level: 'N5', category: '동사' },
  { id: 'n5-verb-17', word: '起きる', reading: 'おきる', romaji: 'okiru', meaning: '일어나다', level: 'N5', category: '동사' },
  { id: 'n5-verb-18', word: '帰る', reading: 'かえる', romaji: 'kaeru', meaning: '돌아가다', level: 'N5', category: '동사' },
  { id: 'n5-verb-19', word: '入る', reading: 'はいる', romaji: 'hairu', meaning: '들어가다', level: 'N5', category: '동사' },
  { id: 'n5-verb-20', word: '出る', reading: 'でる', romaji: 'deru', meaning: '나가다/나오다', level: 'N5', category: '동사' },

  // 형용사
  { id: 'n5-adj-01', word: '大きい', reading: 'おおきい', romaji: 'ookii', meaning: '크다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-02', word: '小さい', reading: 'ちいさい', romaji: 'chiisai', meaning: '작다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-03', word: '高い', reading: 'たかい', romaji: 'takai', meaning: '높다/비싸다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-04', word: '安い', reading: 'やすい', romaji: 'yasui', meaning: '싸다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-05', word: '新しい', reading: 'あたらしい', romaji: 'atarashii', meaning: '새롭다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-06', word: '古い', reading: 'ふるい', romaji: 'furui', meaning: '오래되다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-07', word: '良い', reading: 'いい / よい', romaji: 'ii / yoi', meaning: '좋다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-08', word: '悪い', reading: 'わるい', romaji: 'warui', meaning: '나쁘다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-09', word: '暑い', reading: 'あつい', romaji: 'atsui', meaning: '덥다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-10', word: '寒い', reading: 'さむい', romaji: 'samui', meaning: '춥다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-11', word: '美味しい', reading: 'おいしい', romaji: 'oishii', meaning: '맛있다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-12', word: '楽しい', reading: 'たのしい', romaji: 'tanoshii', meaning: '즐겁다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-13', word: '難しい', reading: 'むずかしい', romaji: 'muzukashii', meaning: '어렵다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-14', word: '易しい', reading: 'やさしい', romaji: 'yasashii', meaning: '쉽다/상냥하다', level: 'N5', category: '형용사' },
  { id: 'n5-adj-15', word: '忙しい', reading: 'いそがしい', romaji: 'isogashii', meaning: '바쁘다', level: 'N5', category: '형용사' },

  // 기타 (대명사, 기본 명사 등)
  { id: 'n5-etc-01', word: '私', reading: 'わたし', romaji: 'watashi', meaning: '나/저', level: 'N5', category: '기타' },
  { id: 'n5-etc-02', word: 'あなた', reading: 'あなた', romaji: 'anata', meaning: '당신/너', level: 'N5', category: '기타' },
  { id: 'n5-etc-03', word: '人', reading: 'ひと', romaji: 'hito', meaning: '사람', level: 'N5', category: '기타' },
  { id: 'n5-etc-04', word: '男', reading: 'おとこ', romaji: 'otoko', meaning: '남자', level: 'N5', category: '기타' },
  { id: 'n5-etc-05', word: '女', reading: 'おんな', romaji: 'onna', meaning: '여자', level: 'N5', category: '기타' },
  { id: 'n5-etc-06', word: '名前', reading: 'なまえ', romaji: 'namae', meaning: '이름', level: 'N5', category: '기타' },
  { id: 'n5-etc-07', word: '電話', reading: 'でんわ', romaji: 'denwa', meaning: '전화', level: 'N5', category: '기타' },
  { id: 'n5-etc-08', word: '時計', reading: 'とけい', romaji: 'tokei', meaning: '시계', level: 'N5', category: '기타' },
  { id: 'n5-etc-09', word: '傘', reading: 'かさ', romaji: 'kasa', meaning: '우산', level: 'N5', category: '기타' },
  { id: 'n5-etc-10', word: '本', reading: 'ほん', romaji: 'hon', meaning: '책', level: 'N5', category: '기타' },
  { id: 'n5-etc-11', word: '車', reading: 'くるま', romaji: 'kuruma', meaning: '자동차', level: 'N5', category: '기타' },
  { id: 'n5-etc-12', word: '天気', reading: 'てんき', romaji: 'tenki', meaning: '날씨', level: 'N5', category: '기타' },
  { id: 'n5-etc-13', word: 'お金', reading: 'おかね', romaji: 'okane', meaning: '돈', level: 'N5', category: '기타' },
  { id: 'n5-etc-14', word: '言葉', reading: 'ことば', romaji: 'kotoba', meaning: '말/단어', level: 'N5', category: '기타' },
  { id: 'n5-etc-15', word: '日本語', reading: 'にほんご', romaji: 'nihongo', meaning: '일본어', level: 'N5', category: '기타' },
];

// 레벨별 단어 데이터 맵 - 새 레벨 추가 시 여기에 import 추가
const vocabularyByLevel: Record<JLPTLevel, VocabWord[]> = {
  N5: n5Words,
  N4: [], // 추후 추가
  N3: [], // 추후 추가
  N2: [], // 추후 추가
  N1: [], // 추후 추가
};

export function getVocabulary(level: JLPTLevel): VocabWord[] {
  return vocabularyByLevel[level];
}

export function getCategories(level: JLPTLevel): string[] {
  const words = vocabularyByLevel[level];
  return [...new Set(words.map((w) => w.category))];
}

export function getAvailableLevels(): JLPTLevel[] {
  return (Object.keys(vocabularyByLevel) as JLPTLevel[]).filter(
    (level) => vocabularyByLevel[level].length > 0
  );
}

export function getAllVocabulary(): VocabWord[] {
  return Object.values(vocabularyByLevel).flat();
}
