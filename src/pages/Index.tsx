import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  location: string;
  question: string;
  type: 'radio' | 'text';
  options?: string[];
  correctAnswer: string | string[];
  hint: string;
  emoji: string;
}

const questions: Question[] = [
  {
    id: 1,
    location: 'Лесная опушка',
    question: 'Какую часть поверхности нашей планеты занимают океаны и моря?',
    type: 'radio',
    options: ['Большую', 'Маленькую', 'Половину'],
    correctAnswer: 'Большую',
    hint: 'Вспомни, что ты читал в учебнике про океаны и моря.',
    emoji: '🌲'
  },
  {
    id: 2,
    location: 'Волшебный колодец',
    question: 'Почему нельзя пить воду из рек, озер и прудов?',
    type: 'radio',
    options: ['Она слишком соленая', 'В ней могут быть вредные вещества и бактерии', 'В ней живут русалки'],
    correctAnswer: 'В ней могут быть вредные вещества и бактерии',
    hint: 'Подумай о том, что может содержаться в воде.',
    emoji: '🪣'
  },
  {
    id: 3,
    location: 'Поле пшеницы',
    question: 'Сколько тонн воды необходимо для производства одной тонны пшеницы?',
    type: 'radio',
    options: ['150', '1500', '15000'],
    correctAnswer: '1500',
    hint: 'Для выращивания растений нужно очень много воды!',
    emoji: '🌾'
  },
  {
    id: 4,
    location: 'Фабрика Вреднюг Эколоджипов',
    question: 'Что строят для очистки сточных вод?',
    type: 'radio',
    options: ['Водохранилища', 'Очистные сооружения', 'Заводы'],
    correctAnswer: 'Очистные сооружения',
    hint: 'Вспомни, что помогает очищать грязную воду.',
    emoji: '🏭'
  },
  {
    id: 5,
    location: 'Лаборатория Эколоджипов',
    question: 'Что задерживают фильтры на очистных сооружениях?',
    type: 'radio',
    options: ['Полезные минералы', 'Вредные примеси', 'Радугу'],
    correctAnswer: 'Вредные примеси',
    hint: 'Фильтры нужны, чтобы убрать что-то плохое из воды.',
    emoji: '🔬'
  },
  {
    id: 6,
    location: 'Подземное царство Водопроводчика',
    question: 'Что помогает очищать воду на некоторых очистных сооружениях?',
    type: 'radio',
    options: ['Феи', 'Бактерии', 'Водяные'],
    correctAnswer: 'Бактерии',
    hint: 'Это живые организмы, которые помогают природе.',
    emoji: '🔧'
  },
  {
    id: 7,
    location: 'Городская квартира',
    question: 'Как называются приборы учета потребления воды?',
    type: 'radio',
    options: ['Термометры', 'Водосчётчики', 'Барометры'],
    correctAnswer: 'Водосчётчики',
    hint: 'Эти приборы считают, сколько воды мы используем.',
    emoji: '🏠'
  },
  {
    id: 8,
    location: 'Красный и Синий Кран',
    question: 'Каким цветом маркируют счетчики для холодной воды?',
    type: 'radio',
    options: ['Красным', 'Синим', 'Зеленым'],
    correctAnswer: 'Синим',
    hint: 'Подумай, какой цвет ассоциируется с холодом?',
    emoji: '🚰'
  },
  {
    id: 9,
    location: 'Прачечная Эколоджипов',
    question: 'Что случится, если из плохо закрытого крана будет течь тонкая струйка воды в течение суток?',
    type: 'radio',
    options: ['Ничего страшного', 'Большая потеря воды', 'Вырастут кристаллы'],
    correctAnswer: 'Большая потеря воды',
    hint: 'Даже маленькая струйка за долгое время превращается в много воды!',
    emoji: '👕'
  },
  {
    id: 10,
    location: 'Душ Эколоджипов',
    question: 'Как можно экономить воду, когда моешь руки?',
    type: 'radio',
    options: ['Не мыть руки вообще', 'Прикрыть немного кран', 'Использовать больше мыла'],
    correctAnswer: 'Прикрыть немного кран',
    hint: 'Нужно использовать меньше воды, но руки мыть обязательно!',
    emoji: '🚿'
  },
  {
    id: 11,
    location: 'Дальний берег реки Исток',
    question: 'Почему необходимо беречь воду?',
    type: 'text',
    correctAnswer: ['пресной воды', 'не так много', 'загрязненная', 'вредит'],
    hint: 'Подумай о том, что пресной воды мало и загрязнение опасно.',
    emoji: '🏞️'
  },
  {
    id: 12,
    location: 'Заброшенная ферма',
    question: 'Почему нужно следить за сточными водами с ферм?',
    type: 'text',
    correctAnswer: ['не загрязняли', 'реки', 'озера'],
    hint: 'Подумай о том, куда попадает грязная вода с ферм.',
    emoji: '🐄'
  },
  {
    id: 13,
    location: 'Лесной оазис',
    question: 'Сколько литров воды в день нужно человеку?',
    type: 'radio',
    options: ['1-5', '20-50', '100-200'],
    correctAnswer: '20-50',
    hint: 'Человеку нужно не очень мало и не очень много воды.',
    emoji: '🌳'
  },
  {
    id: 14,
    location: 'Разговор с мудрой черепахой',
    question: 'Каково главное правило бережного отношения к воде?',
    type: 'text',
    correctAnswer: ['не расходовать', 'напрасно'],
    hint: 'Главное - использовать воду разумно!',
    emoji: '🐢'
  },
  {
    id: 15,
    location: 'Источник реки Исток',
    question: 'Что каждый из вас может сделать, чтобы беречь воду?',
    type: 'text',
    correctAnswer: ['закрывать кран', 'следить', 'экономить'],
    hint: 'Подумай о простых действиях в повседневной жизни.',
    emoji: '💧'
  }
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [textAnswer, setTextAnswer] = useState('');
  const [energyCollected, setEnergyCollected] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const question = questions[currentQuestion];
  const progress = (energyCollected / 15) * 100;

  const checkAnswer = () => {
    const userAnswer = question.type === 'radio' ? selectedAnswer : textAnswer;
    
    if (!userAnswer.trim()) {
      toast({
        title: 'Ой!',
        description: 'Пожалуйста, выбери или напиши ответ.',
        variant: 'destructive'
      });
      return;
    }

    let isCorrect = false;

    if (question.type === 'radio') {
      isCorrect = userAnswer === question.correctAnswer;
    } else {
      const correctAnswers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : [question.correctAnswer];
      
      isCorrect = correctAnswers.some(answer => 
        userAnswer.toLowerCase().includes(answer.toLowerCase())
      );
    }

    if (isCorrect) {
      setEnergyCollected(prev => prev + 1);
      toast({
        title: '✨ Молодец!',
        description: 'Ты помог реке Исток стать чище! Собрана часть волшебной энергии.',
      });
      
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer('');
          setTextAnswer('');
          setShowHint(false);
        } else {
          setIsComplete(true);
        }
      }, 1500);
    } else {
      setShowHint(true);
      toast({
        title: 'Попробуй ещё раз!',
        description: question.hint,
        variant: 'destructive'
      });
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center animate-scale-in">
          <div className="mb-6">
            <img 
              src="https://cdn.poehali.dev/projects/b05d2cf7-daff-4003-a71b-24e0facee113/files/04e69c72-326f-4bf0-aeb5-4cf6bc1e7f2c.jpg"
              alt="Чистая река Исток"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-fade-in">
            🎉 Победа! 🎉
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-foreground">
            Река Исток снова чистая и светлая!
          </p>
          <p className="text-lg mb-8 text-muted-foreground">
            Ты настоящий защитник воды! Благодаря твоим знаниям река Исток освобождена от загрязнения. 
            Вреднюги Эколоджипы побеждены!
          </p>
          <div className="bg-primary/10 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-3 text-primary">🏆 Сертификат юного защитника воды</h2>
            <p className="text-lg">
              Вручается отважному спасателю планеты за успешное завершение квеста "Берегите воду"!
            </p>
          </div>
          <Button 
            size="lg" 
            onClick={() => window.location.reload()}
            className="text-lg px-8"
          >
            Пройти квест снова
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-4xl font-bold text-primary">
              Спасение реки Исток
            </h1>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Энергия собрана</p>
              <p className="text-2xl font-bold text-primary">{energyCollected}/15 💧</p>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {currentQuestion === 0 && energyCollected === 0 && (
          <Card className="p-6 mb-8 bg-gradient-to-r from-blue-100 to-green-100 animate-scale-in">
            <div className="flex gap-4 items-start">
              <div className="text-4xl">📖</div>
              <div>
                <h2 className="text-xl font-bold mb-2">Добро пожаловать, юные спасатели!</h2>
                <p className="text-foreground">
                  В некотором царстве, в тридевятом государстве, текла река Исток, чистая и светлая. 
                  Люди радовались ее водам, а рыбы плескались вдоволь. Но злобные Эколоджипы решили 
                  испортить жизнь всем, загрязняя реку отходами и вредными веществами. Река начала 
                  слабеть и терять свои силы. <strong>Вы должны освободить Исток от загрязнения!</strong>
                </p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6 md:p-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-5xl">{question.emoji}</div>
            <div>
              <p className="text-sm text-muted-foreground">Локация {currentQuestion + 1}/15</p>
              <h2 className="text-xl md:text-2xl font-bold text-primary">{question.location}</h2>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-lg md:text-xl font-semibold text-foreground mb-4">
              {question.question}
            </p>

            {question.type === 'radio' && question.options ? (
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer text-base md:text-lg"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <Textarea
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Напиши свой ответ здесь..."
                className="min-h-32 text-base md:text-lg"
              />
            )}
          </div>

          {showHint && (
            <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg animate-scale-in">
              <div className="flex items-start gap-3">
                <Icon name="Lightbulb" className="text-yellow-600 mt-1" size={24} />
                <div>
                  <p className="font-semibold text-yellow-800">Подсказка:</p>
                  <p className="text-yellow-700">{question.hint}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              onClick={checkAnswer}
              size="lg"
              className="flex-1 text-lg"
            >
              <Icon name="CheckCircle" className="mr-2" size={20} />
              Проверить ответ
            </Button>
            {!showHint && (
              <Button
                onClick={() => setShowHint(true)}
                variant="outline"
                size="lg"
              >
                <Icon name="HelpCircle" size={20} />
              </Button>
            )}
          </div>
        </Card>

        {currentQuestion === 3 && (
          <div className="mt-8 animate-fade-in">
            <img 
              src="https://cdn.poehali.dev/projects/b05d2cf7-daff-4003-a71b-24e0facee113/files/541e2f51-fdda-4b31-95d2-3a004e9dc90a.jpg"
              alt="Вреднюги Эколоджипы"
              className="w-full h-48 md:h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {currentQuestion === 13 && (
          <div className="mt-8 animate-fade-in">
            <img 
              src="https://cdn.poehali.dev/projects/b05d2cf7-daff-4003-a71b-24e0facee113/files/351438a0-e01d-4ff9-bd4c-e280f8d56487.jpg"
              alt="Мудрая черепаха"
              className="w-full h-48 md:h-64 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
