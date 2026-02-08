import React from 'react';
import '../styles/components.css';

interface Book {
  title: string;
  author: string;
  description: string;
  category: string;
}

const books: Book[] = [
  // Classic Foundational Works
  {
    title: "Rees Howells: Intercessor",
    author: "Norman Grubb",
    description: "Biography of one of history's greatest intercessors. Demonstrates the power of sacrificial prayer and shows how intercession shaped world events during WWII. This book reveals the cost and reward of a life devoted to standing in the gap.",
    category: "Classic Foundational Works"
  },
  {
    title: "The Kneeling Christian",
    author: "An Unknown Christian",
    description: "Timeless classic on prayer that emphasizes the power and necessity of persistent prayer. Short, powerful chapters make it perfect for devotional reading. A foundational text that has inspired generations of prayer warriors.",
    category: "Classic Foundational Works"
  },
  {
    title: "E.M. Bounds on Prayer",
    author: "E.M. Bounds",
    description: "Collection of his most powerful writings on prayer. Provides deep theological foundation for prayer life and emphasizes the relationship between prayer and God's power. Bounds' insights remain unmatched in their depth and practical application.",
    category: "Classic Foundational Works"
  },
  // Modern Practical Guides
  {
    title: "Intercessory Prayer",
    author: "Dutch Sheets",
    description: "Comprehensive guide to understanding intercession with practical instruction on how to pray effectively. Provides biblical foundation with modern application. Essential reading for anyone serious about developing an intercessory prayer ministry.",
    category: "Modern Practical Guides"
  },
  {
    title: "The Prayer Warrior's Way",
    author: "Cindy Jacobs",
    description: "Written by a seasoned intercessor, this book combines teaching with personal testimonies. Addresses spiritual warfare in intercession and provides practical strategies for breakthrough. Jacobs brings decades of experience to this powerful guide.",
    category: "Modern Practical Guides"
  },
  {
    title: "Red Moon Rising",
    author: "Pete Greig",
    description: "Story of the 24-7 Prayer movement that has inspired millions. Shows what God does through corporate intercession and inspires consistent, passionate prayer. A modern testimony to the power of sustained intercession.",
    category: "Modern Practical Guides"
  },
  // On Spiritual Authority
  {
    title: "Authority in Prayer",
    author: "Dutch Sheets",
    description: "Teaches how to pray with biblical authority. Explains binding and loosing with practical application of spiritual authority. Essential for understanding the intercessor's position and power in Christ.",
    category: "On Spiritual Authority"
  },
  {
    title: "The Intercessors Handbook",
    author: "Joy Dawson",
    description: "Biblical principles for effective intercession with strong emphasis on holiness and purity. Addresses character issues in intercessors and provides practical guidance for maintaining spiritual authority.",
    category: "On Spiritual Authority"
  },
  {
    title: "Possessing the Gates of the Enemy",
    author: "Cindy Jacobs",
    description: "Training manual for intercessors covering prophetic intercession and practical strategies for breakthrough. Includes warfare prayers and insights into territorial intercession.",
    category: "On Spiritual Authority"
  },
  // On the Watchman Role
  {
    title: "Watchman Prayer",
    author: "Dutch Sheets",
    description: "Explains the watchman anointing and biblical foundation for standing guard. Teaches how to discern and respond to spiritual alerts. Essential for understanding the protective aspect of intercession.",
    category: "On the Watchman Role"
  },
  {
    title: "The Hidden Power of Prayer and Fasting",
    author: "Mahesh Chavda",
    description: "Combines intercession with fasting for greater breakthrough. Powerful testimonies demonstrate the effectiveness of this combination. Practical guidance on biblical fasting makes this accessible for all levels.",
    category: "On the Watchman Role"
  },
  // On Intimacy and Prayer
  {
    title: "The Practice of the Presence of God",
    author: "Brother Lawrence",
    description: "Classic on continuous communion with God providing foundation for lifestyle of prayer. Simple yet profound approach to maintaining constant awareness of God's presence. Essential for developing intimacy with God.",
    category: "On Intimacy and Prayer"
  },
  {
    title: "Secrets of the Secret Place",
    author: "Bob Sorge",
    description: "Deepening your personal prayer life by addressing obstacles to prayer and encouraging intimacy with God. Practical insights for overcoming common challenges in maintaining consistent prayer time.",
    category: "On Intimacy and Prayer"
  },
  {
    title: "The Circle Maker",
    author: "Mark Batterson",
    description: "Based on the story of Honi the circle maker, teaching bold, persistent prayer. Modern stories of answered prayer inspire faith and perseverance. Accessible and encouraging for all believers.",
    category: "On Intimacy and Prayer"
  },
  // On Unity in Prayer
  {
    title: "The Power of a Praying Church",
    author: "Stormie Omartian",
    description: "Corporate prayer strategies for building prayer culture in church. Practical tools for prayer groups and church-wide intercession. Helps develop sustainable corporate prayer ministry.",
    category: "On Unity in Prayer"
  },
  {
    title: "Prayer Shield",
    author: "C. Peter Wagner",
    description: "How to intercede for leaders and build prayer networks. Strategic intercession principles for protecting and empowering spiritual leadership. Essential for those called to pray for pastors and leaders.",
    category: "On Unity in Prayer"
  },
  // Devotional/Inspirational
  {
    title: "The Praying Life",
    author: "Paul E. Miller",
    description: "Honest look at struggles in prayer with grace-based approach. Relatable and encouraging for those who find prayer difficult. Offers practical hope for developing a consistent prayer life.",
    category: "Devotional/Inspirational"
  },
  {
    title: "With Christ in the School of Prayer",
    author: "Andrew Murray",
    description: "Classic devotional on prayer with 31 chapters for month-long study. Deep scriptural insights presented in accessible format. Timeless wisdom for growing in prayer.",
    category: "Devotional/Inspirational"
  },
  {
    title: "Too Busy Not to Pray",
    author: "Bill Hybels",
    description: "For those struggling to find time to pray. Practical scheduling advice and addresses common prayer obstacles. Helps busy believers prioritize and protect their prayer time.",
    category: "Devotional/Inspirational"
  },
  // On Prophetic Intercession
  {
    title: "Becoming a Prayer Warrior",
    author: "Elizabeth Alves",
    description: "Training manual for intercessors with prophetic prayer strategies. Includes prayer guides and checklists for organized, effective intercession. Comprehensive resource for developing prophetic prayer ministry.",
    category: "On Prophetic Intercession"
  },
  {
    title: "Prayers That Rout Demons",
    author: "John Eckhardt",
    description: "Spiritual warfare prayers with scriptural declarations organized by topic for quick reference. Practical tool for breaking through demonic opposition. Excellent resource for spiritual warfare intercession.",
    category: "On Prophetic Intercession"
  },
];

const categories = [
  "Classic Foundational Works",
  "Modern Practical Guides",
  "On Spiritual Authority",
  "On the Watchman Role",
  "On Intimacy and Prayer",
  "On Unity in Prayer",
  "Devotional/Inspirational",
  "On Prophetic Intercession"
];

export const ResourcesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const filteredBooks = selectedCategory
    ? books.filter(book => book.category === selectedCategory)
    : books;

  const getEmojiForCategory = (category: string): string => {
    const emojiMap: Record<string, string> = {
      "Classic Foundational Works": "📖",
      "Modern Practical Guides": "🔧",
      "On Spiritual Authority": "⚡",
      "On the Watchman Role": "👁️",
      "On Intimacy and Prayer": "💝",
      "On Unity in Prayer": "🤝",
      "Devotional/Inspirational": "✨",
      "On Prophetic Intercession": "🔮"
    };
    return emojiMap[category] || "📚";
  };

  return (
    <div className="resources-container">
      <section className="card mb-6">
        <h1>📚 Recommended Reading</h1>
        <p className="text-secondary mt-2">
          "The prayer of a righteous person is powerful and effective." - James 5:16b
        </p>
        <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#666' }}>
          Curated resources to deepen your intercessory prayer ministry. Explore by category or view all recommended books.
        </p>
      </section>

      <section className="card mb-6">
        <h2 className="mb-4">Categories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: !selectedCategory ? 'var(--primary-color)' : '#f0f4f8',
              color: !selectedCategory ? 'white' : '#003d7a',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}
          >
            📚 All Books ({books.length})
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: selectedCategory === category ? 'var(--primary-color)' : '#f0f4f8',
                color: selectedCategory === category ? 'white' : '#003d7a',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.95rem'
              }}
            >
              {getEmojiForCategory(category)} {category.split(' ').slice(0, 2).join(' ')}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4">
          {selectedCategory ? `${getEmojiForCategory(selectedCategory)} ${selectedCategory}` : '📚 All Recommended Books'}
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              className="card"
              style={{
                borderLeft: '4px solid #20B2AA',
                backgroundColor: '#f9fafb'
              }}
            >
              <div style={{ marginBottom: '0.75rem' }}>
                <span className="badge badge-primary" style={{ marginRight: '0.5rem' }}>
                  {getEmojiForCategory(book.category)}
                </span>
                <span className="badge" style={{ backgroundColor: '#dce9f5', color: '#003d7a' }}>
                  {book.category}
                </span>
              </div>
              <h3 style={{ margin: '0.5rem 0', color: '#003d7a', fontSize: '1.1rem' }}>{book.title}</h3>
              <p style={{ margin: '0.25rem 0', color: '#666', fontStyle: 'italic', fontSize: '0.95rem' }}>
                by {book.author}
              </p>
              <p style={{ margin: '1rem 0', lineHeight: '1.6', color: '#555' }}>
                {book.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="card mt-6" style={{ backgroundColor: '#e8f2fa', borderLeft: '4px solid #20B2AA' }}>
        <h3 style={{ color: '#003d7a', marginTop: 0 }}>💡 Getting Started</h3>
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>Start with these three:</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>Intercessory Prayer</strong> by Dutch Sheets - Comprehensive foundation</li>
          <li><strong>Rees Howells: Intercessor</strong> by Norman Grubb - Inspiration</li>
          <li><strong>Secrets of the Secret Place</strong> by Bob Sorge - Intimacy</li>
        </ul>
        <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#666' }}>
          💭 <strong>Tip:</strong> Keep a journal to record insights, prayers, and testimonies of answered prayer. This becomes a valuable resource for your ongoing intercessory ministry.
        </p>
      </section>
    </div>
  );
};
