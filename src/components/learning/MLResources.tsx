import React from "react";
import { Card } from "@/components/ui/card";

interface ResourceSection {
  title: string;
  resources: {
    title: string;
    url: string;
    description: string;
  }[];
}

const resourceSections: ResourceSection[] = [
  {
    title: "Foundational Mathematics",
    resources: [
      {
        title: "Khan Academy: Linear Algebra",
        url: "https://www.khanacademy.org/math/linear-algebra",
        description: "Learn vectors, matrices, eigenvalues, and SVD."
      },
      {
        title: "MIT OpenCourseWare: Probability and Statistics",
        url: "https://ocw.mit.edu/courses/mathematics/18-05-introduction-to-probability-and-statistics-spring-2014/",
        description: "Understand probability distributions, Bayes' theorem, and hypothesis testing."
      },
      {
        title: "Khan Academy: Calculus",
        url: "https://www.khanacademy.org/math/calculus-1",
        description: "Master derivatives, gradients, and optimization."
      }
    ]
  },
  {
    title: "Programming and Tools",
    resources: [
      {
        title: "Python.org",
        url: "https://www.python.org/",
        description: "Official Python website for learning Python programming."
      },
      {
        title: "NumPy Documentation",
        url: "https://numpy.org/doc/",
        description: "Learn numerical computing with Python."
      },
      {
        title: "Pandas Documentation",
        url: "https://pandas.pydata.org/docs/",
        description: "Master data manipulation and analysis."
      }
    ]
  },
  {
    title: "Core Machine Learning Concepts",
    resources: [
      {
        title: "Coursera: Machine Learning by Andrew Ng",
        url: "https://www.coursera.org/learn/machine-learning",
        description: "A beginner-friendly course covering supervised and unsupervised learning."
      },
      {
        title: "Deep Learning Specialization by Andrew Ng",
        url: "https://www.deeplearning.ai/",
        description: "A comprehensive course on deep learning."
      },
      {
        title: "Fast.ai Practical Deep Learning",
        url: "https://www.fast.ai/",
        description: "A hands-on course for deep learning practitioners."
      }
    ]
  },
  {
    title: "Deep Learning",
    resources: [
      {
        title: "CS231n: CNNs for Visual Recognition",
        url: "https://cs231n.github.io/",
        description: "Learn convolutional neural networks for image tasks."
      },
      {
        title: "Understanding LSTMs",
        url: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/",
        description: "A detailed guide to recurrent neural networks."
      },
      {
        title: "The Illustrated Transformer",
        url: "https://jalammar.github.io/illustrated-transformer/",
        description: "Learn about transformers and attention mechanisms."
      }
    ]
  }
];

const MLResources = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI/ML Learning Resources</h1>
          <p className="text-xl text-gray-600">
            Your comprehensive guide to mastering Artificial Intelligence and Machine Learning.
          </p>
        </div>

        <div className="space-y-8">
          {resourceSections.map((section, index) => (
            <Card key={index} className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-6 pb-2 border-b-2 border-primary">
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.resources.map((resource, resourceIndex) => (
                  <li
                    key={resourceIndex}
                    className="bg-muted p-4 rounded-lg border-l-4 border-primary hover:shadow-md transition-shadow"
                  >
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline"
                    >
                      {resource.title}
                    </a>
                    <p className="mt-2 text-gray-600">{resource.description}</p>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MLResources;