import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is the primary purpose of self-attention in Transformers?",
    options: [
      "To reduce computational complexity",
      "To capture relationships between different positions in the sequence",
      "To compress the input sequence",
      "To generate random weights",
    ],
    correctAnswer: 1,
    explanation: "Self-attention helps Transformers understand how different words or elements in a sequence relate to each other, similar to how we understand the relationship between words in a sentence.",
  },
  {
    id: 2,
    text: "Which analogy best describes the encoder-decoder structure?",
    options: [
      "A calculator performing math operations",
      "A translator reading one language and writing in another",
      "A computer storing files",
      "A phone making calls",
    ],
    correctAnswer: 1,
    explanation: "The encoder-decoder structure is like a translator who first understands the meaning (encoder) and then expresses it in another form (decoder).",
  },
  {
    id: 3,
    text: "How do Transformers process input data?",
    options: [
      "One word at a time, sequentially",
      "All words simultaneously, in parallel",
      "Only the first and last words",
      "Random words only",
    ],
    correctAnswer: 1,
    explanation: "Transformers process all input elements (like words) simultaneously, which makes them very efficient compared to sequential processing.",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (selectedOption: number) => {
    if (answered) return;
    
    setAnswered(true);
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast.success("Correct answer! 🎉");
    } else {
      toast.error("Not quite right. Try to understand why!");
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
      setAnswered(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="p-6 max-w-2xl mx-auto animate-slide-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Test Your Knowledge</h2>
        <Progress value={progress} className="mb-4" />
        <p className="text-sm text-gray-600 mb-8">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>
      
      <div className="mb-6">
        <p className="text-lg mb-4">{questions[currentQuestion].text}</p>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              variant={answered ? (index === questions[currentQuestion].correctAnswer ? "default" : "outline") : "outline"}
              className={`w-full text-left justify-start ${
                answered && index === questions[currentQuestion].correctAnswer ? "bg-green-500 hover:bg-green-600" : ""
              }`}
              onClick={() => handleAnswer(index)}
              disabled={answered}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className="mb-6 p-4 bg-muted rounded-lg animate-fade-in">
          <h3 className="font-semibold mb-2">Explanation:</h3>
          <p className="text-gray-600">{questions[currentQuestion].explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-gray-600">
          Score: {score}/{questions.length}
        </div>
        {answered && currentQuestion < questions.length - 1 && (
          <Button onClick={handleNext}>Next Question</Button>
        )}
      </div>
    </Card>
  );
};

export default Quiz;