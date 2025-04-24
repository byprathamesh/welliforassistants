
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, CardContent, CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Video, FileText, CheckCircle, ArrowLeft,
  Download, Clock, Award, PlayCircle, File, CheckSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock modules data
const modules = {
  '1': {
    id: '1',
    title: 'How to professionally behave during home visits',
    description: 'Learn the essentials of professional conduct when visiting patients at their homes.',
    duration: '45 mins',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    lessons: [
      {
        id: 'l1-1',
        title: 'Introduction to home visit etiquette',
        type: 'video',
        duration: '10 mins',
        completed: true
      },
      {
        id: 'l1-2',
        title: 'Communicating effectively with patients',
        type: 'article',
        duration: '15 mins',
        completed: true
      },
      {
        id: 'l1-3',
        title: 'Professional appearance and hygiene',
        type: 'video',
        duration: '12 mins',
        completed: true
      },
      {
        id: 'l1-4',
        title: 'Handling difficult situations',
        type: 'article',
        duration: '8 mins',
        completed: true
      },
      {
        id: 'l1-5',
        title: 'Module assessment',
        type: 'quiz',
        duration: '5 mins',
        completed: true
      }
    ],
    quiz: {
      totalQuestions: 10,
      passingScore: 80,
      completed: true,
      score: 90
    }
  },
  '2': {
    id: '2',
    title: 'Medical equipment handling basics',
    description: 'Master the proper handling techniques for common medical equipment used during home visits.',
    duration: '1 hour',
    progress: 75,
    image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&q=80&w=600',
    lessons: [
      {
        id: 'l2-1',
        title: 'Common medical equipment overview',
        type: 'video',
        duration: '15 mins',
        completed: true
      },
      {
        id: 'l2-2',
        title: 'Blood pressure monitoring equipment',
        type: 'video',
        duration: '12 mins',
        completed: true
      },
      {
        id: 'l2-3',
        title: 'Blood collection supplies',
        type: 'article',
        duration: '10 mins',
        completed: true
      },
      {
        id: 'l2-4',
        title: 'Equipment maintenance and sterilization',
        type: 'video',
        duration: '15 mins',
        completed: false
      },
      {
        id: 'l2-5',
        title: 'Module assessment',
        type: 'quiz',
        duration: '10 mins',
        completed: false
      }
    ],
    quiz: {
      totalQuestions: 12,
      passingScore: 80,
      completed: false,
      score: null
    }
  },
  '3': {
    id: '3',
    title: 'Patient sensitivity and privacy',
    description: 'Understand the importance of patient privacy and how to maintain confidentiality.',
    duration: '30 mins',
    progress: 25,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=600',
    lessons: [
      {
        id: 'l3-1',
        title: 'HIPAA overview for home healthcare',
        type: 'video',
        duration: '8 mins',
        completed: true
      },
      {
        id: 'l3-2',
        title: 'Patient data protection',
        type: 'article',
        duration: '7 mins',
        completed: false
      },
      {
        id: 'l3-3',
        title: 'Cultural sensitivity in home healthcare',
        type: 'video',
        duration: '10 mins',
        completed: false
      },
      {
        id: 'l3-4',
        title: 'Privacy best practices',
        type: 'article',
        duration: '5 mins',
        completed: false
      },
      {
        id: 'l3-5',
        title: 'Module assessment',
        type: 'quiz',
        duration: '5 mins',
        completed: false
      }
    ],
    quiz: {
      totalQuestions: 8,
      passingScore: 80,
      completed: false,
      score: null
    }
  },
  '4': {
    id: '4',
    title: 'Emergency situations',
    description: 'Learn how to identify and respond to medical emergencies during home visits.',
    duration: '1.5 hours',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=600',
    lessons: [
      {
        id: 'l4-1',
        title: 'Recognizing medical emergencies',
        type: 'video',
        duration: '20 mins',
        completed: false
      },
      {
        id: 'l4-2',
        title: 'Basic life support review',
        type: 'video',
        duration: '25 mins',
        completed: false
      },
      {
        id: 'l4-3',
        title: 'Emergency protocols',
        type: 'article',
        duration: '15 mins',
        completed: false
      },
      {
        id: 'l4-4',
        title: 'Communication during emergencies',
        type: 'video',
        duration: '10 mins',
        completed: false
      },
      {
        id: 'l4-5',
        title: 'Documentation requirements',
        type: 'article',
        duration: '10 mins',
        completed: false
      },
      {
        id: 'l4-6',
        title: 'Module assessment',
        type: 'quiz',
        duration: '15 mins',
        completed: false
      }
    ],
    quiz: {
      totalQuestions: 15,
      passingScore: 80,
      completed: false,
      score: null
    }
  },
  '5': {
    id: '5',
    title: 'How to upsell Welli services ethically',
    description: 'Discover ethical approaches to recommending additional Welli services to patients.',
    duration: '45 mins',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600',
    lessons: [
      {
        id: 'l5-1',
        title: 'Understanding Welli service offerings',
        type: 'video',
        duration: '10 mins',
        completed: false
      },
      {
        id: 'l5-2',
        title: 'Ethics in healthcare recommendations',
        type: 'article',
        duration: '12 mins',
        completed: false
      },
      {
        id: 'l5-3',
        title: 'Identifying patient needs',
        type: 'video',
        duration: '8 mins',
        completed: false
      },
      {
        id: 'l5-4',
        title: 'Communication techniques',
        type: 'article',
        duration: '8 mins',
        completed: false
      },
      {
        id: 'l5-5',
        title: 'Module assessment',
        type: 'quiz',
        duration: '7 mins',
        completed: false
      }
    ],
    quiz: {
      totalQuestions: 10,
      passingScore: 80,
      completed: false,
      score: null
    }
  }
};

const ModuleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  
  // Get the module based on the ID parameter
  const module = id ? modules[id as keyof typeof modules] : null;
  
  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Module Not Found</h2>
        <p className="text-welli-textSecondary mb-6">
          The module you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/learning">Return to Learning Hub</Link>
        </Button>
      </div>
    );
  }

  const completedLessons = module.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = module.lessons.length;
  const progressPercentage = (completedLessons / totalLessons) * 100;
  
  const handleLessonClick = (lessonId: string) => {
    setCurrentLesson(lessonId);
    toast({
      title: "Lesson Started",
      description: "You've begun a new lesson. Your progress will be saved automatically.",
    });
  };
  
  const handleMarkComplete = () => {
    toast({
      title: "Lesson Completed",
      description: "Great job! Your progress has been updated.",
    });
    setCurrentLesson(null);
  };
  
  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/learning" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> 
            Back to Learning Hub
          </Link>
        </Button>
        
        <div className="relative h-56 md:h-72 rounded-lg overflow-hidden mb-6">
          <img 
            src={module.image} 
            alt={module.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <Badge className="mb-2 w-fit">Module {id}</Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {module.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{module.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{module.lessons.length} lessons</span>
              </div>
              {module.progress === 100 && (
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-yellow-400" />
                  <span>Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <Card className="bg-welli-background">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              {completedLessons} of {totalLessons} lessons completed
            </span>
            <span className="text-sm">{progressPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module content tabs */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="quiz">Assessment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-4">
              {currentLesson ? (
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle>
                      {module.lessons.find(l => l.id === currentLesson)?.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {module.lessons.find(l => l.id === currentLesson)?.type === 'video' ? (
                      <div className="space-y-4">
                        <div className="relative bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                          <PlayCircle className="h-16 w-16 text-welli-accent opacity-80" />
                          <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {module.lessons.find(l => l.id === currentLesson)?.duration}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Video Transcript</h3>
                          <div className="text-welli-textSecondary">
                            <p className="mb-2">
                              Welcome to this lesson on {module.lessons.find(l => l.id === currentLesson)?.title.toLowerCase()}. 
                              In this video, we'll explore the key concepts and best practices for medical assistants 
                              conducting home visits.
                            </p>
                            <p>
                              We'll cover important topics such as patient communication, professional conduct, 
                              and how to handle common scenarios you might encounter. By the end of this lesson, 
                              you'll have a solid understanding of how to approach these situations effectively.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : module.lessons.find(l => l.id === currentLesson)?.type === 'quiz' ? (
                      <div className="space-y-6">
                        <div className="bg-welli-background p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Module Assessment</h3>
                          <p className="text-welli-textSecondary text-sm">
                            This quiz contains {module.quiz.totalQuestions} multiple choice questions. 
                            You need to score at least {module.quiz.passingScore}% to pass this module.
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <p className="font-medium mb-2">Question 1 of {module.quiz.totalQuestions}</p>
                            <p>What is the first thing you should do when arriving at a patient's home?</p>
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center">
                                <input type="radio" id="q1-a" name="q1" className="mr-2" />
                                <label htmlFor="q1-a">Start unpacking your equipment immediately</label>
                              </div>
                              <div className="flex items-center">
                                <input type="radio" id="q1-b" name="q1" className="mr-2" />
                                <label htmlFor="q1-b">Identify yourself and confirm the patient's identity</label>
                              </div>
                              <div className="flex items-center">
                                <input type="radio" id="q1-c" name="q1" className="mr-2" />
                                <label htmlFor="q1-c">Ask to use the bathroom</label>
                              </div>
                              <div className="flex items-center">
                                <input type="radio" id="q1-d" name="q1" className="mr-2" />
                                <label htmlFor="q1-d">Call your supervisor</label>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <Button variant="outline" disabled>Previous</Button>
                            <Button>Next Question</Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          {module.lessons.find(l => l.id === currentLesson)?.title}
                        </h3>
                        <div className="prose max-w-none text-welli-textSecondary">
                          <p className="mb-4">
                            This article covers the important aspects of {module.lessons.find(l => l.id === currentLesson)?.title.toLowerCase()}.
                            As a medical assistant conducting home visits, understanding these concepts is crucial for providing
                            high-quality care while maintaining professional standards.
                          </p>
                          <h4 className="text-welli-textPrimary font-medium mt-6 mb-2">Key Points</h4>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Always maintain professional boundaries with patients</li>
                            <li>Communicate clearly and use language the patient can understand</li>
                            <li>Respect the patient's home and personal space</li>
                            <li>Document all interactions accurately</li>
                            <li>Follow company protocols for all procedures</li>
                          </ul>
                          <p className="mt-4">
                            Remember that as a representative of Welli, your conduct directly impacts how patients
                            perceive the organization and the quality of care they receive.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentLesson(null)}>
                      Back to Lessons
                    </Button>
                    <Button onClick={handleMarkComplete}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Complete
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Module Contents</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="divide-y">
                      {module.lessons.map((lesson, index) => (
                        <li key={lesson.id} className="px-6 py-4 hover:bg-gray-50">
                          <button 
                            className="w-full flex items-start justify-between"
                            onClick={() => handleLessonClick(lesson.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">
                                {lesson.type === 'video' ? (
                                  <Video className="h-5 w-5 text-welli-accent" />
                                ) : lesson.type === 'quiz' ? (
                                  <CheckSquare className="h-5 w-5 text-welli-accent" />
                                ) : (
                                  <FileText className="h-5 w-5 text-welli-accent" />
                                )}
                              </div>
                              <div className="text-left">
                                <p className="font-medium">{lesson.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-welli-textSecondary">
                                    {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                                  </span>
                                  <span className="text-xs text-welli-textSecondary">
                                    {lesson.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {lesson.completed ? (
                              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                                Completed
                              </Badge>
                            ) : (
                              <Badge variant="outline">Start</Badge>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="resources" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Downloads</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center gap-2">
                          <File className="h-5 w-5 text-welli-textSecondary" />
                          <span>Module Guide.pdf</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center gap-2">
                          <File className="h-5 w-5 text-welli-textSecondary" />
                          <span>Reference Sheet.pdf</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Related Videos</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-md overflow-hidden">
                        <div className="relative bg-gray-100 aspect-video">
                          <PlayCircle className="absolute inset-0 m-auto h-10 w-10 text-welli-accent opacity-80" />
                        </div>
                        <div className="p-3">
                          <p className="font-medium line-clamp-1">Quick Tips for Medical Assistants</p>
                          <p className="text-xs text-welli-textSecondary mt-1">5:27</p>
                        </div>
                      </div>
                      <div className="border rounded-md overflow-hidden">
                        <div className="relative bg-gray-100 aspect-video">
                          <PlayCircle className="absolute inset-0 m-auto h-10 w-10 text-welli-accent opacity-80" />
                        </div>
                        <div className="p-3">
                          <p className="font-medium line-clamp-1">Common Patient Questions & How to Answer</p>
                          <p className="text-xs text-welli-textSecondary mt-1">7:15</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">External Resources</h3>
                    <div className="space-y-2">
                      <div className="border rounded-md p-3">
                        <a href="#" className="text-blue-600 hover:underline">
                          American Medical Association - Home Care Guidelines
                        </a>
                        <p className="text-xs text-welli-textSecondary mt-1">
                          Official guidelines for medical professionals conducting home visits
                        </p>
                      </div>
                      <div className="border rounded-md p-3">
                        <a href="#" className="text-blue-600 hover:underline">
                          Patient Communication Best Practices
                        </a>
                        <p className="text-xs text-welli-textSecondary mt-1">
                          Comprehensive guide to effective patient communication
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="quiz" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Module Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {module.quiz.completed ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">
                          Assessment Completed!
                        </h3>
                        <p className="text-green-700 mb-4">
                          You scored {module.quiz.score}% on this assessment.
                        </p>
                        <div className="flex flex-col xs:flex-row gap-2 justify-center">
                          <Button variant="outline" onClick={() => setActiveTab("content")}>
                            Review Module
                          </Button>
                          {module.progress === 100 && (
                            <Button onClick={handleDownloadCertificate}>
                              <Download className="h-4 w-4 mr-2" />
                              Download Certificate
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="bg-welli-background p-6 rounded-lg">
                          <h3 className="font-medium mb-2">Assessment Information</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Questions:</span>
                              <span>{module.quiz.totalQuestions}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Time Limit:</span>
                              <span>{module.lessons.find(l => l.type === 'quiz')?.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Passing Score:</span>
                              <span>{module.quiz.passingScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Attempts Allowed:</span>
                              <span>Unlimited</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">Requirements to Take Assessment</h3>
                          <div className="space-y-2">
                            {module.lessons
                              .filter(lesson => lesson.type !== 'quiz')
                              .map((lesson, index) => (
                                <div 
                                  key={lesson.id} 
                                  className="flex items-center justify-between border rounded-md p-3"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm">{index + 1}. {lesson.title}</span>
                                  </div>
                                  {lesson.completed ? (
                                    <Badge className="bg-green-100 text-green-800">
                                      Completed
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline">Not Completed</Badge>
                                  )}
                                </div>
                              ))
                            }
                          </div>
                        </div>
                        
                        <Button 
                          disabled={!module.lessons.every(lesson => lesson.type === 'quiz' || lesson.completed)}
                          onClick={() => {
                            const quizLesson = module.lessons.find(l => l.type === 'quiz');
                            if (quizLesson) {
                              handleLessonClick(quizLesson.id);
                              setActiveTab("content");
                            }
                          }}
                          className="w-full"
                        >
                          {module.lessons.every(lesson => lesson.type === 'quiz' || lesson.completed)
                            ? "Start Assessment"
                            : "Complete All Lessons First"
                          }
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Module</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-welli-textSecondary">
                {module.description}
              </p>
              
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-welli-textSecondary">Duration:</span>
                  <span>{module.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-welli-textSecondary">Lessons:</span>
                  <span>{module.lessons.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-welli-textSecondary">Completion:</span>
                  <span>{module.progress}%</span>
                </div>
                {module.progress === 100 && (
                  <div className="flex justify-between">
                    <span className="text-welli-textSecondary">Certificate:</span>
                    <span className="text-green-600">Available</span>
                  </div>
                )}
              </div>
              
              {module.progress === 100 ? (
                <Button className="w-full mt-4" onClick={handleDownloadCertificate}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
              ) : (
                <Button className="w-full mt-4" onClick={() => {
                  const firstIncompleteLesson = module.lessons.find(lesson => !lesson.completed);
                  if (firstIncompleteLesson) {
                    handleLessonClick(firstIncompleteLesson.id);
                    setActiveTab("content");
                  }
                }}>
                  {module.progress > 0 ? 'Continue Learning' : 'Start Module'}
                </Button>
              )}
            </CardContent>
          </Card>
          
          {/* Skills gained */}
          <Card>
            <CardHeader>
              <CardTitle>Skills You'll Gain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-welli-background">Professional Conduct</Badge>
                <Badge variant="outline" className="bg-welli-background">Patient Communication</Badge>
                <Badge variant="outline" className="bg-welli-background">Confidentiality</Badge>
                <Badge variant="outline" className="bg-welli-background">Healthcare Ethics</Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Related modules */}
          <Card>
            <CardHeader>
              <CardTitle>Related Modules</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y">
                {Object.values(modules)
                  .filter(m => m.id !== module.id)
                  .slice(0, 2)
                  .map(relatedModule => (
                    <li key={relatedModule.id} className="px-4 py-3">
                      <Link 
                        to={`/learning/${relatedModule.id}`}
                        className="flex items-start gap-3 hover:text-welli-accent"
                      >
                        <BookOpen className="h-5 w-5 mt-0.5 text-welli-accent" />
                        <div>
                          <p className="font-medium line-clamp-2">{relatedModule.title}</p>
                          <p className="text-xs text-welli-textSecondary mt-1">{relatedModule.duration}</p>
                        </div>
                      </Link>
                    </li>
                  ))
                }
              </ul>
              <div className="p-4 border-t">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/learning">View All Modules</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetails;
