import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
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
  },
  // Add more questions here
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer. Try again!");
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto animate-slide-in">
      <h2 className="text-2xl font-bold text-primary mb-6">Test Your Knowledge</h2>
      <div className="mb-6">
        <p className="text-lg mb-4">{questions[currentQuestion].text}</p>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full text-left justify-start"
              onClick={() => handleAnswer(index)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      <div className="text-right text-gray-600">
        Score: {score}/{questions.length}
      </div>
    </Card>
  );
};

export default Quiz;