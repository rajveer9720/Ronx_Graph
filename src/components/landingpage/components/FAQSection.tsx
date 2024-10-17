import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import SocialBg from '@/assets/images/socialbg.jpg';

const faqData = [
  {
    question: 'Why is RonX the best alternative for trading?',
    answer: 'RonX provides a decentralized system with smart contracts, ensuring transparency and automation.',
  },
  {
    question: 'Is RonX safe?',
    answer: 'Yes, RonX is built on immutable smart contracts, making it secure and reliable.',
  },
  {
    question: 'How much does it cost to participate in RonX?',
    answer: 'The cost to get started varies. You can start with minimal investment depending on the program.',
  },
  {
    question: 'What do I need to get started on RonX?',
    answer: 'You need a digital wallet and some cryptocurrency to begin participating in RonX.',
  },
  {
    question: 'How do I start?',
    answer: 'Visit the RonX website and follow the instructions to sign up and start investing.',
  },
  {
    question: 'Where will my profit come from?',
    answer: 'Profits are generated through network growth and smart contract-driven transactions.',
  },
  {
    question: 'What role do NFTs (non-fungible tokens) play at RonX?',
    answer: 'NFTs at RonX provide unique, verifiable ownership of digital assets within the platform.',
  },
];

const socialLinks = [
  { name: 'Telegram', url: 'https://telegram.org/', icon: faTelegram },
  { name: 'Twitter', url: 'https://twitter.com/', icon: faTwitter },
  { name: 'Instagram', url: 'https://instagram.com/', icon: faInstagram },
  { name: 'YouTube', url: 'https://youtube.com/', icon: faYoutube },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4 sm:p-8 lg:p-12">
      {/* FAQ Section */}
      <section className="w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Frequently Asked Questions
        </h1>
        <div className="w-full space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-700">
              <button
                onClick={() => toggleOpen(index)}
                className="w-full text-left py-4 px-4 flex justify-between items-center focus:outline-none"
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <span className="text-purple-500 text-lg">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-left">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Official Channels Section */}
      <section
        className="w-full flex flex-col items-center text-center mt-12 sm:mt-16 space-y-8"
        style={{
          backgroundImage: `url(${SocialBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 'auto',
          padding: '4rem 0',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full max-w-4xl flex flex-col items-center py-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Official Channels
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition"
              >
                <FontAwesomeIcon icon={link.icon} className="text-xl sm:text-2xl" />
                <span className="hidden sm:inline">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
