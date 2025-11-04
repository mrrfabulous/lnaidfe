import { addDays, subDays } from 'date-fns';

const schools = [
  'University of Lagos',
  'Ahmadu Bello University',
  'University of Nigeria',
  'Obafemi Awolowo University',
  'University of Ibadan',
  'Covenant University',
  'Federal University of Technology Akure'
];

const courses = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Medicine',
  'Law',
  'Accounting',
  'Business Administration'
];

const levels = ['100', '200', '300', '400', '500'];

const names = [
  'Oluwaseun Adebayo',
  'Chioma Okafor',
  'Ibrahim Mohammed',
  'Aisha Bello',
  'Chidi Okonkwo',
  'Folake Adeleke',
  'Babajide Ogunleye',
  'Ngozi Eze',
  'Yusuf Ibrahim',
  'Amina Musa'
];

const statuses = ['pending', 'approved', 'rejected', 'interview_scheduled'];

const documentTypes = [
  'Academic Transcript',
  'CV/Resume',
  'Recommendation Letter',
  'Statement of Purpose',
  'Passport Photo',
  'ID Card'
];

const generateRandomGPA = () => {
  return (Math.random() * 2 + 3).toFixed(2); // Generates GPAs between 3.00 and 5.00
};

const generateRandomDate = () => {
  const daysAgo = Math.floor(Math.random() * 30); // Random date within last 30 days
  return subDays(new Date(), daysAgo).toJSON();
};

const generateRandomDocuments = () => {
  const numDocs = Math.floor(Math.random() * 4) + 2; // 2-5 documents
  return documentTypes
    .sort(() => Math.random() - 0.5)
    .slice(0, numDocs);
};

const generateCoverLetter = () => {
  return `Dear Selection Committee,

I am writing to express my strong interest in this opportunity. As a dedicated student with a passion for excellence and a track record of academic achievement, I believe I would be an excellent candidate.

Throughout my academic career, I have maintained a high GPA while actively participating in extracurricular activities and leadership roles. I am particularly drawn to this opportunity because it aligns perfectly with my career goals and academic interests.

I look forward to the possibility of discussing how I can contribute to your program.

Best regards`;
};

const generateApplication = (id: number, type: 'offer' | 'scholarship') => {
  const studentName = names[Math.floor(Math.random() * names.length)];
  const email = studentName.toLowerCase().replace(' ', '.') + '@example.com';
  
  return {
    id,
    studentName,
    studentEmail: email,
    type,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    school: schools[Math.floor(Math.random() * schools.length)],
    course: courses[Math.floor(Math.random() * courses.length)],
    level: levels[Math.floor(Math.random() * levels.length)],
    gpa: generateRandomGPA(),
    appliedAt: generateRandomDate(),
    documents: generateRandomDocuments(),
    coverLetter: generateCoverLetter(),
    currentStep: type === 'scholarship' ? Math.floor(Math.random() * 4) + 1 : null,
    interviewDate: null,
    feedback: '',
    lastUpdated: generateRandomDate()
  };
};

export const generateMockApplications = (numApplications: number) => {
  const applications = [];
  for (let i = 0; i < numApplications; i++) {
    const type = Math.random() > 0.5 ? 'offer' : 'scholarship';
    applications.push(generateApplication(i + 1, type));
  }
  return applications;
};

export const generateProgramApplications = (programId: number, type: 'offer' | 'scholarship', count: number) => {
  return Array(count).fill(null).map((_, index) => ({
    ...generateApplication(programId * 1000 + index + 1, type),
    programId
  }));
};
