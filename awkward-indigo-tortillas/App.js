import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

// Datos de las preguntas por categoría (con 7 preguntas por sección)
const questionsData = {
  general: [
    { question: "¿Cuál es la capital de Francia?", answers: ["París", "Madrid", "Roma", "Berlín"], correct: 0 },
    { question: "¿Cuántos continentes hay?", answers: ["5", "6", "7", "8"], correct: 2 },
    { question: "¿Quién pintó la Mona Lisa?", answers: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"], correct: 0 },
    { question: "¿Cuál es el océano más grande?", answers: ["Atlántico", "Pacífico", "Índico", "Ártico"], correct: 1 },
    { question: "¿Qué es la fotosíntesis?", answers: ["Proceso de respiración de las plantas", "Proceso de reproducción de las plantas", "Proceso de absorción de nutrientes", "Proceso de producción de energía en las plantas"], correct: 3 },
    { question: "¿En qué año se cayó el muro de Berlín?", answers: ["1987", "1989", "1991", "1993"], correct: 1 },
    { question: "¿Cuál es el idioma más hablado del mundo?", answers: ["Inglés", "Chino mandarín", "Español", "Francés"], correct: 1 }
  ],
  geografia: [
    { question: "¿Qué océano está al este de África?", answers: ["Atlántico", "Índico", "Pacífico", "Ártico"], correct: 1 },
    { question: "¿Cuál es el río más largo del mundo?", answers: ["Amazonas", "Nilo", "Misisipi", "Yangtsé"], correct: 1 },
    { question: "¿En qué continente está Egipto?", answers: ["Asia", "África", "Europa", "América"], correct: 1 },
    { question: "¿Qué país tiene más habitantes?", answers: ["China", "India", "Estados Unidos", "Indonesia"], correct: 0 },
    { question: "¿En qué continente está el desierto de Sahara?", answers: ["Asia", "África", "América", "Oceanía"], correct: 1 },
    { question: "¿Cuál es la capital de Australia?", answers: ["Sídney", "Melbourne", "Canberra", "Brisbane"], correct: 2 },
    { question: "¿Qué océano está entre América y Asia?", answers: ["Atlántico", "Índico", "Pacífico", "Ártico"], correct: 2 }
  ],
  cultura: [
    { question: "¿Quién escribió 'Cien años de soledad'?", answers: ["Gabriel García Márquez", "Mario Vargas Llosa", "Pablo Neruda", "Jorge Luis Borges"], correct: 0 },
    { question: "¿En qué año llegó el hombre a la luna?", answers: ["1965", "1969", "1972", "1959"], correct: 1 },
    { question: "¿Qué autor escribió 'Don Quijote de la Mancha'?", answers: ["Miguel de Cervantes", "William Shakespeare", "Mark Twain", "Edgar Allan Poe"], correct: 0 },
    { question: "¿Qué pintura es famosa por su cuadro de un reloj derretido?", answers: ["La persistencia de la memoria", "El grito", "La noche estrellada", "La Gioconda"], correct: 0 },
    { question: "¿Cuál es el país de origen de la samba?", answers: ["Brasil", "Argentina", "Cuba", "México"], correct: 0 },
    { question: "¿Qué escritor creó el personaje de Sherlock Holmes?", answers: ["Agatha Christie", "Arthur Conan Doyle", "J.K. Rowling", "Leo Tolstoy"], correct: 1 },
    { question: "¿Quién pintó la Capilla Sixtina?", answers: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Vincent van Gogh"], correct: 1 }
  ]
};

const App = () => {
  // Estados
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const startGame = (category) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
  };

  const nextQuestion = () => {
    const currentCategoryData = questionsData[selectedCategory];
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < currentCategoryData.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setGameOver(true); // Fin del juego
    }
  };

  const handleAnswer = (index) => {
    const currentCategoryData = questionsData[selectedCategory];
    if (index === currentCategoryData[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  // Si el juego terminó, mostrar la puntuación
  if (gameOver) {
    const isVictory = score > 5;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Juego Terminado!</Text>
        <Text style={styles.score}>Tu puntuación es: {score}</Text>
        
        {/* Imagen condicional */}
        {isVictory ? (
          <Image 
            source={{uri: 'https://example.com/victory_image.jpg'}} 
            style={styles.resultImage} 
          />
        ) : (
          <Image 
            source={{uri: 'https://example.com/try_again_image.jpg'}} 
            style={styles.resultImage} 
          />
        )}

        <Button title="Jugar de nuevo" onPress={() => startGame(selectedCategory)} />
      </View>
    );
  }

  // Si no hay una categoría seleccionada, mostrar opciones para elegir categoría
  if (!selectedCategory) {
    return (
      <ImageBackground
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxlW_hvXTj99jGkeBtsHQri88rLqyOLM8sig&s' }} 
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Elige una categoría</Text>
          <TouchableOpacity style={styles.categoryButton} onPress={() => startGame('general')}>
            <Text style={styles.categoryButtonText}>General</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={() => startGame('geografia')}>
            <Text style={styles.categoryButtonText}>Geografía</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={() => startGame('cultura')}>
            <Text style={styles.categoryButtonText}>Cultura General</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  // Mostrar la pregunta actual y las opciones de respuesta
  const currentCategoryData = questionsData[selectedCategory];
  const currentQuestion = currentCategoryData[currentQuestionIndex];

  return (
    <ImageBackground
      source={{ uri: 'data:image/png;base64,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' }} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        <View style={styles.answersContainer}>
          {currentQuestion.answers.map((answer, index) => (
            <TouchableOpacity key={index} style={styles.answerButton} onPress={() => handleAnswer(index)}>
              <Text style={styles.answerText}>{answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.score}>Puntuación: {score}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#00000',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  categoryButton: {
    backgroundColor: '#5d00ff',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  categoryButtonText: {
    color: 'black',
    fontSize: 18,
  },
  question: {
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
    color: '#00bfff', 
  },
  answersContainer: {
    width: '110%',
    borderBottomColor: '#ffd100',
  },
  answerButton: {
    backgroundColor: '#fbff00',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  answerText: {
    color: '#333333', 
    fontSize: 30,
    marginBottom: 40,
  },
  score: {
    marginTop: 40,
    fontSize: 35,
    color: '#00bfff', 
  },
  resultImage: {
    width: 200,
    height: 200,
    marginTop: 20,
  }
});

export default App;