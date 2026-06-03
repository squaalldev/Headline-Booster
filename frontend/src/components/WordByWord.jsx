import React from 'react';

const ParagraphFormat = ({ fullTranslation, vocabulary }) => (
  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
    {fullTranslation && (
      <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {fullTranslation}
      </div>
    )}
    {vocabulary && vocabulary.length > 0 && (
      <div className="mt-2 pt-1">
        <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">✨ Vocabulario</div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {vocabulary.map((item, idx) => (
            <div key={idx} className="flex items-baseline gap-1">
              <span className="font-medium text-gray-800 dark:text-gray-200">{item.word}</span>
              <span className="text-gray-400 dark:text-gray-600">→</span>
              <span className="text-gray-600 dark:text-gray-400">{item.meaning}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const LineByLineFormat = ({ originalText, fullTranslation, vocabulary }) => {
  const sentences = originalText?.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [originalText];
  const translatedSentences = fullTranslation?.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [fullTranslation];
  
  return (
    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
      {sentences.map((sentence, idx) => (
        <div key={idx} className="space-y-0.5">
          <div className="text-gray-800 dark:text-gray-200 text-sm">
            {sentence.trim()}
          </div>
          {translatedSentences[idx] && (
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {translatedSentences[idx].trim()}
            </div>
          )}
        </div>
      ))}
      {vocabulary && vocabulary.length > 0 && (
        <div className="pt-1">
          <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">✨ Vocabulario</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {vocabulary.map((item, idx) => (
              <div key={idx} className="flex items-baseline gap-1">
                <span className="font-medium text-gray-800 dark:text-gray-200">{item.word}</span>
                <span className="text-gray-400 dark:text-gray-600">→</span>
                <span className="text-gray-600 dark:text-gray-400">{item.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const WordByWord = ({ vocabulary = [], fullTranslation, originalText, format = "paragraph" }) => {
  if ((!vocabulary || vocabulary.length === 0) && !fullTranslation) {
    return null;
  }

  if (format === "linebyline") {
    return <LineByLineFormat originalText={originalText} fullTranslation={fullTranslation} vocabulary={vocabulary} />;
  }

  return <ParagraphFormat fullTranslation={fullTranslation} vocabulary={vocabulary} />;
};

export default WordByWord;