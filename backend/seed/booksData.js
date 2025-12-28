const departments = ["CSE", "ECE", "ISE", "AIML", "ME", "CE", "EEE"];

const genreTitleBank = {
  Fiction: [
    "The Midnight Library",
    "The Kite Runner",
    "A Man Called Ove",
    "The Book Thief",
    "The Alchemist",
    "Normal People",
    "The Goldfinch",
    "The Lovely Bones",
    "The Secret History",
    "A Thousand Splendid Suns",
    "The Shadow of the Wind",
    "Little Fires Everywhere",
    "The Vanishing Half",
    "The Night Circus",
    "Where the Crawdads Sing"
  ],

  "Self-help": [
    "Atomic Habits",
    "The Power of Habit",
    "Deep Work",
    "Think Like a Monk",
    "Mindset",
    "Ikigai",
    "Meditations",
    "The Power of Now",
    "Grit",
    "The Four Agreements",
    "Man's Search for Meaning",
    "The Miracle Morning",
    "Limitless",
    "Daring Greatly",
    "Make Your Bed"
  ],

  Fantasy: [
    "Harry Potter and the Philosopher's Stone",
    "The Hobbit",
    "The Lord of the Rings",
    "A Game of Thrones",
    "The Name of the Wind",
    "Mistborn",
    "The Way of Kings",
    "American Gods",
    "The Chronicles of Narnia",
    "Eragon",
    "Good Omens",
    "The Atlas Six",
    "The Wheel of Time",
    "The Poppy War",
    "The Bear and the Nightingale"
  ],

  Finance: [
    "Rich Dad Poor Dad",
    "The Intelligent Investor",
    "The Psychology of Money",
    "The Richest Man in Babylon",
    "I Will Teach You to Be Rich",
    "A Random Walk Down Wall Street",
    "The Millionaire Next Door",
    "Principles",
    "One Up On Wall Street",
    "The Simple Path to Wealth",
    "Your Money or Your Life",
    "Money Master the Game",
    "The Barefoot Investor",
    "The Total Money Makeover",
    "Common Sense Investing"
  ]
};

function generateBooks() {
  const genres = Object.keys(genreTitleBank);
  const books = [];
  let index = 0;

  for (const dept of departments) {
    for (let i = 0; i < 15; i++) {
      const genre = genres[index % genres.length];
      const titles = genreTitleBank[genre];
      const title = titles[i % titles.length];

      books.push({
        title,
        author: `Author ${dept}-${i + 1}`,
        price: 200 + i * 15,
        pages: 180 + i * 20,
        genre,
        department: dept,
        language: "English"
      });

      index++;
    }
  }

  return books;
}

module.exports = generateBooks();
